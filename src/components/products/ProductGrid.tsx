import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';

import { SortOption } from '../../hooks/useProducts';

interface ProductGridProps {
  categoryId?: string;
  searchQuery?: string;
  onProductClick?: (product: Product) => void;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sortOption?: SortOption;
}

/**
 * ProductGrid component - Displays products in a responsive grid
 * Refactored to use custom hooks for better separation of concerns
 */
export function ProductGrid({
  categoryId,
  searchQuery,
  onProductClick,
  limit,
  minPrice,
  maxPrice,
  sortOption
}: ProductGridProps) {
  const {
    products,
    toggleWishlist,
    isInWishlist,
  } = useProducts({
    categoryId,
    searchQuery,
    limit,
    minPrice,
    maxPrice,
    sortOption
  });

  const { addToCart } = useCart();

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId);
  };

  const handleToggleWishlist = async (productId: string) => {
    await toggleWishlist(productId);
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <div className="relative">
          {/* Empty state illustration */}
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-200 rounded-full animate-ping" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-200 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
        <p className="text-gray-600 text-center max-w-md">
          {searchQuery
            ? `We couldn't find any products matching "${searchQuery}". Try a different search term.`
            : "No products available at the moment. Check back soon for new arrivals!"
          }
        </p>

        {searchQuery && (
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Clear Search
          </button>
        )}
      </div>
    );
  }

  const displayProducts = limit ? products.slice(0, limit) : products;

  return (
    <div className="relative">
      {/* Product count badge */}
      <div className="mb-6 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-200 px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-gray-700">
            {displayProducts.length} {displayProducts.length === 1 ? 'Product' : 'Products'} Available
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.map((product, index) => (
          <div
            key={product.id}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <ProductCard
              product={product}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              onProductClick={onProductClick || (() => { })}
              isInWishlist={isInWishlist(product.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
