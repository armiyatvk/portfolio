"use client";

import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import HeroEditorForm from "@/components/hero-editor-form";

export default function DashboardPage() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/api/auth/login"); // Standard Auth0 login route
    }
  }, [isLoading, user, router]);

  if (isLoading) return <div className="p-8">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-red-500">{error.message}</div>;

  return (
    user && (
      <div className="flex flex-col min-h-screen items-center bg-zinc-50 dark:bg-black py-10">
        <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
        <div className="w-full max-w-3xl px-4">
           <div className="mb-6">
             <p className="text-lg text-gray-600 dark:text-gray-300">
               Welcome back, <span className="font-bold text-black dark:text-white">{user.name}</span>.
             </p>
           </div>
           
           <h2 className="text-2xl font-semibold mb-4">Edit Hero Section</h2>
           <HeroEditorForm />
        </div>
      </div>
    )
  );
}