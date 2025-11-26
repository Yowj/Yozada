import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProductById, getProducts } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { notFound } from "next/navigation";
import { AddToCartButton } from "./add-to-cart-button";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await getProductById(parseInt(id));
  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 px-4 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          {/* Product Details */}
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            {/* Product Image */}
            <Card className="overflow-hidden border-0">
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.badge && (
                  <Badge className="absolute right-4 top-4 bg-primary text-primary-foreground">
                    {product.badge}
                  </Badge>
                )}
              </div>
            </Card>

            {/* Product Info */}
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(128 reviews)</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-primary">${product.price}</div>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold">Description</h3>
                  <p className="text-muted-foreground">
                    Premium quality {product.name.toLowerCase()} crafted with attention to detail.
                    Perfect for everyday use and built to last. Made from high-quality materials
                    that ensure durability and comfort.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold">Features</h3>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                    <li>Premium quality materials</li>
                    <li>Durable construction</li>
                    <li>Modern design</li>
                    <li>Easy to maintain</li>
                  </ul>
                </div>
              </div>

              <div className="mt-auto space-y-3">
                <AddToCartButton productId={product.id} productName={product.name} />
                <Button size="lg" variant="outline" className="w-full">
                  Buy Now
                </Button>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">Shipping Information</h3>
                <p className="text-sm text-muted-foreground">
                  Free shipping on orders over $50. Estimated delivery: 3-5 business days.
                </p>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">You May Also Like</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
              {allProducts
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/product/${relatedProduct.id}`}
                    className="group"
                  >
                    <Card className="overflow-hidden border-0 transition-all duration-300 hover:shadow-lg">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {relatedProduct.badge && (
                          <Badge className="absolute right-2 top-2 bg-primary text-primary-foreground">
                            {relatedProduct.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="mb-1 line-clamp-2 text-sm font-semibold md:text-base">
                          {relatedProduct.name}
                        </h3>
                        <p className="font-bold text-primary">${relatedProduct.price}</p>
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
