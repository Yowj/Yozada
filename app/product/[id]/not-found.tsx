import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function ProductNotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
          <h1 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
            Product Not Found
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Sorry, we couldn&apos;t find the product you&apos;re looking for. It might be moved or deleted.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/">Browse Products</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
