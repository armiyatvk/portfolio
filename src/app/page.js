import Hero from "@/components/Hero";
import ProjectPreview from "@/components/ProjectPreview";
import SkillsVisualizer from "@/components/SkillsVisualizer";
import GitHubCalendar from "@/components/github-calendar";
import { fetchProjects, getHero } from "@/lib/db"; // 1. Import getHero

export const revalidate = 0; 

export default async function HomePage() {
  
  // 2. Fetch BOTH pieces of data in parallel
  // We use Promise.all to fetch them at the same time so it's faster
  const [projects, heroData] = await Promise.all([
    fetchProjects(),
    getHero()
  ]);

  // 3. Fallback defaults for Hero if DB is empty (First time run)
  const hero = heroData || {
    fullName: "Your Name",
    shortDescription: "Web Developer",
    longDescription: "Welcome to my portfolio.",
    avatar: "", 
  };

  return (
    <main className="flex flex-col">
      {/* 4. Pass the fetched data into the Hero component */}
      <Hero data={hero} />
      
      <ProjectPreview projects={projects || []} count={3} />
      
      <GitHubCalendar username="armiyatvk" />

      <SkillsVisualizer />
    </main>
  );
}