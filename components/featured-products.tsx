"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Product } from "@/lib/types";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) return null;

  const mainProduct = products[0];
  const sideProducts = products.slice(1, 3);

  return (
    <section className="relative w-full px-4 py-16 md:py-20">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-60 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-60 top-1/3 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-primary" />
              Handpicked for You
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Featured Products
            </h2>
          </div>
          <Button variant="outline" asChild className="hidden rounded-full px-6 sm:flex">
            <Link href="/products" className="group">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Products grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
          {/* Main Featured Product */}
          <Link
            href={`/product/${mainProduct.id}`}
            className="group relative animate-[scale-in_0.6s_ease-out] overflow-hidden rounded-3xl opacity-0 [animation-fill-mode:forwards] md:row-span-2"
          >
            <Card className="h-full border-0 bg-transparent">
              <div className="relative h-[450px] overflow-hidden rounded-3xl md:h-full md:min-h-[600px]">
                <Image
                  src={mainProduct.image}
                  alt={mainProduct.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  priority
                />

                {/* Multi-layer gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-40" />

                {/* Badge */}
                {mainProduct.badge && (
                  <Badge className="absolute left-6 top-6 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-primary shadow-lg backdrop-blur-sm">
                    {mainProduct.badge}
                  </Badge>
                )}

                {/* Floating decorative elements */}
                <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20">
                  <ArrowUpRight className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-45" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                    <p className="mb-2 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-white/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                      Featured Collection
                    </p>
                    <h3 className="mb-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                      {mainProduct.name}
                    </h3>
                    <div className="flex items-center gap-4">
                      <p className="text-2xl font-bold text-white md:text-3xl">
                        ${mainProduct.price}
                      </p>
                      <div className="h-6 w-px bg-white/30" />
                      <span className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-500 group-hover:bg-white group-hover:text-primary">
                        Shop Now
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Border effect */}
                <div className="absolute inset-0 rounded-3xl border border-white/10 transition-colors duration-500 group-hover:border-white/20" />
              </div>
            </Card>
          </Link>

          {/* Side Products */}
          {sideProducts.map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group relative animate-[slide-up_0.6s_ease-out] overflow-hidden rounded-3xl opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <Card className="h-full border-0 bg-transparent">
                <div className="relative h-[280px] overflow-hidden rounded-3xl md:h-[290px]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-40" />

                  {/* Badge */}
                  {product.badge && (
                    <Badge className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-primary shadow-lg backdrop-blur-sm">
                      {product.badge}
                    </Badge>
                  )}

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <div className="translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
                      <h3 className="mb-2 text-xl font-bold text-white md:text-2xl">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-white/90 md:text-xl">
                          ${product.price}
                        </p>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-primary">
                          <ArrowUpRight className="h-4 w-4 text-white transition-colors group-hover:text-primary" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Border effect */}
                  <div className="absolute inset-0 rounded-3xl border border-white/10 transition-colors duration-500 group-hover:border-white/20" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Button variant="outline" asChild className="rounded-full px-8">
            <Link href="/products" className="group">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
