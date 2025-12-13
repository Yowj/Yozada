-- Add 5 random products to the products table

INSERT INTO products (name, price, image, badge, featured, description, category, stock) VALUES
(
  'Leather Wallet',
  '$34.99',
  'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
  'New',
  false,
  'Handcrafted genuine leather wallet with multiple card slots and a coin pocket. Slim design that fits comfortably in your pocket.',
  'Accessories',
  85
),
(
  'Portable Bluetooth Speaker',
  '$79.99',
  'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
  'Popular',
  true,
  '360-degree sound with deep bass. Waterproof design perfect for outdoor adventures. 12-hour battery life and USB-C charging.',
  'Electronics',
  42
),
(
  'Yoga Mat',
  '$39.99',
  'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
  NULL,
  false,
  'Extra thick non-slip yoga mat made from eco-friendly materials. Includes carrying strap for easy transport.',
  'Fitness',
  120
),
(
  'Stainless Steel Water Bottle',
  '$24.99',
  'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
  'Bestseller',
  true,
  'Double-walled insulated bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and leak-proof design.',
  'Kitchen',
  200
),
(
  'Denim Jacket',
  '$69.99',
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
  'New',
  false,
  'Classic denim jacket with a modern fit. Made from premium denim fabric with stylish distressed details.',
  'Clothing',
  65
);
