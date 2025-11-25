import { createClient } from '@supabase/supabase-js'

// This script adds badges to existing products in the database
async function addBadgesToProducts() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  // Define which products should have which badges
  const productBadges = [
    { id: 1, badge: 'Bestseller' },
    { id: 2, badge: null },
    { id: 3, badge: null },
    { id: 4, badge: null },
    { id: 5, badge: 'New' },
    { id: 6, badge: null },
    { id: 7, badge: 'Popular' },
    { id: 8, badge: null },
  ]

  console.log('Starting to add badges to products...')

  for (const product of productBadges) {
    const { error } = await supabase
      .from('products')
      .update({ badge: product.badge })
      .eq('id', product.id)

    if (error) {
      console.error(`Error updating product ${product.id}:`, error)
    } else {
      console.log(`✓ Updated product ${product.id} with badge: ${product.badge || 'none'}`)
    }
  }

  console.log('Done!')
}

addBadgesToProducts()
