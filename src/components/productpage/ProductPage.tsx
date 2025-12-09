import { X, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';

type ProductPageProps = {
  product: Product;
  onAddToCart: (productId: string) => void;
  onClose: () => void;
};

export function ProductPage({ product, onAddToCart, onClose }: ProductPageProps) {
  const imageUrl =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header with close button */}
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Content */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image */}
            <div className="flex-1">
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-2xl text-blue-600 font-semibold">RM{product.price.toFixed(2)}</p>

              <div className="text-sm text-gray-600">
                {product.stock > 0 ? (
                  <span className="text-green-600">✓ {product.stock} in stock</span>
                ) : (
                  <span className="text-red-600">Out of stock</span>
                )}
              </div>

              <p className="text-gray-700">{product.description}</p>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  onAddToCart(product.id);
                  onClose();
                }}
                disabled={product.stock === 0}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-4"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Additional Product Details */}
          <div className="mt-8 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            <p className="text-gray-700">{product.description}</p>

            {product.category && (
              <div className="mt-4">
                <span className="text-sm font-medium text-gray-600">Category: </span>
                <span className="text-sm text-gray-900">{product.category.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
