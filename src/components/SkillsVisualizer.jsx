// components/SkillsVisualizer.js
"use client"; 

import React from 'react';

export default function SkillsVisualizer() {
  
  // 1. STATIC DATA (No Database needed!)
  const skills = [
    // Frontend
    { name: "React", category: "Frontend", level: "Expert" },
    { name: "Next.js", category: "Frontend", level: "Intermediate" },
    { name: "Tailwind CSS", category: "Frontend", level: "Expert" },
    { name: "HTML/CSS", category: "Frontend", level: "Expert" },
    // Backend
    { name: "Node.js", category: "Backend", level: "Intermediate" },
    { name: "Express", category: "Backend", level: "Intermediate" },
    { name: "MongoDB", category: "Backend", level: "Beginner" },
    // DevOps / Tools
    { name: "Git & GitHub", category: "DevOps", level: "Expert" },
    { name: "Vercel", category: "DevOps", level: "Intermediate" },
    { name: "Docker", category: "DevOps", level: "Beginner" },
  ];

  // 2. HELPER: Get color based on experience level
  // Requirements: Beginner (Light Blue), Intermediate (Medium Blue), Expert (Dark Blue)
  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-blue-200 text-blue-800 border-blue-300"; // Light Blue
      case "Intermediate":
        return "bg-blue-500 text-white border-blue-600"; // Medium Blue
      case "Expert":
        return "bg-blue-900 text-white border-blue-950"; // Dark Blue
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  // Categories to display
  const categories = ["Frontend", "Backend", "DevOps"];

  return (
    <section className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">Tech Stack & Skills</h2>
      <p className="text-gray-600 mb-8">
        Visualizing my experience level across different technologies.
      </p>

      {/* Legend / Key */}
      <div className="flex gap-4 mb-8 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-200 rounded"></span> Beginner
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-500 rounded"></span> Intermediate
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-900 rounded"></span> Expert
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div key={cat} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4 border-b pb-2">{cat}</h3>
            <div className="flex flex-wrap gap-2">
              {skills
                .filter((skill) => skill.category === cat)
                .map((skill) => (
                  <div
                    key={skill.name}
                    className={`px-3 py-1 rounded-full text-sm font-medium border shadow-sm transition-transform hover:scale-105 cursor-default ${getLevelColor(
                      skill.level
                    )}`}
                    title={`${skill.name}: ${skill.level}`}
                  >
                    {skill.name}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}