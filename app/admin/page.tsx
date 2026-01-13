import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Package, Users, ShoppingCart, TrendingUp } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const products = await getProducts();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.email}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
              <Package className="size-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Products</p>
              <h3 className="text-2xl font-bold">{products.length}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-lg bg-blue-500/10">
              <ShoppingCart className="size-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Orders</p>
              <h3 className="text-2xl font-bold">-</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-lg bg-green-500/10">
              <Users className="size-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Customers</p>
              <h3 className="text-2xl font-bold">-</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-lg bg-orange-500/10">
              <TrendingUp className="size-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Revenue</p>
              <h3 className="text-2xl font-bold">-</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/admin/products">
              <Package />
              Manage Products
            </Link>
          </Button>
          <Button variant="outline">
            <ShoppingCart />
            View Orders
          </Button>
          <Button variant="outline">
            <Users />
            Manage Users
          </Button>
        </div>
      </Card>
    </div>
  );
}
