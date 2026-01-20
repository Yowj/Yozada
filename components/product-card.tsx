"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Product } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { addToCart } from "@/lib/actions/cart";
import { useCart } from "@/lib/contexts/cart-context";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <Card className="overflow-hidden border-0 bg-card shadow-sm transition-all duration-300 hover:shadow-lg">
          {/* Image Container - Bigger, cleaner */}
          <div className="relative aspect-[3/4] overflow-hidden bg-muted">
            <Image
              src={product.image || "/placeholder.png"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              quality={100}
              priority
            />

            {/* Badge - Top Left */}
            {product.badge && (
              <Badge className="absolute left-3 top-3 bg-black/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {product.badge}
              </Badge>
            )}

            {/* Wishlist - Top Right */}
            <motion.button
              initial={false}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.9,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={cn(
                "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-colors",
                isLiked
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-white/90 text-gray-700 shadow-md hover:bg-white",
              )}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
            </motion.button>

            {/* Add to Cart - Bottom */}
            <motion.div
              className="absolute inset-x-0 bottom-0 p-3"
              initial={false}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20,
              }}
              transition={{ duration: 0.2 }}
            >
              <Button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full gap-2 bg-black text-white shadow-xl hover:bg-black/90"
                size="sm"
              >
                <ShoppingCart className="h-4 w-4" />
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </Button>
            </motion.div>

            {/* Added Feedback */}
            <AnimatePresence>
              {showAddedFeedback && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 shadow-2xl"
                  >
                    <ShoppingCart className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-semibold text-black">Added to cart!</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Product Info - Compact */}
          <div className="p-3">
            <h3 className="mb-1 line-clamp-2 text-sm font-medium leading-tight text-foreground">
              {product.name}
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold">${product.price}</span>
                {product.badge?.toLowerCase().includes("sale") && (
                  <span className="text-xs text-muted-foreground line-through">
                    ${(parseFloat(String(product.price)) * 1.3).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-muted-foreground">4.8</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
