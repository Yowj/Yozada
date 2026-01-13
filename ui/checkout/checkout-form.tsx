"use client";

import * as React from "react";
import { CreditCard, LoaderCircle, Lock, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldError } from "@/ui/field";
import { cn } from "@/lib/utils";
import type { PaymentMethod, ShippingAddress, FormErrors } from "@/lib/types/checkout";
import { clearCart } from "@/lib/actions/cart";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/contexts/cart-context";

export function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>("credit");
  const [showModal, setShowModal] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [errors, setErrors] = React.useState<FormErrors>({});

  const [shippingAddress, setShippingAddress] = React.useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "Philippines",
  });

  const router = useRouter();
  const { refreshCart } = useCart();

  const stepRefs = {
    contact: React.useRef<HTMLDivElement>(null),
    shipping: React.useRef<HTMLDivElement>(null),
    payment: React.useRef<HTMLDivElement>(null),
    review: React.useRef<HTMLDivElement>(null),
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowModal(true);
  }

  const handleConfirmOrder = async () => {
    setIsProcessing(true);
    const result = await clearCart();

    if (!result.success) {
      console.error("Error clearing cart:", result.error);
      setIsProcessing(false);
      return;
    }

    // Refresh cart context to sync with server state
    await refreshCart();

    router.push("/order-success");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Shipping Address */}
        <Card ref={stepRefs.shipping}>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="firstName">First Name *</FieldLabel>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={shippingAddress.firstName}
                    onChange={(e) => {
                      setShippingAddress({
                        ...shippingAddress,
                        firstName: e.target.value,
                      });
                      if (errors.firstName) {
                        setErrors({ ...errors, firstName: "" });
                      }
                    }}
                    className={cn(errors.firstName && "border-destructive")}
                    required
                  />
                  {errors.firstName && <FieldError>{errors.firstName}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="lastName">Last Name *</FieldLabel>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={shippingAddress.lastName}
                    onChange={(e) => {
                      setShippingAddress({
                        ...shippingAddress,
                        lastName: e.target.value,
                      });
                      if (errors.lastName) {
                        setErrors({ ...errors, lastName: "" });
                      }
                    }}
                    className={cn(errors.lastName && "border-destructive")}
                    required
                  />
                  {errors.lastName && <FieldError>{errors.lastName}</FieldError>}
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="address1">Address *</FieldLabel>
                <Input
                  id="address1"
                  placeholder="123 Mabini Street"
                  value={shippingAddress.address1}
                  onChange={(e) => {
                    setShippingAddress({
                      ...shippingAddress,
                      address1: e.target.value,
                    });
                    if (errors.address1) {
                      setErrors({ ...errors, address1: "" });
                    }
                  }}
                  className={cn(errors.address1 && "border-destructive")}
                  required
                />
                {errors.address1 && <FieldError>{errors.address1}</FieldError>}
              </Field>

              <Field>
                <FieldLabel htmlFor="address2">Apartment, suite, etc. (optional)</FieldLabel>
                <Input
                  id="address2"
                  autoComplete="address-line2"
                  placeholder="Unit 4B, Building 2"
                  value={shippingAddress.address2}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      address2: e.target.value,
                    })
                  }
                />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="city">City *</FieldLabel>
                  <Input
                    id="city"
                    autoComplete="address-level2"
                    placeholder="Quezon City"
                    value={shippingAddress.city}
                    onChange={(e) => {
                      setShippingAddress({
                        ...shippingAddress,
                        city: e.target.value,
                      });
                      if (errors.city) {
                        setErrors({ ...errors, city: "" });
                      }
                    }}
                    className={cn(errors.city && "border-destructive")}
                    required
                  />
                  {errors.city && <FieldError>{errors.city}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="state">Province/Region *</FieldLabel>
                  <Input
                    id="state"
                    autoComplete="address-level1"
                    placeholder="Metro Manila"
                    value={shippingAddress.state}
                    onChange={(e) => {
                      setShippingAddress({
                        ...shippingAddress,
                        state: e.target.value,
                      });
                      if (errors.state) {
                        setErrors({ ...errors, state: "" });
                      }
                    }}
                    className={cn(errors.state && "border-destructive")}
                    required
                  />
                  {errors.state && <FieldError>{errors.state}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="zip">ZIP Code *</FieldLabel>
                  <Input
                    id="zip"
                    autoComplete="postal-code"
                    placeholder="1100"
                    inputMode="numeric"
                    value={shippingAddress.zip}
                    onChange={(e) => {
                      setShippingAddress({
                        ...shippingAddress,
                        zip: e.target.value,
                      });
                      if (errors.zip) {
                        setErrors({ ...errors, zip: "" });
                      }
                    }}
                    className={cn(errors.zip && "border-destructive")}
                    required
                  />
                  {errors.zip && <FieldError>{errors.zip}</FieldError>}
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="country">Country</FieldLabel>
                <Input
                  id="country"
                  autoComplete="country-name"
                  value={shippingAddress.country}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      country: e.target.value,
                    })
                  }
                />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card ref={stepRefs.payment}>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="space-y-4">
                {/* Payment Method Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FieldLabel htmlFor="credit" className="cursor-pointer">
                    <Field
                      className={cn(
                        "border rounded-lg p-4 transition-colors",
                        paymentMethod === "credit" &&
                          "border-primary bg-primary/5 dark:bg-primary/10"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Input
                          type="radio"
                          id="credit"
                          name="paymentMethod"
                          value="credit"
                          checked={paymentMethod === "credit"}
                          onChange={() => setPaymentMethod("credit")}
                          className="h-4 w-4"
                        />
                        <CreditCard className="h-5 w-5" />
                        <span className="text-sm font-medium">Credit Card</span>
                      </div>
                    </Field>
                  </FieldLabel>

                  <FieldLabel htmlFor="paypal" className="cursor-pointer">
                    <Field
                      className={cn(
                        "border rounded-lg p-4 transition-colors",
                        paymentMethod === "paypal" &&
                          "border-primary bg-primary/5 dark:bg-primary/10"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Input
                          type="radio"
                          id="paypal"
                          name="paymentMethod"
                          value="paypal"
                          checked={paymentMethod === "paypal"}
                          onChange={() => setPaymentMethod("paypal")}
                          className="h-4 w-4"
                        />
                        <span className="text-sm font-medium">GCash</span>
                      </div>
                    </Field>
                  </FieldLabel>

                  <FieldLabel htmlFor="applepay" className="cursor-pointer">
                    <Field
                      className={cn(
                        "border rounded-lg p-4 transition-colors",
                        paymentMethod === "applepay" &&
                          "border-primary bg-primary/5 dark:bg-primary/10"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Input
                          type="radio"
                          id="applepay"
                          name="paymentMethod"
                          value="applepay"
                          checked={paymentMethod === "applepay"}
                          onChange={() => setPaymentMethod("applepay")}
                          className="h-4 w-4"
                        />
                        <span className="text-sm font-medium">Maya</span>
                      </div>
                    </Field>
                  </FieldLabel>
                </div>

                {/* Credit Card Fields (UI Only) */}
                {paymentMethod === "credit" && (
                  <div className="space-y-4 pt-4">
                    <Field>
                      <FieldLabel>Card Number</FieldLabel>
                      <Input placeholder="1234 5678 9012 3456" disabled className="bg-muted" />
                      <FieldDescription>
                        Payment processing will be implemented by you
                      </FieldDescription>
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel>Expiry Date</FieldLabel>
                        <Input placeholder="MM/YY" disabled className="bg-muted" />
                      </Field>
                      <Field>
                        <FieldLabel>CVV</FieldLabel>
                        <Input placeholder="123" disabled className="bg-muted" />
                      </Field>
                    </div>

                    <Field>
                      <FieldLabel>Cardholder Name</FieldLabel>
                      <Input placeholder="Juan Dela Cruz" disabled className="bg-muted" />
                    </Field>
                  </div>
                )}

                {/* GCash Placeholder */}
                {paymentMethod === "paypal" && (
                  <div className="pt-4">
                    <Button type="button" variant="outline" className="w-full" disabled>
                      Continue with GCash
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      GCash integration to be implemented by you
                    </p>
                  </div>
                )}

                {/* Maya Placeholder */}
                {paymentMethod === "applepay" && (
                  <div className="pt-4">
                    <Button type="button" variant="outline" className="w-full" disabled>
                      Continue with Maya
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      Maya integration to be implemented by you
                    </p>
                  </div>
                )}
              </div>

              {/* Security Badges */}
              <div className="pt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>256-bit SSL Encrypted</span>
                </div>
              </div>

              {/* Payment Provider Logos */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <span className="text-sm text-muted-foreground">We accept:</span>
                <div className="flex gap-2 text-muted-foreground">
                  <span className="text-xs border px-2 py-1 rounded">VISA</span>
                  <span className="text-xs border px-2 py-1 rounded">MASTERCARD</span>
                  <span className="text-xs border px-2 py-1 rounded">GCASH</span>
                  <span className="text-xs border px-2 py-1 rounded">MAYA</span>
                </div>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Review & Submit */}
        <Card ref={stepRefs.review}>
          <CardHeader>
            <CardTitle>Review Your Order</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              {/* Submit Button */}
              <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Place Order</>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                By placing your order, you agree to our terms and conditions
              </p>
            </div>
          </CardContent>
        </Card>
      </form>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop (blurred background) */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />

          {/* Modal content */}
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h2 className="text-xl font-bold mb-2">Confirm Your Order</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to place this order? Your payment will be processed.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmOrder}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
