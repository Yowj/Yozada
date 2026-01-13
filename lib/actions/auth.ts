"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Server action for user login
 * Handles authentication and automatic page refresh
 */
export async function loginUser(email: string, password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // Revalidate the entire layout to refresh auth state everywhere
  revalidatePath("/", "layout");

  // Server-side redirect
  redirect("/");
}

/**
 * Server action for user logout
 * Handles sign out and automatic page refresh
 */
export async function logoutUser() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  // Revalidate the entire layout to refresh auth state everywhere
  revalidatePath("/", "layout");

  // Server-side redirect to home
  redirect("/auth/login");
}
