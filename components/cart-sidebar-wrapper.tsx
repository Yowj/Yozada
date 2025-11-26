import { createClient } from "@/lib/supabase/server";
import { getCartItems } from "@/lib/cart";
import { CartSidebar } from "./cart-sidebar";

export async function CartSidebarWrapper() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <CartSidebar cartItems={[]} />;
  }
  const cartItems = await getCartItems(user.id);
  console.log("This is my id:", cartItems);
  return <CartSidebar cartItems={cartItems} />;
}
