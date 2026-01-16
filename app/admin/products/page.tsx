import { getProducts } from "@/lib/queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { AddProductButton } from "@/ui/admin/add-product-button";
import { AddBadgesButton } from "@/ui/admin/add-badges-button";
import { ProductActions } from "@/ui/admin/product-actions";
import Image from "next/image";
import { Package, Search } from "lucide-react";

export default async function AdminProductsPage() {
  const products = await getProducts();

  // Calculate stats
  const featuredCount = products.filter((p) => p.featured).length;
  const badgedCount = products.filter((p) => p.badge).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <AddBadgesButton />
          <AddProductButton />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Package className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{products.length}</p>
              <p className="text-sm text-muted-foreground">Total Products</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-green-500/10">
              <Package className="size-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{featuredCount}</p>
              <p className="text-sm text-muted-foreground">Featured</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10">
              <Package className="size-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{badgedCount}</p>
              <p className="text-sm text-muted-foreground">With Badges</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>
            A list of all products in your store. Click on actions to edit or delete.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                <Package className="size-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No products yet</h3>
              <p className="mb-4 max-w-sm text-sm text-muted-foreground">
                Get started by adding your first product to the catalog
              </p>
              <AddProductButton />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 pr-4 text-sm font-medium text-muted-foreground">Product</th>
                    <th className="pb-3 pr-4 text-sm font-medium text-muted-foreground">Price</th>
                    <th className="hidden pb-3 pr-4 text-sm font-medium text-muted-foreground md:table-cell">
                      Category
                    </th>
                    <th className="hidden pb-3 pr-4 text-sm font-medium text-muted-foreground sm:table-cell">
                      Status
                    </th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {products.map((product) => (
                    <tr key={product.id} className="group">
                      {/* Product Info */}
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-4">
                          <div className="relative size-12 overflow-hidden rounded-lg bg-muted">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-4 pr-4">
                        <span className="font-semibold">
                          {typeof product.price === "number"
                            ? `$${product.price.toFixed(2)}`
                            : product.price}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="hidden py-4 pr-4 md:table-cell">
                        <span className="text-sm text-muted-foreground">
                          {product.category || "—"}
                        </span>
                      </td>

                      {/* Status Badges */}
                      <td className="hidden py-4 pr-4 sm:table-cell">
                        <div className="flex flex-wrap gap-1.5">
                          {product.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {product.badge}
                            </Badge>
                          )}
                          {product.featured && (
                            <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 text-xs">
                              Featured
                            </Badge>
                          )}
                          {!product.badge && !product.featured && (
                            <span className="text-sm text-muted-foreground">—</span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 text-right">
                        <ProductActions product={product} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
