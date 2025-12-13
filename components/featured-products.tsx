import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Product } from "@/lib/types";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) return null;

  const mainProduct = products[0];
  const sideProducts = products.slice(1, 3);

  return (
    <section className="w-full px-4 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Featured Products
            </h2>
            <p className="mt-2 text-muted-foreground">
              Hand-picked products just for you
            </p>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link href="/products">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
          {/* Main Featured Product */}
          <Link
            href={`/product/${mainProduct.id}`}
            className="group relative overflow-hidden rounded-2xl md:row-span-2"
          >
            <Card className="h-full border-0">
              <div className="relative h-[400px] md:h-full md:min-h-[500px]">
                <Image
                  src={mainProduct.image}
                  alt={mainProduct.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {mainProduct.badge && (
                  <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground">
                    {mainProduct.badge}
                  </Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                  <p className="mb-1 text-sm font-medium text-white/80">Featured</p>
                  <h3 className="mb-2 text-2xl font-bold md:text-3xl">{mainProduct.name}</h3>
                  <p className="mb-4 text-xl font-bold md:text-2xl">${mainProduct.price}</p>
                  <span className="inline-flex items-center text-sm font-medium transition-transform group-hover:translate-x-1">
                    Shop Now
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Card>
          </Link>

          {/* Side Products */}
          {sideProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group relative overflow-hidden rounded-2xl"
            >
              <Card className="h-full border-0">
                <div className="relative h-[250px] md:h-[242px]">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="mb-1 text-lg font-bold">{product.name}</h3>
                    <p className="text-lg font-bold">${product.price}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex justify-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
