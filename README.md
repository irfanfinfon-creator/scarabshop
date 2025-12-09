# E-Commerce MVP - ShopHub

A modern, fullstack e-commerce platform built with React, TypeScript, and Supabase.

## Architecture

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling and dev server
- **Tailwind CSS** for styling
- **Lucide React** for icons

### Backend & Database
- **Supabase** (PostgreSQL database + Auth + Edge Functions)
- Built-in authentication with email/password
- Row Level Security (RLS) for data protection
- Real-time capabilities

### Key Features

#### Customer Features
- Browse products by category with search
- Add products to cart and manage quantities
- Secure checkout with address management
- Order tracking and history
- Wishlist functionality
- User profile management

#### Admin Features
- Product management (CRUD operations)
- Order management and status updates
- Sales analytics dashboard
- Inventory tracking

## Database Schema

### Tables
- **profiles** - User profiles linked to auth.users
- **categories** - Product categories
- **products** - Product catalog with pricing and inventory
- **cart_items** - Shopping cart items per user
- **addresses** - Saved shipping addresses
- **orders** - Customer orders
- **order_items** - Line items for each order
- **wishlists** - Saved favorite products

## Security

All tables use Row Level Security (RLS):
- Customers can only access their own data
- Admins have elevated permissions for management
- Public users can browse products and categories
- Authentication required for cart, checkout, and orders

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account (already configured)

### Environment Variables

The `.env` file contains your Supabase configuration:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── admin/              # Admin panel components
│   ├── auth/               # Login/signup forms
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout flow
│   ├── layout/             # Header and navigation
│   ├── orders/             # Order history
│   ├── products/           # Product catalog
│   └── profile/            # User profile
├── contexts/
│   └── AuthContext.tsx     # Authentication state
├── lib/
│   └── supabase.ts         # Supabase client
├── types/
│   ├── database.ts         # Database types
│   └── index.ts            # Domain types
├── App.tsx                 # Main application
└── main.tsx                # Entry point
```

## Admin Setup

To create an admin user:

1. Sign up for a normal account
2. In Supabase dashboard, go to Table Editor
3. Open the `profiles` table
4. Find your user and set `is_admin` to `true`

## Deployment

### Frontend (Cloudflare Pages)
1. Connect your Git repository to Cloudflare Pages
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add environment variables in Cloudflare Pages settings

### Database (Supabase)
Already deployed and configured. Database migrations are applied automatically.

## Testing Checkout

The checkout flow uses a mock payment system. In production, integrate with:
- Stripe
- PayPal
- Square
- Or other payment processors

## API Integration

Supabase automatically generates a REST API for all tables. Use the Supabase client:

```typescript
import { supabase } from './lib/supabase';

// Fetch products
const { data } = await supabase
  .from('products')
  .select('*')
  .eq('is_active', true);

// Add to cart
await supabase
  .from('cart_items')
  .insert({ user_id, product_id, quantity: 1 });
```

## Performance Considerations

- Images loaded from Pexels CDN
- Database queries optimized with indexes
- Pagination ready for large datasets
- RLS policies optimized for performance

## Future Enhancements

- Product reviews and ratings
- Email notifications for order updates
- Advanced search with filters
- Recommended products
- Promotional codes and discounts
- Multi-vendor marketplace support
- Native mobile apps
- Analytics integration

## License

MIT
