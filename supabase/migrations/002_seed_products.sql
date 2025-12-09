-- Seed products table with sample data
INSERT INTO products (id, name, price, image, badge, featured, description, category, stock) VALUES
  (
    1,
    'Premium Cotton T-Shirt',
    '$29.99',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    'Bestseller',
    true,
    'Made from 100% organic cotton, this premium t-shirt offers exceptional comfort and durability. Perfect for everyday wear with a modern fit.',
    'Clothing',
    150
  ),
  (
    2,
    'Classic Canvas Bag',
    '$19.99',
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80',
    NULL,
    true,
    'Durable canvas tote bag with reinforced handles. Spacious interior perfect for shopping, beach trips, or everyday use.',
    'Accessories',
    85
  ),
  (
    3,
    'Ceramic Coffee Mug',
    '$14.99',
    'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80',
    NULL,
    true,
    'Handcrafted ceramic mug with comfortable handle. Microwave and dishwasher safe. Holds 12oz of your favorite beverage.',
    'Kitchen',
    200
  ),
  (
    4,
    'Stainless Steel Bottle',
    '$24.99',
    'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80',
    NULL,
    false,
    'Double-walled vacuum insulated bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.',
    'Kitchen',
    120
  ),
  (
    5,
    'Organic Hoodie',
    '$49.99',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80',
    'New',
    false,
    'Cozy hoodie made from organic cotton blend. Features drawstring hood, kangaroo pocket, and ribbed cuffs.',
    'Clothing',
    75
  ),
  (
    6,
    'Laptop Sleeve',
    '$34.99',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&q=80',
    NULL,
    false,
    'Padded laptop sleeve with water-resistant exterior. Fits most 13-15 inch laptops. Additional pocket for accessories.',
    'Electronics',
    95
  ),
  (
    7,
    'Wireless Earbuds',
    '$89.99',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80',
    'Popular',
    false,
    'Premium wireless earbuds with active noise cancellation. 8-hour battery life with charging case. Crystal clear sound quality.',
    'Electronics',
    60
  ),
  (
    8,
    'Leather Wallet',
    '$39.99',
    'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80',
    NULL,
    false,
    'Genuine leather bifold wallet with RFID blocking technology. Multiple card slots and bill compartment.',
    'Accessories',
    110
  ),
  (
    9,
    'Yoga Mat',
    '$44.99',
    'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80',
    'Eco-Friendly',
    false,
    'Non-slip yoga mat made from natural rubber. 6mm thick for extra cushioning. Includes carrying strap.',
    'Fitness',
    45
  ),
  (
    10,
    'Sunglasses',
    '$79.99',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80',
    NULL,
    false,
    'UV400 protection polarized sunglasses with acetate frames. Classic design suitable for all face shapes.',
    'Accessories',
    80
  ),
  (
    11,
    'Running Shoes',
    '$119.99',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    'Bestseller',
    true,
    'Lightweight running shoes with responsive cushioning and breathable mesh upper. Engineered for comfort and performance.',
    'Footwear',
    65
  ),
  (
    12,
    'Smart Watch',
    '$199.99',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    'Popular',
    true,
    'Feature-packed smartwatch with heart rate monitor, GPS, and 5-day battery life. Water resistant up to 50m.',
    'Electronics',
    40
  ),
  (
    13,
    'Backpack',
    '$59.99',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    NULL,
    false,
    'Durable backpack with multiple compartments and padded laptop section. Ergonomic design with adjustable straps.',
    'Accessories',
    90
  ),
  (
    14,
    'Desk Lamp',
    '$54.99',
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80',
    'New',
    false,
    'LED desk lamp with adjustable brightness and color temperature. USB charging port included. Energy efficient.',
    'Home',
    70
  ),
  (
    15,
    'Water Bottle Set',
    '$34.99',
    'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500&q=80',
    NULL,
    false,
    'Set of 3 BPA-free water bottles in different sizes. Perfect for gym, office, and travel. Leak-proof design.',
    'Kitchen',
    100
  ),
  (
    16,
    'Throw Blanket',
    '$39.99',
    'https://images.unsplash.com/photo-1615799998603-7c6270a45196?w=500&q=80',
    'Cozy',
    false,
    'Ultra-soft fleece throw blanket perfect for couch or bed. Machine washable. Available in multiple colors.',
    'Home',
    130
  ),
  (
    17,
    'Phone Case',
    '$19.99',
    'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&q=80',
    NULL,
    false,
    'Protective phone case with shock-absorbent corners. Slim profile with raised edges for screen protection.',
    'Electronics',
    200
  ),
  (
    18,
    'Notebook Set',
    '$24.99',
    'https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?w=500&q=80',
    NULL,
    false,
    'Set of 3 premium notebooks with hardcover and elastic closure. Dotted pages perfect for bullet journaling.',
    'Stationery',
    155
  ),
  (
    19,
    'Gym Duffle Bag',
    '$44.99',
    'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500&q=80',
    NULL,
    false,
    'Spacious gym bag with separate shoe compartment and wet pocket. Adjustable shoulder strap and grab handles.',
    'Fitness',
    55
  ),
  (
    20,
    'Scented Candle Set',
    '$29.99',
    'https://images.unsplash.com/photo-1602874801006-58ce0e1d0e3f?w=500&q=80',
    'Gift Set',
    false,
    'Set of 4 natural soy candles with essential oils. Long-lasting burn time. Comes in decorative gift box.',
    'Home',
    140
  );

-- Reset the sequence to continue from the last inserted ID
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
