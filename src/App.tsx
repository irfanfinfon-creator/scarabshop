import { useState, useEffect, Suspense, lazy } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/ui/HeroSection';
import { TestimonialsSection } from './components/ui/TestimonialsSection';
import { ProductGrid } from './components/products/ProductGrid';
import { ToastProvider, ToastContainer } from './hooks/useToast';
import { useCart } from './hooks/useCart';
import { CartProvider } from './contexts/CartContext';
import { Product } from './types';
import { Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';
import { LoadingScreen } from './components/ui/Loading';

// Lazy loaded components
const ShoppingCart = lazy(() => import('./components/cart/ShoppingCart').then(module => ({ default: module.ShoppingCart })));
const CheckoutForm = lazy(() => import('./components/checkout/CheckoutForm').then(module => ({ default: module.CheckoutForm })));
const AuthModal = lazy(() => import('./components/auth/AuthModal').then(module => ({ default: module.AuthModal })));
const UserProfile = lazy(() => import('./components/profile/UserProfile').then(module => ({ default: module.UserProfile })));
const AdminPanel = lazy(() => import('./components/admin/AdminPanel').then(module => ({ default: module.AdminPanel })));
const ProductPage = lazy(() => import('./components/productpage/ProductPage').then(module => ({ default: module.ProductPage })));
const ShopPage = lazy(() => import('./components/shop/ShopPage').then(module => ({ default: module.ShopPage })));

type View = 'home' | 'profile' | 'admin' | 'shop';

// ------------------------------------------------
// Main App
// ------------------------------------------------
function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const goShop = () => setCurrentView('shop');
    window.addEventListener('navigate-to-shop', goShop);
    return () => window.removeEventListener('navigate-to-shop', goShop);
  }, []);

  const viewMap = {
    home: (
      <HomePage searchQuery={searchQuery} onProductClick={setSelectedProduct} />
    ),
    shop: <ShopPage onProductClick={setSelectedProduct} />,
    profile: <UserProfile />,
    admin: <AdminPanel />,
  };

  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            <Header
              onCartClick={() => setShowCart(true)}
              onAuthClick={() => setShowAuth(true)}
              onProfileClick={() => setCurrentView('profile')}
              onAdminClick={() => setCurrentView('admin')}
              onHomeClick={() => setCurrentView('home')}
              onShopClick={() => setCurrentView('shop')}
              onSearchChange={setSearchQuery}
            />

            <main className="flex-grow">
              <Suspense fallback={<LoadingScreen />}>
                {viewMap[currentView]}
              </Suspense>
            </main>

            <Footer />

            <Suspense fallback={null}>
              <ShoppingCart
                isOpen={showCart}
                onClose={() => setShowCart(false)}
                onCheckout={() => {
                  setShowCart(false);
                  setShowCheckout(true);
                }}
              />

              <CheckoutForm
                isOpen={showCheckout}
                onClose={() => setShowCheckout(false)}
                onSuccess={() => setShowCheckout(false)}
              />

              <AuthModal
                isOpen={showAuth}
                onClose={() => setShowAuth(false)}
                initialMode="login"
              />

              {selectedProduct && (
                <ProductPageWrapper
                  product={selectedProduct}
                  onClose={() => setSelectedProduct(null)}
                />
              )}
            </Suspense>

            {/* Toast Container */}
            <ToastContainer />
          </div>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

// ------------------------------------------------
/**
 * Product Page Wrapper - Handles product page cart functionality
 * Uses useCart hook for consistent cart management
 */
function ProductPageWrapper({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { user } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = async (productId: string) => {
    if (!user) {
      // Auth modal will be shown by the parent component
      return;
    }

    await addToCart(productId);
  };

  return (
    <ProductPage product={product} onAddToCart={handleAddToCart} onClose={onClose} />
  );
}

// ------------------------------------------------
// Home Page
// ------------------------------------------------
function HomePage({
  searchQuery,
  onProductClick,
}: {
  searchQuery: string;
  onProductClick: (product: Product) => void;
}) {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ProductsSection searchQuery={searchQuery} onProductClick={onProductClick} />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}

// ------------------------------------------------
// Features Section
// ------------------------------------------------
function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Quick checkout and instant delivery tracking',
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Payments',
      description: 'Enterprise-grade data protection',
      gradient: 'from-green-400 to-emerald-500',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Best Prices',
      description: 'Exclusive deals daily',
      gradient: 'from-blue-400 to-indigo-500',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'Trusted curated brands',
      gradient: 'from-purple-400 to-pink-500',
    },
  ];

  return (
    <section className="py-16 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Shop With Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of online shopping with unbeatable service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
      />
      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${gradient} text-white mb-6 shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

// ------------------------------------------------
// Products Section
// ------------------------------------------------
function ProductsSection({
  searchQuery,
  onProductClick,
}: {
  searchQuery: string;
  onProductClick: (product: Product) => void;
}) {
  return (
    <section className="py-16 relative overflow-hidden">
      <BlobDecor />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

const BlobDecor = () => (
  <>
    <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
    <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
    <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
  </>
);

const ProductsHeader = () => (
  <div className="text-center mb-12">
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
      <Sparkles className="w-4 h-4" />
      <span>Trending Now</span>
    </div>
    <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
      Discover Amazing Products
    </h2>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
      Handpicked collection of premium items just for you
    </p>
  </div>
);

const SeeMoreBtn = () => (
  <div className="text-center mt-12">
    <button
      onClick={() =>
        window.dispatchEvent(new CustomEvent('navigate-to-shop'))
      }
      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <span>See More Products</span>
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>
  </div>
);

// ------------------------------------------------
// CTA Section
// ------------------------------------------------
function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <CTABackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <CTAContent />
      </div>
    </section>
  );
}

const CTABackground = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
  </>
);

const CTAContent = () => (
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
      Start filling up that cart today !
    </h2>

    <p className="text-xl text-white/90 mb-8 leading-relaxed">
      Join thousands of happy customers and experience the best online shopping platform
    </p>

    <CTAButtons />

    <CTAStats />
  </div>
);

const CTAButtons = () => (
  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
    <button onClick={() =>
      window.dispatchEvent(new CustomEvent('navigate-to-shop'))
    }
      className="group relative px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105">
      <span className="relative z-10">Browse Products</span>
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>

    <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105">
      Learn More
    </button>
  </div>
);

const CTAStats = () => (
  <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
    {[
      ['10K+', 'Products'],
      ['50K+', 'Customers'],
      ['4.9★', 'Rating'],
    ].map(([num, label], i) => (
      <div key={i} className="text-center">
        <div className="text-4xl font-bold text-white mb-2">{num}</div>
        <div className="text-white/80">{label}</div>
      </div>
    ))}
  </div>
);

export default App;
