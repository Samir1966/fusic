-- ============================================
-- FUSIC Seed Data
-- Run AFTER setup-database.sql
-- ============================================

-- Admin User (Satya) — password: fusic@admin2026
-- Hash is bcrypt of 'fusic@admin2026'
INSERT INTO admin_users (email, password_hash, name, role) VALUES
('satya@fusic.store', '$2b$10$placeholder_hash_replace_via_api', 'Satya', 'superadmin')
ON CONFLICT (email) DO NOTHING;

-- Categories
INSERT INTO categories (id, name, icon, gradient, image_url, sort_order) VALUES
('men', 'Men', '👔', 'linear-gradient(135deg, #1a1a1a 0%, #3F37C9 100%)', 'https://i.postimg.cc/9FsTbtcS/Gemini-Generated-Image-p8h5pxp8h5pxp8h5.png', 1),
('women', 'Women', '👗', 'linear-gradient(135deg, #FF4057 0%, #FF6B35 100%)', 'https://i.postimg.cc/W1jZxpJ5/Gemini-Generated-Image-1mza3w1mza3w1mza.png', 2),
('oversized', 'Oversized', '🧥', 'linear-gradient(135deg, #2d2d2d 0%, #6B7280 100%)', 'https://i.postimg.cc/PrbhVdHZ/Gemini-Generated-Image-6990rw6990rw6990.png', 3),
('dresses', 'Dresses', '👘', 'linear-gradient(135deg, #D4A853 0%, #FF6B35 100%)', 'https://i.postimg.cc/j5WnyLGw/Different-indian-style-202602242041.jpg', 4),
('hoodies', 'Hoodies', '🧤', 'linear-gradient(135deg, #3F37C9 0%, #7B73F0 100%)', 'https://i.postimg.cc/Wzkp1Zxh/Gemini-Generated-Image-rpk6v9rpk6v9rpk6.png', 5),
('under-999', 'Under ₹999', '🔥', 'linear-gradient(135deg, #10B981 0%, #34D399 100%)', 'https://i.postimg.cc/fTzgZsXW/Gemini-Generated-Image-u9qvwpu9qvwpu9qv.png', 6),
('festival', 'Festival Edit', '🎉', 'linear-gradient(135deg, #FF6B35 0%, #FF4057 50%, #D4A853 100%)', 'https://i.postimg.cc/J0D0HvHt/Gemini-Generated-Image-cj29pycj29pycj29.png', 7)
ON CONFLICT (id) DO NOTHING;

-- Products
INSERT INTO products (name, slug, category, subcategory, price, original_price, discount, rating, review_count, colors, color_names, sizes, image_url, description, fabric, fit, trending, new_arrival, stock, tags, gradient) VALUES
('Midnight Raaga Oversized Tee', 'midnight-raaga-oversized-tee', 'men', 'oversized', 799, 1499, 47, 4.5, 234, ARRAY['#1a1a1a','#2d2d2d','#FF6B35'], ARRAY['Midnight Black','Charcoal','Mango Orange'], ARRAY['S','M','L','XL','XXL'], 'https://i.postimg.cc/PrbhVdHZ/Gemini-Generated-Image-6990rw6990rw6990.png', 'Drop-shoulder oversized tee with raga-inspired print. 240 GSM premium cotton.', '100% Combed Cotton, 240 GSM', 'Oversized', true, true, 45, ARRAY['trending','oversized','printed'], 'linear-gradient(135deg, #1a1a1a 0%, #3F37C9 100%)'),

('Desi Vibe Graphic Tee', 'desi-vibe-graphic-tee', 'men', 'printed', 599, 999, 40, 4.3, 189, ARRAY['#FFFFFF','#1a1a1a','#3F37C9'], ARRAY['White','Black','Indigo'], ARRAY['S','M','L','XL'], 'https://i.postimg.cc/fTzgZsXW/Gemini-Generated-Image-u9qvwpu9qvwpu9qv.png', 'Bold graphic tee with Indian street culture print. 180 GSM bio-washed.', '100% Cotton, 180 GSM Bio-washed', 'Regular', true, false, 120, ARRAY['trending','graphic','streetwear'], 'linear-gradient(135deg, #FF6B35 0%, #FF4057 100%)'),

('Winter Beats Hoodie', 'winter-beats-hoodie', 'men', 'hoodies', 1299, 2499, 48, 4.7, 312, ARRAY['#1a1a1a','#3F37C9','#FF6B35'], ARRAY['Black','Indigo','Coral'], ARRAY['S','M','L','XL','XXL'], 'https://i.postimg.cc/Wzkp1Zxh/Gemini-Generated-Image-rpk6v9rpk6v9rpk6.png', 'Premium fleece hoodie with music-inspired embroidery. Kangaroo pocket.', '60% Cotton 40% Polyester, 380 GSM Fleece', 'Relaxed', true, true, 28, ARRAY['trending','hoodie','winter'], 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)'),

('Bohemian Sunset Midi Dress', 'bohemian-sunset-midi-dress', 'women', 'dresses', 1199, 2199, 45, 4.6, 156, ARRAY['#FF6B35','#D4A853','#FFFFFF'], ARRAY['Sunset Orange','Gold','White'], ARRAY['XS','S','M','L','XL'], 'https://i.postimg.cc/j5WnyLGw/Different-indian-style-202602242041.jpg', 'Flowy midi dress with hand-painted sunset print', '100% Rayon, Lightweight', 'Regular', true, true, 34, ARRAY['trending','dress','ethnic'], 'linear-gradient(135deg, #D4A853 0%, #FF6B35 100%)'),

('Fusion Beat Classic Tee', 'fusion-beat-classic-tee', 'men', 'printed', 499, 899, 44, 4.4, 278, ARRAY['#1a1a1a','#FFFFFF','#FF4057'], ARRAY['Black','White','Red'], ARRAY['S','M','L','XL','XXL'], 'https://i.postimg.cc/W1jZxpJ5/Gemini-Generated-Image-1mza3w1mza3w1mza.png', 'Classic crew neck with FUSIC music fusion print.', '100% Combed Cotton, 180 GSM', 'Regular', false, false, 200, ARRAY['classic','music','printed'], 'linear-gradient(135deg, #FF4057 0%, #FF6B35 100%)'),

('Temple Geometry Oversized', 'temple-geometry-oversized', 'men', 'oversized', 899, 1699, 47, 4.8, 98, ARRAY['#2d2d2d','#D4A853'], ARRAY['Charcoal','Gold'], ARRAY['M','L','XL','XXL'], 'https://i.postimg.cc/qRGXZt18/Gemini-Generated-Image-f48rmmf48rmmf48r.png', 'Temple architecture-inspired geometric patterns.', '100% Combed Cotton, 240 GSM', 'Oversized', true, true, 65, ARRAY['trending','temple','geometric'], 'linear-gradient(135deg, #1a1a1a 0%, #D4A853 100%)'),

('Chai & Chill Oversized Tee', 'chai-chill-oversized', 'men', 'oversized', 799, 1499, 47, 4.5, 234, ARRAY['#F5F0EB','#1a1a1a'], ARRAY['Cream','Black'], ARRAY['S','M','L','XL','XXL'], 'https://i.postimg.cc/9FsTbtcS/Gemini-Generated-Image-p8h5pxp8h5pxp8h5.png', 'Oversized tee with chai glass and headphones graphic.', '100% Combed Cotton, 240 GSM', 'Oversized', true, false, 80, ARRAY['trending','chai','oversized'], 'linear-gradient(135deg, #D4A853 0%, #FF6B35 100%)'),

('Rangoli Rhythm Tee', 'rangoli-rhythm-tee', 'women', 'printed', 599, 999, 40, 4.2, 145, ARRAY['#FFFFFF','#FF4057','#D4A853'], ARRAY['White','Pink','Gold'], ARRAY['XS','S','M','L','XL'], 'https://i.postimg.cc/j5WnyLGw/Different-indian-style-202602242041.jpg', 'Rangoli-pattern tee with vibrant festival colors.', '100% Cotton, 180 GSM Bio-washed', 'Regular', false, false, 95, ARRAY['rangoli','ethnic','women'], 'linear-gradient(135deg, #FF4057 0%, #D4A853 100%)'),

('Urban Nawab Hoodie', 'urban-nawab-hoodie', 'men', 'hoodies', 1499, 2799, 46, 4.6, 89, ARRAY['#1a1a1a','#3F37C9'], ARRAY['Black','Royal Blue'], ARRAY['S','M','L','XL','XXL'], 'https://i.postimg.cc/Wzkp1Zxh/Gemini-Generated-Image-rpk6v9rpk6v9rpk6.png', 'Premium hoodie with Nawabi calligraphy embroidery.', '60% Cotton 40% Polyester, 380 GSM Fleece', 'Relaxed', true, true, 22, ARRAY['hoodie','premium','calligraphy'], 'linear-gradient(135deg, #3F37C9 0%, #1a1a1a 100%)'),

('Festival Firecracker Tee', 'festival-firecracker-tee', 'men', 'printed', 699, 1299, 46, 4.4, 201, ARRAY['#1a1a1a','#FF6B35','#D4A853'], ARRAY['Black','Orange','Gold'], ARRAY['S','M','L','XL'], 'https://i.postimg.cc/J0D0HvHt/Gemini-Generated-Image-cj29pycj29pycj29.png', 'Diwali-themed tee with vibrant pataka design.', '100% Combed Cotton, 200 GSM', 'Regular', true, false, 150, ARRAY['festival','diwali','printed'], 'linear-gradient(135deg, #FF6B35 0%, #D4A853 100%)'),

('Bollywood Remix Oversized', 'bollywood-remix-oversized', 'women', 'oversized', 849, 1599, 47, 4.5, 167, ARRAY['#FFFFFF','#1a1a1a','#FF4057'], ARRAY['White','Black','Hot Pink'], ARRAY['XS','S','M','L','XL'], 'https://i.postimg.cc/W1jZxpJ5/Gemini-Generated-Image-1mza3w1mza3w1mza.png', 'Bollywood poster-art oversized tee.', '100% Combed Cotton, 220 GSM', 'Oversized', false, true, 55, ARRAY['bollywood','women','oversized'], 'linear-gradient(135deg, #FF4057 0%, #FF6B35 100%)'),

('Desi Street Classic', 'desi-street-classic', 'men', 'printed', 449, 799, 44, 4.1, 342, ARRAY['#FFFFFF','#1a1a1a'], ARRAY['White','Black'], ARRAY['S','M','L','XL','XXL'], 'https://i.postimg.cc/fTzgZsXW/Gemini-Generated-Image-u9qvwpu9qvwpu9qv.png', 'Budget-friendly graphic tee with desi street art.', '100% Cotton, 160 GSM', 'Regular', false, false, 300, ARRAY['budget','streetwear','classic'], 'linear-gradient(135deg, #6B7280 0%, #1a1a1a 100%)')
ON CONFLICT (slug) DO NOTHING;

-- Sample Coupons
INSERT INTO coupons (code, description, type, value, min_order, max_discount, usage_limit, is_active, expires_at) VALUES
('WELCOME10', 'Welcome offer — 10% off your first order', 'percentage', 10, 499, 200, 1000, true, '2026-12-31T23:59:59Z'),
('FUSIC200', 'Flat ₹200 off on orders above ₹999', 'flat', 200, 999, NULL, 500, true, '2026-06-30T23:59:59Z'),
('FESTIVAL15', 'Festival special — 15% off on everything', 'percentage', 15, 699, 500, 200, true, '2026-04-30T23:59:59Z')
ON CONFLICT (code) DO NOTHING;
