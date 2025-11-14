import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createSlug } from "@/lib/utils";

export default async function ProjectPreview({ count = 3 }) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/projects`, { cache: "no-store" });
  const { projects } = await res.json();

  // Only show a few projects on homepage
  const previewProjects = projects.slice(0, count);

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {previewProjects.map((p) => {
        const slug = createSlug(p.title);
        return (
          <Card key={slug} className="h-full flex flex-col">
            <CardHeader>
              <h2 className="text-xl font-semibold">{p.title}</h2>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 flex-1">
              <Image
                src={p.image}
                alt={p.title}
                width={300}
                height={200}
                className="rounded"
              />

              <p className="text-gray-600 flex-1">{p.description}</p>

              <Button asChild>
                <Link href={`/projects/${slug}`}>View Project</Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
