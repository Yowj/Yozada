export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterLinks {
  shop: FooterLink[];
  company: FooterLink[];
  support: FooterLink[];
}

export const footerLinks: FooterLinks = {
  shop: [
    { name: "All Products", href: "/products" },
    { name: "Shirts", href: "/category/shirts" },
    { name: "Stickers", href: "/category/stickers" },
    { name: "Accessories", href: "/category/accessories" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
  ],
  support: [
    { name: "FAQ", href: "/faq" },
    { name: "Shipping & Returns", href: "/shipping" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};
