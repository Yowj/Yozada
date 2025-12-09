"use client";

import * as React from "react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  backgroundColor: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Summer Collection 2024",
    subtitle: "New Arrivals",
    description: "Discover the latest trends in fashion. Shop now and get up to 50% off on selected items.",
    ctaText: "Shop Now",
    ctaLink: "/products",
    backgroundImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
    backgroundColor: "from-blue-600 to-purple-600",
  },
  {
    id: 2,
    title: "Premium Quality Products",
    subtitle: "Exclusive Deal",
    description: "Experience luxury with our curated selection of premium products. Limited time offer!",
    ctaText: "Explore Collection",
    ctaLink: "/products",
    backgroundImage: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=600&fit=crop",
    backgroundColor: "from-emerald-600 to-teal-600",
  },
  {
    id: 3,
    title: "Free Shipping",
    subtitle: "On Orders Over $50",
    description: "Get free shipping on all orders over $50. No code needed, automatically applied at checkout.",
    ctaText: "Start Shopping",
    ctaLink: "/products",
    backgroundImage: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&h=600&fit=crop",
    backgroundColor: "from-orange-600 to-red-600",
  },
];

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {heroSlides.map((slide) => (
          <CarouselItem key={slide.id}>
            <Card className="border-0 rounded-none md:rounded-xl overflow-hidden">
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                />

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.backgroundColor} opacity-80`} />

                {/* Content */}
                <div className="relative z-10 h-full flex items-center">
                  <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-2xl">
                      <p className="text-sm md:text-base font-semibold text-white/90 mb-2 uppercase tracking-wide">
                        {slide.subtitle}
                      </p>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
                        {slide.title}
                      </h2>
                      <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-xl">
                        {slide.description}
                      </p>
                      <Button size="lg" asChild className="bg-white text-gray-900 hover:bg-gray-100">
                        <Link href={slide.ctaLink}>
                          {slide.ctaText}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 md:left-8 bg-white/80 hover:bg-white" />
      <CarouselNext className="right-4 md:right-8 bg-white/80 hover:bg-white" />
    </Carousel>
  );
}
