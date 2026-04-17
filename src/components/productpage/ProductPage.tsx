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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
          <h2 className="text-xl font-heading font-bold text-gray-950">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <h1 className="text-3xl font-heading font-bold text-gray-950">{product.name}</h1>
              <p className="text-2xl text-accent font-heading font-semibold">RM{product.price.toFixed(2)}</p>

              <div className="text-sm text-gray-500 font-body">
                {product.stock > 0 ? (
                  <span className="text-accent">✓ {product.stock} in stock</span>
                ) : (
                  <span className="text-accent">Out of stock</span>
                )}
              </div>

              <p className="text-gray-500 font-body">{product.description}</p>

              <button
                onClick={() => {
                  onAddToCart(product.id);
                  onClose();
                }}
                disabled={product.stock === 0}
                className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-4 font-body"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-8">
            <h2 className="text-2xl font-heading font-bold mb-4 text-gray-950">Product Details</h2>
            <p className="text-gray-500 font-body">{product.description}</p>

            {product.category && (
              <div className="mt-4">
                <span className="text-sm font-medium text-gray-500 font-body">Category: </span>
                <span className="text-sm text-gray-950 font-body">{product.category.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}