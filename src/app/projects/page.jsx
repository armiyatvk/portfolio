"use client";

import Link from "next/link";
import useSWR from "swr";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project-card";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProjectsPage() {
  const { user, isLoading: userLoading } = useUser();
  
  // Fetch data from your new API route
  const { data: projects, error, isLoading } = useSWR("/api/projects", fetcher);

  if (isLoading || userLoading) return <div className="p-10">Loading projects...</div>;
  if (error) return <div className="p-10 text-red-500">Failed to load projects.</div>;

  return (
    <div className="mt-10 container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        
        {/* Only show 'New Project' button if logged in */}
        {user && (
          <Button asChild>
            <Link href="/projects/new">New Project</Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Note: The API returns an array, so we map over it */}
        {projects && projects.length > 0 ? (
          projects.map((p) => (
            // Use p.id (UUID) instead of slug
            <ProjectCard key={p.id} project={p} />
          ))
        ) : (
          <p className="text-gray-500 col-span-3">No projects found in the database.</p>
        )}
      </div>
    </div>
  );
}