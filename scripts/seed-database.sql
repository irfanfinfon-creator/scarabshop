-- Sample data for e-commerce MVP
-- Run this in Supabase SQL Editor to populate database with test data

-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
('Electronics', 'electronics', 'Electronic devices and accessories'),
('Clothing', 'clothing', 'Fashion and apparel'),
('Home & Garden', 'home-garden', 'Home decor and gardening supplies'),
('Books', 'books', 'Books and reading materials'),
('Sports', 'sports', 'Sports equipment and accessories')
ON CONFLICT (slug) DO NOTHING;

-- Get category IDs for products
DO $$
DECLARE
  electronics_id uuid;
  clothing_id uuid;
  home_id uuid;
BEGIN
  SELECT id INTO electronics_id FROM categories WHERE slug = 'electronics';
  SELECT id INTO clothing_id FROM categories WHERE slug = 'clothing';
  SELECT id INTO home_id FROM categories WHERE slug = 'home-garden';

  -- Insert sample products
  INSERT INTO products (name, slug, description, price, category_id, stock, images, is_active) VALUES
  (
    'Wireless Headphones',
    'wireless-headphones',
    'Premium noise-cancelling wireless headphones with 30-hour battery life',
    129.99,
    electronics_id,
    50,
    '["https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg"]'::jsonb,
    true
  ),
  (
    'Smart Watch',
    'smart-watch',
    'Fitness tracking smartwatch with heart rate monitor and GPS',
    249.99,
    electronics_id,
    30,
    '["https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg"]'::jsonb,
    true
  ),
  (
    'Laptop Stand',
    'laptop-stand',
    'Ergonomic aluminum laptop stand for better posture',
    49.99,
    electronics_id,
    100,
    '["https://images.pexels.com/photos/7974/pexels-photo.jpg"]'::jsonb,
    true
  ),
  (
    'Cotton T-Shirt',
    'cotton-tshirt',
    'Comfortable 100% organic cotton t-shirt in multiple colors',
    24.99,
    clothing_id,
    200,
    '["https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg"]'::jsonb,
    true
  ),
  (
    'Denim Jeans',
    'denim-jeans',
    'Classic fit denim jeans with stretch comfort',
    59.99,
    clothing_id,
    75,
    '["https://images.pexels.com/photos/1346187/pexels-photo-1346187.jpeg"]'::jsonb,
    true
  ),
  (
    'Table Lamp',
    'table-lamp',
    'Modern LED table lamp with adjustable brightness',
    39.99,
    home_id,
    60,
    '["https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg"]'::jsonb,
    true
  ),
  (
    'Plant Pot Set',
    'plant-pot-set',
    'Set of 3 ceramic plant pots with drainage holes',
    29.99,
    home_id,
    120,
    '["https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg"]'::jsonb,
    true
  ),
  (
    'Wireless Mouse',
    'wireless-mouse',
    'Ergonomic wireless mouse with silent clicks',
    34.99,
    electronics_id,
    150,
    '["https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg"]'::jsonb,
    true
  )
  ON CONFLICT (slug) DO NOTHING;
END $$;
