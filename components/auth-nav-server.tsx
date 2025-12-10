import { createClient } from "@/lib/supabase/server";
import { AuthNavClient } from "./auth-nav-client";

export async function AuthNavServer() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  let user = null;

  if (data?.user) {
    // Check admin status
    const { data: userData } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', data.user.id)
      .single();

    user = {
      email: data.user.email || "",
      isAdmin: userData?.is_admin ?? false,
    };
  }

  return <AuthNavClient user={user} />;
}
