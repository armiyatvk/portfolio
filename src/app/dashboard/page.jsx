import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth0.getSession();
  
  // Protect the route
  if (!session?.user) redirect("/api/auth/login");

  return (
    <section className="min-h-screen flex flex-col items-center gap-3 pt-20">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <p className="text-muted-foreground">Welcome, {session.user.email}</p>
      <div className="border p-4 rounded-md mt-4">
        <p>You are successfully logged in.</p>
      </div>
    </section>
  );
}