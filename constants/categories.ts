export interface Category {
  name: string;
  href: string;
}

export const categories: Category[] = [
  { name: "All", href: "/category/electronics" },
  { name: "Shirts", href: "/category/clothing" },
  { name: "Stickers", href: "/category/home-garden" },
];
