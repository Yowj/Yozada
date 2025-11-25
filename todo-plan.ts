/**
 * YOZADA E-COMMERCE PORTFOLIO - TODO PLAN
 *
 * Comprehensive task list for completing the e-commerce portfolio application.
 * Each task is a single, specific action item.
 * Priority: 🔴 Critical | 🟡 High | 🟢 Medium | 🔵 Low
 */

export const todoPlan = {
  // =============================================================================
  // 🔴 CRITICAL BUGS & TYPE FIXES
  // =============================================================================
  criticalFixes: [
    {
      id: "CF-001",
      priority: "🔴 Critical",
      task: "Update Product interface in lib/products.ts to include 'badge' and 'featured' fields",
      file: "lib/products.ts",
      details: "Add badge?: string and featured?: boolean to Product type definition"
    },
    {
      id: "CF-002",
      priority: "🔴 Critical",
      task: "Fix category configuration mismatch in constants/categories.ts",
      file: "constants/categories.ts",
      details: "Update categories array so name and href match correctly (All->Electronics, Shirts->Clothing, Stickers->Home&Garden)"
    },
    {
      id: "CF-003",
      priority: "🔴 Critical",
      task: "Fix forgot password link in login form to navigate to /auth/forgot-password",
      file: "app/auth/login/page.tsx",
      details: "Change href from '#' to '/auth/forgot-password'"
    },
    {
      id: "CF-004",
      priority: "🔴 Critical",
      task: "Create Supabase migration for products table schema",
      file: "supabase/migrations/001_create_products_table.sql",
      details: "SQL: CREATE TABLE products (id serial PRIMARY KEY, name text, price text, image text, featured boolean DEFAULT false, badge text, category text, description text)"
    },
    {
      id: "CF-005",
      priority: "🔴 Critical",
      task: "Create Supabase migration for users table schema",
      file: "supabase/migrations/002_create_users_table.sql",
      details: "SQL: CREATE TABLE users (id uuid PRIMARY KEY REFERENCES auth.users, is_admin boolean DEFAULT false, created_at timestamp DEFAULT now())"
    },
  ],

  // =============================================================================
  // 🔴 SHOPPING CART - FULL IMPLEMENTATION
  // =============================================================================
  cartSystem: [
    {
      id: "CART-001",
      priority: "🔴 Critical",
      task: "Create Supabase migration for cart_items table",
      file: "supabase/migrations/003_create_cart_items_table.sql",
      details: "SQL: CREATE TABLE cart_items (id serial PRIMARY KEY, user_id uuid REFERENCES auth.users, product_id integer REFERENCES products, quantity integer DEFAULT 1, created_at timestamp DEFAULT now())"
    },
    {
      id: "CART-002",
      priority: "🔴 Critical",
      task: "Create CartItem interface in lib/types.ts",
      file: "lib/types.ts",
      details: "Define CartItem type with id, user_id, product_id, quantity, product (joined Product data)"
    },
    {
      id: "CART-003",
      priority: "🔴 Critical",
      task: "Create cart context provider in lib/context/cart-context.tsx",
      file: "lib/context/cart-context.tsx",
      details: "Create CartProvider with state for cart items, loading, and methods: addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount"
    },
    {
      id: "CART-004",
      priority: "🔴 Critical",
      task: "Wrap app with CartProvider in app/layout.tsx",
      file: "app/layout.tsx",
      details: "Import CartProvider and wrap children (inside body, after ThemeProvider)"
    },
    {
      id: "CART-005",
      priority: "🔴 Critical",
      task: "Create getCartItems server function in lib/cart.ts",
      file: "lib/cart.ts",
      details: "Server function to fetch cart items for logged-in user with product data joined"
    },
    {
      id: "CART-006",
      priority: "🔴 Critical",
      task: "Create addToCart server action in lib/actions/cart.ts",
      file: "lib/actions/cart.ts",
      details: "Server action to insert/update cart_items, handle quantity increment if item exists"
    },
    {
      id: "CART-007",
      priority: "🔴 Critical",
      task: "Create updateCartItemQuantity server action in lib/actions/cart.ts",
      file: "lib/actions/cart.ts",
      details: "Server action to update quantity of specific cart item"
    },
    {
      id: "CART-008",
      priority: "🔴 Critical",
      task: "Create removeFromCart server action in lib/actions/cart.ts",
      file: "lib/actions/cart.ts",
      details: "Server action to delete cart item by id"
    },
    {
      id: "CART-009",
      priority: "🔴 Critical",
      task: "Create clearCart server action in lib/actions/cart.ts",
      file: "lib/actions/cart.ts",
      details: "Server action to delete all cart items for current user"
    },
    {
      id: "CART-010",
      priority: "🔴 Critical",
      task: "Update cart icon in navbar.tsx to show dynamic count from CartContext",
      file: "components/navbar.tsx",
      details: "Replace hardcoded '0' with {cartCount} from useCart hook"
    },
    {
      id: "CART-011",
      priority: "🔴 Critical",
      task: "Make 'Add to Cart' button functional in homepage product grid",
      file: "app/page.tsx",
      details: "Add onClick handler that calls addToCart from CartContext"
    },
    {
      id: "CART-012",
      priority: "🔴 Critical",
      task: "Make 'Add to Cart' button functional in product detail page",
      file: "app/product/[id]/page.tsx",
      details: "Add onClick handler with toast notification on success"
    },
    {
      id: "CART-013",
      priority: "🔴 Critical",
      task: "Create cart page at app/cart/page.tsx",
      file: "app/cart/page.tsx",
      details: "Display cart items list with product image, name, price, quantity controls, remove button, and total"
    },
    {
      id: "CART-014",
      priority: "🔴 Critical",
      task: "Create CartItemRow component in components/cart-item-row.tsx",
      file: "components/cart-item-row.tsx",
      details: "Reusable component for each cart item with image, details, quantity +/- buttons, remove button"
    },
    {
      id: "CART-015",
      priority: "🔴 Critical",
      task: "Create CartSummary component in components/cart-summary.tsx",
      file: "components/cart-summary.tsx",
      details: "Shows subtotal, estimated shipping, total, and Proceed to Checkout button"
    },
    {
      id: "CART-016",
      priority: "🔴 Critical",
      task: "Add empty cart state UI in cart page",
      file: "app/cart/page.tsx",
      details: "Show 'Your cart is empty' message with 'Continue Shopping' button when cart is empty"
    },
    {
      id: "CART-017",
      priority: "🟡 High",
      task: "Add loading states for all cart operations",
      file: "lib/context/cart-context.tsx",
      details: "Track loading state and disable buttons during cart operations"
    },
    {
      id: "CART-018",
      priority: "🟡 High",
      task: "Add toast notifications for cart actions (added, removed, updated)",
      file: "lib/context/cart-context.tsx",
      details: "Use shadcn toast component for user feedback"
    },
  ],

  // =============================================================================
  // 🟡 PRODUCT SEARCH & FILTERING
  // =============================================================================
  searchAndFilter: [
    {
      id: "SEARCH-001",
      priority: "🟡 High",
      task: "Create searchProducts server function in lib/products.ts",
      file: "lib/products.ts",
      details: "Accept query string, search products by name using ILIKE, return matching products"
    },
    {
      id: "SEARCH-002",
      priority: "🟡 High",
      task: "Create getProductsByCategory server function in lib/products.ts",
      file: "lib/products.ts",
      details: "Accept category string, filter products by category field"
    },
    {
      id: "SEARCH-003",
      priority: "🟡 High",
      task: "Make search input in navbar functional",
      file: "components/navbar.tsx",
      details: "Add onChange handler, debounce input, navigate to /products?search=query on submit"
    },
    {
      id: "SEARCH-004",
      priority: "🟡 High",
      task: "Create products listing page at app/products/page.tsx",
      file: "app/products/page.tsx",
      details: "Display all products in a grid, read search query from URL params, filter results"
    },
    {
      id: "SEARCH-005",
      priority: "🟡 High",
      task: "Add search results count and query display on products page",
      file: "app/products/page.tsx",
      details: "Show 'X results for \"query\"' heading when search query exists"
    },
    {
      id: "SEARCH-006",
      priority: "🟡 High",
      task: "Create ProductGrid component in components/product-grid.tsx",
      file: "components/product-grid.tsx",
      details: "Reusable grid component to display products array with responsive layout"
    },
    {
      id: "SEARCH-007",
      priority: "🟡 High",
      task: "Create ProductCard component in components/product-card.tsx",
      file: "components/product-card.tsx",
      details: "Reusable card with product image, name, price, badge, add to cart button"
    },
    {
      id: "SEARCH-008",
      priority: "🟡 High",
      task: "Create category page at app/category/[slug]/page.tsx",
      file: "app/category/[slug]/page.tsx",
      details: "Dynamic route to display products filtered by category slug"
    },
    {
      id: "SEARCH-009",
      priority: "🟡 High",
      task: "Add category filter sidebar to products page",
      file: "app/products/page.tsx",
      details: "Sidebar with category checkboxes to filter products"
    },
    {
      id: "SEARCH-010",
      priority: "🟢 Medium",
      task: "Add price range filter to products page",
      file: "app/products/page.tsx",
      details: "Slider component to filter products by min/max price"
    },
    {
      id: "SEARCH-011",
      priority: "🟢 Medium",
      task: "Add sort dropdown to products page (price low-high, high-low, newest)",
      file: "app/products/page.tsx",
      details: "Select dropdown to sort products by different criteria"
    },
    {
      id: "SEARCH-012",
      priority: "🟢 Medium",
      task: "Add clear filters button to products page",
      file: "app/products/page.tsx",
      details: "Button to reset all filters and show all products"
    },
  ],

  // =============================================================================
  // 🟡 CHECKOUT FLOW (PORTFOLIO MOCKUP)
  // =============================================================================
  checkoutFlow: [
    {
      id: "CHECKOUT-001",
      priority: "🟡 High",
      task: "Create Supabase migration for orders table",
      file: "supabase/migrations/004_create_orders_table.sql",
      details: "SQL: CREATE TABLE orders (id serial PRIMARY KEY, user_id uuid REFERENCES auth.users, status text DEFAULT 'pending', total text, shipping_address jsonb, created_at timestamp DEFAULT now())"
    },
    {
      id: "CHECKOUT-002",
      priority: "🟡 High",
      task: "Create Supabase migration for order_items table",
      file: "supabase/migrations/005_create_order_items_table.sql",
      details: "SQL: CREATE TABLE order_items (id serial PRIMARY KEY, order_id integer REFERENCES orders, product_id integer REFERENCES products, quantity integer, price text)"
    },
    {
      id: "CHECKOUT-003",
      priority: "🟡 High",
      task: "Create Order interface in lib/types.ts",
      file: "lib/types.ts",
      details: "Define Order type with id, user_id, status, total, shipping_address, created_at, items"
    },
    {
      id: "CHECKOUT-004",
      priority: "🟡 High",
      task: "Create checkout page at app/checkout/page.tsx",
      file: "app/checkout/page.tsx",
      details: "Multi-step form: shipping address, order review, mock payment (portfolio only)"
    },
    {
      id: "CHECKOUT-005",
      priority: "🟡 High",
      task: "Create ShippingForm component in components/checkout/shipping-form.tsx",
      file: "components/checkout/shipping-form.tsx",
      details: "Form with fields: full name, address, city, state, zip, country"
    },
    {
      id: "CHECKOUT-006",
      priority: "🟡 High",
      task: "Create OrderReview component in components/checkout/order-review.tsx",
      file: "components/checkout/order-review.tsx",
      details: "Display cart items, shipping address, total for final review"
    },
    {
      id: "CHECKOUT-007",
      priority: "🟡 High",
      task: "Create MockPayment component in components/checkout/mock-payment.tsx",
      file: "components/checkout/mock-payment.tsx",
      details: "UI mockup of payment form (card number, expiry, CVV) - non-functional, portfolio only"
    },
    {
      id: "CHECKOUT-008",
      priority: "🟡 High",
      task: "Create createOrder server action in lib/actions/orders.ts",
      file: "lib/actions/orders.ts",
      details: "Insert order and order_items, clear cart, return order ID"
    },
    {
      id: "CHECKOUT-009",
      priority: "🟡 High",
      task: "Create order confirmation page at app/order/[id]/page.tsx",
      file: "app/order/[id]/page.tsx",
      details: "Success page showing order number, items, total, estimated delivery"
    },
    {
      id: "CHECKOUT-010",
      priority: "🟡 High",
      task: "Make 'Proceed to Checkout' button navigate to /checkout",
      file: "components/cart-summary.tsx",
      details: "Add Link to /checkout on button click"
    },
    {
      id: "CHECKOUT-011",
      priority: "🟡 High",
      task: "Make 'Buy Now' button in product detail page navigate to checkout",
      file: "app/product/[id]/page.tsx",
      details: "Add to cart first, then redirect to /checkout"
    },
    {
      id: "CHECKOUT-012",
      priority: "🟢 Medium",
      task: "Add checkout step indicator component",
      file: "components/checkout/checkout-steps.tsx",
      details: "Visual stepper showing: Shipping -> Review -> Payment -> Confirmation"
    },
    {
      id: "CHECKOUT-013",
      priority: "🟢 Medium",
      task: "Add form validation for shipping address",
      file: "components/checkout/shipping-form.tsx",
      details: "Use react-hook-form with zod validation for all required fields"
    },
  ],

  // =============================================================================
  // 🟢 ADMIN ENHANCEMENTS
  // =============================================================================
  adminFeatures: [
    {
      id: "ADMIN-001",
      priority: "🟢 Medium",
      task: "Add category field to Product interface and database",
      file: "lib/products.ts",
      details: "Add category: string to Product type, update database schema"
    },
    {
      id: "ADMIN-002",
      priority: "🟢 Medium",
      task: "Add category dropdown to Add Product form",
      file: "components/add-product-button.tsx",
      details: "Add Select component for category (Electronics, Clothing, Home & Garden, etc.)"
    },
    {
      id: "ADMIN-003",
      priority: "🟢 Medium",
      task: "Add description field to Product interface and database",
      file: "lib/products.ts",
      details: "Add description: string to Product type, update database schema"
    },
    {
      id: "ADMIN-004",
      priority: "🟢 Medium",
      task: "Add description textarea to Add Product form",
      file: "components/add-product-button.tsx",
      details: "Add Textarea component for product description"
    },
    {
      id: "ADMIN-005",
      priority: "🟢 Medium",
      task: "Create EditProductDialog component",
      file: "components/edit-product-dialog.tsx",
      details: "Dialog with form to edit existing product details"
    },
    {
      id: "ADMIN-006",
      priority: "🟢 Medium",
      task: "Create updateProduct server action in lib/actions/products.ts",
      file: "lib/actions/products.ts",
      details: "Admin-only action to update product by ID"
    },
    {
      id: "ADMIN-007",
      priority: "🟢 Medium",
      task: "Make Edit button functional in admin products table",
      file: "app/admin/products/page.tsx",
      details: "Open EditProductDialog on click, pass product data"
    },
    {
      id: "ADMIN-008",
      priority: "🟢 Medium",
      task: "Create deleteProduct server action in lib/actions/products.ts",
      file: "lib/actions/products.ts",
      details: "Admin-only action to delete product by ID"
    },
    {
      id: "ADMIN-009",
      priority: "🟢 Medium",
      task: "Add Delete button to admin products table",
      file: "app/admin/products/page.tsx",
      details: "Button with confirmation dialog to delete product"
    },
    {
      id: "ADMIN-010",
      priority: "🟢 Medium",
      task: "Create orders page at app/admin/orders/page.tsx",
      file: "app/admin/orders/page.tsx",
      details: "Table displaying all orders with customer, date, total, status"
    },
    {
      id: "ADMIN-011",
      priority: "🟢 Medium",
      task: "Create getOrders server function in lib/orders.ts",
      file: "lib/orders.ts",
      details: "Fetch all orders with user and order items data joined"
    },
    {
      id: "ADMIN-012",
      priority: "🟢 Medium",
      task: "Make 'View Orders' button in admin dashboard navigate to /admin/orders",
      file: "app/admin/page.tsx",
      details: "Add Link href='/admin/orders' to button"
    },
    {
      id: "ADMIN-013",
      priority: "🟢 Medium",
      task: "Update admin dashboard stats with real data",
      file: "app/admin/page.tsx",
      details: "Query database for actual counts of orders, customers, total revenue"
    },
    {
      id: "ADMIN-014",
      priority: "🔵 Low",
      task: "Create users management page at app/admin/users/page.tsx",
      file: "app/admin/users/page.tsx",
      details: "Table displaying all users with email, join date, admin status"
    },
    {
      id: "ADMIN-015",
      priority: "🔵 Low",
      task: "Add toggle admin status functionality",
      file: "app/admin/users/page.tsx",
      details: "Switch to toggle is_admin field for users"
    },
  ],

  // =============================================================================
  // 🟢 MISSING PAGES & ROUTES
  // =============================================================================
  missingPages: [
    {
      id: "PAGE-001",
      priority: "🟢 Medium",
      task: "Create /protected route at app/protected/page.tsx",
      file: "app/protected/page.tsx",
      details: "Protected page showing user profile info and order history"
    },
    {
      id: "PAGE-002",
      priority: "🔵 Low",
      task: "Create about page at app/about/page.tsx",
      file: "app/about/page.tsx",
      details: "About page with company info (can be generic portfolio content)"
    },
    {
      id: "PAGE-003",
      priority: "🔵 Low",
      task: "Create contact page at app/contact/page.tsx",
      file: "app/contact/page.tsx",
      details: "Contact form with name, email, message fields"
    },
    {
      id: "PAGE-004",
      priority: "🔵 Low",
      task: "Create FAQ page at app/faq/page.tsx",
      file: "app/faq/page.tsx",
      details: "Accordion component with common e-commerce FAQs"
    },
    {
      id: "PAGE-005",
      priority: "🔵 Low",
      task: "Create shipping & returns page at app/shipping/page.tsx",
      file: "app/shipping/page.tsx",
      details: "Information about shipping policies and returns (mock content)"
    },
    {
      id: "PAGE-006",
      priority: "🔵 Low",
      task: "Create terms & conditions page at app/terms/page.tsx",
      file: "app/terms/page.tsx",
      details: "Generic terms of service content"
    },
    {
      id: "PAGE-007",
      priority: "🔵 Low",
      task: "Create privacy policy page at app/privacy/page.tsx",
      file: "app/privacy/page.tsx",
      details: "Generic privacy policy content"
    },
    {
      id: "PAGE-008",
      priority: "🔵 Low",
      task: "Create cookie policy page at app/cookies/page.tsx",
      file: "app/cookies/page.tsx",
      details: "Information about cookie usage"
    },
    {
      id: "PAGE-009",
      priority: "🔵 Low",
      task: "Create careers page at app/careers/page.tsx",
      file: "app/careers/page.tsx",
      details: "Careers page with job listings (mock content for portfolio)"
    },
    {
      id: "PAGE-010",
      priority: "🔵 Low",
      task: "Create blog listing page at app/blog/page.tsx",
      file: "app/blog/page.tsx",
      details: "Blog post listing with mock articles"
    },
  ],

  // =============================================================================
  // 🟢 UI/UX IMPROVEMENTS
  // =============================================================================
  uiImprovements: [
    {
      id: "UI-001",
      priority: "🟢 Medium",
      task: "Add loading skeleton for products grid on homepage",
      file: "app/page.tsx",
      details: "Show skeleton cards while products are loading"
    },
    {
      id: "UI-002",
      priority: "🟢 Medium",
      task: "Add loading skeleton for product detail page",
      file: "app/product/[id]/page.tsx",
      details: "Show skeleton while product data is loading"
    },
    {
      id: "UI-003",
      priority: "🟢 Medium",
      task: "Add error boundary for product detail page",
      file: "app/product/[id]/error.tsx",
      details: "Handle product not found errors with friendly message"
    },
    {
      id: "UI-004",
      priority: "🟢 Medium",
      task: "Add pagination to products listing page",
      file: "app/products/page.tsx",
      details: "Paginate results, show 12 products per page"
    },
    {
      id: "UI-005",
      priority: "🟢 Medium",
      task: "Make newsletter subscription functional",
      file: "components/footer.tsx",
      details: "Add email to database table or show success message (mock for portfolio)"
    },
    {
      id: "UI-006",
      priority: "🟢 Medium",
      task: "Add image zoom on hover for product detail page",
      file: "app/product/[id]/page.tsx",
      details: "Implement image magnifier on hover for main product image"
    },
    {
      id: "UI-007",
      priority: "🟢 Medium",
      task: "Add breadcrumb navigation to product pages",
      file: "app/product/[id]/page.tsx",
      details: "Breadcrumb: Home > Category > Product Name"
    },
    {
      id: "UI-008",
      priority: "🟢 Medium",
      task: "Add quantity selector to product detail page",
      file: "app/product/[id]/page.tsx",
      details: "Number input or +/- buttons to select quantity before adding to cart"
    },
    {
      id: "UI-009",
      priority: "🟢 Medium",
      task: "Add product reviews section to product detail page",
      file: "app/product/[id]/page.tsx",
      details: "Display mock reviews with ratings, user names, dates"
    },
    {
      id: "UI-010",
      priority: "🔵 Low",
      task: "Add related products carousel with navigation arrows",
      file: "app/product/[id]/page.tsx",
      details: "Make related products section scrollable with prev/next arrows"
    },
    {
      id: "UI-011",
      priority: "🔵 Low",
      task: "Add wishlist/favorite button to product cards",
      file: "components/product-card.tsx",
      details: "Heart icon to save products to wishlist (requires wishlist table)"
    },
    {
      id: "UI-012",
      priority: "🔵 Low",
      task: "Add product comparison feature",
      file: "app/compare/page.tsx",
      details: "Allow users to select multiple products and compare features side-by-side"
    },
    {
      id: "UI-013",
      priority: "🔵 Low",
      task: "Add recently viewed products section",
      file: "app/page.tsx",
      details: "Store viewed products in localStorage, display on homepage"
    },
    {
      id: "UI-014",
      priority: "🔵 Low",
      task: "Add animated cart badge when items are added",
      file: "components/navbar.tsx",
      details: "Bounce or pulse animation on cart icon when count changes"
    },
    {
      id: "UI-015",
      priority: "🔵 Low",
      task: "Add image gallery for product detail page",
      file: "app/product/[id]/page.tsx",
      details: "Multiple product images with thumbnail navigation"
    },
  ],

  // =============================================================================
  // 🔵 AUTHENTICATION ENHANCEMENTS
  // =============================================================================
  authEnhancements: [
    {
      id: "AUTH-001",
      priority: "🟢 Medium",
      task: "Remove or implement social auth buttons (Apple, Google, Meta)",
      file: "app/auth/login/page.tsx and app/auth/sign-up/page.tsx",
      details: "Either remove decorative buttons or configure OAuth providers in Supabase"
    },
    {
      id: "AUTH-002",
      priority: "🟢 Medium",
      task: "Add error handling for sign-up users table insertion",
      file: "app/auth/sign-up/actions.ts",
      details: "Catch errors if users table doesn't exist, still allow auth to succeed"
    },
    {
      id: "AUTH-003",
      priority: "🟢 Medium",
      task: "Standardize admin authentication checks",
      file: "lib/auth/admin.ts",
      details: "Ensure both user_metadata.role and users.is_admin are synchronized"
    },
    {
      id: "AUTH-004",
      priority: "🔵 Low",
      task: "Add email verification flow",
      file: "app/auth/verify-email/page.tsx",
      details: "Page to handle email confirmation after signup"
    },
    {
      id: "AUTH-005",
      priority: "🔵 Low",
      task: "Add user profile page at app/profile/page.tsx",
      file: "app/profile/page.tsx",
      details: "Allow users to update name, email, password"
    },
    {
      id: "AUTH-006",
      priority: "🔵 Low",
      task: "Add user order history page at app/orders/page.tsx",
      file: "app/orders/page.tsx",
      details: "Display all orders for logged-in user with status tracking"
    },
  ],

  // =============================================================================
  // 🔵 PERFORMANCE & SEO
  // =============================================================================
  performanceAndSEO: [
    {
      id: "PERF-001",
      priority: "🟢 Medium",
      task: "Add metadata for all pages (title, description)",
      file: "app/**/page.tsx",
      details: "Export metadata object for better SEO"
    },
    {
      id: "PERF-002",
      priority: "🟢 Medium",
      task: "Add Open Graph images for social sharing",
      file: "app/opengraph-image.tsx",
      details: "Generate dynamic OG images for product pages"
    },
    {
      id: "PERF-003",
      priority: "🔵 Low",
      task: "Implement image optimization with blur placeholders",
      file: "next.config.mjs",
      details: "Add image domains and enable placeholder='blur' for all images"
    },
    {
      id: "PERF-004",
      priority: "🔵 Low",
      task: "Add robots.txt and sitemap.xml",
      file: "public/robots.txt and app/sitemap.ts",
      details: "Configure for better search engine crawling"
    },
    {
      id: "PERF-005",
      priority: "🔵 Low",
      task: "Implement Redis caching for product queries",
      file: "lib/cache.ts",
      details: "Cache frequently accessed products to reduce database load"
    },
  ],

  // =============================================================================
  // 🔵 TESTING & QUALITY
  // =============================================================================
  testingAndQuality: [
    {
      id: "TEST-001",
      priority: "🔵 Low",
      task: "Add unit tests for cart operations",
      file: "__tests__/cart.test.ts",
      details: "Test addToCart, removeFromCart, updateQuantity, clearCart functions"
    },
    {
      id: "TEST-002",
      priority: "🔵 Low",
      task: "Add integration tests for checkout flow",
      file: "__tests__/checkout.test.ts",
      details: "Test complete checkout process from cart to order confirmation"
    },
    {
      id: "TEST-003",
      priority: "🔵 Low",
      task: "Add E2E tests with Playwright",
      file: "e2e/shopping-flow.spec.ts",
      details: "Test full shopping flow: browse -> add to cart -> checkout"
    },
    {
      id: "TEST-004",
      priority: "🔵 Low",
      task: "Add TypeScript strict mode",
      file: "tsconfig.json",
      details: "Enable strict: true and fix all type errors"
    },
    {
      id: "TEST-005",
      priority: "🔵 Low",
      task: "Add ESLint custom rules for code quality",
      file: ".eslintrc.json",
      details: "Configure stricter rules to enforce best practices"
    },
  ],

  // =============================================================================
  // 📊 SUMMARY STATS
  // =============================================================================
  summary: {
    totalTasks: 141,
    breakdown: {
      critical: 29,
      high: 22,
      medium: 49,
      low: 41,
    },
    categories: {
      criticalFixes: 5,
      cartSystem: 18,
      searchAndFilter: 12,
      checkoutFlow: 13,
      adminFeatures: 15,
      missingPages: 10,
      uiImprovements: 15,
      authEnhancements: 6,
      performanceAndSEO: 5,
      testingAndQuality: 5,
    },
  },
};

export type TodoTask = {
  id: string;
  priority: string;
  task: string;
  file: string;
  details: string;
};

export type TodoCategory = {
  [key: string]: TodoTask[];
};

/**
 * RECOMMENDED IMPLEMENTATION ORDER:
 *
 * Phase 1 - Critical Foundation (Start Here)
 * ✅ All tasks in criticalFixes (CF-001 to CF-005)
 * ✅ All tasks in cartSystem (CART-001 to CART-018)
 *
 * Phase 2 - Core E-Commerce Features
 * ✅ All tasks in searchAndFilter (SEARCH-001 to SEARCH-012)
 * ✅ All tasks in checkoutFlow (CHECKOUT-001 to CHECKOUT-013)
 *
 * Phase 3 - Admin & Management
 * ✅ All tasks in adminFeatures (ADMIN-001 to ADMIN-015)
 *
 * Phase 4 - Polish & Complete
 * ✅ All tasks in missingPages (PAGE-001 to PAGE-010)
 * ✅ All tasks in uiImprovements (UI-001 to UI-015)
 * ✅ All tasks in authEnhancements (AUTH-001 to AUTH-006)
 *
 * Phase 5 - Optimization (Optional for Portfolio)
 * ✅ All tasks in performanceAndSEO (PERF-001 to PERF-005)
 * ✅ All tasks in testingAndQuality (TEST-001 to TEST-005)
 */
