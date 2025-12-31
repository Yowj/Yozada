// Re-export server auth utilities
// Note: Only import from '@/lib/auth/server' in server components/actions
// Use '@/lib/auth/client' for client components

export {
  getUser,
  isAdmin,
  requireAdmin,
  getAdminUser,
} from './server'
