"use client";

import { Truck, Shield, RotateCcw, CreditCard, LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

const benefits: Benefit[] = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure checkout",
    gradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment",
    description: "Multiple payment options",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
];

function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  return (
    <div
      className="group relative animate-[slide-up_0.6s_ease-out] opacity-0 [animation-fill-mode:forwards]"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Card with 3D effect */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/5 bg-background p-6 transition-all duration-500 hover:border-primary/10 hover:shadow-xl hover:shadow-primary/5 md:p-8">
        {/* Gradient background on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
        />

        {/* Content */}
        <div className="relative flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:gap-5">
          {/* Icon container with 3D effect */}
          <div className="relative mb-4 md:mb-0 md:shrink-0">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/10 group-hover:shadow-lg md:h-16 md:w-16">
              <benefit.icon
                className="h-6 w-6 text-primary transition-transform duration-500 group-hover:scale-110 md:h-7 md:w-7"
                strokeWidth={1.5}
              />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-primary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50" />
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-semibold tracking-tight transition-colors md:text-lg">
              {benefit.title}
            </h3>
            <p className="text-sm text-muted-foreground">{benefit.description}</p>
          </div>
        </div>

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 group-hover:translate-x-full group-hover:opacity-100" />
      </div>
    </div>
  );
}

export function BenefitsSection() {
  return (
    <section className="relative w-full overflow-hidden border-y border-primary/5 bg-muted/30 py-12 md:py-16">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.02)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="mb-10 text-center md:mb-12">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Why Choose Us
          </h2>
          <p className="text-2xl font-bold tracking-tight md:text-3xl">
            Shop with Confidence
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
