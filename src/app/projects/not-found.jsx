"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProjectNotFound() {
  const { slug } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>

      <p className="text-muted-foreground mb-6">
        No project exists with the name: <span className="font-semibold">{slug}</span>
      </p>

      <Button asChild>
        <Link href="/projects">Back to Projects</Link>
      </Button>
    </div>
  );
}
