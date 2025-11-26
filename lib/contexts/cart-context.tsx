"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"
import { CartItemWithProduct } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"

interface CartContextType {
  cartItems: CartItemWithProduct[]
  isLoading: boolean
  error: string | null
  refreshCart: () => Promise<void>
  addItemOptimistically: (item: CartItemWithProduct) => void
  updateItemOptimistically: (id: number, quantity: number) => void
  removeItemOptimistically: (id: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadCartData = useCallback(async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setCartItems([])
        setIsLoading(false)
        return
      }

      // Fetch cart items with product details
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          product:products (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching cart:', error)
        setError(error.message)
        setIsLoading(false)
        return
      }

      const items = (data || []) as CartItemWithProduct[]
      setCartItems(items)
      setError(null)
      setIsLoading(false)
    } catch (error) {
      console.error('Error loading cart:', error)
      setError('Failed to load cart')
      setIsLoading(false)
    }
  }, [])

  // Load cart data on mount
  useEffect(() => {
    loadCartData()
  }, [loadCartData])

  // Public method to refresh cart
  const refreshCart = useCallback(async () => {
    await loadCartData()
  }, [loadCartData])

  // Optimistically add item to cart
  const addItemOptimistically = useCallback((item: CartItemWithProduct) => {
    setCartItems((prev) => {
      // Check if item already exists
      const existingIndex = prev.findIndex((i) => i.product_id === item.product_id)

      if (existingIndex >= 0) {
        // Update quantity of existing item
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + item.quantity
        }
        return updated
      }

      // Add new item
      return [item, ...prev]
    })
  }, [])

  // Optimistically update item quantity
  const updateItemOptimistically = useCallback((id: number, quantity: number) => {
    setCartItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.id !== id)
      }
      return prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    })
  }, [])

  // Optimistically remove item
  const removeItemOptimistically = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const value: CartContextType = {
    cartItems,
    isLoading,
    error,
    refreshCart,
    addItemOptimistically,
    updateItemOptimistically,
    removeItemOptimistically
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
