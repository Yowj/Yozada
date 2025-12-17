"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  badge?: string;
  featured?: boolean;
  description?: string;
  category?: string;
  stock?: number;
  created_at?: string;
  updated_at?: string;
}

export async function getProducts() {
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

export async function getFeaturedProducts() {
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

export async function getProductById(id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data as Product;
}

export async function addProduct(formData: FormData) {
  const supabase = await createClient();

  try {
    // ✅ Extract file from FormData
    const imageFile = formData.get("image") as File;

    // ✅ Validate file
    if (!imageFile || imageFile.size === 0) {
      return { success: false, error: "Please select an image" };
    }

    if (!imageFile.type.startsWith("image/")) {
      return { success: false, error: "Selected file is not an image" };
    }

    // ✅ Upload to Supabase Storage
    const fileName = `${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("product_images")
      .upload(fileName, imageFile);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return { success: false, error: "Failed to upload image" };
    }

    // ✅ Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("product_images").getPublicUrl(fileName);

    // ✅ Extract other form fields
    const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      stock: parseInt(formData.get("stock") as string),
      category: formData.get("category") as string,
      image: publicUrl, // ✅ Now a valid URL string
      badge: (formData.get("badge") as string) || null,
      featured: formData.get("featured") === "on",
    };

    // ✅ Insert to database
    const { error: insertError } = await supabase.from("products").insert(productData);

    if (insertError) {
      console.error("Insert error:", insertError);
      return { success: false, error: "Failed to save product" };
    }

    revalidatePath("/admin/products");

    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "Something went wrong" };
  }
}
