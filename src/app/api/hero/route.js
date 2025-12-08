import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@auth0/nextjs-auth0"; // updated import for App Router
import { withApiAuthRequired } from "@auth0/nextjs-auth0"; // updated helper
import { getHero, upsertHero } from "@/lib/db";
import image2uri, { extTypeMap } from "image2uri";
import fs from "fs";
import os from "os";
import path from "path";
import { randomUUID } from "crypto";

// Validation Schema
const heroSchema = z.object({
  avatar: z.string().trim().min(1).refine((v) => v.startsWith("data:"), "Avatar must be a data URL"),
  fullName: z.string().trim().min(2).max(200),
  shortDescription: z.string().trim().min(2).max(120),
  longDescription: z.string().trim().min(10).max(5000),
});

export async function GET() {
  const hero = await getHero();
  return NextResponse.json({ data: hero });
}

export const PUT = withApiAuthRequired(async (request) => {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const avatarFile = formData.get("avatarFile");
  const avatarFromForm = formData.get("avatar");
  
  // Convert file to Data URL if a new file was uploaded
  const avatarDataUrl = await toDataUrl(avatarFile, avatarFromForm);

  // Validate payload
  const payload = {
    avatar: avatarDataUrl ?? "",
    fullName: formData.get("fullName") ?? "",
    shortDescription: formData.get("shortDescription") ?? "",
    longDescription: formData.get("longDescription") ?? "",
  };

  try {
    const validatedData = heroSchema.parse(payload);
    const hero = await upsertHero(validatedData);
    return NextResponse.json({ message: "Hero updated", data: hero }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Validation Failed", errors: error.errors }, { status: 400 });
  }
});

// Helper: Convert File object to Data URL string
async function toDataUrl(file, fallbackString) {
  const fallback = typeof fallbackString === "string" ? fallbackString.trim() : "";
  
  // Check if file is a File object (has arrayBuffer)
  if (file && typeof file.arrayBuffer === "function" && file.size > 0) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = path.extname(file.name || "") || ".bin";
    const mime = extTypeMap[ext] ?? file.type ?? "application/octet-stream";
    
    // Write to temp file for image2uri to read
    const tmp = path.join(os.tmpdir(), `${randomUUID()}${ext}`);
    fs.writeFileSync(tmp, buffer);
    
    try {
      const uri = await image2uri(tmp, { ext });
      return uri.startsWith("data:") ? uri : `data:${mime};base64,${uri}`;
    } finally {
      // Clean up temp file
      if (fs.existsSync(tmp)) fs.rmSync(tmp, { force: true });
    }
  }
  return fallback;
}