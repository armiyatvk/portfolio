import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4">404 – Page Not Found</h1>

      <p className="text-muted-foreground mb-6">
        Sorry, this page does not exist or has been moved.
      </p>

      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}

