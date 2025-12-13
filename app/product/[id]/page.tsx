import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getProductById, getProducts } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Check,
  Heart,
  Share2,
} from "lucide-react";
import { notFound } from "next/navigation";
import { AddToCartButton } from "./add-to-cart-button";
import { AnnouncementBar } from "@/components/announcement-bar";
import { ProductCard } from "@/components/product-card";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const features = [
  "Premium quality materials",
  "Durable construction",
  "Modern design",
  "Easy to maintain",
  "Satisfaction guaranteed",
];

const trustBadges = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
];

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await getProductById(parseInt(id));
  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <>
      <AnnouncementBar />
      <main className="min-h-screen flex flex-col">
        <Navbar />

        <div className="flex-1">
          {/* Breadcrumb */}
          <div className="mx-auto max-w-7xl px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/products" className="hover:text-foreground transition-colors">
                Products
              </Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>
          </div>

          {/* Product Section */}
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Product Image */}
              <div className="space-y-4">
                <Card className="overflow-hidden border-0 bg-muted">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                    />
                    {product.badge && (
                      <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                </Card>
                {/* Thumbnail Gallery Placeholder */}
                <div className="hidden gap-2 sm:flex">
                  {[1, 2, 3, 4].map((i) => (
                    <button
                      key={i}
                      className={`relative aspect-square w-20 overflow-hidden rounded-lg border-2 transition-colors ${
                        i === 1 ? "border-primary" : "border-transparent hover:border-muted-foreground/50"
                      }`}
                    >
                      <Image
                        src={product.image}
                        alt={`${product.name} view ${i}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                {/* Back Button - Mobile */}
                <Button variant="ghost" asChild className="mb-4 w-fit lg:hidden">
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Link>
                </Button>

                {/* Category & Badge */}
                <div className="mb-2 flex items-center gap-2">
                  {product.category && (
                    <Link
                      href={`/category/${product.category.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {product.category}
                    </Link>
                  )}
                </div>

                {/* Title */}
                <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="font-medium">4.9</span>
                  <span className="text-muted-foreground">(128 reviews)</span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold">${product.price}</span>
                  {product.badge === "Sale" && (
                    <span className="ml-2 text-lg text-muted-foreground line-through">
                      ${(parseFloat(product.price) * 1.2).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description ||
                      `Premium quality ${product.name.toLowerCase()} crafted with attention to detail. Perfect for everyday use and built to last. Made from high-quality materials that ensure durability and comfort.`}
                  </p>
                </div>

                {/* Stock Status */}
                <div className="mb-6 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-green-600">In Stock</span>
                  {product.stock && (
                    <span className="text-sm text-muted-foreground">
                      ({product.stock} available)
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mb-8 flex flex-col gap-3 sm:flex-row">
                  <AddToCartButton productId={product.id} productName={product.name} />
                  <Button size="lg" variant="outline" className="flex-1 sm:flex-initial">
                    <Heart className="mr-2 h-5 w-5" />
                    Wishlist
                  </Button>
                  <Button size="lg" variant="ghost" className="sm:px-3">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                <Separator className="mb-6" />

                {/* Features */}
                <div className="mb-6">
                  <h3 className="mb-3 font-semibold">Features</h3>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="mb-6" />

                {/* Trust Badges */}
                <div className="grid gap-4 sm:grid-cols-3">
                  {trustBadges.map((badge) => (
                    <div key={badge.title} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <badge.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{badge.title}</p>
                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details Tabs - Simplified */}
            <div className="mt-16">
              <div className="rounded-xl border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">About This Product</h3>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p>
                    Experience premium quality with our {product.name.toLowerCase()}. This
                    product has been carefully designed and manufactured to meet the highest
                    standards of quality and durability.
                  </p>
                  <p className="mt-4">
                    Whether you&apos;re using it for everyday activities or special occasions, you can
                    trust that this product will deliver exceptional performance and style.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-16">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold tracking-tight">You May Also Like</h2>
                  <Button variant="outline" asChild className="hidden sm:flex">
                    <Link href="/products">View All</Link>
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
                  {relatedProducts.map((relatedProduct) => (
                    <ProductCard key={relatedProduct.id} product={relatedProduct} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
