import { createClient } from '@/lib/supabase/server'

export async function isAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return false
  }

  // Query users table instead
  const { data } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  return data?.is_admin ?? false
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

  if (!user) {
    return null
  }

  // Check admin status in users table
  const { data: userData } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!userData?.is_admin) {
    return null
  }

  return user
}