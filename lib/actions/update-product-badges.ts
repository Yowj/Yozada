'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { getAdminUser } from '@/lib/auth/server'

export async function updateProductBadges() {
  // Check if user is admin
  const adminUser = await getAdminUser()

  if (!adminUser) {
    return { success: false, error: 'Unauthorized: Admin access required' }
  }

  const supabase = await createClient()

  // Define which products should have which badges
  const updates = [
    { id: 1, badge: 'Bestseller' },
    { id: 5, badge: 'New' },
    { id: 7, badge: 'Popular' },
  ]

  try {
    for (const update of updates) {
      const { error } = await supabase
        .from('products')
        .update({ badge: update.badge })
        .eq('id', update.id)

      if (error) {
        console.error(`Error updating product ${update.id}:`, error)
        return { success: false, error: error.message }
      }
    }

    revalidatePath('/')
    revalidatePath('/admin/products')

    return {
      success: true,
      message: 'Successfully added badges to products'
    }
  } catch (error) {
    console.error('Error updating badges:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
