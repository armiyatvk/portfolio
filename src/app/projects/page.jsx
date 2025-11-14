import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { createSlug } from "@/lib/utils";

export default async function ProjectsPage() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/projects`, { cache: "no-store" });
  const { projects } = await res.json();

  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <Button asChild>
        <Link href="/projects/new">New Project</Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p) => {
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
                  <Link href={`/projects/${slug}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
