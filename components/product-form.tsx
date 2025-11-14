"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { X, Upload } from "lucide-react";

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  images: File[];
}

interface ProductFormProps {
  onSubmit?: (data: ProductFormData) => Promise<void>;
  isLoading?: boolean;
}

const CATEGORIES = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "home-garden", label: "Home & Garden" },
  { value: "books", label: "Books" },
  { value: "sports", label: "Sports" },
  { value: "toys", label: "Toys" },
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function ProductForm({ onSubmit, isLoading = false }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Validate file count
    if (formData.images.length + files.length > MAX_FILES) {
      setErrors((prev) => ({
        ...prev,
        images: `Maximum ${MAX_FILES} images allowed`,
      }));
      return;
    }

    const validFiles: File[] = [];
    const newErrors: string[] = [];

    for (const file of files) {
      // Check file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        newErrors.push(`${file.name} has invalid format`);
        continue;
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        newErrors.push(`${file.name} exceeds 5MB limit`);
        continue;
      }

      validFiles.push(file);
    }

    if (newErrors.length > 0) {
      setErrors((prev) => ({
        ...prev,
        images: newErrors.join(", "),
      }));
    } else if (errors.images) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.images;
        return newErrors;
      });
    }

    // Add valid files
    if (validFiles.length > 0) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...validFiles],
      }));

      // Create previews for new files
      validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }

    // Reset input
    if (e.target) {
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) < 0) {
      newErrors.price = "Price must be a valid positive number";
    }

    if (!formData.stock.trim()) {
      newErrors.stock = "Stock is required";
    } else if (!Number.isInteger(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = "Stock must be a valid positive integer";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (formData.images.length === 0) {
      newErrors.images = "At least one product image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      // Reset form on success
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        images: [],
      });
      setImagePreviews([]);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormSubmitting = isSubmitting || isLoading;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create New Product</CardTitle>
        <CardDescription>Add a new product to your inventory</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {submitError && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">
              {submitError}
            </div>
          )}

          <FieldGroup>
            <Field>
              <FieldLabel>Product Name</FieldLabel>
              <Input
                name="name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isFormSubmitting}
                aria-invalid={!!errors.name}
              />
              {errors.name && <FieldError>{errors.name}</FieldError>}
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <FieldDescription>Provide a detailed product description</FieldDescription>
              <textarea
                name="description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={isFormSubmitting}
                rows={4}
                className={cn(
                  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  errors.description && "border-red-500"
                )}
              />
              {errors.description && <FieldError>{errors.description}</FieldError>}
            </Field>
          </FieldGroup>

          <div className="grid grid-cols-2 gap-4">
            <FieldGroup>
              <Field>
                <FieldLabel>Price</FieldLabel>
                <Input
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleInputChange}
                  disabled={isFormSubmitting}
                  aria-invalid={!!errors.price}
                />
                {errors.price && <FieldError>{errors.price}</FieldError>}
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel>Stock</FieldLabel>
                <Input
                  name="stock"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.stock}
                  onChange={handleInputChange}
                  disabled={isFormSubmitting}
                  aria-invalid={!!errors.stock}
                />
                {errors.stock && <FieldError>{errors.stock}</FieldError>}
              </Field>
            </FieldGroup>
          </div>

          <FieldGroup>
            <Field>
              <FieldLabel>Category</FieldLabel>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                disabled={isFormSubmitting}
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  errors.category && "border-red-500"
                )}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {errors.category && <FieldError>{errors.category}</FieldError>}
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel>Product Images</FieldLabel>
              <FieldDescription>
                Upload up to {MAX_FILES} images (JPEG, PNG, WebP, GIF). Max 5MB per image.
              </FieldDescription>

              <label
                className={cn(
                  "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                  "border-input hover:border-primary hover:bg-accent",
                  isFormSubmitting && "cursor-not-allowed opacity-50",
                  errors.images && "border-red-500 bg-red-50"
                )}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formData.images.length}/{MAX_FILES} images uploaded
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept={ALLOWED_TYPES.join(",")}
                  onChange={handleImageChange}
                  disabled={isFormSubmitting || formData.images.length >= MAX_FILES}
                  className="hidden"
                />
              </label>

              {errors.images && <FieldError>{errors.images}</FieldError>}

              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded-md border border-input"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        disabled={isFormSubmitting}
                        className={cn(
                          "absolute top-1 right-1 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity",
                          isFormSubmitting && "cursor-not-allowed opacity-50"
                        )}
                        aria-label={`Remove image ${index + 1}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Field>
          </FieldGroup>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isFormSubmitting}
              className="flex-1"
            >
              {isFormSubmitting ? "Creating Product..." : "Create Product"}
            </Button>
            <Button
              type="reset"
              variant="outline"
              disabled={isFormSubmitting}
              onClick={() => {
                setFormData({
                  name: "",
                  description: "",
                  price: "",
                  stock: "",
                  category: "",
                  images: [],
                });
                setImagePreviews([]);
                setErrors({});
                setSubmitError("");
              }}
            >
              Clear
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
