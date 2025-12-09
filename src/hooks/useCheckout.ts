import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from './useToast';
import { useCart } from './useCart';
import { Address, CartItem } from '../types';
import { PAYMENT_METHODS } from '../constants';

export interface AddressFormData {
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { addToast } = useToast();
  const { cartItems, clearCart } = useCart();

  // Create new address
  const createAddress = useCallback(async (formData: AddressFormData) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('addresses')
      .insert({ ...formData, user_id: user.id })
      .select()
      .single();

    if (error) throw error;
    return data;
  }, [user]);

  // Get user addresses
  const getAddresses = useCallback(async () => {
    if (!user) return [];

    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });

    if (error) throw error;
    return data as Address[];
  }, [user]);

  // Place order
  const placeOrder = useCallback(async (
    addressId: string,
    paymentMethod: string = PAYMENT_METHODS.CARD
  ) => {
    if (!user) throw new Error('User not authenticated');
    if (cartItems.length === 0) throw new Error('Cart is empty');

    setLoading(true);
    try {
      // Calculate total
      const total = cartItems.reduce(
        (sum: number, item: CartItem) => sum + (item.product?.price || 0) * item.quantity,
        0
      );

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: total,
          status: 'pending',
          shipping_address_id: addressId,
          payment_method: paymentMethod,
          payment_status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map((item: CartItem) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product?.price || 0,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart
      await clearCart();

      addToast({
        message: 'Order placed successfully!',
        type: 'success',
      });

      return order;
    } catch (error) {
      addToast({
        message: 'Failed to place order',
        type: 'error',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user, cartItems, clearCart, addToast]);

  // Calculate order total
  const calculateTotal = useCallback(() => {
    return cartItems.reduce(
      (sum: number, item: CartItem) => sum + (item.product?.price || 0) * item.quantity,
      0
    );
  }, [cartItems]);

  return {
    loading,
    cartItems,
    createAddress,
    getAddresses,
    placeOrder,
    calculateTotal,
  };
}