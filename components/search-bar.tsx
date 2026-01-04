"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  className,
  placeholder = "Search products...",
  autoFocus = false,
}: SearchBarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const searchProducts = React.useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const supabase = createClient();
      const searchTerm = `%${searchQuery.trim()}%`;

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`)
        .order("name", { ascending: true })
        .limit(8);

      if (error) {
        console.error("Error searching products:", error);
        setResults([]);
      } else {
        setResults((data || []) as Product[]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isOpen) {
        searchProducts(query);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, isOpen, searchProducts]);

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  const handleProductClick = (productId: number) => {
    handleClose();
    router.push(`/product/${productId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  return (
    <>
      {/* Search Input Trigger */}
      <div className={className}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={placeholder}
            className="w-full pl-10 cursor-pointer"
            onClick={handleInputClick}
            onFocus={handleInputClick}
            readOnly
            autoFocus={autoFocus}
          />
        </div>
      </div>

      {/* Search Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl gap-0 p-0">
          <DialogHeader className="border-b p-4">
            <DialogTitle className="sr-only">Search Products</DialogTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="search"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 pr-10"
                autoFocus
              />
              {query && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                  onClick={() => setQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </DialogHeader>

          {/* Search Results */}
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : query && results.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <p>No products found for &ldquo;{query}&rdquo;</p>
                <p className="mt-1 text-sm">Try a different search term</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-1">
                {results.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="flex w-full items-center gap-4 rounded-lg p-3 text-left transition-colors hover:bg-accent"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-2">
                        <h4 className="truncate font-medium">
                          {product.name}
                        </h4>
                        {product.badge && (
                          <Badge variant="secondary" className="flex-shrink-0 text-xs">
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm font-semibold">
                        ${product.price}
                      </p>
                      {product.category && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {product.category}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <Search className="mx-auto h-8 w-8 mb-2 opacity-50" />
                <p>Start typing to search products</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {results.length > 0 && (
            <div className="border-t p-3">
              <Link
                href={`/products?search=${encodeURIComponent(query)}`}
                onClick={handleClose}
                className="block text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                View all results for &ldquo;{query}&rdquo;
              </Link>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
