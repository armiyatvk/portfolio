"use client";

import { useState } from "react";
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
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold">
          Armiya.dev
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 border rounded"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? "✕" : "☰"}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu viewport={false}>
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
                <NavigationMenuContent className="p-2 flex flex-col bg-white border rounded-md shadow">
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

      {/* MOBILE MENU */}
      {open && (
        <nav className="md:hidden flex flex-col gap-4 p-4 bg-white border-t animate-fadeIn">
          
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link href="/projects" onClick={() => setOpen(false)}>
            Projects
          </Link>

          <details className="cursor-pointer">
            <summary className="py-2">Resume</summary>
            <div className="pl-4 flex flex-col gap-2">
              <Link href="/resume/pdf" onClick={() => setOpen(false)}>
                PDF
              </Link>
              <Link href="/resume/latex" onClick={() => setOpen(false)}>
                LaTeX
              </Link>
            </div>
          </details>

          <Link href="/login" onClick={() => setOpen(false)}>
            Login
          </Link>
        </nav>
      )}
    </header>
  );
}
