import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/ui/button";
import Link from "next/link";
import { getFeaturedProducts, getProducts } from "@/lib/queries";
import { HeroSection } from "@/components/Hero";
import { BenefitsSection } from "@/components/BenefitsSection";
import { CategoryShowcase } from "@/components/category-showcase";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { ProductCard } from "@/components/product-card";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ArrowRight, Sparkles } from "lucide-react";
import { CtaSection } from "@/components/CtaSection";
import Collection from "@/components/Collection";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const products = await getProducts();

  return (
    <>
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <HeroSection
          featuredProducts={
            featuredProducts.length > 0 ? featuredProducts.slice(0, 5) : products.slice(0, 5)
          }
        />
        <BenefitsSection />
        <CategoryShowcase />
        <FeaturedProducts
          products={featuredProducts.length > 0 ? featuredProducts : products.slice(0, 3)}
        />
        <Collection products={products} />

        <TestimonialsSection />
        <CtaSection />

        <Footer />
      </main>
    </>
  );
}
