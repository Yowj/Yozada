"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, SearchCheckIcon, SearchIcon, X } from "lucide-react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/ui/sheet";
import { Search } from "@/components/search";
import Image from "next/image";
import { ThemeSwitcher } from "./theme-switcher";
import { AuthNav } from "../ui/navbar/auth-nav";
import { CartSidebar } from "./CartSidebar";
import { checkIsAdmin } from "@/lib/auth/client";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [hasScrolled, setHasScrolled] = React.useState(false);

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

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      authListener?.subscription.unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Minimal navigation items
  const navItems = [
    { href: "/shop", label: "Shop" },
    { href: "/collections", label: "Collections" },
  ];

  const mobileNavItems = [
    { href: "/shop", label: "Shop All" },
    { href: "/collections", label: "Collections" },
    { href: "/about", label: "About" },
    ...(isAdmin ? [{ href: "/admin", label: "Admin", isAdmin: true }] : []),
  ];

  return (
    <motion.nav
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        hasScrolled ? "bg-background/90 backdrop-blur-lg" : "bg-background/95 backdrop-blur-sm",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Mobile Menu */}
          <div className="flex items-center gap-4 lg:hidden">
            {mounted && (
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <div className="flex h-full flex-col">
                    <SheetHeader className="border-b p-6">
                      <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 p-6">
                      <div className="space-y-1">
                        {mobileNavItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                              item.isAdmin ? "text-primary hover:bg-primary/10" : "hover:bg-accent",
                            )}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}

            {/* Mobile Logo */}
            <Link href="/" className="lg:hidden">
              <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="Yozada" width={28} height={28} className="rounded" />
              </div>
            </Link>
          </div>

          {/* Desktop Logo & Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Yozada" width={28} height={28} className="rounded" />
              <span className="text-lg font-semibold">Yozada</span>
            </Link>

            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden flex-1 max-w-md lg:block">
            <div className="relative">
              <Search />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-5"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <AnimatePresence mode="wait">
                {isSearchOpen ? <X className="h-4 w-4" /> : <SearchIcon className="h-4 w-4" />}
              </AnimatePresence>
            </Button>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-1 lg:flex">
              {isAdmin && (
                <Link href="/admin">
                  <Button variant="ghost" size="sm" className="h-9 text-sm">
                    Admin
                  </Button>
                </Link>
              )}

              <ThemeSwitcher />
              <CartSidebar />
              <AuthNav />
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-1 lg:hidden">
              <CartSidebar />
              <ThemeSwitcher />
              <AuthNav />
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              className="border-t px-4 py-3 lg:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                <Search />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
