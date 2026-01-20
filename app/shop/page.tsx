import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getProducts } from "@/lib/queries";
import { ShopContent } from "./shop-content";

export const metadata = {
  title: "Shop All Products | Yozada",
  description: "Browse our complete collection of premium products. Filter by category, price, and more.",
};

export default async function ShopPage() {
  const products = await getProducts();

  // Extract unique categories from products
  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  ) as string[];

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <ShopContent products={products} categories={categories} />
      <Footer />
    </main>
  );
}
