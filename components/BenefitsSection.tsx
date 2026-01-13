"use client";

import { Truck, Shield, RotateCcw, CreditCard, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "@/ui/motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const benefits: Benefit[] = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
    color: "group-hover:bg-blue-500/10 group-hover:text-blue-600 dark:group-hover:text-blue-400",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure checkout",
    color: "group-hover:bg-green-500/10 group-hover:text-green-600 dark:group-hover:text-green-400",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
    color:
      "group-hover:bg-orange-500/10 group-hover:text-orange-600 dark:group-hover:text-orange-400",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment",
    description: "Multiple payment options",
    color:
      "group-hover:bg-purple-500/10 group-hover:text-purple-600 dark:group-hover:text-purple-400",
  },
];

function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = benefit.icon;

  return (
    <StaggerItem>
      <motion.div
        className="group relative flex flex-col items-center text-center md:flex-row md:items-start md:gap-4 md:text-left"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Icon container with animation */}
        <motion.div
          className={cn(
            "relative mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 transition-all duration-300 md:mb-0 md:shrink-0",
            benefit.color
          )}
          animate={{
            scale: isHovered ? 1.05 : 1,
            rotate: isHovered ? [0, -5, 5, 0] : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <Icon className="h-6 w-6 text-primary transition-colors duration-300" />

          {/* Animated ring on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-primary/20"
            initial={{ scale: 1, opacity: 0 }}
            animate={{
              scale: isHovered ? 1.3 : 1,
              opacity: isHovered ? [0, 0.5, 0] : 0,
            }}
            transition={{
              duration: 1,
              repeat: isHovered ? Infinity : 0,
              ease: "easeOut",
            }}
          />
        </motion.div>

        {/* Text content */}
        <div className="relative">
          <motion.h3
            className="font-semibold transition-colors group-hover:text-primary"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {benefit.title}
          </motion.h3>
          <motion.p
            className="text-sm text-muted-foreground"
            animate={{ opacity: isHovered ? 1 : 0.8 }}
          >
            {benefit.description}
          </motion.p>
        </div>
      </motion.div>
    </StaggerItem>
  );
}

export function BenefitsSection() {
  return (
    <section className="relative w-full overflow-hidden border-y bg-muted/30">
      {/* Subtle animated background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <motion.div
          className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl"
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-gradient-to-tl from-primary/10 to-transparent blur-3xl"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 md:py-14">
        <Stagger className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10" staggerDelay={0.1}>
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
