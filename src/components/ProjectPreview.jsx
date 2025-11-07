import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ProjectPreview({ count = 3 }) {
  const projects = [
    {
      title: "Project One",
      desc: "Short description of project one.",
      img: "https://placehold.co/300x200.png",
      link: "#",
    },
    {
      title: "Project Two",
      desc: "Short description of project two.",
     img: "https://placehold.co/300x200.png",
      link: "#",
    },
    {
      title: "Project Three",
      desc: "Short description of project three.",
      img: "https://placehold.co/300x200.png",
      link: "#",
    },
  ].slice(0, count);

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {projects.map((p, i) => (
        <Card key={i} className="h-full flex flex-col">
          <CardHeader>
            <h2 className="text-xl font-semibold">{p.title}</h2>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 flex-1">
            <Image
              src={p.img}
              alt={p.title}
              width={300}
              height={200}
              className="rounded"
            />
            <p className="text-gray-600 flex-1">{p.desc}</p>

            <Button asChild>
              <a href={p.link}>View Project</a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
