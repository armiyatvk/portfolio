"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client"; // 1. Import Auth0 hook
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
  const { user, isLoading } = useUser(); // 2. Get user session state

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold">
          Armiya.dev
        </Link>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden p-2 border rounded"
          onClick={() => setOpen(!open)}
        >
          ☰
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
                <NavigationMenuLink asChild>
                  <Link href="/contact">Contact Me</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* 3. Conditional Dashboard Link (Only if logged in) */}
              {user && (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/dashboard" className="font-semibold text-blue-600">
                      Dashboard
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}

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

              {/* 4. Dynamic Login/Logout Button */}
              {!isLoading && (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    {user ? (
                      <a href="/api/auth/logout" className="text-red-500">
                        Logout
                      </a>
                    ) : (
                      <a href="/api/auth/login">Login</a>
                    )}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}

            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <nav className="md:hidden flex flex-col gap-3 p-4 bg-white border-t">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/projects" onClick={() => setOpen(false)}>Projects</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>

          {/* Mobile Dashboard Link */}
          {user && (
             <Link 
               href="/dashboard" 
               onClick={() => setOpen(false)}
               className="font-semibold text-blue-600"
             >
               Dashboard
             </Link>
          )}

          <details className="cursor-pointer">
            <summary className="py-2">Resume</summary>
            <div className="pl-4 flex flex-col gap-2">
              <Link href="/resume/pdf" onClick={() => setOpen(false)}>PDF</Link>
              <Link href="/resume/latex" onClick={() => setOpen(false)}>LaTeX</Link>
            </div>
          </details>

          {/* Mobile Login/Logout */}
          {!isLoading && (
             user ? (
               <a href="/api/auth/logout" className="text-red-500 py-2">Logout</a>
             ) : (
               <a href="/api/auth/login" className="py-2">Login</a>
             )
          )}
        </nav>
      )}
    </header>
  );
}