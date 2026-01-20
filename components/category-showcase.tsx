"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Electronics",
    href: "/category/electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=800&fit=crop&q=80",
    description: "Latest gadgets & tech",
    itemCount: "120+",
  },
  {
    name: "Clothing",
    href: "/category/clothing",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop&q=80",
    description: "Trendy fashion essentials",
    itemCount: "250+",
  },
  {
    name: "Home & Garden",
    href: "/category/home-garden",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop&q=80",
    description: "Elevate your living space",
    itemCount: "180+",
  },
];

export function CategoryShowcase() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-transparent to-white/[0.02]" />

      {/* Subtle animated glow */}
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-white/[0.015] blur-3xl"
        animate={{
          x: [0, 100, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 py-12 md:py-28">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-20"
        >
          <span className="inline-block mb-2 md:mb-4 text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-white/40">
            Explore Categories
          </span>
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-5">
            Shop by Category
          </h2>
          <p className="text-sm md:text-xl text-white/50 max-w-2xl mx-auto px-4">
            Explore our curated collections designed for every lifestyle.
          </p>
        </motion.div>

        {/* Mobile: Horizontal Scroll / Desktop: Grid */}
        <div className="md:grid md:gap-6 md:grid-cols-3">
          {/* Mobile scroll container */}
          <div className="flex md:contents gap-3 overflow-x-auto pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-hide">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.7 }}
                className="flex-shrink-0 w-[280px] md:w-auto snap-start"
              >
                <Link href={category.href} className="group relative block">
                  {/* Card Container */}
                  <div className="relative aspect-[4/3] md:aspect-[3/4] overflow-hidden rounded-xl md:rounded-2xl">
                    {/* Background Image */}
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                    >
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 280px, 33vw"
                      />
                    </motion.div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                    {/* Glass Border Effect */}
                    <div className="absolute inset-0 rounded-xl md:rounded-2xl border border-white/[0.08] group-hover:border-white/20 transition-colors duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end">
                      {/* Item Count Badge */}
                      <div className="mb-2 md:mb-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs md:text-sm font-medium text-white">
                          {category.itemCount}
                          <span className="text-white/60">items</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg md:text-3xl font-bold text-white mb-1 md:mb-2 group-hover:translate-x-2 transition-transform duration-300">
                        {category.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs md:text-base text-white/60 mb-3 md:mb-5 group-hover:text-white/80 transition-colors duration-300">
                        {category.description}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center gap-2 md:gap-3">
                        <span className="text-xs md:text-sm font-semibold text-white group-hover:translate-x-1 transition-transform duration-300">
                          Explore
                        </span>
                        <div className="flex items-center justify-center w-7 h-7 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white group-hover:text-black transition-all duration-300">
                          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-white group-hover:text-black transition-colors duration-300" />
                        </div>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-t from-white/[0.05] via-transparent to-transparent" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 md:mt-20 text-center"
        >
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 md:gap-3 px-5 py-2.5 md:px-8 md:py-4 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/10 text-white text-sm md:text-base font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            View All Categories
            <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Bottom Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 md:mt-28 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>
    </section>
  );
}
