"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, Magnetic } from "@/components/ui/motion";

export function AnimatedCTA() {
  return (
    <section className="relative w-full overflow-hidden px-4 py-20 md:py-28">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient orbs */}
        <motion.div
          className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-primary/10 via-primary/5 to-transparent blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />

        {/* Floating icons */}
        <motion.div
          className="absolute left-[10%] top-[20%] rounded-full bg-primary/5 p-3"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="h-6 w-6 text-primary/40" />
        </motion.div>
        <motion.div
          className="absolute bottom-[20%] right-[15%] rounded-full bg-primary/5 p-3"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Zap className="h-6 w-6 text-primary/40" />
        </motion.div>
        <motion.div
          className="absolute right-[25%] top-[30%] rounded-full bg-primary/5 p-3"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Gift className="h-6 w-6 text-primary/40" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-4xl text-center">
        <FadeIn direction="up">
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-2 text-sm font-medium backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-4 w-4 text-primary" />
            </motion.span>
            Join 10,000+ Happy Customers
          </motion.div>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Ready to Upgrade
            <span className="relative">
              <span className="relative z-10"> Your Lifestyle</span>
              <motion.span
                className="absolute bottom-2 left-0 -z-0 h-3 w-full bg-primary/20"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </span>
            ?
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Join thousands of happy customers who trust Yozada for quality products. Start shopping
            today and experience the difference.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.3}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnetic strength={0.1}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" asChild className="group relative h-12 px-8 text-base">
                  <Link href="/products">
                    <span className="relative z-10 flex items-center">
                      Start Shopping
                      <motion.span
                        className="ml-2"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.span>
                    </span>
                  </Link>
                </Button>
              </motion.div>
            </Magnetic>
            <Magnetic strength={0.1}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="h-12 px-8 text-base backdrop-blur-sm"
                >
                  <Link href="/about">Learn More About Us</Link>
                </Button>
              </motion.div>
            </Magnetic>
          </div>
        </FadeIn>

        {/* Trust indicators */}
        <FadeIn direction="up" delay={0.4}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
            {[
              { icon: "✓", text: "Free shipping on orders $50+" },
              { icon: "✓", text: "30-day easy returns" },
              { icon: "✓", text: "Secure checkout" },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                  {item.icon}
                </span>
                {item.text}
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
