import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import {
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { getProducts, getFeaturedProducts } from "@/lib/queries";
import Image from "next/image";

export default async function AdminDashboard() {
  const products = await getProducts();
  const featuredProducts = await getFeaturedProducts();

  // Calculate stats
  const totalProducts = products.length;
  const featuredCount = featuredProducts.length;
  const productsWithBadges = products.filter((p) => p.badge).length;

  // Get recent products (last 5 added)
  const recentProducts = products.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your store performance</p>
        </div>
        <Button asChild>
          <Link href="/admin/products">
            <Plus className="mr-2 size-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-green-600">
                <ArrowUpRight className="mr-1 size-3" />
                {featuredCount} featured
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Featured Products</CardTitle>
            <TrendingUp className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{featuredCount}</div>
            <p className="text-xs text-muted-foreground">
              {totalProducts > 0
                ? `${Math.round((featuredCount / totalProducts) * 100)}% of catalog`
                : "No products yet"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="text-xs text-muted-foreground">Coming soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="text-xs text-muted-foreground">Coming soon</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Products */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Products</CardTitle>
              <CardDescription>Latest additions to your catalog</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/products">
                View All
                <ArrowUpRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Package className="mb-4 size-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold">No products yet</h3>
                <p className="text-sm text-muted-foreground">
                  Get started by adding your first product
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/admin/products">
                    <Plus className="mr-2 size-4" />
                    Add Product
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-accent/50"
                  >
                    <div className="relative size-12 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.badge && <Badge variant="secondary">{product.badge}</Badge>}
                      {product.featured && (
                        <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats & Actions */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Product catalog overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Stat Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                    <Package className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Products</p>
                    <p className="text-xs text-muted-foreground">In your catalog</p>
                  </div>
                </div>
                <span className="text-xl font-bold">{totalProducts}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-green-500/10">
                    <TrendingUp className="size-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Featured</p>
                    <p className="text-xs text-muted-foreground">Promoted products</p>
                  </div>
                </div>
                <span className="text-xl font-bold">{featuredCount}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-blue-500/10">
                    <Eye className="size-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">With Badges</p>
                    <p className="text-xs text-muted-foreground">Products with badges</p>
                  </div>
                </div>
                <span className="text-xl font-bold">{productsWithBadges}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 pt-4 border-t">
              <p className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</p>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/products">
                  <Package className="mr-2 size-4" />
                  Manage Products
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/" target="_blank">
                  <Eye className="mr-2 size-4" />
                  View Store
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
