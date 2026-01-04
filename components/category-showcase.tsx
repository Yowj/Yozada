"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";

const categories = [
  {
    name: "Electronics",
    href: "/category/electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop",
    description: "Latest gadgets & tech",
    itemCount: "120+ items",
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    name: "Clothing",
    href: "/category/clothing",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    description: "Trendy fashion essentials",
    itemCount: "250+ items",
    color: "from-pink-500/20 to-rose-500/20",
  },
  {
    name: "Home & Garden",
    href: "/category/home-garden",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    description: "Elevate your living space",
    itemCount: "180+ items",
    color: "from-green-500/20 to-emerald-500/20",
  },
];

function CategoryCard({
  category,
  index,
}: {
  category: (typeof categories)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StaggerItem>
      <Link
        href={category.href}
        className="group relative block overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* Background image with parallax-like zoom */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Animated color gradient overlay on hover */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${category.color} mix-blend-overlay`}
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
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              {category.itemCount}
            </span>
          </motion.div>

          {/* Title with animated underline */}
          <div className="relative mb-1 inline-block">
            <motion.h3
              className="text-xl font-bold md:text-2xl"
              animate={{ x: isHovered ? 8 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {category.name}
            </motion.h3>
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-white"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "100%" : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <motion.p
            className="mb-4 text-sm text-white/80"
            animate={{ opacity: isHovered ? 1 : 0.8 }}
          >
            {category.description}
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

export function CategoryShowcase() {
  return (
    <section className="w-full px-4 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <FadeIn direction="up" className="mb-12 text-center">
          <motion.span
            className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Explore Categories
          </motion.span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Shop by Category
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore our curated collections designed for every lifestyle. Find exactly what
            you&apos;re looking for.
          </p>
        </FadeIn>

        {/* Category Grid */}
        <Stagger className="grid gap-4 md:grid-cols-3 md:gap-6" staggerDelay={0.15}>
          {categories.map((category, index) => (
            <CategoryCard key={category.name} category={category} index={index} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
