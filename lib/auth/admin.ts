import { createClient } from '@/lib/supabase/server'

export async function isAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return false
  }

  // Check if user has admin role in user_metadata
  return user.user_metadata?.role === 'admin'
}

export async function requireAdmin() {
  const admin = await isAdmin()

  if (!admin) {
    throw new Error('Unauthorized: Admin access required')
  }

  return true
}

export async function getAdminUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.user_metadata?.role !== 'admin') {
    return null
  }

  return user
}
