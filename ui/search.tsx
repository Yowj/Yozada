"use client";

import { cn } from "@/lib/utils";
import { Search as SearchIcon, X } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { useProducts } from "@/lib/contexts/ProductsProvider";
import { Product } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function Search({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { products } = useProducts();

  const handleSearch = useDebouncedCallback((term: string) => {
    if (term === "") {
      setFilteredProducts([]);
      setIsOpen(false);
      return;
    }
    const data = products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(data);
    setIsOpen(true);
  }, 300);

  const handleClear = () => {
    setQuery("");
    setFilteredProducts([]);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative flex flex-1 shrink-0", className)}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      {/* Search Input */}
      <div className="relative w-full">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          id="search"
          type="text"
          value={query}
          placeholder="Search products..."
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          onFocus={() => filteredProducts.length > 0 && setIsOpen(true)}
          className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && filteredProducts.length > 0 && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-lg border border-border bg-background shadow-lg">
          <ul className="max-h-96 overflow-y-auto py-2">
            {filteredProducts.map((product) => (
              <li key={product.id}>
                <a
                  href={`/products/${product.id}`}
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted"
                  onClick={() => setIsOpen(false)}
                >
                  {/* Product Image */}
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {product.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {product.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-foreground">
                      ₱{product.price.toLocaleString()}
                    </p>
                    {product.badge && (
                      <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {product.badge}
                      </span>
                    )}
                  </div>
                </a>
              </li>
            ))}
          </ul>

          {/* Results Count */}
          <div className="border-t border-border px-4 py-2">
            <p className="text-xs text-muted-foreground">
              {filteredProducts.length} result{filteredProducts.length !== 1 && "s"} found
            </p>
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query && filteredProducts.length === 0 && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-lg border border-border bg-background p-4 shadow-lg">
          <p className="text-center text-sm text-muted-foreground">
            No products found for &quot;{query}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
