"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Eye, ArrowUpRight } from "lucide-react";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "featured";
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  if (variant === "featured") {
    return (
      <Link
        href={`/product/${product.id}`}
        className="group relative overflow-hidden rounded-3xl"
      >
        <Card className="h-full border-0 bg-transparent transition-all duration-500">
          <div className="relative h-[350px] overflow-hidden rounded-3xl md:h-[450px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-40" />

            {/* Badge */}
            {product.badge && (
              <Badge className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-1.5 text-sm font-semibold text-primary shadow-lg backdrop-blur-sm">
                {product.badge}
              </Badge>
            )}

            {/* Arrow indicator */}
            <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-white">
              <ArrowUpRight className="h-4 w-4 text-white transition-all duration-300 group-hover:rotate-45 group-hover:text-primary" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
                  {product.name}
                </h3>
                <p className="text-xl font-bold text-white/90 md:text-2xl">${product.price}</p>
              </div>
            </div>

            {/* Border effect */}
            <div className="absolute inset-0 rounded-3xl border border-white/10 transition-colors duration-500 group-hover:border-white/20" />
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link href={`/product/${product.id}`}>
        <Card className="overflow-hidden rounded-2xl border border-primary/5 bg-background transition-all duration-500 hover:border-primary/10 hover:shadow-xl hover:shadow-primary/5">
          {/* Image container */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
            />

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Badge */}
            {product.badge && (
              <Badge className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary shadow-md backdrop-blur-sm">
                {product.badge}
              </Badge>
            )}

            {/* Quick Actions Overlay */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 p-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
              <Button
                size="icon"
                variant="secondary"
                className={cn(
                  "h-11 w-11 rounded-full bg-white/95 text-primary shadow-lg backdrop-blur-sm",
                  "translate-y-4 transition-all duration-300 group-hover:translate-y-0",
                  "hover:scale-110 hover:bg-white"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  // Add to wishlist logic
                }}
              >
                <Heart className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                className={cn(
                  "h-11 w-11 rounded-full bg-primary text-primary-foreground shadow-lg",
                  "translate-y-4 transition-all duration-300 delay-75 group-hover:translate-y-0",
                  "hover:scale-110"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  // Quick add to cart logic
                }}
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className={cn(
                  "h-11 w-11 rounded-full bg-white/95 text-primary shadow-lg backdrop-blur-sm",
                  "translate-y-4 transition-all duration-300 delay-150 group-hover:translate-y-0",
                  "hover:scale-110 hover:bg-white"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  // Quick view logic
                }}
              >
                <Eye className="h-5 w-5" />
              </Button>
            </div>

            {/* Corner glow effect */}
            <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          {/* Product info */}
          <div className="p-4">
            <div className="mb-2 flex items-start justify-between gap-2">
              <h3 className="line-clamp-2 font-semibold leading-tight transition-colors group-hover:text-primary">
                {product.name}
              </h3>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold">${product.price}</p>
              {product.category && (
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {product.category}
                </span>
              )}
            </div>
          </div>

          {/* Bottom border animation */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
        </Card>
      </Link>
    </div>
  );
}
