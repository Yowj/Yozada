"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FadeIn, Stagger, StaggerItem } from "@/ui/motion";

const collections = [
  {
    name: "Electronics",
    slug: "electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop",
    description: "Discover the latest gadgets and tech essentials for modern living",
    itemCount: "120+ items",
    color: "from-blue-500/20 to-purple-500/20",
    gradient: "from-blue-600 to-purple-600",
    featured: true,
  },
  {
    name: "Clothing",
    slug: "clothing",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    description: "Trendy fashion essentials curated for every style and occasion",
    itemCount: "250+ items",
    color: "from-pink-500/20 to-rose-500/20",
    gradient: "from-pink-600 to-rose-600",
    featured: true,
  },
  {
    name: "Home & Garden",
    slug: "home-garden",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
    description: "Elevate your living space with premium home décor and garden accessories",
    itemCount: "180+ items",
    color: "from-green-500/20 to-emerald-500/20",
    gradient: "from-green-600 to-emerald-600",
    featured: true,
  },
  {
    name: "New Arrivals",
    slug: "new-arrivals",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop",
    description: "Be the first to shop our latest products and trending items",
    itemCount: "50+ items",
    color: "from-amber-500/20 to-orange-500/20",
    gradient: "from-amber-600 to-orange-600",
    featured: false,
  },
  {
    name: "Best Sellers",
    slug: "best-sellers",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
    description: "Shop our most popular products loved by thousands of customers",
    itemCount: "100+ items",
    color: "from-violet-500/20 to-indigo-500/20",
    gradient: "from-violet-600 to-indigo-600",
    featured: false,
  },
  {
    name: "Sale",
    slug: "sale",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&h=600&fit=crop",
    description: "Incredible deals and discounts on premium quality products",
    itemCount: "80+ items",
    color: "from-red-500/20 to-pink-500/20",
    gradient: "from-red-600 to-pink-600",
    featured: false,
  },
];

function CollectionCard({ collection, index, size = "default" }: {
  collection: typeof collections[0];
  index: number;
  size?: "default" | "large";
}) {
  const [isHovered, setIsHovered] = useState(false);

  const isLarge = size === "large";

  return (
    <StaggerItem>
      <Link
        href={`/collections/${collection.slug}`}
        className={`group relative block overflow-hidden rounded-2xl ${isLarge ? "md:col-span-2 md:row-span-2" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`relative overflow-hidden ${isLarge ? "aspect-square md:aspect-[16/9]" : "aspect-[4/3]"}`}>
          {/* Background image with parallax-like zoom */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <Image
              src={collection.image}
              alt={collection.name}
              fill
              className="object-cover"
              sizes={isLarge ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            />
          </motion.div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Animated color gradient overlay on hover */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${collection.color} mix-blend-overlay`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Animated border effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-white/0"
            animate={{
              borderColor: isHovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0)",
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          {/* Item count badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="mb-3"
          >
            <span className={`inline-block rounded-full bg-gradient-to-r ${collection.gradient} px-3 py-1 text-xs font-medium shadow-lg`}>
              {collection.itemCount}
            </span>
          </motion.div>

          {/* Title with animated underline */}
          <div className="relative mb-1 inline-block">
            <motion.h3
              className={`font-bold ${isLarge ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}
              animate={{ x: isHovered ? 8 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {collection.name}
            </motion.h3>
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-white"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "100%" : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <motion.p
            className={`mb-4 text-white/80 ${isLarge ? "text-sm md:text-base max-w-md" : "text-sm"}`}
            animate={{ opacity: isHovered ? 1 : 0.8 }}
          >
            {collection.description}
          </motion.p>

          {/* CTA with animated arrow */}
          <motion.div
            className="flex items-center gap-2"
            animate={{ x: isHovered ? 8 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm font-medium">Explore Collection</span>
            <motion.div
              animate={{
                x: isHovered ? 4 : 0,
                y: isHovered ? -4 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.div>
          </motion.div>
        </div>

        {/* Hover reveal: floating action button */}
        <motion.div
          className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg"
          initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.5,
            rotate: isHovered ? 0 : -45,
          }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        >
          <ArrowRight className="h-5 w-5" />
        </motion.div>
      </Link>
    </StaggerItem>
  );
}

export default function CollectionsPage() {
  const featuredCollections = collections.filter(c => c.featured);
  const otherCollections = collections.filter(c => !c.featured);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        {/* Page Header */}
        <div className="relative overflow-hidden border-b bg-gradient-to-br from-background via-muted/30 to-background">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-20">
            {/* Breadcrumb */}
            <FadeIn direction="up" delay={0}>
              <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-foreground">Collections</span>
              </nav>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Curated Collections
                </span>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Explore Our Collections
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                Discover thoughtfully curated collections designed for every style, need, and occasion.
                Find exactly what you&apos;re looking for.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Featured Collections */}
        <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <FadeIn direction="up" className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Featured Collections</h2>
            <p className="mt-2 text-muted-foreground">Our most popular categories</p>
          </FadeIn>

          <Stagger className="grid gap-4 md:grid-cols-3 md:gap-6" staggerDelay={0.15}>
            {featuredCollections.map((collection, index) => (
              <CollectionCard key={collection.slug} collection={collection} index={index} />
            ))}
          </Stagger>
        </section>

        {/* Other Collections */}
        <section className="mx-auto max-w-7xl px-4 pb-16 md:pb-20">
          <FadeIn direction="up" className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">More Collections</h2>
            <p className="mt-2 text-muted-foreground">Explore more ways to shop</p>
          </FadeIn>

          <Stagger className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6" staggerDelay={0.15}>
            {otherCollections.map((collection, index) => (
              <CollectionCard key={collection.slug} collection={collection} index={index} />
            ))}
          </Stagger>
        </section>
      </div>

      <Footer />
    </main>
  );
}
