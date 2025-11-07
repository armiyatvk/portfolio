import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function Hero() {
  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <Card className="p-6">
        <CardContent className="flex flex-col md:flex-row items-center gap-6">
          <Image
            src="/profile.avif"
            alt="Profile"
            width={180}
            height={180}
            className="rounded-xl"
          />

          <div>
            <h1 className="text-4xl font-bold">Armiya</h1>
            <p className="text-gray-600 mt-2">
              I’m Armiya, a full-stack web developer who loves turning ideas into real, working products. I build clean, modern web apps using React, Next.js, and JavaScript, and I’m passionate about creating experiences that feel smooth, intuitive, and purposeful. Whether it’s a multiplayer game, a mobile app, or a full portfolio website, I enjoy solving problems, learning fast, and pushing myself to build things that actually matter.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
