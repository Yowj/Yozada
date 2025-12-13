import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "featured";
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  if (variant === "featured") {
    return (
      <Link
        href={`/product/${product.id}`}
        className="group relative overflow-hidden rounded-xl"
      >
        <Card className="h-full border-0 transition-all duration-300 group-hover:shadow-xl">
          <div className="relative h-[300px] md:h-[400px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {product.badge && (
              <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground">
                {product.badge}
              </Badge>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="mb-1 text-xl font-bold md:text-2xl">{product.name}</h3>
              <p className="text-2xl font-bold">${product.price}</p>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link href={`/product/${product.id}`}>
        <Card className="overflow-hidden border transition-all duration-300 hover:shadow-lg hover:border-primary/20">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {product.badge && (
              <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
                {product.badge}
              </Badge>
            )}
            {/* Quick Actions Overlay */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Button
                size="icon"
                variant="secondary"
                className="h-10 w-10 rounded-full"
                onClick={(e) => {
                  e.preventDefault();
                  // Add to wishlist logic
                }}
              >
                <Heart className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={(e) => {
                  e.preventDefault();
                  // Quick add to cart logic
                }}
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="mb-1 line-clamp-2 font-semibold transition-colors group-hover:text-primary">
              {product.name}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold">${product.price}</p>
              {product.category && (
                <span className="text-xs text-muted-foreground">{product.category}</span>
              )}
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}
