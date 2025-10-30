export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  featured?: boolean;
  badge?: string;
}

export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: "$29.99",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    featured: true,
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Classic Canvas Bag",
    price: "$19.99",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
  },
  {
    id: 3,
    name: "Ceramic Coffee Mug",
    price: "$14.99",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80",
  },
];

export const products: Product[] = [
  {
    id: 4,
    name: "Stainless Steel Bottle",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
  },
  {
    id: 5,
    name: "Organic Hoodie",
    price: "$49.99",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80",
    badge: "New",
  },
  {
    id: 6,
    name: "Laptop Sleeve",
    price: "$34.99",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&q=80",
  },
  {
    id: 7,
    name: "Wireless Earbuds",
    price: "$89.99",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
    badge: "Popular",
  },
  {
    id: 8,
    name: "Leather Wallet",
    price: "$39.99",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80",
  },
];
