'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Add item to cart or increment quantity if already exists
 */
export async function addToCart(productId: number, quantity: number = 1) {
  const supabase = await createClient()

  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Please login to add items to cart' }
  }

  // First, try to get existing cart item
  const { data: existingItem, error: fetchError } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .maybeSingle()

  // Handle errors (but not "no rows" which is expected)
  if (fetchError) {
    console.error('Error fetching cart item:', fetchError)
    return { success: false, error: fetchError.message }
  }

  if (existingItem) {
    // Item already exists, update quantity
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: existingItem.quantity + quantity })
      .eq('id', existingItem.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating cart item:', error)
      return { success: false, error: error.message }
    }

    revalidatePath('/cart')
    revalidatePath('/')
    return { success: true, data, message: 'Cart updated!' }
  }

  // Item doesn't exist, create new cart item
  const { data, error } = await supabase
    .from('cart_items')
    .insert({
      user_id: user.id,
      product_id: productId,
      quantity: quantity,
    })
    .select()
    .single()

  if (error) {
    console.error('Error adding to cart:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/cart')
  revalidatePath('/')
  return { success: true, data, message: 'Added to cart!' }
}

/**
 * Remove item from cart completely
 */
export async function removeFromCart(cartItemId: number) {
  const supabase = await createClient()

  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId)
    .eq('user_id', user.id) // Security: ensure user owns this cart item

  if (error) {
    console.error('Error removing from cart:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/cart')
  revalidatePath('/')
  return { success: true, message: 'Item removed from cart' }
}

/**
 * Update quantity of a cart item
 */
export async function updateCartItemQuantity(cartItemId: number, quantity: number) {
  const supabase = await createClient()

  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  // If quantity is 0 or less, remove the item
  if (quantity <= 0) {
    return await removeFromCart(cartItemId)
  }

  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', cartItemId)
    .eq('user_id', user.id) // Security: ensure user owns this cart item
    .select()
    .single()

  if (error) {
    console.error('Error updating quantity:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/cart')
  revalidatePath('/')
  return { success: true, data, message: 'Quantity updated' }
}

/**
 * Clear all items from cart
 */
export async function clearCart() {
  const supabase = await createClient()

  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', user.id)

  if (error) {
    console.error('Error clearing cart:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/cart')
  revalidatePath('/')
  return { success: true, message: 'Cart cleared' }
}

/**
 * Get cart item by product ID for current user
 */
export async function getCartItemByProduct(productId: number) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return null
  }

  const { data, error } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .maybeSingle()

  if (error) {
    console.error('Error fetching cart item by product:', error)
    return null
  }

  return data
}
