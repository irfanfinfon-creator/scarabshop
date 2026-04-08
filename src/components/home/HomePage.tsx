import { Product } from '../../types';
import { HeroSection } from '../ui/HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { ProductsSection } from './ProductsSection';
import { TestimonialsSection } from '../ui/TestimonialsSection';

interface HomePageProps {
  searchQuery: string;
  onProductClick: (product: Product) => void;
}

export function HomePage({ searchQuery, onProductClick }: HomePageProps) {
  return (
    <>
      <HeroSection />
      <ProductsSection searchQuery={searchQuery} onProductClick={onProductClick} />
      <FeaturesSection />
      <TestimonialsSection />
    </>
  );
}