-- ==========================================
-- WISHLIST TABLE SETUP
-- ==========================================

CREATE TABLE IF NOT EXISTS public.wishlist_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Enable RLS
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own wishlist" 
    ON public.wishlist_items 
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own wishlist" 
    ON public.wishlist_items 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from own wishlist" 
    ON public.wishlist_items 
    FOR DELETE 
    USING (auth.uid() = user_id);
