import { notFound, redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import { getProjectById } from "@/lib/db";
import EditProjectForm from "@/components/edit-project-form";

export default async function EditProjectPage({ params }) {
  // Protect route
  const session = await auth0.getSession();
  if (!session?.user) redirect("/api/auth/login");

  const project = await getProjectById(params.uuid);
  if (!project) notFound();

  return (
    <div className="container mx-auto p-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      <EditProjectForm project={project} uuid={params.uuid} />
    </div>
  );
}