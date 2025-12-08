import Hero from "@/components/Hero";
import ProjectPreview from "@/components/ProjectPreview";
import GitHubCalendar from "@/components/github-calendar";
import { fetchProjects } from "@/lib/db"; // 1. Import the DB helper

export const revalidate = 0; // Disable caching for this page
// 2. Add 'async' here so we can wait for the database
export default async function HomePage() {
  
  // 3. Fetch the real data from your Neon database
  // Default to empty array [] if something fails so the app doesn't crash
  const projects = (await fetchProjects()) || [];

  return (
    <main className="flex flex-col">
      {/* NavBar is already in layout.js, so you don't need it here */}
      <Hero />
      
      {/* 4. Pass the fetched data to the component */}
      <ProjectPreview projects={projects} count={3} />
      
      <GitHubCalendar username="armiyatvk" />
    </main>
  );
}