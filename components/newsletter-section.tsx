"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your newsletter service
    setIsSubscribed(true);
  };

  return (
    <section className="w-full bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/10">
              <Mail className="h-7 w-7" />
            </div>
          </div>
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            Stay in the Loop
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Subscribe to our newsletter for exclusive deals, new arrivals, and insider-only discounts.
          </p>

          {isSubscribed ? (
            <div className="flex items-center justify-center gap-2 text-lg">
              <CheckCircle className="h-6 w-6" />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-primary-foreground text-foreground placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                size="lg"
                variant="secondary"
                className="h-12 px-8 font-semibold"
              >
                Subscribe
              </Button>
            </form>
          )}

          <p className="mt-4 text-sm text-primary-foreground/60">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
