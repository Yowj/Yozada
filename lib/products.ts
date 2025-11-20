import { createClient } from '@/lib/supabase/server'

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

export async function getProducts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return (data || []) as Product[]
}

export async function getFeaturedProducts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }

  return (data || []) as Product[]
}

export async function getProductById(id: number) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data as Product
}
