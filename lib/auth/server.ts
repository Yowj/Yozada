import { createClient } from '@/lib/supabase/server'
import type { User } from '@supabase/supabase-js'

/**
 * Get the current authenticated user
 * Returns null if not authenticated
 */
export async function getUser(): Promise<User | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

/**
 * Check if current user is an admin
 * Returns false if not authenticated or not admin
 */
export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return false
  }

  const { data, error } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .maybeSingle()

  if (error) {
    console.error('Error checking admin status:', error)
    return false
  }

  return data?.is_admin ?? false
}

/**
 * Require admin access - throws if not admin
 * Use in server actions that require admin permissions
 */
export async function requireAdmin(): Promise<void> {
  const admin = await isAdmin()

  if (!admin) {
    throw new Error('Unauthorized: Admin access required')
  }
}

/**
 * Get the current user only if they are an admin
 * Returns null if not authenticated or not admin
 */
export async function getAdminUser(): Promise<User | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data, error } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .maybeSingle()

  if (error) {
    console.error('Error fetching admin user:', error)
    return null
  }

  if (!data?.is_admin) {
    return null
  }

  return user
}
