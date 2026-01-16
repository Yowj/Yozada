"use client";

import * as React from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Checkbox } from "@/ui/checkbox";
import { updateProduct } from "@/lib/actions/products";
import type { Product } from "@/lib/types";

interface EditProductDialogProps {
  product: Product;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EditProductDialog({
  product,
  trigger,
  open: controlledOpen,
  onOpenChange,
}: EditProductDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(form);

    const result = await updateProduct(Number(product.id), formData);

    if (result.success) {
      setOpen(false);
    } else {
      setError(result.error || "Failed to update product");
    }

    setIsSubmitting(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the product details. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Product Name</Label>
              <Input
                id="edit-name"
                name="name"
                placeholder="Enter product name"
                defaultValue={product.name}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Product Description</Label>
              <Input
                id="edit-description"
                name="description"
                placeholder="Enter product description"
                defaultValue={product.description || ""}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price</Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="99.99"
                  defaultValue={product.price}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-stock">Stock</Label>
                <Input
                  id="edit-stock"
                  name="stock"
                  type="number"
                  placeholder="100"
                  defaultValue={product.stock || ""}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-category">Category</Label>
              <Input
                id="edit-category"
                name="category"
                placeholder="Category"
                defaultValue={product.category || ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-image">New Image (optional)</Label>
              <Input id="edit-image" name="image" type="file" accept="image/*" />
              <p className="text-xs text-muted-foreground">
                Leave empty to keep the current image
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-badge">Badge (optional)</Label>
              <Input
                id="edit-badge"
                name="badge"
                placeholder="New, Sale, Popular, etc."
                defaultValue={product.badge || ""}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="edit-featured" name="featured" defaultChecked={product.featured} />
              <Label htmlFor="edit-featured" className="cursor-pointer">
                Featured product
              </Label>
            </div>
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
