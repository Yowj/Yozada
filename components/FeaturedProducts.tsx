"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/ui/badge";
import { ArrowRight, Star } from "lucide-react";
import { Product } from "@/lib/types";
import { motion } from "framer-motion";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) return null;

  const mainProduct = products[0];
  const sideProducts = products.slice(1, 3);

  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-transparent to-white/[0.02]" />

      {/* Subtle animated glow - hidden on mobile */}
      <motion.div
        className="hidden md:block absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-white/[0.015] blur-3xl"
        animate={{
          y: [0, -50, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 10,
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
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-16"
        >
          <div>
            <span className="inline-block mb-2 md:mb-4 text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-white/40">
              Curated Selection
            </span>
            <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4">
              Featured Collection
            </h2>
            <p className="text-sm md:text-lg text-white/50">
              Handpicked favorites for this season
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden md:inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/10 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300 group mt-4 md:mt-0"
          >
            Explore More
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Desktop: Asymmetric Grid / Mobile: Stack */}
        <div className="grid gap-4 md:gap-6 md:grid-cols-12 lg:gap-8">
          {/* Main Featured Product */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-7 lg:col-span-8"
          >
            <Link href={`/product/${mainProduct.id}`} className="group relative block">
              <div className="relative h-[300px] md:h-[600px] overflow-hidden rounded-xl md:rounded-2xl">
                {/* Background Image */}
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  <Image
                    src={mainProduct.image}
                    alt={mainProduct.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </motion.div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                {/* Glass Border */}
                <div className="absolute inset-0 rounded-xl md:rounded-2xl border border-white/[0.08] group-hover:border-white/20 transition-colors duration-500" />

                {/* Badge */}
                {mainProduct.badge && (
                  <Badge className="absolute left-4 top-4 md:left-6 md:top-6 z-10 border-0 bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white border border-white/20">
                    {mainProduct.badge}
                  </Badge>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-8 lg:p-10">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2 md:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-1.5 text-xs md:text-sm text-white/70">(128)</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-5 group-hover:translate-x-2 transition-transform duration-300">
                    {mainProduct.name}
                  </h3>

                  {/* CTA Button */}
                  <div className="inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white text-black text-sm md:text-base font-semibold group-hover:gap-4 transition-all duration-300">
                    Shop Now
                    <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-t from-white/[0.05] via-transparent to-transparent" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Side Products - Horizontal scroll on mobile */}
          <div className="md:col-span-5 lg:col-span-4 md:space-y-6 lg:space-y-8">
            <div className="flex md:flex-col gap-3 md:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-hide">
              {sideProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.15, duration: 0.7 }}
                  className="flex-shrink-0 w-[260px] md:w-auto snap-start"
                >
                  <Link href={`/product/${product.id}`} className="group relative block">
                    <div className="relative h-[200px] md:h-[280px] overflow-hidden rounded-xl md:rounded-2xl">
                      {/* Background Image */}
                      <motion.div
                        className="absolute inset-0"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 260px, 33vw"
                        />
                      </motion.div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      {/* Glass Border */}
                      <div className="absolute inset-0 rounded-xl md:rounded-2xl border border-white/[0.08] group-hover:border-white/20 transition-colors duration-500" />

                      {/* Badge */}
                      {product.badge && (
                        <Badge className="absolute right-3 top-3 md:right-4 md:top-4 z-10 border-0 bg-white/10 backdrop-blur-md px-2.5 py-1 md:px-3 md:py-1.5 text-xs font-medium text-white border border-white/20">
                          {product.badge}
                        </Badge>
                      )}

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-5">
                        <h3 className="text-base md:text-lg font-bold text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg md:text-xl font-bold text-white">
                            ${product.price}
                          </span>
                          <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white group-hover:text-black transition-all duration-300">
                            <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-white group-hover:text-black transition-colors duration-300" />
                          </div>
                        </div>
                      </div>

                      {/* Hover Glow */}
                      <div className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-t from-white/[0.05] via-transparent to-transparent" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 md:hidden text-center"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/10 text-white text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            View All Products
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
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
