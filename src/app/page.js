// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuIndicator,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   NavigationMenuViewport,
// } from "@/components/ui/navigation-menu";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
//       <nav className="w-full sticky top-0 bg-white border-b py-3 px-4">
//         <NavigationMenu viewport={false}>
//           <NavigationMenuList className="flex gap-4">

//             {/* HOME */}
//             <NavigationMenuItem>
//               <NavigationMenuLink asChild>
//                 <Link href="/">Home</Link>
//               </NavigationMenuLink>
//             </NavigationMenuItem>

//             {/* PROJECTS */}
//             <NavigationMenuItem>
//               <NavigationMenuLink asChild>
//                 <Link href="/projects">Projects</Link>
//               </NavigationMenuLink>
//             </NavigationMenuItem>

//             {/* RESUME DROPDOWN */}
//             <NavigationMenuItem>
//               <NavigationMenuTrigger>Resume</NavigationMenuTrigger>
//               <NavigationMenuContent className="p-2 flex flex-col gap-1 bg-white border rounded-md shadow">
//                 <NavigationMenuLink asChild>
//                   <a href="#">PDF</a>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink asChild>
//                   <a href="#">LaTeX</a>
//                 </NavigationMenuLink>
//               </NavigationMenuContent>
//             </NavigationMenuItem>

//             {/* LOGIN */}
//             <NavigationMenuItem>
//               <NavigationMenuLink asChild>
//                 <Link href="/login">Login</Link>
//               </NavigationMenuLink>
//             </NavigationMenuItem>

//           </NavigationMenuList>
//         </NavigationMenu>
//       </nav>

//       {/* Page Content Here */}
//       <div className="p-10 text-center text-xl text-gray-700">
//         Your homepage content...
//       </div>
//     </div>
//   );
// }

import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import ProjectPreview from "@/components/ProjectPreview";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* <NavBar /> */}
      <Hero />
      <ProjectPreview count={3} />
    </main>
  );
}

