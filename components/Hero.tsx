"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import { Product } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  FadeIn,
  AnimatedCounter,
  BlurFade,
  motion,
  Magnetic,
  Stagger,
  StaggerItem,
} from "@/ui/motion";
import React from "react";

interface HeroSectionProps {
  featuredProducts: Product[];
}

export function HeroSection({ featuredProducts }: HeroSectionProps) {
  const plugin = React.useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      playOnInit: true
    })
  );
  return (
    <section className="relative w-full overflow-hidden px-4 py-8 md:py-12">
      {/* Animated background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/5 via-primary/10 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary/5 via-primary/8 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-5 lg:items-center lg:gap-12">
          {/* Text Content */}
          <div className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-2">

            <FadeIn delay={0.2} direction="up" distance={30}>
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                <span className="block">Discover Premium</span>
                <span className="relative block text-primary">
                  Products
                  <motion.span
                    className="absolute -bottom-2 left-0 h-1 rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                  />
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.4} direction="up" distance={20}>
              <p className="mb-8 max-w-lg text-lg text-muted-foreground">
                Explore our curated collection of high-quality products designed for modern living.
                Elevate your everyday with exceptional craftsmanship.
              </p>
            </FadeIn>

            <FadeIn delay={0.5} direction="up" distance={20}>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Magnetic strength={0.15}>
                  <Button size="lg" asChild className="group relative overflow-hidden">
                    <Link href="/shop">
                      <span className="relative z-10 flex items-center">
                        Shop Collection
                        <motion.span
                          className="ml-2"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.span>
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-primary/90"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </Link>
                  </Button>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="group backdrop-blur-sm transition-all duration-300 hover:bg-primary/5"
                  >
                    <Link href="/about">
                      <span className="relative">Learn More</span>
                    </Link>
                  </Button>
                </Magnetic>
              </div>
            </FadeIn>

            {/* Animated Stats */}
            <FadeIn delay={0.7} direction="up" distance={20}>
              <Stagger className="mt-12 flex gap-8 border-t pt-8" delay={0.8} staggerDelay={0.15}>
                <StaggerItem>
                  <motion.div
                    className="group cursor-default"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-3xl font-bold">
                      <AnimatedCounter value={10} suffix="K+" duration={2} />
                    </p>
                    <p className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                      Happy Customers
                    </p>
                  </motion.div>
                </StaggerItem>
                <StaggerItem>
                  <motion.div
                    className="group cursor-default"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-3xl font-bold">
                      <AnimatedCounter value={500} suffix="+" duration={2.2} />
                    </p>
                    <p className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                      Products
                    </p>
                  </motion.div>
                </StaggerItem>
                <StaggerItem>
                  <motion.div
                    className="group cursor-default"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-3xl font-bold">4.9</p>
                    <p className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                      Average Rating
                    </p>
                  </motion.div>
                </StaggerItem>
              </Stagger>
            </FadeIn>
          </div>

          {/* Featured Products Carousel */}
          <div className="order-1 lg:order-2 lg:col-span-3">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[plugin.current]}
              className="w-full"
            >
              <CarouselContent>
                {featuredProducts.map((product, index) => (
                  <CarouselItem key={product.id}>
                    <Link
                      href={`/product/${product.id}`}
                      className="group relative block overflow-hidden rounded-2xl bg-muted"
                    >
                      <div className="relative aspect-square md:aspect-[4/5]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105"
                          priority
                        />
                        {/* Animated overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/20" />
                        {product.badge && (
                          <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground shadow-lg">
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                      {/* Product info with slide-up animation on hover */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
                        <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                          <p className="text-lg font-semibold text-white md:text-xl">
                            {product.name}
                          </p>
                          <div className="mt-1 flex items-center justify-between">
                            <p className="text-xl font-bold text-white">${product.price}</p>
                            <span className="flex items-center text-sm text-white/80">
                              View Details
                              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110" />
              <CarouselNext className="right-4 border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
