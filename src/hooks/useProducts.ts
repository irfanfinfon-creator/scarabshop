import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product, WishlistItem } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from './useToast';

export type SortOption = 'price-asc' | 'price-desc' | 'newest' | 'oldest' | 'name-asc' | 'name-desc';

export function useProducts(options?: {
  categoryId?: string;
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  sortOption?: SortOption;
  limit?: number;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addToast } = useToast();
  const { categoryId, searchQuery, minPrice, maxPrice, sortOption = 'newest', limit } = options || {};

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('is_active', true);

      // Filtering
      if (categoryId) query = query.eq('category_id', categoryId);
      if (searchQuery) query = query.ilike('name', `%${searchQuery}%`);
      if (minPrice !== undefined) query = query.gte('price', minPrice);
      if (maxPrice !== undefined) query = query.lte('price', maxPrice);

      // Sorting
      switch (sortOption) {
        case 'price-asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price-desc':
          query = query.order('price', { ascending: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'oldest':
          query = query.order('created_at', { ascending: true });
          break;
        case 'name-asc':
          query = query.order('name', { ascending: true });
          break;
        case 'name-desc':
          query = query.order('name', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query.limit(limit || 1000);

      if (error) throw error;
      setProducts(data as Product[]);
    } catch (error) {
      addToast({
        message: 'Failed to load products',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [categoryId, searchQuery, minPrice, maxPrice, sortOption, limit, addToast]);

  const fetchWishlist = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('wishlists')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setWishlist(data as WishlistItem[]);
    } catch (error) {
      addToast({
        message: 'Failed to load wishlist',
        type: 'error',
      });
    }
  }, [user, addToast]);

  const toggleWishlist = useCallback(async (productId: string) => {
    if (!user) {
      addToast({
        message: 'Please sign in to manage your wishlist',
        type: 'warning',
      });
      return;
    }

    try {
      const existingItem = wishlist.find(item => item.product_id === productId);

      if (existingItem) {
        await supabase.from('wishlists').delete().eq('id', existingItem.id);
        setWishlist(items => items.filter(item => item.id !== existingItem.id));
        addToast({
          message: 'Removed from wishlist',
          type: 'success',
        });
      } else {
        const { data, error } = await supabase
          .from('wishlists')
          .insert({ user_id: user.id, product_id: productId })
          .select()
          .single();

        if (error) throw error;
        setWishlist(items => [...items, data as WishlistItem]);
        addToast({
          message: 'Added to wishlist',
          type: 'success',
        });
      }
    } catch (error) {
      addToast({
        message: 'Failed to update wishlist',
        type: 'error',
      });
    }
  }, [user, wishlist, addToast]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some(item => item.product_id === productId);
  }, [wishlist]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user, fetchWishlist]);

  return {
    products,
    wishlist,
    loading,
    fetchProducts,
    fetchWishlist,
    toggleWishlist,
    isInWishlist,
  };
}