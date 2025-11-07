"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

export default function NavBar() {
  return (
    <div className="w-full sticky top-0 z-50 bg-white border-b">
      <div className="max-w-5xl mx-auto p-4">
        <NavigationMenu viewport={false} disableHoverTrigger>
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/projects">Projects</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
            <NavigationMenuTrigger>Resume</NavigationMenuTrigger>
            <NavigationMenuContent className="p-2 flex flex-col gap-1 bg-white border rounded-md shadow">
                <NavigationMenuLink asChild>
                <Link href="/resume/pdf">PDF</Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                <Link href="/resume/latex">LaTeX</Link>
                </NavigationMenuLink>
            </NavigationMenuContent>
            </NavigationMenuItem>


            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/login">Login</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
