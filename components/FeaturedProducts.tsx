import Link from "next/link";
import Image from "next/image";
import { Card } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Product } from "@/lib/types";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) return null;

  const mainProduct = products[0];
  const sideProducts = products.slice(1, 3);

  return (
    <section className="w-full px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header with subtle underline */}
        <div className="mb-12 flex items-end justify-between">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Featured Collection
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
            <p className="text-base text-muted-foreground md:text-lg">
              Curated picks for this season
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex group">
            <Link href="/shop" className="gap-2">
              Explore More
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Asymmetric Grid Layout */}
        <div className="grid gap-6 md:grid-cols-12 lg:gap-8">
          {/* Main Featured Product */}
          <Link
            href={`/product/${mainProduct.id}`}
            className="group relative overflow-hidden rounded-3xl md:col-span-7 lg:col-span-8"
          >
            <Card className="h-full border-0 shadow-lg transition-shadow hover:shadow-2xl">
              <div className="relative h-[450px] md:h-[600px] overflow-hidden">
                <div className="relative h-full w-full transition-transform duration-700 ease-out group-hover:scale-110">
                  <Image
                    src={mainProduct.image}
                    alt={mainProduct.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 58vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                {mainProduct.badge && (
                  <Badge className="absolute left-6 top-6 z-10 border-0 bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                    {mainProduct.badge}
                  </Badge>
                )}

                <div className="absolute bottom-0 left-0 right-0 z-10 p-8 md:p-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-2 text-sm text-white/90">(128)</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                      {mainProduct.name}
                    </h3>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all group-hover:gap-3 group-hover:bg-white/90">
                      Shop Now
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>

          {/* Side Products */}
          <div className="space-y-6 md:col-span-5 lg:col-span-4 lg:space-y-8">
            {sideProducts.map((product, index) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group relative block overflow-hidden rounded-2xl"
              >
                <Card className="border-0 shadow-md transition-all hover:shadow-xl">
                  <div className="relative h-[220px] md:h-[285px] overflow-hidden">
                    {/* Image container with gradient - both scale together */}
                    <div className="relative h-full w-full transition-transform duration-500 ease-out group-hover:scale-105">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 42vw, 33vw"
                      />
                      {/* Gradient scales with image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    {/* Badge - stays in place */}
                    {product.badge && (
                      <Badge className="absolute right-4 top-4 z-10 border-0 bg-white/20 backdrop-blur-md text-white">
                        {product.badge}
                      </Badge>
                    )}

                    {/* Content - stays in place */}
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
                      <h3 className="mb-2 text-lg font-bold text-white group-hover:underline">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-white">${product.price}</span>
                        <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all group-hover:bg-white/30">
                          <ArrowRight className="h-4 w-4 text-white transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Button variant="outline" size="lg" asChild className="group w-full max-w-xs">
            <Link href="/shop" className="gap-2">
              View All Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
