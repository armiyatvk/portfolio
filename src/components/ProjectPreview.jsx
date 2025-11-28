import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";

// 1. Destructure 'projects' from props and give it a default value of []
export default function ProjectPreview({ projects = [], count = 3 }) {
  
  // 2. Now slice works safely because 'projects' is guaranteed to be an array
  const previewProjects = projects.slice(0, count);

  return (
    <section className="max-w-5xl mx-auto w-full px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Recent Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {previewProjects.map((p) => (
          <Card key={p.id} className="h-full flex flex-col">
            <CardHeader>
              <h3 className="text-xl font-semibold">{p.title}</h3>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1">
               {/* Use a relative container for Image to prevent layout shift */}
               <div className="relative w-full h-48">
                  <Image 
                    src={p.image || "https://placehold.co/600x400"} 
                    alt={p.title} 
                    fill 
                    className="object-cover rounded" 
                  />
               </div>
               <p className="line-clamp-3 text-gray-600">{p.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button asChild>
          <Link href="/projects">View All Projects</Link>
        </Button>
      </div>
    </section>
  );
}