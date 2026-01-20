"use client";

import { Truck, Shield, RotateCcw, CreditCard, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  stat: string;
}

const benefits: Benefit[] = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
    stat: "2-Day",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% protected checkout",
    stat: "256-bit",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Hassle-free process",
    stat: "30 Days",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment",
    description: "Multiple options available",
    stat: "0% APR",
  },
];

export function BenefitsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />

      {/* Subtle animated glow - hidden on mobile for performance */}
      <motion.div
        className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-white/[0.02] blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 py-10 md:py-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4">
            Why Choose Us
          </h2>
          <p className="text-sm md:text-lg text-white/60 max-w-2xl mx-auto px-4">
            Fast, secure, and hassle-free shopping.
          </p>
        </motion.div>

        {/* Mobile: Horizontal Scroll / Desktop: Grid */}
        <div className="md:grid md:grid-cols-4 md:gap-6">
          {/* Mobile scroll container */}
          <div className="flex md:contents gap-3 overflow-x-auto pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-hide">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="flex-shrink-0 w-[200px] md:w-auto snap-start group"
                >
                  {/* Glass Card */}
                  <div className="relative h-full p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300">
                    {/* Icon */}
                    <div className="mb-3 md:mb-5">
                      <div className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 group-hover:bg-white/15 group-hover:border-white/20 transition-all duration-300">
                        <Icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                      </div>
                    </div>

                    {/* Stat Badge */}
                    <div className="mb-2 md:mb-3">
                      <span className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                        {benefit.stat}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-white mb-1 md:mb-2">
                      {benefit.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs md:text-sm lg:text-base text-white/50 group-hover:text-white/70 transition-colors duration-300">
                      {benefit.description}
                    </p>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Divider Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10 md:mt-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>
    </section>
  );
}
