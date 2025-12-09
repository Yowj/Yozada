'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { getAdminUser } from '@/lib/auth/admin'

export async function addProduct(formData: FormData) {
  // Check if user is admin
  const adminUser = await getAdminUser()

  if (!adminUser) {
    return { success: false, error: 'Unauthorized: Admin access required' }
  }

  const supabase = await createClient()

  // Extract form data
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = formData.get('price') as string
  const stock = formData.get('stock') as string
  const category = formData.get('category') as string
  const badge = formData.get('badge') as string | null
  const featured = formData.get('featured') === 'on'
  const imageFile = formData.get('image') as File

  // Handle image upload
  let imageUrl = ''
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `products/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('product_images')
      .upload(filePath, imageFile)

    if (uploadError) {
      console.error('Error uploading image:', uploadError)
      return { success: false, error: 'Failed to upload image' }
    }

    const { data: urlData } = supabase.storage
      .from('product_images')
      .getPublicUrl(filePath)

    imageUrl = urlData.publicUrl
  }

  const { data, error } = await supabase
    .from('products')
    .insert([
      {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
        image: imageUrl,
        featured,
        badge: badge || null,
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
