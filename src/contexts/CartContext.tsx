import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { CartItem } from '../types';
import { useToast } from '../hooks/useToast';

interface CartContextType {
    cartItems: CartItem[];
    loading: boolean;
    total: number;
    itemCount: number;
    fetchCart: () => Promise<void>;
    addToCart: (productId: string) => Promise<boolean>;
    updateQuantity: (itemId: string, newQuantity: number) => Promise<void>;
    removeItem: (itemId: string) => Promise<void>;
    clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const { addToast } = useToast();

    const fetchCart = useCallback(async () => {
        if (!user) {
            setCartItems([]);
            return;
        }

        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('cart_items')
                .select('*, product:products(*)')
                .eq('user_id', user.id);

            if (error) throw error;
            setCartItems(data as CartItem[]);
        } catch (error) {
            addToast({
                message: 'Failed to load cart items',
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    }, [user, addToast]);

    const addToCart = useCallback(async (productId: string) => {
        if (!user) {
            addToast({
                message: 'Please sign in to add items to cart',
                type: 'warning',
            });
            return false;
        }

        try {
            // Check if item already exists
            const { data: existing } = await supabase
                .from('cart_items')
                .select('*')
                .eq('user_id', user.id)
                .eq('product_id', productId)
                .maybeSingle();

            const now = new Date().toISOString();

            if (existing) {
                await supabase
                    .from('cart_items')
                    .update({
                        quantity: existing.quantity + 1,
                        updated_at: now,
                    })
                    .eq('id', existing.id);
            } else {
                await supabase
                    .from('cart_items')
                    .insert({
                        user_id: user.id,
                        product_id: productId,
                        quantity: 1
                    });
            }

            await fetchCart();
            addToast({
                message: 'Added to cart!',
                type: 'success',
            });
            return true;
        } catch (error) {
            addToast({
                message: 'Failed to add item to cart',
                type: 'error',
            });
            return false;
        }
    }, [user, fetchCart, addToast]);

    const removeItem = useCallback(async (itemId: string) => {
        try {
            await supabase.from('cart_items').delete().eq('id', itemId);
            setCartItems(items => items.filter(item => item.id !== itemId));
            addToast({
                message: 'Item removed from cart',
                type: 'success',
            });
        } catch (error) {
            addToast({
                message: 'Failed to remove item',
                type: 'error',
            });
        }
    }, [addToast]);

    const updateQuantity = useCallback(async (itemId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            return removeItem(itemId);
        }

        try {
            await supabase
                .from('cart_items')
                .update({
                    quantity: newQuantity,
                    updated_at: new Date().toISOString()
                })
                .eq('id', itemId);

            setCartItems(items =>
                items.map(item =>
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (error) {
            addToast({
                message: 'Failed to update quantity',
                type: 'error',
            });
        }
    }, [removeItem, addToast]); // removeItem is now defined before

    const clearCart = useCallback(async () => {
        if (!user) return;

        try {
            await supabase.from('cart_items').delete().eq('user_id', user.id);
            setCartItems([]);
            addToast({
                message: 'Cart cleared',
                type: 'success',
            });
        } catch (error) {
            addToast({
                message: 'Failed to clear cart',
                type: 'error',
            });
        }
    }, [user, addToast]);

    const total = cartItems.reduce(
        (sum, item) => sum + (item.product?.price || 0) * item.quantity,
        0
    );

    const itemCount = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCartItems([]);
        }
    }, [user, fetchCart]);

    return (
        <CartContext.Provider value={{
            cartItems,
            loading,
            total,
            itemCount,
            fetchCart,
            addToCart,
            updateQuantity,
            removeItem,
            clearCart,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCartContext() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
}
