import { createClient } from "@/lib/supabase/client";

/**
 * Client-side admin check
 * For UI purposes only - actual security is enforced server-side
 */
export async function checkIsAdmin(): Promise<boolean> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const { data, error } = await supabase
    .from("users")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error checking admin status:", error);
    return false;
  }

  return data?.is_admin ?? false;
}

/**
 * Get current user on client side
 */
export async function getCurrentUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
