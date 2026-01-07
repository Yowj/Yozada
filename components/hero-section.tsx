"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Star, Zap, TrendingUp } from "lucide-react";
import { Product } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  FadeIn,
  AnimatedCounter,
  BlurFade,
  motion,
  Magnetic,
  Stagger,
  StaggerItem,
} from "@/components/ui/motion";

interface HeroSectionProps {
  featuredProducts: Product[];
}

export function HeroSection({ featuredProducts }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden px-4 py-12 md:py-20 lg:py-24">
      {/* Enhanced animated background with grid and gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Multiple gradient orbs */}
        <motion.div
          className="absolute -right-1/4 -top-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-purple-500/15 via-primary/10 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500/10 via-primary/5 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-5 lg:items-center lg:gap-16">
          {/* Text Content */}
          <div className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-2">
            <BlurFade delay={0.1}>
              <Badge
                variant="secondary"
                className="mb-6 w-fit gap-2 border border-primary/20 bg-gradient-to-r from-primary/10 to-purple-500/10 px-4 py-2 backdrop-blur-md shadow-lg shadow-primary/5"
              >
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="h-4 w-4 text-primary" />
                </motion.span>
                <span className="font-semibold">New Collection 2025</span>
              </Badge>
            </BlurFade>

            <FadeIn delay={0.2} direction="up" distance={30}>
              <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
                <span className="block bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Discover Premium
                </span>
                <span className="relative mt-2 block bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                  Products
                  <motion.span
                    className="absolute -bottom-3 left-0 h-1.5 rounded-full bg-gradient-to-r from-primary to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                  />
                  <motion.span
                    className="absolute -right-8 -top-8 text-4xl"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    ✨
                  </motion.span>
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.4} direction="up" distance={20}>
              <p className="mb-10 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
                Explore our curated collection of{" "}
                <span className="font-semibold text-foreground">high-quality products</span> designed
                for modern living. Elevate your everyday with exceptional craftsmanship.
              </p>
            </FadeIn>

            <FadeIn delay={0.5} direction="up" distance={20}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Magnetic strength={0.2}>
                  <Button
                    size="lg"
                    asChild
                    className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 px-8 py-6 text-base font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                  >
                    <Link href="/products">
                      <span className="relative z-10 flex items-center">
                        Shop Collection
                        <motion.span
                          className="ml-2"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowRight className="h-5 w-5" />
                        </motion.span>
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </Link>
                  </Button>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="group border-2 border-primary/20 bg-background/50 px-8 py-6 text-base font-semibold backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg"
                  >
                    <Link href="/about">
                      <span className="relative flex items-center">
                        Learn More
                        <motion.span
                          className="ml-2 opacity-0 transition-opacity group-hover:opacity-100"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>
                    </Link>
                  </Button>
                </Magnetic>
              </div>
            </FadeIn>

            {/* Enhanced Animated Stats */}
            <FadeIn delay={0.7} direction="up" distance={20}>
              <Stagger
                className="mt-16 grid grid-cols-3 gap-6 rounded-2xl border border-primary/10 bg-gradient-to-br from-background/50 to-background/30 p-6 backdrop-blur-md"
                delay={0.8}
                staggerDelay={0.15}
              >
                <StaggerItem>
                  <motion.div
                    className="group cursor-default text-center"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="mb-2 flex justify-center">
                      <motion.div
                        className="rounded-full bg-primary/10 p-2"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Star className="h-5 w-5 text-primary" />
                      </motion.div>
                    </div>
                    <p className="mb-1 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-3xl font-bold text-transparent">
                      <AnimatedCounter value={10} suffix="K+" duration={2} />
                    </p>
                    <p className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                      Happy Customers
                    </p>
                  </motion.div>
                </StaggerItem>
                <StaggerItem>
                  <motion.div
                    className="group cursor-default text-center"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="mb-2 flex justify-center">
                      <motion.div
                        className="rounded-full bg-primary/10 p-2"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Zap className="h-5 w-5 text-primary" />
                      </motion.div>
                    </div>
                    <p className="mb-1 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-3xl font-bold text-transparent">
                      <AnimatedCounter value={500} suffix="+" duration={2.2} />
                    </p>
                    <p className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                      Products
                    </p>
                  </motion.div>
                </StaggerItem>
                <StaggerItem>
                  <motion.div
                    className="group cursor-default text-center"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="mb-2 flex justify-center">
                      <motion.div
                        className="rounded-full bg-primary/10 p-2"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </motion.div>
                    </div>
                    <p className="mb-1 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-3xl font-bold text-transparent">
                      4.9
                    </p>
                    <p className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                      Average Rating
                    </p>
                  </motion.div>
                </StaggerItem>
              </Stagger>
            </FadeIn>
          </div>

          {/* Enhanced Featured Products Carousel */}
          <FadeIn
            delay={0.3}
            direction="left"
            distance={50}
            className="order-1 lg:order-2 lg:col-span-3"
          >
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
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Link
                        href={`/product/${product.id}`}
                        className="group relative block overflow-hidden rounded-3xl bg-muted shadow-2xl shadow-black/10 ring-1 ring-primary/5 transition-all duration-500 hover:shadow-3xl hover:shadow-primary/20 hover:ring-primary/20"
                      >
                        <div className="relative aspect-square md:aspect-[4/5]">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-110"
                            priority
                          />
                          {/* Enhanced animated overlay with gradient on hover */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 transition-all duration-500 group-hover:from-black/80 group-hover:via-black/30"
                          />

                          {/* Top gradient overlay for badge area */}
                          <div className="absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />

                          {product.badge && (
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <Badge className="absolute left-5 top-5 bg-gradient-to-r from-primary to-purple-600 px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/30 ring-1 ring-white/20">
                                {product.badge}
                              </Badge>
                            </motion.div>
                          )}

                          {/* Quick view button - appears on hover */}
                          <motion.div
                            className="absolute right-5 top-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          >
                            <div className="rounded-full border border-white/30 bg-white/10 p-2 backdrop-blur-md transition-all hover:bg-white/20">
                              <ArrowRight className="h-5 w-5 text-white" />
                            </div>
                          </motion.div>
                        </div>

                        {/* Enhanced product info with glass morphism */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <motion.div
                            className="transform transition-all duration-500 group-hover:-translate-y-2"
                          >
                            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl transition-all duration-300 group-hover:bg-white/20">
                              <p className="mb-3 text-xl font-bold text-white md:text-2xl">
                                {product.name}
                              </p>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="mb-1 text-xs font-medium text-white/70">Price</p>
                                  <p className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-2xl font-extrabold text-transparent">
                                    ${product.price}
                                  </p>
                                </div>
                                <motion.div
                                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all group-hover:border-white/40 group-hover:bg-white/20"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  View Details
                                  <motion.span
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                  >
                                    <ArrowRight className="h-4 w-4" />
                                  </motion.span>
                                </motion.div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </Link>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-6 h-12 w-12 border-2 border-primary/20 bg-background/80 text-foreground shadow-xl backdrop-blur-md transition-all hover:scale-110 hover:border-primary/40 hover:bg-background/90 hover:shadow-2xl" />
              <CarouselNext className="right-6 h-12 w-12 border-2 border-primary/20 bg-background/80 text-foreground shadow-xl backdrop-blur-md transition-all hover:scale-110 hover:border-primary/40 hover:bg-background/90 hover:shadow-2xl" />
            </Carousel>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
