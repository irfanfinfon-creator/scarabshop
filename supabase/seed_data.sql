-- ==========================================
-- SEED DATA (Categories & Products)
-- ==========================================

-- 1. Insert Categories
INSERT INTO public.categories (name, slug, description) VALUES
('Electronics', 'electronics', 'Gadgets, phones, and computers'),
('Fashion', 'fashion', 'Clothing, shoes, and accessories'),
('Home & Living', 'home-living', 'Furniture, decor, and essentials'),
('Books', 'books', 'Fiction, non-fiction, and educational');

-- 2. Insert Products (Using subqueries to get category IDs)
INSERT INTO public.products (name, slug, description, price, stock, category_id, images, specs) VALUES
-- Electronics
(
  'Premium Wireless Headphones', 
  'premium-wireless-headphones', 
  'High-fidelity audio with noise cancellation.', 
  299.99, 
  50, 
  (SELECT id FROM public.categories WHERE slug = 'electronics'), 
  ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000'],
  '{"color": "Black", "connectivity": "Bluetooth 5.0"}'::jsonb
),
(
  'Ultra-Slim Laptop', 
  'ultra-slim-laptop', 
  'Powerful performance in a lightweight design.', 
  1299.00, 
  20, 
  (SELECT id FROM public.categories WHERE slug = 'electronics'), 
  ARRAY['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000'],
  '{"ram": "16GB", "storage": "512GB SSD"}'::jsonb
),

-- Fashion
(
  'Classic Denim Jacket', 
  'classic-denim-jacket', 
  'Timeless style for any season.', 
  79.99, 
  100, 
  (SELECT id FROM public.categories WHERE slug = 'fashion'), 
  ARRAY['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000'],
  '{"size": "M", "material": "Denim"}'::jsonb
),

-- Home
(
  'Minimalist Desk Lamp', 
  'minimalist-desk-lamp', 
  'Adjustable brightness and sleek metal finish.', 
  45.00, 
  75, 
  (SELECT id FROM public.categories WHERE slug = 'home-living'), 
  ARRAY['https://images.unsplash.com/photo-1507473888900-52e1adad54cd?auto=format&fit=crop&q=80&w=1000'],
  '{"color": "White", "power": "10W"}'::jsonb
);
