import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createSlug } from "@/lib/utils";

export default async function ProjectDetailPage({ params }) {

  // FIX: Next.js 16 - params is now a Promise-like object
  const { slug } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/projects`, { cache: "no-store" });
  const { projects } = await res.json();

  const project = projects.find(
    (p) => createSlug(p.title) === slug
  );

  if (!project) return notFound();

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

      <Image
        src={project.image}
        alt={project.title}
        width={600}
        height={400}
        className="rounded-lg mb-6"
      />

      <p className="text-lg text-gray-700 mb-6">
        {project.description}
      </p>

      <div className="flex gap-2 mb-6">
        {project.keywords?.map((kw) => (
          <Badge key={kw} variant="secondary">
            {kw}
          </Badge>
        ))}
      </div>

      <Button asChild>
        <a href={project.link} target="_blank">Open Project</a>
      </Button>
    </div>
  );
}
