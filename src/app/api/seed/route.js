import { ensureProjectsTable } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    await ensureProjectsTable();
    return NextResponse.json({ message: "Table created" });
}