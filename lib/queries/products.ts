import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";

/**
 * Fetch all products ordered by ID
 */
export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return (data || []) as Product[];
}

/**
 * Fetch only featured products
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true)
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  return (data || []) as Product[];
}

/**
 * Fetch a single product by ID
 * Returns null if not found
 */
export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("products").select("*").eq("id", id).single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data as Product;
}

/**
 * Search products by name or description
 * Uses case-insensitive pattern matching
 */
export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) {
    return []
  }

  const supabase = await createClient()
  const searchTerm = `%${query.trim()}%`

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`)
    .order('name', { ascending: true })
    .limit(10)

  if (error) {
    console.error('Error searching products:', error)
    return []
  }

  return (data || []) as Product[]
}
