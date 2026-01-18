"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Server action for user login
 */
export async function loginUser(email: string, password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/");
}

/**
 * Server action for user signup
 */
export async function signupUser(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    const { error: insertError } = await supabase.from("users").insert({
      id: data.user.id,
    });

    if (insertError) {
      return { error: insertError.message };
    }
  }

  redirect("/");
}

/**
 * Server action for forgot password
 */
export async function forgotPassword(email: string) {
  const supabase = await createClient();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${baseUrl}/auth/update-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

/**
 * Server action for updating password
 */
export async function updatePassword(password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: error.message };
  }

  redirect("/");
}

/**
 * Server action for user logout
 */
export async function logoutUser() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  // Revalidate the entire layout to refresh auth state everywhere
  revalidatePath("/", "layout");

  // Server-side redirect to home
  redirect("/auth/login");
}
