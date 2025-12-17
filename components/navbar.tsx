"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { ThemeSwitcher } from "./theme-switcher";
import { AuthNav } from "./auth-nav";
import { CartSidebar } from "./cart-sidebar";
import { categories } from "@/constants/categories";
import { checkIsAdmin } from "@/lib/auth/admin-client";
import { createClient } from "@/lib/supabase/client";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    const checkAdmin = async () => {
      const admin = await checkIsAdmin();
      setIsAdmin(admin);
    };

    checkAdmin();

    const supabase = createClient();
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      checkAdmin();
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {mounted && (
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="-ml-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                  <SheetHeader className="border-b pb-4">
                    <SheetTitle className="text-left">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col">
                    {/* Mobile Search */}
                    <div className="mb-6">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search products..."
                          className="w-full pl-10"
                        />
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="space-y-1">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Categories
                      </p>
                      {categories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="my-6 border-t" />

                    {/* Quick Links */}
                    <div className="space-y-1">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Quick Links
                      </p>
                      <Link
                        href="/products"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                      >
                        All Products
                      </Link>
                      <Link
                        href="/about"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                      >
                        About Us
                      </Link>
                      <Link
                        href="/contact"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                      >
                        Contact
                      </Link>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-accent"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background">
              <Image src="/logo.png" alt="Yozada" width={28} height={28} />
            </div>
            <span className="text-xl font-bold tracking-tight">Yozada</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/products"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              All Products
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden flex-1 items-center justify-center px-8 lg:flex lg:max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>

            {isAdmin && (
              <Link href="/admin" className="hidden md:block">
                <Button variant="ghost" size="sm" className="text-sm">
                  Admin
                </Button>
              </Link>
            )}
            <ThemeSwitcher />
            <CartSidebar />
            <AuthNav />
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="border-t px-4 py-3 lg:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
