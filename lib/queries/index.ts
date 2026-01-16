// Re-export all query functions
// Import from '@/lib/queries' for clean imports

export {
  getProducts,
  getFeaturedProducts,
  getProductById,
} from './products'

export {
  getCartItems,
  getCartItemCount,
  getCartTotal,
} from './cart'
