import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/ui/sonner";
import { CartProvider } from "@/lib/contexts/cart-context";
import "./globals.css";
import { getProducts } from "@/lib/queries";
import { ProductsProvider } from "@/lib/contexts/ProductsProvider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Yozada",
  description: "Discover quality products curated for you. Free shipping on orders over $50.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getProducts();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ProductsProvider products={products}>
            <CartProvider>
              {children}
              <Toaster />
            </CartProvider>
          </ProductsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
