"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/server";
import type { Product } from "@/lib/types";

/**
 * Add a new product (Admin only)
 */
export async function addProduct(formData: FormData) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Unauthorized: Admin access required" };
  }

  const supabase = await createClient();

  // Extract and validate form data
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const stock = formData.get("stock") as string;
  const category = formData.get("category") as string;
  const badge = formData.get("badge") as string | null;
  const featured = formData.get("featured") === "on";
  const imageFile = formData.get("image") as File;

  // Basic validation
  if (!name || !price || !stock) {
    return { success: false, error: "Name, price, and stock are required" };
  }

  // Handle image upload
  let imageUrl = "";
  if (imageFile && imageFile.size > 0) {
    // Validate file type
    if (!imageFile.type.startsWith("image/")) {
      return { success: false, error: "File must be an image" };
    }

    // Validate file size (max 5MB)
    if (imageFile.size > 5 * 1024 * 1024) {
      return { success: false, error: "Image must be less than 5MB" };
    }

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("product_images")
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      return { success: false, error: "Failed to upload image" };
    }

    const { data: urlData } = supabase.storage.from("product_images").getPublicUrl(filePath);

    imageUrl = urlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("products")
    .insert({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      category,
      image: imageUrl,
      featured,
      badge: badge || null,
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding product:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");

  return { success: true, data: data as Product };
}

/**
 * Update an existing product (Admin only)
 */
export async function updateProduct(id: number, formData: FormData) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Unauthorized: Admin access required" };
  }

  const supabase = await createClient();

  const updates: Record<string, unknown> = {};

  // Only include fields that were provided
  const name = formData.get("name");
  const description = formData.get("description");
  const price = formData.get("price");
  const stock = formData.get("stock");
  const category = formData.get("category");
  const badge = formData.get("badge");
  const featured = formData.get("featured");

  if (name) updates.name = name as string;
  if (description) updates.description = description as string;
  if (price) updates.price = parseFloat(price as string);
  if (stock) updates.stock = parseInt(stock as string, 10);
  if (category) updates.category = category as string;
  // Handle badge - empty string should clear badge, only skip if not provided at all
  if (badge !== null && badge !== undefined) {
    updates.badge = (badge as string).trim() || null;
  }
  if (featured !== null) updates.featured = featured === "on";

  // Handle image upload if new image provided
  const imageFile = formData.get("image") as File;
  if (imageFile && imageFile.size > 0) {
    if (!imageFile.type.startsWith("image/")) {
      return { success: false, error: "File must be an image" };
    }

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("product_images")
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      return { success: false, error: "Failed to upload image" };
    }

    const { data: urlData } = supabase.storage.from("product_images").getPublicUrl(filePath);

    updates.image = urlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating product:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath(`/product/${id}`);
  revalidatePath("/admin/products");

  return { success: true, data: data as Product };
}

/**
 * Delete a product (Admin only)
 */
export async function deleteProduct(id: number) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Unauthorized: Admin access required" };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");

  return { success: true };
}

/**
 * Update product badges in bulk (Admin only)
 */
export async function updateProductBadges(updates: { id: number; badge: string | null }[]) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Unauthorized: Admin access required" };
  }

  const supabase = await createClient();

  for (const update of updates) {
    const { error } = await supabase
      .from("products")
      .update({ badge: update.badge })
      .eq("id", update.id);

    if (error) {
      console.error(`Error updating product ${update.id}:`, error);
      return { success: false, error: error.message };
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/products");

  return { success: true, message: "Badges updated successfully" };
}
