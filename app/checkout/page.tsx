import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCartItems, getCartTotal } from "@/lib/cart";
import { CheckoutForm } from "@/components/checkout-form";
import { CheckoutOrderSummary } from "@/components/checkout-order-summary";

export const metadata = {
  title: "Checkout | E-Commerce Store",
  description: "Complete your purchase",
};

export default async function CheckoutPage() {
  const supabase = await createClient();

  // Get user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let cartItems = [];
  let subtotal = "$0.00";

  if (user) {
    cartItems = await getCartItems(user.id);
    subtotal = await getCartTotal(user.id);
  }

  // If cart is empty, redirect to products page
  if (cartItems.length === 0) {
    redirect("/products");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link
            href="/"
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/cart" className="hover:text-foreground transition-colors">
            Cart
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Checkout</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* Left Column: Checkout Form */}
          <div>
            <CheckoutForm />
          </div>

          {/* Right Column: Order Summary (Sticky on Desktop) */}
          <div>
            <CheckoutOrderSummary cartItems={cartItems} subtotal={subtotal} />
          </div>
        </div>
      </div>
    </div>
  );
}
