export type CheckoutStep = "contact" | "shipping" | "payment" | "review";
export type CheckoutType = "guest" | "account";
export type PaymentMethod = "credit" | "paypal" | "applepay";

export interface ContactInfo {
  email: string;
  phone: string;
  newsletter: boolean;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface FormErrors {
  [key: string]: string;
}
