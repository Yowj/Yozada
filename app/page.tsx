import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { MarqueeDemo } from "@/components/marquee-demo";
import { getFeaturedProducts, getProducts } from "@/lib/products";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const products = await getProducts();
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section with Featured Products Grid */}
      <section className="w-full px-4 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2">
            {/* Large Featured Product - Spans 2 columns and 2 rows on desktop */}
            <Link
              href={`/product/${featuredProducts[0].id}`}
              className="group relative overflow-hidden rounded-xl md:col-span-2 md:row-span-2"
            >
              <Card className="h-full border-0 transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="relative h-[400px] md:h-full">
                  <Image
                    src={featuredProducts[0].image}
                    alt={featuredProducts[0].name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    {featuredProducts[0].badge && (
                      <Badge className="mb-2 bg-primary">{featuredProducts[0].badge}</Badge>
                    )}
                    <h3 className="text-2xl font-bold md:text-3xl">{featuredProducts[0].name}</h3>
                    <p className="mt-2 text-xl font-semibold">{featuredProducts[0].price}</p>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Two Smaller Featured Products */}
            {featuredProducts.slice(1).map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group relative overflow-hidden rounded-xl"
              >
                <Card className="h-full border-0 transition-transform duration-300 group-hover:scale-[1.02]">
                  <div className="relative h-[200px] md:h-[196px]">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      {product.badge && (
                        <Badge className="mb-2 bg-primary text-xs">{product.badge}</Badge>
                      )}
                      <h3 className="text-lg font-bold">{product.name}</h3>
                      <p className="mt-1 text-sm font-semibold">{product.price}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="w-full bg-muted/30 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Shop Our Collection</h2>
            <Button variant="outline" asChild>
              <Link href="/products">View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group">
                <Card className="overflow-hidden border-0 transition-all duration-300 hover:shadow-lg">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {product.badge && (
                      <Badge className="absolute right-2 top-2 bg-primary">{product.badge}</Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 line-clamp-2 text-sm font-semibold md:text-base">
                      {product.name}
                    </h3>
                    <p className="font-bold text-primary">{product.price}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-16 md:py-24">
        <MarqueeDemo />
      </section>

      {/* Call to Action Section */}
      <section className="w-full px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Discover Quality Products
          </h2>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Explore our curated collection of premium products designed for modern living. Free
            shipping on orders over $50.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
