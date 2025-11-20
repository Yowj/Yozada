'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { getAdminUser } from '@/lib/auth/admin'

export interface AddProductInput {
  name: string
  price: string
  image: string
  featured?: boolean
  badge?: string
}

export async function addProduct(input: AddProductInput) {
  // Check if user is admin
  const adminUser = await getAdminUser()

  if (!adminUser) {
    return { success: false, error: 'Unauthorized: Admin access required' }
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .insert([
      {
        name: input.name,
        price: input.price,
        image: input.image,
        featured: input.featured || false,
        badge: input.badge || null,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('Error adding product:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/products')

  return { success: true, data }
}
