import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product, Category } from '../types';
import { useToast } from './useToast';
import { ProductFormData } from '../components/admin/ProductForm';

export function useProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data as Product[]);
    } catch (error) {
      addToast({
        message: 'Failed to fetch products',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data as Category[]);
    } catch (error) {
      addToast({
        message: 'Failed to fetch categories',
        type: 'error',
      });
    }
  }, [addToast]);

  // Create product
  const createProduct = useCallback(async (formData: ProductFormData) => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category_id: formData.category_id || null,
        images: formData.images
          ? formData.images.split(',').map(img => img.trim()).filter(Boolean)
          : [],
      };

      const { error } = await supabase.from('products').insert(payload);

      if (error) throw error;

      addToast({
        message: 'Product created successfully',
        type: 'success',
      });

      await fetchProducts();
      return true;
    } catch (error) {
      addToast({
        message: 'Failed to create product',
        type: 'error',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [addToast, fetchProducts]);

  // Update product
  const updateProduct = useCallback(async (productId: string, formData: ProductFormData) => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category_id: formData.category_id || null,
        images: formData.images
          ? formData.images.split(',').map(img => img.trim()).filter(Boolean)
          : [],
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('products')
        .update(payload)
        .eq('id', productId);

      if (error) throw error;

      addToast({
        message: 'Product updated successfully',
        type: 'success',
      });

      await fetchProducts();
      return true;
    } catch (error) {
      console.error('Update product error:', error);
      addToast({
        message: 'Failed to update product',
        type: 'error',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [addToast, fetchProducts]);

  // Delete product
  const deleteProduct = useCallback(async (productId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      addToast({
        message: 'Product deleted successfully',
        type: 'success',
      });

      await fetchProducts();
      return true;
    } catch (error) {
      addToast({
        message: 'Failed to delete product',
        type: 'error',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [addToast, fetchProducts]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  return {
    products,
    categories,
    loading,
    fetchProducts,
    fetchCategories,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}