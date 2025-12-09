'use client'

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { addToCart } from "@/lib/actions/cart"
import { toast } from "sonner"
import { useState } from "react"
import { useCart } from "@/lib/contexts/cart-context"

interface AddToCartButtonProps {
  productId: number
  productName: string
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { refreshCart } = useCart()

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      const result = await addToCart(productId, 1)

      if (result.success) {
        toast.success(result.message || 'Added to cart!')
        await refreshCart()
      } else {
        toast.error(result.error || 'Failed to add to cart')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </Button>
  )
}
