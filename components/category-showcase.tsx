import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Electronics",
    href: "/category/electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop",
    description: "Latest gadgets & tech",
  },
  {
    name: "Clothing",
    href: "/category/clothing",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    description: "Trendy fashion essentials",
  },
  {
    name: "Home & Garden",
    href: "/category/home-garden",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    description: "Elevate your living space",
  },
];

export function CategoryShowcase() {
  return (
    <section className="w-full px-4 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            Shop by Category
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore our curated collections designed for every lifestyle
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="mb-1 text-xl font-bold md:text-2xl">{category.name}</h3>
                <p className="mb-3 text-sm text-white/80">{category.description}</p>
                <span className="inline-flex items-center text-sm font-medium transition-transform group-hover:translate-x-1">
                  Shop Now
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
