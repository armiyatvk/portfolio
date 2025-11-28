import { notFound, redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import { getProjectById } from "@/lib/db";
import EditProjectForm from "@/components/edit-project-form";

export default async function EditProjectPage({ params }) {
  // 1. AWAIT the params object (New in Next.js 16)
  const { uuid } = await params;

  // Protect route
  const session = await auth0.getSession();
  if (!session?.user) redirect("/api/auth/login");

  // 2. Use the uuid variable we extracted above
  const project = await getProjectById(uuid);
  
  if (!project) notFound();

  return (
    <div className="container mx-auto p-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      <EditProjectForm project={project} uuid={uuid} />
    </div>
  );
}