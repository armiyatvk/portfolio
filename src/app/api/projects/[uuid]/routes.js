import { NextResponse } from "next/server";
import { z } from "zod";
import { auth0 } from "@/lib/auth0";
import { getProjectById, updateProject, deleteProject } from "@/lib/db";

const projectSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  image: z.string().url().optional(),
  link: z.string().url().optional(),
  keywords: z.array(z.string()).optional(),
});

// GET Public
export async function GET(request, { params }) {
    const project = await getProjectById(params.uuid);
    if (!project) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(project);
}

// PUT Protected
export async function PUT(request, { params }) {
  await auth0.requireSession(); // Guard
  
  const body = await request.json();
  const parsed = projectSchema.parse(body);
  
  const updated = await updateProject(params.uuid, parsed);
  
  if (!updated) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Project updated", data: updated });
}

// DELETE Protected
export async function DELETE(request, { params }) {
    await auth0.requireSession(); // Guard
    
    const deleted = await deleteProject(params.uuid);
    if (!deleted) return NextResponse.json({ message: "Not found" }, { status: 404 });
    
    return NextResponse.json({ message: "Project deleted" });
}