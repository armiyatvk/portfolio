"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export default function ProjectCard({ project }) {
  const { user } = useUser(); // Check if user is logged in
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const res = await fetch(`/api/projects/${project.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // Force a refresh so the deleted item disappears
      router.refresh(); 
      // Note: With SWR you might also want to call mutate(), but router.refresh works for this lab
    } else {
      alert("Failed to delete project");
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <h2 className="text-xl font-semibold">{project.title}</h2>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        {/* Handle image fallback if your DB has no image yet */}
        <div className="relative w-full h-48">
             <Image
              src={project.image || "https://placehold.co/600x400"}
              alt={project.title}
              fill
              className="rounded object-cover"
            />
        </div>

        <p className="text-gray-600 flex-1 line-clamp-3">{project.description}</p>
      </CardContent>

      <CardFooter className="flex gap-2 justify-between">
        <Button asChild variant="outline">
          <Link href={`/projects/${project.id}`}>Details</Link>
        </Button>

        {/* Only show Edit/Delete if logged in */}
        {user && (
          <div className="flex gap-2">
            <Button asChild variant="secondary">
              <Link href={`/projects/${project.id}/edit`}>Edit</Link>
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}