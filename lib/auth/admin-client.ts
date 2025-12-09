import { createClient } from '@/lib/supabase/client'

/**
 * Client-side admin check function.
 * This is for UI purposes only - actual security is enforced server-side.
 */
export async function checkIsAdmin(): Promise<boolean> {
  const supabase = createClient()

  // Get the current user
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return false
  }

  // Query users table for admin status (matching server-side logic)
  const { data, error } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Error checking admin status:', error)
    return false
  }

  return data?.is_admin ?? false
}
