import { getProducts } from '@/lib/products'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AddProductButton } from '@/components/add-product-button'
import { AddBadgesButton } from '@/components/add-badges-button'
import Image from 'next/image'

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog
          </p>
        </div>
        <div className="flex gap-3">
          <AddBadgesButton />
          <AddProductButton />
        </div>
      </div>

      {/* Products Table/Grid */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4 border-b pb-3 text-sm font-medium text-muted-foreground">
            <div className="col-span-1">Image</div>
            <div className="col-span-4">Name</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Badge</div>
            <div className="col-span-2">Featured</div>
            <div className="col-span-1">Actions</div>
          </div>

          {products.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <p className="text-lg">No products yet</p>
              <p className="text-sm">Click "Add Product" to create your first product</p>
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-12 gap-4 items-center border-b py-3 last:border-0"
              >
                <div className="col-span-1">
                  <div className="relative size-12 overflow-hidden rounded-md">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="col-span-4">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-semibold">{product.price}</p>
                </div>
                <div className="col-span-2">
                  {product.badge ? (
                    <Badge variant="secondary">{product.badge}</Badge>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </div>
                <div className="col-span-2">
                  {product.featured ? (
                    <Badge className="bg-green-500">Featured</Badge>
                  ) : (
                    <span className="text-sm text-muted-foreground">No</span>
                  )}
                </div>
                <div className="col-span-1">
                  <button className="text-sm text-muted-foreground hover:text-foreground">
                    Edit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
