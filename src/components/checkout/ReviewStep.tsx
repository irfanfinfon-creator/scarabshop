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
  const tax = subtotal * 0.08; // 8% tax
  const orderTotal = subtotal + shipping + tax;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Order Summary</h3>

      {/* Order Items */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <h4 className="font-medium mb-4">Items ({cartItems.length})</h4>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
                {/* Product Image */}
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

                {/* Product Details */}
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900">{item.product?.name}</h5>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  {item.product?.category && (
                    <p className="text-xs text-gray-500">{item.product.category.name}</p>
                  )}
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {formatCurrency((item.product?.price || 0) * item.quantity)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(item.product?.price || 0)} each
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Totals */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <h4 className="font-medium mb-4">Order Details</h4>

          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
              </span>
            </div>

            {shipping > 0 && (
              <p className="text-xs text-green-600">
                Add {formatCurrency(50 - subtotal)} more for free shipping
              </p>
            )}

            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>{formatCurrency(orderTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="font-medium mb-4">Promo Code</h4>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter promo code"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
            Apply
          </button>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="text-sm text-blue-800">
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
          className="flex-1 border border-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50"
        >
          Back to Payment
        </button>

        <button
          onClick={onPlaceOrder}
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
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
      <div className="text-center text-sm text-gray-600">
        <div className="flex items-center justify-center gap-2 mb-2">
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>Secure Checkout</span>
        </div>
        <p>Your payment information is encrypted and secure</p>
      </div>
    </div>
  );
}