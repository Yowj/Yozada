// app/providers/ProductsProvider.tsx
"use client";
import { createContext, useContext } from "react";
import { Product } from "../types";

interface ProductsContextType {
  products: Product[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({
  children,
  products,
}: {
  children: React.ReactNode;
  products: Product[];
}) {
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider');
  }
  return context;
}