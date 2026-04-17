import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  onToggleWishlist: (productId: string) => void;
  onProductClick: (product: Product) => void;
  isInWishlist: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  onProductClick,
  isInWishlist,
}: ProductCardProps) {
  const imageUrl =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400';

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div
        onClick={() => onProductClick(product)}
        className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer"
      >
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Quick Actions - Show on hover */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className={`p-3 rounded-xl transition-all duration-300 shadow-lg hover:scale-110 ${isInWishlist
              ? 'bg-red-400 text-white'
              : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
          >
            <Heart className="w-5 h-5" fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>

          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onProductClick(product);
            }}
            className="p-3 bg-white rounded-xl text-gray-500 hover:bg-gray-50 transition-all duration-300 shadow-lg hover:scale-110"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>

        {/* Stock Badge */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-400 text-white font-bold px-6 py-2 rounded-full text-sm">
              Out of Stock
            </span>
          </div>
        )}

        {/* Low Stock Badge */}
        {product.stock > 0 && product.stock < 10 && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-400 text-white font-bold px-3 py-1 rounded-full text-xs">
              Only {product.stock} left!
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        {product.category && (
          <span className="inline-block text-xs font-semibold text-red-400 bg-red-400/10 px-3 py-1 rounded-full mb-3 font-body">
            {product.category.name}
          </span>
        )}

        {/* Title - Clickable */}
        <h3
          onClick={() => onProductClick(product)}
          className="font-heading font-bold text-lg mb-2 line-clamp-2 cursor-pointer hover:text-red-400 transition-all duration-300 min-h-[3.5rem]"
        >
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[2.5rem] font-body">
          {product.description}
        </p>

        {/* Rating (Mock) */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < 4 ? 'text-red-400 fill-red-400' : 'text-gray-300'
                }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1 font-body">(4.0)</span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-xl font-heading font-bold text-gray-950">
              RM{product.price.toFixed(2)}
            </span>
            {product.stock > 0 && (
              <p className="text-xs text-red-400 font-medium mt-1">
                ✓ In Stock
              </p>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product.id);
            }}
            disabled={product.stock === 0}
            className="px-5 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 font-body flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline ">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}