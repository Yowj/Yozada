import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import {
  getProducts,
  getProductsByCategory,
  getSaleProducts,
  getNewArrivals,
  getBestSellers,
} from "@/lib/queries";
import { Search, SlidersHorizontal, ArrowLeft, Sparkles, Tag, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Collection metadata
const collectionsMeta: Record<string, {
  name: string;
  description: string;
  longDescription: string;
  icon: "sparkles" | "tag" | "trending" | "clock";
  gradient: string;
}> = {
  electronics: {
    name: "Electronics",
    description: "Latest gadgets & tech",
    longDescription: "Discover cutting-edge electronics and gadgets. From smartphones to smart home devices, find the latest tech to enhance your digital lifestyle.",
    icon: "sparkles",
    gradient: "from-blue-600 to-purple-600",
  },
  clothing: {
    name: "Clothing",
    description: "Trendy fashion essentials",
    longDescription: "Explore our curated selection of fashionable clothing. From casual everyday wear to statement pieces, find styles that express your unique personality.",
    icon: "sparkles",
    gradient: "from-pink-600 to-rose-600",
  },
  "home-garden": {
    name: "Home & Garden",
    description: "Elevate your living space",
    longDescription: "Transform your home with our premium home décor and garden accessories. Create spaces that inspire comfort and style.",
    icon: "sparkles",
    gradient: "from-green-600 to-emerald-600",
  },
  "new-arrivals": {
    name: "New Arrivals",
    description: "Fresh products just in",
    longDescription: "Be the first to discover our newest additions. Shop the latest products and stay ahead of the trends.",
    icon: "clock",
    gradient: "from-amber-600 to-orange-600",
  },
  "best-sellers": {
    name: "Best Sellers",
    description: "Customer favorites",
    longDescription: "Shop our most popular products loved by thousands of customers. These tried-and-true favorites are sure to impress.",
    icon: "trending",
    gradient: "from-violet-600 to-indigo-600",
  },
  sale: {
    name: "Sale",
    description: "Amazing deals await",
    longDescription: "Don't miss out on incredible savings. Shop our sale collection for premium products at unbeatable prices.",
    icon: "tag",
    gradient: "from-red-600 to-pink-600",
  },
};

const IconComponent = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "tag":
      return <Tag className="h-5 w-5 text-white" />;
    case "trending":
      return <TrendingUp className="h-5 w-5 text-white" />;
    case "clock":
      return <Clock className="h-5 w-5 text-white" />;
    default:
      return <Sparkles className="h-5 w-5 text-white" />;
  }
};

async function getCollectionProducts(slug: string) {
  switch (slug) {
    case "electronics":
      return getProductsByCategory("electronics");
    case "clothing":
      return getProductsByCategory("clothing");
    case "home-garden":
      return getProductsByCategory("home");
    case "new-arrivals":
      const newArrivals = await getNewArrivals();
      if (newArrivals.length === 0) {
        // Fallback to all products if no new arrivals
        const allProducts = await getProducts();
        return allProducts.slice(0, 20);
      }
      return newArrivals;
    case "best-sellers":
      const bestSellers = await getBestSellers();
      if (bestSellers.length === 0) {
        // Fallback to featured or all products
        const allProducts = await getProducts();
        return allProducts.slice(0, 20);
      }
      return bestSellers;
    case "sale":
      const saleProducts = await getSaleProducts();
      if (saleProducts.length === 0) {
        // Fallback to all products
        const allProducts = await getProducts();
        return allProducts.filter(p => p.badge?.toLowerCase().includes("sale")).slice(0, 20);
      }
      return saleProducts;
    default:
      return [];
  }
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = collectionsMeta[slug];

  if (!meta) {
    notFound();
  }

  const products = await getCollectionProducts(slug);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        {/* Page Header */}
        <div className="relative overflow-hidden border-b bg-gradient-to-br from-background via-muted/30 to-background">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-8 md:py-12">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/collections" className="hover:text-foreground transition-colors">
                Collections
              </Link>
              <span>/</span>
              <span className="text-foreground">{meta.name}</span>
            </nav>

            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${meta.gradient}`}>
                    <IconComponent icon={meta.icon} />
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    {meta.description}
                  </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  {meta.name}
                </h1>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  {meta.longDescription}
                </p>
              </div>

              <Link href="/collections">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  All Collections
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Filters Bar */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="search" placeholder="Search in collection..." className="pl-10" />
              </div>
              <Button variant="outline" size="icon" className="shrink-0">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              {products.length} {products.length === 1 ? "product" : "products"} found
            </p>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${meta.gradient} opacity-50`}>
                <IconComponent icon={meta.icon} />
              </div>
              <p className="text-xl font-semibold">No products found</p>
              <p className="mt-2 text-muted-foreground">
                Check back later for new additions to this collection
              </p>
              <Link href="/collections" className="mt-6">
                <Button>Browse Other Collections</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = collectionsMeta[slug];

  if (!meta) {
    return {
      title: "Collection Not Found",
    };
  }

  return {
    title: `${meta.name} | Yozada Collections`,
    description: meta.longDescription,
  };
}

// Generate static params for better performance
export function generateStaticParams() {
  return Object.keys(collectionsMeta).map((slug) => ({
    slug,
  }));
}
