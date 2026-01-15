"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Electronics",
    href: "/category/electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop",
    description: "Latest gadgets & tech",
    itemCount: "120+ items",
    accent: "from-blue-600/80 to-indigo-600/80",
  },
  {
    name: "Clothing",
    href: "/category/clothing",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    description: "Trendy fashion essentials",
    itemCount: "250+ items",
    accent: "from-rose-600/80 to-pink-600/80",
  },
  {
    name: "Home & Garden",
    href: "/category/home-garden",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    description: "Elevate your living space",
    itemCount: "180+ items",
    accent: "from-emerald-600/80 to-teal-600/80",
  },
];

export function CategoryShowcase() {
  return (
    <section className="relative w-full px-4 py-16 md:py-20">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,0,0,0.03),transparent)]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Browse Categories
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/categories"
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View all categories
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Categories grid */}
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative animate-[scale-in_0.6s_ease-out] overflow-hidden rounded-3xl opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image container */}
              <div className="relative aspect-[4/5] overflow-hidden md:aspect-[3/4]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                />

                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-500" />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.accent} opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-60`}
                />

                {/* Corner accent */}
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/10 blur-3xl transition-all duration-700 group-hover:scale-150" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                  {/* Top section - Item count */}
                  <div className="flex justify-end">
                    <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20">
                      {category.itemCount}
                    </span>
                  </div>

                  {/* Bottom section - Title and CTA */}
                  <div className="space-y-4">
                    <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                      <p className="mb-2 text-sm font-medium text-white/70">
                        {category.description}
                      </p>
                      <h3 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                        {category.name}
                      </h3>
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary opacity-0 transition-all duration-500 group-hover:opacity-100">
                        Explore
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                      <div className="h-px flex-1 bg-white/20 transition-all duration-500 group-hover:bg-white/40" />
                    </div>
                  </div>
                </div>

                {/* Border glow effect */}
                <div className="absolute inset-0 rounded-3xl border border-white/10 transition-all duration-500 group-hover:border-white/20" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom decorative text */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          <p className="text-sm text-muted-foreground">
            Discover more across <span className="font-semibold text-foreground">15+ categories</span>
          </p>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </div>
    </section>
  );
}
