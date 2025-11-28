import { NextResponse } from "next/server";
import { z } from "zod";
import { auth0 } from "@/lib/auth0";
import { getProjectById, updateProject, deleteProject } from "@/lib/db";

// Validation Schema
const projectSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  image: z.string().url().optional(),
  link: z.string().url().optional(),
  keywords: z.array(z.string()).optional(),
});

// GET (Read)
export async function GET(request, { params }) {
    // Next.js 14: params is just an object, no await needed
    const uuid = params.uuid; 
    
    const project = await getProjectById(uuid);
    if (!project) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(project);
}

// PUT (Update)
export async function PUT(request, { params }) {
  try {
    // 1. Check Auth (V3 Syntax)
    const session = await auth0.getSession();
    if (!session?.user) {
        console.log("❌ PUT Error: User not logged in");
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const uuid = params.uuid; 
    const body = await request.json();
    
    console.log("📝 Received Update Data:", body); // Debug log

    // 2. Validate Data
    const parsed = projectSchema.parse(body);

    // 3. Update DB
    const updated = await updateProject(uuid, parsed);
    
    if (!updated) {
        console.log("❌ PUT Error: Project ID not found in DB:", uuid);
        return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    console.log("✅ Update Successful:", updated);
    return NextResponse.json({ message: "Project updated", data: updated });

  } catch (error) {
    // This prints the REAL error to your terminal
    console.error("🔥 SERVER ERROR:", error); 
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}

// DELETE (Remove)
export async function DELETE(request, { params }) {
    try {
        const session = await auth0.getSession();
        if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        
        const uuid = params.uuid;
        const deleted = await deleteProject(uuid);
        
        if (!deleted) return NextResponse.json({ message: "Not found" }, { status: 404 });
        return NextResponse.json({ message: "Project deleted" });
    } catch (error) {
        console.error("🔥 DELETE ERROR:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}