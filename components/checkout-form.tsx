"use client";

import * as React from "react";
import Link from "next/link";
import { Check, CreditCard, Edit, LoaderCircle, Lock, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldLegend,
  FieldTitle,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

type CheckoutStep = "contact" | "shipping" | "payment" | "review";
type CheckoutType = "guest" | "account";
type PaymentMethod = "credit" | "paypal" | "applepay";

interface ContactInfo {
  email: string;
  phone: string;
  newsletter: boolean;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface FormErrors {
  [key: string]: string;
}

const STEPS: { key: CheckoutStep; label: string }[] = [
  { key: "contact", label: "Contact" },
  { key: "shipping", label: "Shipping" },
  { key: "payment", label: "Payment" },
  { key: "review", label: "Review" },
];

export function CheckoutForm() {
  const [currentStep, setCurrentStep] = React.useState<CheckoutStep>("contact");
  const [checkoutType, setCheckoutType] = React.useState<CheckoutType>("guest");
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>("credit");
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [errors, setErrors] = React.useState<FormErrors>({});

  const [contactInfo, setContactInfo] = React.useState<ContactInfo>({
    email: "",
    phone: "",
    newsletter: false,
  });

  const [shippingAddress, setShippingAddress] = React.useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });

  const stepRefs = {
    contact: React.useRef<HTMLDivElement>(null),
    shipping: React.useRef<HTMLDivElement>(null),
    payment: React.useRef<HTMLDivElement>(null),
    review: React.useRef<HTMLDivElement>(null),
  };

  function scrollToSection(step: CheckoutStep) {
    stepRefs[step]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrentStep(step);
  }

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePhone(phone: string): boolean {
    if (!phone) return true; // Optional field
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phone.length >= 10 && phoneRegex.test(phone);
  }

  function validateContactSection(): boolean {
    const newErrors: FormErrors = {};

    if (!contactInfo.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(contactInfo.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (contactInfo.phone && !validatePhone(contactInfo.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validateShippingSection(): boolean {
    const newErrors: FormErrors = {};

    if (!shippingAddress.firstName) newErrors.firstName = "First name is required";
    if (!shippingAddress.lastName) newErrors.lastName = "Last name is required";
    if (!shippingAddress.address1) newErrors.address1 = "Address is required";
    if (!shippingAddress.city) newErrors.city = "City is required";
    if (!shippingAddress.state) newErrors.state = "State is required";
    if (!shippingAddress.zip) newErrors.zip = "ZIP code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!termsAccepted) {
      setErrors({ terms: "You must accept the terms and conditions" });
      return;
    }

    // Validate all sections
    if (!validateContactSection() || !validateShippingSection()) {
      scrollToSection("contact");
      return;
    }

    setIsProcessing(true);

    // TODO: User implements payment processing and order creation
    // This is where you would:
    // 1. Process payment via Stripe/PayPal/etc
    // 2. Create order in database
    // 3. Reduce inventory
    // 4. Send confirmation email
    // 5. Redirect to order confirmation page

    console.log("Order Data:", {
      checkoutType,
      contactInfo,
      shippingAddress,
      paymentMethod,
    });

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);

    // TODO: Redirect to order confirmation
    // router.push('/order-confirmation?id=ORDER_ID')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress Indicator */}
      <nav aria-label="Checkout progress" className="mb-8">
        <ol className="flex items-center justify-between gap-2">
          {STEPS.map((step, index) => {
            const stepIndex = STEPS.findIndex((s) => s.key === currentStep);
            const isCompleted = index < stepIndex;
            const isCurrent = index === stepIndex;

            return (
              <li key={step.key} className="flex flex-1 items-center">
                <div className="flex items-center gap-2 w-full">
                  <div
                    className={cn(
                      "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                      isCompleted &&
                        "bg-primary border-primary text-primary-foreground",
                      isCurrent && "border-primary text-primary",
                      !isCompleted &&
                        !isCurrent &&
                        "border-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                  <span
                    className={cn(
                      "hidden sm:inline text-sm font-medium",
                      isCurrent && "text-primary",
                      !isCurrent && "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <Separator className="flex-1 mx-2" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Guest Checkout Toggle */}
      <Card ref={stepRefs.contact}>
        <CardContent className="pt-6">
          <FieldGroup>
            <FieldLegend>How would you like to checkout?</FieldLegend>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FieldLabel htmlFor="guest" className="cursor-pointer">
                <Field
                  className={cn(
                    "border rounded-lg p-4 transition-colors",
                    checkoutType === "guest" &&
                      "border-primary bg-primary/5 dark:bg-primary/10"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Input
                      type="radio"
                      id="guest"
                      name="checkoutType"
                      value="guest"
                      checked={checkoutType === "guest"}
                      onChange={() => setCheckoutType("guest")}
                      className="mt-1 h-4 w-4"
                    />
                    <div className="flex-1">
                      <FieldTitle>Continue as Guest</FieldTitle>
                      <FieldDescription>
                        Quick checkout without an account
                      </FieldDescription>
                    </div>
                  </div>
                </Field>
              </FieldLabel>

              <FieldLabel htmlFor="account" className="cursor-pointer">
                <Field
                  className={cn(
                    "border rounded-lg p-4 transition-colors",
                    checkoutType === "account" &&
                      "border-primary bg-primary/5 dark:bg-primary/10"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Input
                      type="radio"
                      id="account"
                      name="checkoutType"
                      value="account"
                      checked={checkoutType === "account"}
                      onChange={() => setCheckoutType("account")}
                      className="mt-1 h-4 w-4"
                    />
                    <div className="flex-1">
                      <FieldTitle>Sign In</FieldTitle>
                      <FieldDescription>
                        Save your info for faster checkout
                      </FieldDescription>
                      {checkoutType === "account" && (
                        <Link
                          href="/auth/login?return_url=/checkout"
                          className="text-sm text-primary hover:underline mt-2 inline-block"
                        >
                          Go to sign in →
                        </Link>
                      )}
                    </div>
                  </div>
                </Field>
              </FieldLabel>
            </div>
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email *</FieldLabel>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={contactInfo.email}
                onChange={(e) => {
                  setContactInfo({ ...contactInfo, email: e.target.value });
                  if (errors.email) {
                    setErrors({ ...errors, email: "" });
                  }
                }}
                onBlur={() => validateContactSection()}
                className={cn(errors.email && "border-destructive")}
                required
              />
              {errors.email && <FieldError>{errors.email}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">Phone (optional)</FieldLabel>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+1 (555) 000-0000"
                value={contactInfo.phone}
                onChange={(e) => {
                  setContactInfo({ ...contactInfo, phone: e.target.value });
                  if (errors.phone) {
                    setErrors({ ...errors, phone: "" });
                  }
                }}
                onBlur={() => {
                  if (contactInfo.phone && !validatePhone(contactInfo.phone)) {
                    setErrors({
                      ...errors,
                      phone: "Please enter a valid phone number",
                    });
                  }
                }}
                className={cn(errors.phone && "border-destructive")}
              />
              {errors.phone && <FieldError>{errors.phone}</FieldError>}
            </Field>

            <div className="flex items-start gap-2">
              <Checkbox
                id="newsletter"
                checked={contactInfo.newsletter}
                onCheckedChange={(checked) =>
                  setContactInfo({
                    ...contactInfo,
                    newsletter: checked as boolean,
                  })
                }
              />
              <label
                htmlFor="newsletter"
                className="text-sm leading-normal cursor-pointer"
              >
                Email me with news and offers
              </label>
            </div>
          </FieldGroup>
        </CardContent>
      </Card>

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
                  autoComplete="given-name"
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
                  autoComplete="family-name"
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
                autoComplete="address-line1"
                placeholder="123 Main St"
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
              <FieldLabel htmlFor="address2">
                Apartment, suite, etc. (optional)
              </FieldLabel>
              <Input
                id="address2"
                autoComplete="address-line2"
                placeholder="Apt 4B"
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
                  placeholder="New York"
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
                <FieldLabel htmlFor="state">State *</FieldLabel>
                <Input
                  id="state"
                  autoComplete="address-level1"
                  placeholder="NY"
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
                  placeholder="10001"
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
                      <span className="text-sm font-medium">PayPal</span>
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
                      <span className="text-sm font-medium">Apple Pay</span>
                    </div>
                  </Field>
                </FieldLabel>
              </div>

              {/* Credit Card Fields (UI Only) */}
              {paymentMethod === "credit" && (
                <div className="space-y-4 pt-4">
                  <Field>
                    <FieldLabel>Card Number</FieldLabel>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      disabled
                      className="bg-muted"
                    />
                    <FieldDescription>
                      Payment processing will be implemented by you
                    </FieldDescription>
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel>Expiry Date</FieldLabel>
                      <Input
                        placeholder="MM/YY"
                        disabled
                        className="bg-muted"
                      />
                    </Field>
                    <Field>
                      <FieldLabel>CVV</FieldLabel>
                      <Input placeholder="123" disabled className="bg-muted" />
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel>Cardholder Name</FieldLabel>
                    <Input
                      placeholder="John Doe"
                      disabled
                      className="bg-muted"
                    />
                  </Field>
                </div>
              )}

              {/* PayPal Placeholder */}
              {paymentMethod === "paypal" && (
                <div className="pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    disabled
                  >
                    Continue with PayPal
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    PayPal integration to be implemented by you
                  </p>
                </div>
              )}

              {/* Apple Pay Placeholder */}
              {paymentMethod === "applepay" && (
                <div className="pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    disabled
                  >
                    Continue with Apple Pay
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    Apple Pay integration to be implemented by you
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
                <span className="text-xs border px-2 py-1 rounded">
                  MASTERCARD
                </span>
                <span className="text-xs border px-2 py-1 rounded">AMEX</span>
                <span className="text-xs border px-2 py-1 rounded">PAYPAL</span>
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
          <div className="space-y-6">
            {/* Contact Summary */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">Contact Information</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection("contact")}
                  className="h-auto p-0 text-primary"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>{contactInfo.email || "Not provided"}</p>
                {contactInfo.phone && <p>{contactInfo.phone}</p>}
              </div>
            </div>

            <Separator />

            {/* Shipping Summary */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">Shipping Address</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection("shipping")}
                  className="h-auto p-0 text-primary"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  {shippingAddress.firstName} {shippingAddress.lastName}
                </p>
                <p>{shippingAddress.address1}</p>
                {shippingAddress.address2 && <p>{shippingAddress.address2}</p>}
                <p>
                  {shippingAddress.city}, {shippingAddress.state}{" "}
                  {shippingAddress.zip}
                </p>
                <p>{shippingAddress.country}</p>
              </div>
            </div>

            <Separator />

            {/* Payment Summary */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">Payment Method</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection("payment")}
                  className="h-auto p-0 text-primary"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="capitalize">
                  {paymentMethod === "credit"
                    ? "Credit Card"
                    : paymentMethod === "paypal"
                    ? "PayPal"
                    : "Apple Pay"}
                </p>
              </div>
            </div>

            <Separator />

            {/* Terms & Conditions */}
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => {
                    setTermsAccepted(checked as boolean);
                    if (errors.terms) {
                      setErrors({ ...errors, terms: "" });
                    }
                  }}
                  className={cn(errors.terms && "border-destructive")}
                />
                <label
                  htmlFor="terms"
                  className="text-sm leading-normal cursor-pointer"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.terms && (
                <FieldError className="mt-1">{errors.terms}</FieldError>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!termsAccepted || isProcessing}
            >
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
  );
}
