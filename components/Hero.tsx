"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/ui/button";
import { ArrowRight } from "lucide-react";
import { Product } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { FadeIn, motion } from "@/ui/motion";
import React from "react";

interface HeroSectionProps {
  featuredProducts: Product[];
}

export function HeroSection({ featuredProducts }: HeroSectionProps) {
  const plugin = React.useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <section className="w-full px-4 py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <FadeIn delay={0.1} direction="up" distance={20}>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Curated Collection
              </p>
            </FadeIn>

            <FadeIn delay={0.2} direction="up" distance={20}>
              <h1 className="mb-6 text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
                Less is more.
                <br />
                <span className="text-muted-foreground">Quality over quantity.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3} direction="up" distance={20}>
              <p className="mb-10 max-w-md text-base text-muted-foreground">
                Thoughtfully selected products for intentional living.
                Every piece tells a story.
              </p>
            </FadeIn>

            <FadeIn delay={0.4} direction="up" distance={20}>
              <Button size="lg" asChild className="w-fit group">
                <Link href="/products">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </FadeIn>
          </div>

          {/* Featured Product Carousel */}
          <FadeIn delay={0.3} direction="up" distance={30}>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[plugin.current]}
              className="w-full"
            >
              <CarouselContent>
                {featuredProducts.map((product) => (
                  <CarouselItem key={product.id}>
                    <Link
                      href={`/product/${product.id}`}
                      className="group block"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          priority
                        />
                      </div>
                      <div className="mt-4 flex items-end justify-between">
                        <div>
                          <p className="text-base font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">${product.price}</p>
                        </div>
                        <motion.span
                          className="text-sm text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                          initial={{ x: -4 }}
                          whileHover={{ x: 0 }}
                        >
                          View
                          <ArrowRight className="ml-1 inline-block h-3 w-3" />
                        </motion.span>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
