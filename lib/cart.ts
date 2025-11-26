import { createClient } from '@/lib/supabase/server'
import { CartItemWithProduct } from '@/lib/types'

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
 * Get cart item count for a user
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

  // Sum up all quantities
  return data.reduce((total, item) => total + item.quantity, 0)
}

/**
 * Get cart total price
 */
export async function getCartTotal(userId: string): Promise<string> {
  const cartItems = await getCartItems(userId)

  const total = cartItems.reduce((sum, item) => {
    // Remove $ and convert to number
    const price = parseFloat(item.product.price.replace('$', ''))
    return sum + (price * item.quantity)
  }, 0)

  return `$${total.toFixed(2)}`
}
