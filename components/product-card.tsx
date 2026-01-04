"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Eye, Plus, Star } from "lucide-react";
import { Product } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { addToCart } from "@/lib/actions/cart";
import { useCart } from "@/lib/contexts/cart-context";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "featured";
  index?: number;
}

export function ProductCard({ product, variant = "default", index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showAddedFeedback, setShowAddedFeedback] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { refreshCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAddingToCart) return;

    setIsAddingToCart(true);
    try {
      const result = await addToCart(product.id, 1);
      if (result.success) {
        setShowAddedFeedback(true);
        await refreshCart();
        setTimeout(() => setShowAddedFeedback(false), 1500);
      } else {
        toast.error(result.error || "Failed to add to cart");
      }
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Link
          href={`/product/${product.id}`}
          className="group relative block overflow-hidden rounded-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Card className="h-full border-0 bg-transparent transition-all duration-500">
            <div className="relative h-[300px] overflow-hidden rounded-xl md:h-[400px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
              />

              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: isHovered ? 0.9 : 0.7 }}
                transition={{ duration: 0.3 }}
              />

              {/* Badge */}
              {product.badge && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute left-4 top-4"
                >
                  <Badge className="bg-primary px-3 py-1 text-primary-foreground shadow-lg backdrop-blur-sm">
                    {product.badge}
                  </Badge>
                </motion.div>
              )}

              {/* Quick actions */}
              <motion.div
                className="absolute right-4 top-4 flex flex-col gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLike}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-colors",
                    isLiked
                      ? "bg-red-500 text-white"
                      : "bg-white/20 text-white hover:bg-white/30"
                  )}
                >
                  <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
                </motion.button>
              </motion.div>

              {/* Product info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <motion.div
                  animate={{ y: isHovered ? -10 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="mb-1 text-xl font-bold text-white md:text-2xl">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-white">${product.price}</p>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm text-white/80">4.8</span>
                    </div>
                  </div>
                </motion.div>

                {/* Hover reveal button */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4"
                    >
                      <Button
                        onClick={handleAddToCart}
                        className="w-full gap-2 bg-white text-black hover:bg-white/90"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Card>
        </Link>
      </motion.div>
    );
  }

  // Default card variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <Card className="overflow-hidden border bg-card transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
          <div className="relative aspect-square overflow-hidden bg-muted">
            {/* Image with zoom effect */}
            <motion.div
              className="relative h-full w-full"
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Badge with animation */}
            {product.badge && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="absolute left-3 top-3"
              >
                <Badge className="bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground shadow-md">
                  {product.badge}
                </Badge>
              </motion.div>
            )}

            {/* Wishlist button - always visible on mobile, hover on desktop */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={cn(
                "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full shadow-lg backdrop-blur-md transition-colors md:opacity-0 md:group-hover:opacity-100",
                isLiked
                  ? "bg-red-500 text-white"
                  : "bg-white/90 text-gray-700 hover:bg-white"
              )}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
            </motion.button>

            {/* Quick Actions Overlay */}
            <motion.div
              className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  variant="secondary"
                  className="gap-1.5 bg-white/95 text-black shadow-lg backdrop-blur-sm hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <Eye className="h-4 w-4" />
                  Quick View
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  className="gap-1.5 shadow-lg"
                  onClick={handleAddToCart}
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </motion.div>
            </motion.div>

            {/* Added to cart feedback */}
            <AnimatePresence>
              {showAddedFeedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex flex-col items-center gap-2 rounded-full bg-white px-6 py-3 text-black shadow-xl"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
                    >
                      <ShoppingCart className="h-6 w-6 text-green-500" />
                    </motion.div>
                    <span className="text-sm font-medium">Added!</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Product info */}
          <div className="p-4">
            <motion.h3
              className="mb-1.5 line-clamp-2 font-semibold transition-colors group-hover:text-primary"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {product.name}
            </motion.h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold">${product.price}</p>
                {/* Simulated original price for sale items */}
                {product.badge?.toLowerCase().includes("sale") && (
                  <p className="text-sm text-muted-foreground line-through">
                    ${(parseFloat(String(product.price)) * 1.3).toFixed(2)}
                  </p>
                )}
              </div>
              {product.category && (
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {product.category}
                </span>
              )}
            </div>

            {/* Rating stars */}
            <div className="mt-2 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"
                  )}
                />
              ))}
              <span className="ml-1 text-xs text-muted-foreground">(128)</span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
