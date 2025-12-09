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
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-purple-200">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/5 group-hover:via-purple-600/5 group-hover:to-pink-600/5 transition-all duration-500 z-10 pointer-events-none" />

      {/* Image Container */}
      <div
        onClick={() => onProductClick(product)}
        className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer"
      >
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick Actions - Show on hover */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className={`p-3 rounded-xl backdrop-blur-sm transition-all duration-300 shadow-lg hover:scale-110 ${isInWishlist
              ? 'bg-gradient-to-br from-pink-500 to-red-500 text-white'
              : 'bg-white/90 text-gray-700 hover:bg-white'
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
            className="p-3 bg-white/90 backdrop-blur-sm rounded-xl text-gray-700 hover:bg-white transition-all duration-300 shadow-lg hover:scale-110"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>

        {/* Stock Badge */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-red-500 text-white font-bold px-6 py-2 rounded-full text-sm shadow-xl">
              Out of Stock
            </span>
          </div>
        )}

        {/* New Badge */}
        {product.stock > 0 && product.stock < 10 && (
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-3 py-1 rounded-full text-xs shadow-lg">
              Only {product.stock} left!
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 relative z-20">
        {/* Category */}
        {product.category && (
          <span className="inline-block text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full mb-3">
            {product.category.name}
          </span>
        )}

        {/* Title - Clickable */}
        <h3
          onClick={() => onProductClick(product)}
          className="font-bold text-lg mb-2 line-clamp-2 cursor-pointer hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text transition-all duration-300 min-h-[3.5rem]"
        >
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        {/* Rating (Mock) */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">(4.0)</span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RM{product.price.toFixed(2)}
            </span>
            {product.stock > 0 && (
              <p className="text-xs text-green-600 font-medium mt-1">
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
            className="group/btn relative px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />

            <div className="relative flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Add</span>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  );
}
