"use client";

import { Star, Quote, Verified } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Marquee } from "./ui/marquee";
import { cn } from "@/lib/utils";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Verified Buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 5,
    text: "Absolutely love the quality! The products arrived faster than expected and exceeded my expectations.",
    productBought: "Premium Headphones",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Verified Buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    rating: 5,
    text: "Best online shopping experience I've had. The customer service team was incredibly helpful.",
    productBought: "Smart Watch Pro",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Verified Buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    rating: 5,
    text: "Premium quality products at great prices. I've already recommended Yozada to all my friends!",
    productBought: "Wireless Earbuds",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Verified Buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    rating: 5,
    text: "The attention to detail is impressive. Every item I've purchased has been perfect.",
    productBought: "Laptop Stand",
  },
  {
    id: 5,
    name: "Amanda Lee",
    role: "Verified Buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda",
    rating: 5,
    text: "Fast shipping, great packaging, and amazing products. What more could you ask for?",
    productBought: "Desk Organizer",
  },
  {
    id: 6,
    name: "David Brown",
    role: "Verified Buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    rating: 5,
    text: "I'm a repeat customer and have never been disappointed. Yozada is my go-to shop!",
    productBought: "Mechanical Keyboard",
  },
];

const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

function TestimonialCard({
  name,
  role,
  avatar,
  rating,
  text,
  productBought,
}: {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  productBought: string;
}) {
  return (
    <Card
      className={cn(
        "group relative w-[340px] cursor-pointer overflow-hidden rounded-2xl p-6 transition-all duration-500",
        "border border-primary/5 bg-background hover:border-primary/10 hover:shadow-xl hover:shadow-primary/5"
      )}
    >
      {/* Background glow on hover */}
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* Quote icon */}
      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/10">
        <Quote className="h-4 w-4 text-primary/40" />
      </div>

      {/* Content */}
      <div className="relative">
        {/* User info */}
        <div className="mb-4 flex items-center gap-3">
          <div className="relative">
            <Image
              src={avatar}
              alt={name}
              width={52}
              height={52}
              className="h-13 w-13 rounded-full bg-muted ring-2 ring-primary/10 transition-all duration-300 group-hover:ring-primary/20"
              unoptimized
            />
            {/* Verified badge */}
            <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-background">
              <Verified className="h-3 w-3" />
            </div>
          </div>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              {role}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-1">
          {[...Array(rating)].map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-amber-400 text-amber-400 transition-transform duration-300"
              style={{ transitionDelay: `${i * 50}ms` }}
            />
          ))}
          <span className="ml-2 text-xs font-medium text-muted-foreground">5.0</span>
        </div>

        {/* Review text */}
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{text}</p>

        {/* Product tag */}
        <div className="inline-flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Purchased: {productBought}
        </div>
      </div>

      {/* Bottom border animation */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary/50 to-primary transition-all duration-500 group-hover:w-full" />
    </Card>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative w-full overflow-hidden py-20 md:py-24">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02)_0%,transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm font-medium">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            4.9 out of 5 from 10,000+ reviews
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Loved by Thousands
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
            See what our customers are saying about their shopping experience
          </p>
        </div>
      </div>

      {/* Testimonial marquees */}
      <div className="relative flex w-full flex-col items-center justify-center gap-6">
        <Marquee pauseOnHover className="[--duration:50s]">
          {firstRow.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:50s]">
          {secondRow.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </Marquee>

        {/* Fade gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background via-background/80 to-transparent" />
      </div>

      {/* Bottom stats */}
      <div className="mt-16">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-8 md:gap-12">
          <div className="text-center">
            <p className="text-3xl font-bold md:text-4xl">10K+</p>
            <p className="text-sm text-muted-foreground">Happy Customers</p>
          </div>
          <div className="hidden h-12 w-px bg-border md:block" />
          <div className="text-center">
            <p className="text-3xl font-bold md:text-4xl">4.9</p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </div>
          <div className="hidden h-12 w-px bg-border md:block" />
          <div className="text-center">
            <p className="text-3xl font-bold md:text-4xl">99%</p>
            <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
