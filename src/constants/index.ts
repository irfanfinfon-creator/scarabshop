// Category constants
export const CATEGORIES = [
  { id: '', name: 'All Products' },
  { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Electronics' },
  { id: '550e8400-e29b-41d4-a716-446655440002', name: 'Clothing' },
  { id: '550e8400-e29b-41d4-a716-446655440003', name: 'Home & Garden' },
  { id: '550e8400-e29b-41d4-a716-446655440004', name: 'Sports & Outdoors' },
  { id: '550e8400-e29b-41d4-a716-446655440005', name: 'Books & Media' },
  { id: '550e8400-e29b-41d4-a716-446655440006', name: 'Toys & Games' },
  { id: '550e8400-e29b-41d4-a716-446655440007', name: 'Beauty & Health' },
  { id: '550e8400-e29b-41d4-a716-446655440008', name: 'Food & Beverages' },
  { id: '550e8400-e29b-41d4-a716-446655440009', name: 'Automotive' },
  { id: '550e8400-e29b-41d4-a716-446655440010', name: 'Pet Supplies' },
] as const;

// Order status constants
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const;

// Payment status constants
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

// Payment method constants
export const PAYMENT_METHODS = {
  CARD: 'card',
  PAYPAL: 'paypal',
} as const;

// Default image placeholder
export const DEFAULT_IMAGE = 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400';

// Animation durations
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Toast durations
export const TOAST_DURATION = {
  SHORT: 2000,
  NORMAL: 3000,
  LONG: 5000,
} as const;