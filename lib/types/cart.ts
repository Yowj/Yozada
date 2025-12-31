import type { Product } from './product'

export interface CartItem {
  id: number
  user_id: string
  product_id: number
  quantity: number
  created_at: string
  updated_at?: string
  product?: Product
}

export interface CartItemWithProduct extends CartItem {
  product: Product
}
