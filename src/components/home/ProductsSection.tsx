import { Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { ProductGrid } from '../products/ProductGrid';

interface ProductsSectionProps {
  searchQuery: string;
  onProductClick: (product: Product) => void;
}

export function ProductsHeader() {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 bg-red-400 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 font-body">
        <Sparkles className="w-4 h-4" />
        <span>Trending Now</span>
      </div>
      <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-950 mb-4">
        Discover Amazing Products
      </h2>
      <p className="text-lg text-gray-500 max-w-2xl mx-auto font-body">
        Handpicked collection of premium items just for you
      </p>
    </div>
  );
}

export function SeeMoreBtn() {
  return (
    <div className="text-center mt-12">
      <button
        onClick={() =>
          window.dispatchEvent(new CustomEvent('navigate-to-shop'))
        }
        className="inline-flex items-center gap-2 px-8 py-4 bg-red-400 text-white rounded-xl font-bold shadow-lg hover:bg-red-500 transition-all duration-300 hover:scale-105 font-body"
      >
        <span>See More Products</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  );
}

export function ProductsSection({ searchQuery, onProductClick }: ProductsSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ProductsHeader />

        <ProductGrid
          searchQuery={searchQuery}
          onProductClick={onProductClick}
          limit={4}
        />

        <SeeMoreBtn />
      </div>
    </section>
  );
}