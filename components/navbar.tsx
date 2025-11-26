"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { ThemeSwitcher } from "./theme-switcher";
import { AuthNav } from "./auth-nav";
import { CartSidebarClient } from "./cart-sidebar-client";
import { categories } from "@/constants/categories";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 items-center justify-between px-4">
        {/* Mobile - Menu Button (Left) */}
        <div className="md:hidden">
          {mounted && <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Categories</h3>
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-4 border-t pt-4">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="w-full pl-10"
                    />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>}
        </div>

        {/* Desktop - Logo and Categories (Left) */}
        <div className="hidden items-center gap-6 md:flex md:w-1/3">
          <Link href="/" className="flex items-center gap-1">
            <div className="flex h-full w-full items-center justify-center rounded-md border">
              <Image src="/logo.png" alt="Logo" width={50} height={50} />
            </div>
            <span className="text-lg font-semibold">Yozada</span>
          </Link>

          <div className="flex items-center gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile - Logo and Name (Center) */}
        <div className="absolute left-1/2 -translate-x-1/2 md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-full w-full items-center justify-center rounded-md border-2">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
            </div>
            <span className="text-lg font-semibold">Yozada</span>
          </Link>
        </div>

        {/* Desktop - Search Bar (Middle) */}
        <div className="hidden flex-1 items-center justify-center px-4 sm:px-8 md:flex md:max-w-md lg:max-w-lg">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search products..." className="w-full pl-10" />
          </div>
        </div>

        {/* Cart (Right) - Both Mobile and Desktop */}
        <div className="flex items-center gap-2 md:gap-4 ml-auto">
          <ThemeSwitcher />
          <CartSidebarClient />
          <AuthNav />
        </div>
      </div>
    </nav>
  );
}
