import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { getProducts } from "@/lib/queries";
import { ProductCard } from "@/components/product-card";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <AnnouncementBar />
      <main className="min-h-screen flex flex-col">
        <Navbar />

        <div className="flex-1">
          {/* Page Header */}
          <div className="border-b bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
              {/* Breadcrumb */}
              <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-foreground">All Products</span>
              </nav>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">All Products</h1>
              <p className="mt-2 text-muted-foreground">
                Explore our complete collection of premium products
              </p>
            </div>
          </div>

          {/* Products Section */}
          <div className="mx-auto max-w-7xl px-4 py-8">
            {/* Filters Bar */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input type="search" placeholder="Search products..." className="pl-10" />
                </div>
                <Button variant="outline" size="icon" className="shrink-0">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Showing {products.length} products</p>
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-xl font-semibold">No products found</p>
                <p className="mt-2 text-muted-foreground">Check back later for new arrivals</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
