import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getFeaturedProducts, getProducts } from "@/lib/queries";
import { HeroSection } from "@/components/hero-section";
import { BenefitsSection } from "@/components/benefits-section";
import { CategoryShowcase } from "@/components/category-showcase";
import { FeaturedProducts } from "@/components/featured-products";
import { ProductCard } from "@/components/product-card";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const products = await getProducts();

  return (
    <>
      <main className="min-h-screen flex flex-col">
        <Navbar />

        {/* Hero Section */}
        <HeroSection
          featuredProducts={
            featuredProducts.length > 0 ? featuredProducts.slice(0, 5) : products.slice(0, 5)
          }
        />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* Category Showcase */}
        <CategoryShowcase />

        {/* Featured Products Grid */}
        <FeaturedProducts
          products={featuredProducts.length > 0 ? featuredProducts : products.slice(0, 3)}
        />

        {/* All Products Section */}
        <section className="w-full bg-muted/30 px-4 py-12 md:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Shop Our Collection
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Discover quality products for every need
                </p>
              </div>
              <Button variant="outline" asChild className="hidden sm:flex">
                <Link href="/products">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-8 flex justify-center sm:hidden">
              <Button variant="outline" asChild>
                <Link href="/products">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Call to Action Section */}
        <section className="w-full px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Ready to Upgrade Your Lifestyle?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Join thousands of happy customers who trust Yozada for quality products. Start
              shopping today and experience the difference.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="group">
                <Link href="/products">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">About Us</Link>
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
