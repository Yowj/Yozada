"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface HeroSectionProps {
  featuredProducts: Product[];
}

export function HeroSection({ featuredProducts }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProduct = featuredProducts[currentIndex];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);

  return (
    <section className="relative h-[100svh] min-h-[500px] md:min-h-[600px] max-h-[900px] w-full overflow-hidden bg-black">
      {/* Full-Width Landscape Carousel */}
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ x: 1000 }}
          animate={{ x: 0 }}
          exit={{ x: -1000 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={currentProduct.image}
              alt={currentProduct.name}
              fill
              sizes="100vw"
              quality={100}
              className="object-cover"
              priority
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent md:from-black/80 md:via-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 md:from-black/60 md:to-black/20" />
          </div>

          {/* Content Container */}
          <div className="relative h-full flex items-end pb-24 md:items-center md:pb-0">
            <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12">
              <div className="max-w-2xl">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {currentProduct.badge && (
                    <Badge className="mb-3 md:mb-6 bg-white/10 backdrop-blur-md text-white text-xs md:text-sm border-white/20 hover:bg-white/20">
                      {currentProduct.badge}
                    </Badge>
                  )}
                </motion.div>

                {/* Dynamic Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-3 md:mb-6 leading-[1] md:leading-[0.95]"
                >
                  {getHeadline(currentIndex)}
                </motion.h1>

                {/* Product Name & Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mb-4 md:mb-8"
                >
                  <h2 className="text-lg sm:text-xl md:text-3xl font-semibold text-white mb-1.5 md:mb-3">
                    {currentProduct.name}
                  </h2>
                  <p className="text-sm md:text-lg text-white/70 md:text-white/80 max-w-xl line-clamp-2 md:line-clamp-none">
                    {getDescription(currentIndex)}
                  </p>
                </motion.div>

                {/* Price & CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex flex-wrap items-center gap-3 md:gap-6"
                >
                  <div className="flex items-baseline gap-2 md:gap-3">
                    <span className="text-2xl sm:text-3xl md:text-5xl font-bold text-white">
                      ${currentProduct.price}
                    </span>
                    <span className="text-sm md:text-lg text-white/60 line-through">
                      ${Math.floor(currentProduct.price * 1.3)}
                    </span>
                  </div>

                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 text-sm md:text-base px-5 md:px-8 h-10 md:h-14"
                    asChild
                  >
                    <Link href={`/product/${currentProduct.id}`}>
                      Shop Now
                      <ArrowRight className="ml-1.5 md:ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Link>
                  </Button>
                </motion.div>

                {/* Trust Indicators - Hidden on small mobile, visible from sm */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="hidden sm:flex flex-wrap gap-4 md:gap-8 mt-6 md:mt-12 pt-4 md:pt-8 border-t border-white/20"
                >
                  <div>
                    <p className="text-base md:text-2xl font-bold text-white">Free Shipping</p>
                    <p className="text-xs md:text-sm text-white/60">On orders over $50</p>
                  </div>
                  <div>
                    <p className="text-base md:text-2xl font-bold text-white">2-Day Delivery</p>
                    <p className="text-xs md:text-sm text-white/60">Fast & reliable</p>
                  </div>
                  <div>
                    <p className="text-base md:text-2xl font-bold text-white">4.9★</p>
                    <p className="text-xs md:text-sm text-white/60">10K+ reviews</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 md:bottom-8 right-4 md:right-6 lg:right-12 z-10 flex items-center gap-2 md:gap-4">
        {/* Dots Indicator */}
        <div className="flex gap-1.5 md:gap-2">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 md:w-12 h-1 md:h-1.5 bg-white"
                  : "w-5 md:w-8 h-1 md:h-1.5 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrow Buttons */}
        <div className="flex gap-1.5 md:gap-2">
          <button
            onClick={prev}
            className="h-9 w-9 md:h-12 md:w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
          </button>
          <button
            onClick={next}
            className="h-9 w-9 md:h-12 md:w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
          </button>
        </div>
      </div>

      {/* Quick Links - Top Right - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="hidden md:block absolute top-8 right-6 lg:right-12 z-10"
      >
        <Link
          href="/shop"
          className="text-white/80 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group"
        >
          View All Products
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  );
}

// Catchy headlines per product
function getHeadline(index: number): string {
  const headlines = [
    "Elevate Your Style",
    "Where Quality Meets Design",
    "Made for the Bold",
    "Redefine Your Space",
    "Crafted to Perfection",
  ];
  return headlines[index] || headlines[0];
}

// Product descriptions
function getDescription(index: number): string {
  const descriptions = [
    "Experience premium craftsmanship with our exclusive collection. Every detail matters.",
    "Designed for those who refuse to settle. Exceptional quality, timeless style.",
    "Stand out from the crowd. Bold designs that make a statement.",
    "Transform your everyday with products that inspire. Quality you can feel.",
    "Meticulously crafted with attention to every detail. Excellence delivered.",
  ];
  return descriptions[index] || descriptions[0];
}