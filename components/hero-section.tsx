"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import { Product } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface HeroSectionProps {
  featuredProducts: Product[];
}

export function HeroSection({ featuredProducts }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden px-4 py-8 md:py-12">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-5 lg:items-center lg:gap-12">
          {/* Text Content */}
          <div className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-2">
            {/* Animated badge */}
            <div className="mb-6 animate-[slide-down_0.6s_ease-out] opacity-0 [animation-fill-mode:forwards]">
              <Badge
                variant="secondary"
                className="group inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm font-medium backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-primary/10"
              >
                <Sparkles className="h-3.5 w-3.5 animate-[pulse-soft_3s_ease-in-out_infinite] text-primary" />
                <span>New Collection 2025</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Badge>
            </div>

            {/* Kinetic Typography */}
            <div className="mb-6 overflow-hidden">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl xl:text-7xl">
                <span className="block animate-[slide-up_0.6s_ease-out_0.1s] opacity-0 [animation-fill-mode:forwards]">
                  Discover
                </span>
                <span className="block animate-[slide-up_0.6s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
                  Premium
                </span>
                <span className="relative block animate-[slide-up_0.6s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
                  <span className="relative inline-block">
                    Products
                    <svg
                      className="absolute -bottom-2 left-0 w-full animate-[fade-in_0.6s_ease-out_0.8s] opacity-0 [animation-fill-mode:forwards]"
                      viewBox="0 0 200 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 8.5C50 2.5 150 2.5 198 8.5"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="text-primary/40"
                      />
                    </svg>
                  </span>
                </span>
              </h1>
            </div>

            <p className="mb-8 max-w-lg animate-[fade-in_0.6s_ease-out_0.4s] text-lg text-muted-foreground opacity-0 [animation-fill-mode:forwards] md:text-xl">
              Explore our curated collection of high-quality products designed for modern living.
            </p>

            {/* CTA Buttons with hover effects */}
            <div className="flex animate-[slide-up_0.6s_ease-out_0.5s] flex-col gap-4 opacity-0 [animation-fill-mode:forwards] sm:flex-row">
              <Button
                size="lg"
                asChild
                className="group relative overflow-hidden rounded-full px-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              >
                <Link href="/products">
                  <span className="relative z-10 flex items-center">
                    Shop Collection
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="rounded-full px-8 transition-all duration-300 hover:bg-primary/5"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

            {/* Stats with glass morphism */}
            <div className="mt-12 animate-[fade-in_0.6s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
              <div className="inline-flex gap-1 rounded-2xl border border-primary/10 bg-muted/50 p-1 backdrop-blur-sm">
                <div className="group rounded-xl px-6 py-4 transition-all hover:bg-background/80">
                  <p className="text-2xl font-bold tracking-tight transition-transform group-hover:scale-105 md:text-3xl">
                    10K+
                  </p>
                  <p className="text-xs text-muted-foreground md:text-sm">Happy Customers</p>
                </div>
                <div className="group rounded-xl px-6 py-4 transition-all hover:bg-background/80">
                  <p className="text-2xl font-bold tracking-tight transition-transform group-hover:scale-105 md:text-3xl">
                    500+
                  </p>
                  <p className="text-xs text-muted-foreground md:text-sm">Products</p>
                </div>
                <div className="group rounded-xl px-6 py-4 transition-all hover:bg-background/80">
                  <p className="text-2xl font-bold tracking-tight transition-transform group-hover:scale-105 md:text-3xl">
                    4.9
                  </p>
                  <p className="text-xs text-muted-foreground md:text-sm">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Products Carousel */}
          <div className="order-1 animate-[scale-in_0.8s_ease-out] opacity-0 [animation-fill-mode:forwards] lg:order-2 lg:col-span-3">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnInteraction: true,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {featuredProducts.map((product, index) => (
                  <CarouselItem key={product.id}>
                    <Link
                      href={`/product/${product.id}`}
                      className="group relative block overflow-hidden rounded-3xl bg-muted"
                    >
                      <div className="relative aspect-square md:aspect-[4/5]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105"
                          priority={index === 0}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

                        {/* Badge */}
                        {product.badge && (
                          <Badge className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-1.5 text-sm font-medium text-primary shadow-lg backdrop-blur-sm">
                            {product.badge}
                          </Badge>
                        )}

                        {/* Product info with glass effect */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                          <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-white/70">
                              Featured
                            </p>
                            <p className="mb-1 text-2xl font-bold text-white md:text-3xl">
                              {product.name}
                            </p>
                            <div className="flex items-center justify-between">
                              <p className="text-xl font-semibold text-white/90 md:text-2xl">
                                ${product.price}
                              </p>
                              <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all group-hover:bg-white group-hover:text-primary">
                                View Product
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 h-12 w-12 rounded-full border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-primary" />
              <CarouselNext className="right-4 h-12 w-12 rounded-full border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-primary" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
