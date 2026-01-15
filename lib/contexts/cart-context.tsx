"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { CartItemWithProduct } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

interface CartContextType {
  cartItems: CartItemWithProduct[];
  isLoading: boolean;
  error: string | null;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCartData = useCallback(async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setCartItems([]);
        setIsLoading(false);
        return;
      }

      // Fetch cart items with product details
      const { data, error } = await supabase
        .from("cart_items")
        .select(
          `
          *,
          product:products (*)
        `
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching cart:", error);
        setError(error.message);
        setIsLoading(false);
        return;
      }

      const items = (data || []) as CartItemWithProduct[];
      setCartItems(items);
      setError(null);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading cart:", error);
      setError("Failed to load cart");
      setIsLoading(false);
    }
  }, []);

  // Load cart data on mount
  useEffect(() => {
    loadCartData();
  }, [loadCartData]);

  const refreshCart = useCallback(async () => {
    await loadCartData();
  }, [loadCartData]);

  const value: CartContextType = {
    cartItems,
    isLoading,
    error,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
