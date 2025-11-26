"use client"

import { CartSidebar } from "./cart-sidebar"
import { useCart } from "@/lib/contexts/cart-context"

export function CartSidebarClient() {
  const { cartItems, isLoading } = useCart()

  if (isLoading) {
    return null // or a loading skeleton
  }

  return <CartSidebar cartItems={cartItems} />
}
