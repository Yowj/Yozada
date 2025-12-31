"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CartItemWithProduct } from "@/lib/types";

interface CheckoutOrderSummaryProps {
  cartItems: CartItemWithProduct[];
  subtotal: string;
}

export function CheckoutOrderSummary({ cartItems, subtotal }: CheckoutOrderSummaryProps) {
  const [promoExpanded, setPromoExpanded] = React.useState(false);
  const [promoCode, setPromoCode] = React.useState("");

  // Parse subtotal for calculations
  const subtotalNum = parseFloat(subtotal.replace("$", ""));

  // TODO: User should implement these calculations based on address/cart
  const shipping = 10.0;
  const tax = subtotalNum * 0.085; // 8.5% tax rate
  const discount = 0.0; // TODO: Calculate based on promo code
  const total = subtotalNum + shipping + tax - discount;

  function handleApplyPromo() {
    // TODO: User implements promo code validation
    console.log("Apply promo code:", promoCode);
  }

  return (
    <Card className="lg:sticky lg:top-20">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cart Items */}
        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
          {cartItems.map((item) => {
            const itemPrice = parseFloat(String(item.product.price).replace("$", ""));
            const itemTotal = itemPrice * item.quantity;

            return (
              <div key={item.id} className="flex gap-3">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-medium line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">
                    ${itemTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <Separator />

        {/* Promo Code */}
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-between p-0 h-auto font-normal"
            onClick={() => setPromoExpanded(!promoExpanded)}
          >
            <span className="text-sm">Have a promo code?</span>
            {promoExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>

          {promoExpanded && (
            <div className="flex gap-2">
              <Input
                placeholder="Enter code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={handleApplyPromo}
                disabled={!promoCode}
              >
                Apply
              </Button>
            </div>
          )}
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discount</span>
              <span className="font-medium text-green-600">
                -${discount.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between">
          <span className="text-base font-semibold">Total</span>
          <span className="text-xl font-bold text-primary">
            ${total.toFixed(2)}
          </span>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Free Returns</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Money-Back Guarantee</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
