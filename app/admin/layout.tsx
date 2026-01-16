import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth/server";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Home, Package } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await isAdmin();

  if (!admin) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b bg-card">
        <div className="justify-between flex h-16 items-center gap-4 px-4 ">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Home className="size-5" />
            Back to Site
          </Link>
          <div className="flex-1" />
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin">Dashboard</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/products">
                <Package className="size-4" />
                Products
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Admin Content */}
      <main className=" py-8 px-4">{children}</main>
    </div>
  );
}
