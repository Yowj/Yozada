export interface Product {
  id: number
  name: string
  price: number
  image: string
  badge?: string | null
  featured?: boolean
  description?: string
  category?: string
  stock?: number
  created_at?: string
  updated_at?: string
}

export interface ProductFormData {
  name: string
  description: string
  price: number
  stock: number
  category: string
  image: string
  badge?: string | null
  featured: boolean
}
