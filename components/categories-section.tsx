import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ShoppingBag, Shirt, Watch, Smartphone, Home, Sparkles } from "lucide-react";

interface Category {
  id: number;
  name: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Fashion",
    icon: <Shirt className="h-8 w-8" />,
    href: "/products?category=fashion",
    color: "bg-pink-500",
  },
  {
    id: 2,
    name: "Electronics",
    icon: <Smartphone className="h-8 w-8" />,
    href: "/products?category=electronics",
    color: "bg-blue-500",
  },
  {
    id: 3,
    name: "Accessories",
    icon: <Watch className="h-8 w-8" />,
    href: "/products?category=accessories",
    color: "bg-purple-500",
  },
  {
    id: 4,
    name: "Home & Living",
    icon: <Home className="h-8 w-8" />,
    href: "/products?category=home",
    color: "bg-green-500",
  },
  {
    id: 5,
    name: "Beauty",
    icon: <Sparkles className="h-8 w-8" />,
    href: "/products?category=beauty",
    color: "bg-orange-500",
  },
  {
    id: 6,
    name: "All Products",
    icon: <ShoppingBag className="h-8 w-8" />,
    href: "/products",
    color: "bg-gray-700",
  },
];

export function CategoriesSection() {
  return (
    <section className="w-full px-4 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
          <p className="mt-2 text-muted-foreground">
            Browse our wide selection of products across different categories
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link key={category.id} href={category.href} className="group">
              <Card className="h-full overflow-hidden border-0 bg-muted/50 transition-all duration-300 hover:shadow-lg hover:scale-105">
                <div className="flex flex-col items-center justify-center p-6 md:p-8">
                  <div
                    className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${category.color} text-white transition-transform group-hover:scale-110`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-center text-sm font-semibold md:text-base">
                    {category.name}
                  </h3>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
