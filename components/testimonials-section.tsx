"use client";

import { Star, Quote, Sparkles } from "lucide-react";
import { Card } from "@/ui/card";
import { Marquee } from "../ui/marquee";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { FadeIn } from "@/ui/motion";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Verified Buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 5,
    text: "Absolutely love the quality! The products arrived faster than expected and exceeded my expectations.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Verified Buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    rating: 5,
    text: "Best online shopping experience I've had. The customer service team was incredibly helpful.",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Verified Buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    rating: 5,
    text: "Premium quality products at great prices. I've already recommended Yozada to all my friends!",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Verified Buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    rating: 5,
    text: "The attention to detail is impressive. Every item I've purchased has been perfect.",
  },
  {
    id: 5,
    name: "Amanda Lee",
    role: "Verified Buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda",
    rating: 5,
    text: "Fast shipping, great packaging, and amazing products. What more could you ask for?",
  },
  {
    id: 6,
    name: "David Brown",
    role: "Verified Buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    rating: 5,
    text: "I'm a repeat customer and have never been disappointed. Yozada is my go-to shop!",
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
}: {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          "relative w-80 h-[300px] cursor-pointer overflow-hidden p-4 mx-1",
          "transition-all duration-500 border bg-card",
          "hover:border-blue-500/50"
        )}
      >
        {/* Decorative quote icon with animation */}
        <motion.div
          className="absolute right-4 top-4"
          animate={{
            rotate: isHovered ? [0, 10, -10, 0] : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <Quote className="h-8 w-8 text-primary/10" />
        </motion.div>

        {/* Avatar and info */}
        <div className="mb-4 flex items-center gap-3">
          <motion.div
            className="relative"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={avatar}
              alt={name}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full bg-muted ring-2 ring-background"
              unoptimized
            />
            {/* Online indicator */}
            <motion.div
              className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-green-500"
              animate={{
                scale: isHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
            />
          </motion.div>
          <div>
            <motion.p
              className="font-semibold"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {name}
            </motion.p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>

        {/* Rating stars with animation */}
        <div className="mb-3 flex gap-0.5">
          {[...Array(rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </motion.div>
          ))}
        </div>

        {/* Review text */}
        <motion.p
          className="text-sm leading-relaxed text-muted-foreground"
          animate={{ opacity: isHovered ? 1 : 0.8 }}
        >
          &ldquo;{text}&rdquo;
        </motion.p>

        {/* Hover reveal: helpful badge */}
        <motion.div
          className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
            Helpful Review
          </span>
        </motion.div>
      </Card>
    </motion.div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative w-full overflow-hidden py-20 md:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl"
          animate={{
            x: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-gradient-to-tl from-primary/5 to-transparent blur-3xl"
          animate={{
            x: [0, -50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <FadeIn direction="up" className="mb-14 text-center">
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-4 w-4" />
            Customer Stories
          </motion.div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Loved by Thousands
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            See what our customers are saying about their shopping experience. Real reviews from
            real people.
          </p>
        </FadeIn>
      </div>

      {/* Testimonials marquee */}
      <div className="relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden">
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

        {/* Gradient fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent" />
      </div>

      {/* Stats row */}
      <FadeIn direction="up" delay={0.3}>
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid grid-cols-2 gap-8 rounded-2xl border bg-card/50 p-8 backdrop-blur-sm md:grid-cols-4">
            {[
              { value: "4.9", label: "Average Rating" },
              { value: "10K+", label: "Happy Customers" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "24/7", label: "Customer Support" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-2xl font-bold md:text-3xl">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
