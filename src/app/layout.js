import { Inter } from "next/font/google"; // Switch to Inter
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@auth0/nextjs-auth0/client";

// Configure Inter
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Armiya Tavakoli -- Portfolio",
  description: "Full Stack web developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        {/* Use inter.className here */}
        <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
          <NavBar />
          <main className="max-w-5xl mx-auto w-full px-4 py-6 flex-1">
            {children}
          </main>
          <Toaster />
        </body>
      </UserProvider>
    </html>
  );
}