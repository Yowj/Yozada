import { Product } from "@/lib/types";
import { Button } from "@/ui/button";
import Link from "next/link";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import { ProductCard } from "./product-card";

export default function Collection({ products }: { products: Product[] }) {
  return (
    <section className="w-full bg-muted/30 px-4 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Our Collection
            </span>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Shop Our Collection
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Discover quality products for every need, curated for modern living
            </p>
          </div>
          <Button variant="outline" asChild className="hidden gap-2 sm:flex group">
            <Link href="/shop">
              View All
              <ArrowRightCircle className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {products.slice(0, 8).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Button variant="outline" asChild className="gap-2">
            <Link href="/shop">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
