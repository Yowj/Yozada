# Admin Setup Instructions

This guide explains how to set up admin access for your e-commerce application.

## Overview

The admin system uses Supabase user metadata to determine if a user has admin privileges. Only users with `role: 'admin'` in their user metadata can access the admin dashboard.

## Files Created

### Core Admin Files
- `lib/auth/admin.ts` - Admin authentication helpers
- `lib/actions/products.ts` - Protected server actions (updated with admin check)
- `app/admin/layout.tsx` - Admin layout with route protection
- `app/admin/page.tsx` - Admin dashboard homepage
- `app/admin/products/page.tsx` - Product management page

### Component Updates
- `components/ui/dialog.tsx` - Dialog component (NEW)
- `components/add-product-button.tsx` - Add product button with form (NEW)
- `components/auth-nav.tsx` - Updated to show "Admin Dashboard" link for admins

## How to Add Admin Role to a User

### Method 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Users**
3. Find the user you want to make an admin
4. Click on the user to open their details
5. Scroll to **User Metadata** section
6. Click **Edit** or add a new metadata field
7. Add the following JSON:
   ```json
   {
     "role": "admin"
   }
   ```
8. Save the changes
9. The user will now have admin access (they may need to log out and log back in)

### Method 2: Using Supabase SQL Editor

Run this SQL query in your Supabase SQL Editor:

```sql
-- Replace 'user-email@example.com' with the actual user's email
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'user-email@example.com';
```

### Method 3: Using Supabase API (Programmatic)

If you need to add admin role programmatically during development:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for this
)

await supabase.auth.admin.updateUserById(
  'user-id-here',
  {
    user_metadata: { role: 'admin' }
  }
)
```

## Accessing the Admin Dashboard

1. **Log in** to your account with an admin-enabled user
2. Click on your **profile dropdown** in the navbar
3. You'll see **"Admin Dashboard"** option (with shield icon)
4. Click to access the admin area

**Direct URL:** `/admin`

## Admin Features

### Dashboard (`/admin`)
- Overview statistics (Products, Orders, Customers, Revenue)
- Quick actions panel

### Product Management (`/admin/products`)
- View all products in a table format
- See product details (image, name, price, badge, featured status)
- **Add Product** button opens a dialog with form
- Form fields:
  - Product Name (required)
  - Price (required)
  - Image URL (required)
  - Badge (optional)
  - Featured checkbox

### Security Features

1. **Route Protection**: Admin routes check for admin role before rendering
2. **Server Action Protection**: All admin actions verify admin status
3. **Client-side UI**: Admin links only visible to admin users
4. **Unauthorized Redirect**: Non-admin users redirected to login

## Testing Admin Access

1. Create a new user account or use an existing one
2. Add admin role using one of the methods above
3. Log out and log back in (to refresh the session)
4. Check that "Admin Dashboard" appears in profile dropdown
5. Navigate to `/admin` - you should see the dashboard
6. Try adding a product via `/admin/products`

## Troubleshooting

### "Admin Dashboard" link not showing
- Ensure the user has `role: 'admin'` in user_metadata
- Log out and log back in to refresh the session
- Check browser console for any auth errors

### Can't access `/admin` routes
- Verify admin role is set correctly in Supabase
- Clear cookies and log in again
- Check that `lib/auth/admin.ts` helpers are working

### Product not being added
- Check Supabase table permissions
- Verify the `products` table exists with correct columns
- Check browser console for error messages
- Ensure user is authenticated as admin

## Database Schema

Your `products` table should have these columns:
- `id` (int8, primary key, auto-increment)
- `name` (text)
- `price` (text)
- `image` (text)
- `featured` (boolean, default false)
- `badge` (text, nullable)
- `created_at` (timestamp)

## Next Steps

Consider adding:
- Edit product functionality
- Delete product functionality
- Order management
- User management
- Analytics dashboard
- Image upload (instead of URL input)
- Product categories management
