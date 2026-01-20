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
 * Fetch products by category
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("category", category)
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }

  return (data || []) as Product[];
}

/**
 * Fetch products on sale (with "Sale" badge)
 */
export async function getSaleProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("badge", "%sale%")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching sale products:", error);
    return [];
  }

  return (data || []) as Product[];
}

/**
 * Fetch new arrivals (products with "New" badge or most recently created)
 */
export async function getNewArrivals(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or("badge.ilike.%new%,badge.ilike.%arrival%")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Error fetching new arrivals:", error);
    return [];
  }

  return (data || []) as Product[];
}

/**
 * Fetch best sellers (featured products or products with "Bestseller" badge)
 */
export async function getBestSellers(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or("featured.eq.true,badge.ilike.%bestseller%,badge.ilike.%best%")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching best sellers:", error);
    return [];
  }

  return (data || []) as Product[];
}
