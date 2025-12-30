import { createClient } from '@/lib/supabase/server'
import type { CartItemWithProduct } from '@/lib/types'

/**
 * Get all cart items for a user with product details
 */
export async function getCartItems(userId: string): Promise<CartItemWithProduct[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      *,
      product:products (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching cart items:', error)
    return []
  }

  return (data || []) as CartItemWithProduct[]
}

/**
 * Get total item count in cart (sum of quantities)
 */
export async function getCartItemCount(userId: string): Promise<number> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('cart_items')
    .select('quantity')
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching cart count:', error)
    return 0
  }

  return data.reduce((total, item) => total + item.quantity, 0)
}

/**
 * Calculate cart total price
 */
export async function getCartTotal(userId: string): Promise<number> {
  const cartItems = await getCartItems(userId)

  return cartItems.reduce((sum, item) => {
    const price = typeof item.product.price === 'number'
      ? item.product.price
      : parseFloat(String(item.product.price).replace('$', ''))
    return sum + (price * item.quantity)
  }, 0)
}

/**
 * Format cart total as currency string
 */
export async function getCartTotalFormatted(userId: string): Promise<string> {
  const total = await getCartTotal(userId)
  return `$${total.toFixed(2)}`
}
