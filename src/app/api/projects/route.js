export async function GET() {
  const projects = [
    {
      title: "Conway's Game of Life",
      description: "A cellular automaton simulation.",
      image: "/profile.jpg",
      link: "https://example.com/game",
      keywords: ["simulation", "automata"],
    },
    {
      title: "Weather App",
      description: "Simple weather dashboard.",
      image: "/profile.jpg",
      link: "https://example.com/weather",
      keywords: ["api", "weather"],
    },
  ];

  return Response.json({ projects });
}
