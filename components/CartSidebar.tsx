"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/ui/sheet";
import { Separator } from "@/ui/separator";
import { removeFromCart, updateCartItemQuantity } from "@/lib/actions/cart";
import { useCart } from "@/lib/contexts/cart-context";

export function CartSidebar() {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<number | null>(null);
  const { cartItems, refreshCart, updateItemOptimistically, removeItemOptimistically } = useCart();

  async function handleUpdateQuantity(cartItemId: number, newQuantity: number) {
    setIsLoading(cartItemId);

    // Optimistic update - instant UI feedback
    updateItemOptimistically(cartItemId, newQuantity);

    const result = await updateCartItemQuantity(cartItemId, newQuantity);

    if (result.success) {
      // Sync with server to ensure consistency
      await refreshCart();
    } else {
      // Revert optimistic update on error
      await refreshCart();
    }

    setIsLoading(null);
  }

  async function handleRemove(cartItemId: number) {
    setIsLoading(cartItemId);

    // Optimistic update - instant UI feedback
    removeItemOptimistically(cartItemId);

    const result = await removeFromCart(cartItemId);

    if (result.success) {
      // Sync with server
      await refreshCart();
    } else {
      // Revert optimistic update on error
      await refreshCart();
    }

    setIsLoading(null);
  }

  const currentTotal = React.useMemo(() => {
    const total = cartItems.reduce((sum, item) => {
      // Ensure price is a string before calling replace
      const priceString = String(item.product.price);
      const price = parseFloat(priceString.replace("$", ""));
      return sum + price * item.quantity;
    }, 0);
    return `$${total.toFixed(2)}`;
  }, [cartItems]);

  const currentCount = React.useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {currentCount > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
              {currentCount}
            </Badge>
          )}
          <span className="sr-only">Shopping cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg p-4">
        <SheetHeader>
          <SheetTitle>
            Shopping Cart ({currentCount} {currentCount === 1 ? "item" : "items"})
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center space-y-4">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <p className="text-center text-muted-foreground">Your cart is empty</p>
            <Button onClick={() => setOpen(false)} asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto pr-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative h-24 w-24 overflow-hidden rounded-md border">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      {item.product.badge && (
                        <Badge className="absolute right-1 top-1 text-[10px]">
                          {item.product.badge}
                        </Badge>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-semibold line-clamp-2">{item.product.name}</h4>
                        <p className="text-sm font-bold text-primary">${item.product.price}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-md border">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={isLoading === item.id}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={isLoading === item.id}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleRemove(item.id)}
                          disabled={isLoading === item.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Subtotal</span>
                <span>{currentTotal}</span>
              </div>

              <p className="text-sm text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout" onClick={() => setOpen(false)}>
                    Proceed to Checkout
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
