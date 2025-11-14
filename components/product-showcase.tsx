"use client";

import * as React from "react";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/constants/products";
import { cn } from "@/lib/utils";

interface ProductShowcaseProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  onAddToCart?: (productId: number) => void;
  onBuyNow?: (productId: number) => void;
}

/**
 * ProductShowcase Component
 *
 * A comprehensive product display component that showcases:
 * - Product image
 * - Product name
 * - Description
 * - Category
 * - Stock information
 * - Price
 * - Add to Cart and Buy Now buttons
 *
 * @component
 * @example
 * ```tsx
 * <ProductShowcase
 *   product={productData}
 *   onAddToCart={(id) => console.log('Added to cart:', id)}
 *   onBuyNow={(id) => console.log('Buy now:', id)}
 * />
 * ```
 */
export function ProductShowcase({
  product,
  onAddToCart,
  onBuyNow,
  className,
  ...props
}: ProductShowcaseProps) {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isAddingToCart, setIsAddingToCart] = React.useState(false);
  const [isBuying, setIsBuying] = React.useState(false);

  const isLowStock = (stock?: number) => stock !== undefined && stock < 10;
  const isOutOfStock = (stock?: number) => stock === 0;

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      onAddToCart?.(product.id);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    setIsBuying(true);
    try {
      onBuyNow?.(product.id);
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <Card
      className={cn("overflow-hidden transition-shadow hover:shadow-lg", className)}
      {...props}
    >
      <CardContent className="p-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {/* Product Image Section */}
          <div className="relative md:col-span-1 lg:col-span-2 bg-muted flex items-center justify-center min-h-64 md:min-h-96">
            <div className="relative w-full h-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />

              {/* Badge and Favorite Button */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start gap-2">
                <div className="flex gap-2 flex-wrap">
                  {product.badge && (
                    <Badge className="bg-primary text-primary-foreground">
                      {product.badge}
                    </Badge>
                  )}
                  {isLowStock(product.stock) && (
                    <Badge variant="destructive">Low Stock</Badge>
                  )}
                  {isOutOfStock(product.stock) && (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={cn(
                    "p-2 rounded-full bg-white/90 hover:bg-white transition-all duration-200",
                    isFavorite && "bg-red-100"
                  )}
                >
                  <Heart
                    className={cn(
                      "w-5 h-5 transition-colors",
                      isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col justify-between p-6 md:col-span-1 lg:col-span-3">
            {/* Product Information */}
            <div className="space-y-4">
              {/* Category */}
              {product.category && (
                <div className="text-sm text-muted-foreground font-medium">
                  {product.category}
                </div>
              )}

              {/* Product Name */}
              <div>
                <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Stock Information */}
              {product.stock !== undefined && (
                <div className="pt-2">
                  <div className="text-sm font-medium text-foreground mb-2">
                    Availability
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={cn(
                          "h-full transition-all",
                          product.stock === 0
                            ? "w-0 bg-destructive"
                            : product.stock < 10
                              ? "w-1/3 bg-yellow-500"
                              : "w-full bg-green-500"
                        )}
                      />
                    </div>
                    <span
                      className={cn(
                        "text-sm font-medium whitespace-nowrap",
                        product.stock === 0
                          ? "text-destructive"
                          : product.stock < 10
                            ? "text-yellow-600"
                            : "text-green-600"
                      )}
                    >
                      {product.stock === 0
                        ? "Out of Stock"
                        : product.stock < 10
                          ? `Only ${product.stock} left`
                          : "In Stock"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Price and Actions */}
            <div className="space-y-4 pt-6 border-t">
              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground">
                  {product.price}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || isOutOfStock(product.stock)}
                  className="gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {isAddingToCart ? "Adding..." : "Add to Cart"}
                </Button>
                <Button
                  size="lg"
                  onClick={handleBuyNow}
                  disabled={isBuying || isOutOfStock(product.stock)}
                >
                  {isBuying ? "Processing..." : "Buy Now"}
                </Button>
              </div>

              {/* Out of Stock Message */}
              {isOutOfStock(product.stock) && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive font-medium">
                  This product is currently out of stock
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
