"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Add item to cart or increment quantity if already exists
 * Validates stock availability before adding
 */
export async function addToCart(productId: number, quantity: number = 1) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Please login to add items to cart" };
  }

  // Check product stock
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("stock, name")
    .eq("id", productId)
    .single();

  if (productError || !product) {
    return { success: false, error: "Product not found" };
  }

  // Get existing cart item to check total quantity
  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .maybeSingle();

  const currentQuantity = existingItem?.quantity || 0;
  const totalQuantity = currentQuantity + quantity;

  // Validate stock
  if (product.stock !== null && totalQuantity > product.stock) {
    return {
      success: false,
      error: `Only ${product.stock} items available in stock`,
    };
  }

  if (existingItem) {
    // Update existing item quantity
    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity: totalQuantity })
      .eq("id", existingItem.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating cart item:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/cart");
    revalidatePath("/");
    return { success: true, data, message: "Cart updated!" };
  }

  // Create new cart item
  const { data, error } = await supabase
    .from("cart_items")
    .insert({
      user_id: user.id,
      product_id: productId,
      quantity: quantity,
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding to cart:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/cart");
  revalidatePath("/");
  return { success: true, data, message: "Added to cart!" };
}

/**
 * Remove item from cart completely
 */
export async function removeFromCart(cartItemId: number) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error removing from cart:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/cart");
  revalidatePath("/");
  return { success: true, message: "Item removed from cart" };
}

/**
 * Update quantity of a cart item
 * Validates stock availability
 */
export async function updateCartItemQuantity(cartItemId: number, quantity: number) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Unauthorized" };
  }

  // Remove if quantity is 0 or less
  if (quantity <= 0) {
    return await removeFromCart(cartItemId);
  }

  // Get cart item with product info for stock check
  const { data: cartItem, error: cartError } = await supabase
    .from("cart_items")
    .select("product_id, products(stock, name)")
    .eq("id", cartItemId)
    .eq("user_id", user.id)
    .single();

  if (cartError || !cartItem) {
    return { success: false, error: "Cart item not found" };
  }

  // Check stock if available
  // Supabase returns nested relations - handle both array and object formats
  const productData = cartItem.products;
  const product = Array.isArray(productData) ? productData[0] : productData;
  if (product?.stock !== null && product?.stock !== undefined && quantity > product.stock) {
    return {
      success: false,
      error: `Only ${product.stock} items available in stock`,
    };
  }

  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", cartItemId)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating quantity:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/cart");
  revalidatePath("/");
  return { success: true, data, message: "Quantity updated" };
}

/**
 * Clear all items from cart
 */
export async function clearCart() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Unauthorized" };
  }

  const { error } = await supabase.from("cart_items").delete().eq("user_id", user.id);

  if (error) {
    console.error("Error clearing cart:", error);
    return { success: false, error: error.message };
  }
  return { success: true, message: "Cart cleared" };
}

/**
 * Get cart item by product ID for current user
 */
export async function getCartItemByProduct(productId: number) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  const { data, error } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching cart item by product:", error);
    return null;
  }

  return data;
}
