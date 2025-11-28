import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/sonner";
// 1. Import the Auth0 provider
import { UserProvider } from "@auth0/nextjs-auth0/client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Armiya Tavakoli -- Portfolio",
  description: "Full Stack web developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 2. Wrap the body (or the content inside) with UserProvider */}
      <UserProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        >
          {/* Navbar stays on all pages */}
          <NavBar />

          {/* Page content */}
          <main className="max-w-5xl mx-auto w-full px-4 py-6 flex-1">
            {children}
          </main>

          {/* Toast notifications */}
          <Toaster />
        </body>
      </UserProvider>
    </html>
  );
}