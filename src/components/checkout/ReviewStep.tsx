import { CartItem } from '../../types';
import { formatCurrency } from '../../utils';

interface ReviewStepProps {
  cartItems: CartItem[];
  onPlaceOrder: () => void;
  onBack: () => void;
  loading?: boolean;
}

export function ReviewStep({
  cartItems,
  onPlaceOrder,
  onBack,
  loading = false
}: ReviewStepProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const orderTotal = subtotal + shipping + tax;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-heading font-semibold text-gray-950">Order Summary</h3>

      {/* Order Items */}
      <div className="bg-white rounded-lg border border-gray-100">
        <div className="p-6">
          <h4 className="font-heading font-medium mb-4 text-gray-950">Items ({cartItems.length})</h4>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {item.product?.images && Array.isArray(item.product.images) && item.product.images.length > 0 ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No Image</span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h5 className="font-heading font-medium text-gray-950">{item.product?.name}</h5>
                  <p className="text-sm text-gray-500 font-body">Quantity: {item.quantity}</p>
                  {item.product?.category && (
                    <p className="text-xs text-gray-500 font-body">{item.product.category.name}</p>
                  )}
                </div>

                <div className="text-right">
                  <p className="font-heading font-medium text-gray-950">
                    {formatCurrency((item.product?.price || 0) * item.quantity)}
                  </p>
                  <p className="text-sm text-gray-500 font-body">
                    {formatCurrency(item.product?.price || 0)} each
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Totals */}
      <div className="bg-white rounded-lg border border-gray-100">
        <div className="p-6">
          <h4 className="font-heading font-medium mb-4 text-gray-950">Order Details</h4>

          <div className="space-y-3">
            <div className="flex justify-between text-gray-500 font-body">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex justify-between text-gray-500 font-body">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
              </span>
            </div>

            {shipping > 0 && (
              <p className="text-xs text-accent font-body">
                Add {formatCurrency(50 - subtotal)} more for free shipping
              </p>
            )}

            <div className="flex justify-between text-gray-500 font-body">
              <span>Tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-heading font-bold text-gray-950">
                <span>Total</span>
                <span>{formatCurrency(orderTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div className="bg-white rounded-lg border border-gray-100 p-6">
        <h4 className="font-heading font-medium mb-4 text-gray-950">Promo Code</h4>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter promo code"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 font-body"
          />
          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium font-body text-gray-950">
            Apply
          </button>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 h-4 w-4 text-accent focus:ring-red-400 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="text-sm text-gray-950 font-body">
            I agree to the Terms and Conditions and Privacy Policy.
            I understand that this is a demo order and no actual charges will be made.
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex-1 border border-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50 font-body text-gray-950"
        >
          Back to Payment
        </button>

        <button
          onClick={onPlaceOrder}
          disabled={loading}
          className="flex-1 bg-accent text-white py-3 px-4 rounded-lg hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed font-medium font-body"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Placing Order...
            </span>
          ) : (
            'Place Order'
          )}
        </button>
      </div>

      {/* Security Note */}
      <div className="text-center text-sm text-gray-500 font-body">
        <div className="flex items-center justify-center gap-2 mb-2">
          <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>Secure Checkout</span>
        </div>
        <p>Your payment information is encrypted and secure</p>
      </div>
    </div>
  );
}