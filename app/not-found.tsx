import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clock } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-60">
        <div className="text-center">
          <Clock className="mx-auto h-16 w-16 text-muted-foreground" />
          <h1 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">Coming Soon!</h1>
          <p className="mt-4 text-lg text-muted-foreground">This page is under construction or does not exist.</p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
