"use client";

import * as React from "react";
import { Plus, Upload } from "lucide-react";
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
import { addProduct } from "@/lib/actions/products";

export function AddProductButton() {
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(form);

    const result = await addProduct(formData);

    if (result.success) {
      setOpen(false);
      form.reset();
      setFileName(null);
    } else {
      setError(result.error || "Failed to add product");
    }

    setIsSubmitting(false);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : null);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Fill in the product details below. Required fields are marked with an asterisk.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            {/* Basic Info Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">Basic Information</h4>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">
                    Product Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">
                    Description <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Brief description of the product"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Inventory Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">Pricing & Inventory</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">
                    Price <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="99.99"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">
                    Stock <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    placeholder="100"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Organization Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">Organization</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="category"
                    name="category"
                    placeholder="e.g., Electronics"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="badge">Badge</Label>
                  <Input
                    id="badge"
                    name="badge"
                    placeholder="New, Sale, Popular..."
                  />
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">Product Image</h4>
              <div className="grid gap-2">
                <Label htmlFor="image">
                  Image <span className="text-destructive">*</span>
                </Label>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="image"
                    className="flex h-10 w-full cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background hover:bg-accent hover:text-accent-foreground"
                  >
                    <Upload className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {fileName || "Choose an image file..."}
                    </span>
                  </label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Supported formats: JPG, PNG, GIF. Max size: 5MB
                </p>
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center space-x-3 rounded-lg border p-4">
              <Checkbox id="featured" name="featured" />
              <div className="space-y-0.5">
                <Label htmlFor="featured" className="cursor-pointer font-medium">
                  Featured Product
                </Label>
                <p className="text-xs text-muted-foreground">
                  Featured products appear prominently on the homepage
                </p>
              </div>
            </div>

            {/* Error Display */}
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
              onClick={() => {
                setOpen(false);
                setFileName(null);
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
