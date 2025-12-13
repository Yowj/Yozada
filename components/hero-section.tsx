import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Product } from "@/lib/types";

interface HeroSectionProps {
  featuredProduct: Product;
}

export function HeroSection({ featuredProduct }: HeroSectionProps) {
  return (
    <section className="w-full px-4 py-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* Text Content */}
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <Badge variant="secondary" className="mb-4 w-fit">
              New Collection 2024
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Discover Premium
              <span className="block text-primary">Products</span>
            </h1>
            <p className="mb-8 max-w-lg text-lg text-muted-foreground">
              Explore our curated collection of high-quality products designed for modern living.
              Elevate your everyday with exceptional craftsmanship.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild className="group">
                <Link href="/products">
                  Shop Collection
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
            {/* Stats */}
            <div className="mt-12 flex gap-8 border-t pt-8">
              <div>
                <p className="text-3xl font-bold">10K+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold">4.9</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Featured Product Image */}
          <div className="order-1 lg:order-2">
            <Link
              href={`/product/${featuredProduct.id}`}
              className="group relative block overflow-hidden rounded-2xl bg-muted"
            >
              <div className="relative aspect-square md:aspect-[4/5]">
                <Image
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                {featuredProduct.badge && (
                  <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground">
                    {featuredProduct.badge}
                  </Badge>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="text-lg font-semibold text-white">{featuredProduct.name}</p>
                <p className="text-white/90">${featuredProduct.price}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
