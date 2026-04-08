import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '../../types';
import { useCart } from '../../hooks/useCart';
import { getProductImage } from '../../utils';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function ShoppingCart({ isOpen, onClose, onCheckout }: ShoppingCartProps) {
  const {
    cartItems,
    loading,
    total,
    itemCount,
    updateQuantity,
    removeItem,
  } = useCart();

  if (!isOpen) return null;

  const renderLoading = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-gray-100 rounded-lg animate-pulse h-24" />
      ))}
    </div>
  );

  const renderEmpty = () => (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
        <Trash2 className="w-12 h-12 text-white" />
      </div>
      <h3 className="text-lg font-heading font-semibold text-primary mb-2">Your cart is empty</h3>
      <p className="text-secondary mb-4 font-body">Start shopping to fill it up!</p>
      <button
        onClick={onClose}
        className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent-dark transition-colors font-body"
      >
        Continue Shopping
      </button>
    </div>
  );

  const renderItem = (item: CartItem) => {
    const imageUrl = getProductImage(item.product?.images);

    return (
      <div key={item.id} className="flex gap-4 bg-white border border-gray-100 rounded-lg p-3 hover:shadow-md transition-shadow">
        <img
          src={imageUrl}
          alt={item.product?.name}
          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-primary truncate">{item.product?.name}</h3>
          <p className="text-secondary text-sm font-body">RM{item.product?.price?.toFixed(2)}</p>

          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              title="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="w-8 text-center font-medium font-body">{item.quantity}</span>

            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              title="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>

            <button
              onClick={() => removeItem(item.id)}
              className="ml-auto p-1.5 hover:bg-accent/10 text-accent rounded-lg transition-colors"
              title="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderCartList = () => (
    <div className="space-y-4">
      {cartItems.map((item) => renderItem(item))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-heading font-bold text-primary">Your Cart</h2>
            {itemCount > 0 && (
              <span className="bg-accent text-white text-xs px-2 py-1 rounded-full font-body">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? renderLoading() : cartItems.length === 0 ? renderEmpty() : renderCartList()}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 p-4 space-y-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-secondary font-body">Subtotal</span>
              <span className="text-lg font-heading font-bold text-primary">RM{total.toFixed(2)}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-accent font-body">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Free shipping on orders over RM50</span>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold flex items-center justify-center gap-2 font-body"
            >
              Proceed to Checkout
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}