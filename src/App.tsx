import { useState, useEffect, Suspense, lazy } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import { Header } from './components/ui/Header';
import { Footer } from './components/ui/footer';
import { HomePage } from './components/home/HomePage';
import { ToastProvider, ToastContainer } from './hooks/useToast';
import { useCartContext } from './contexts/CartContext';
import { CartProvider } from './contexts/CartContext';
import { Product } from './types';
import { LoadingScreen } from './components/ui/Loading';

const ShoppingCart = lazy(() => import('./components/cart/ShoppingCart').then(module => ({ default: module.ShoppingCart })));
const CheckoutForm = lazy(() => import('./components/checkout/CheckoutForm').then(module => ({ default: module.CheckoutForm })));
const AuthModal = lazy(() => import('./components/auth/AuthModal').then(module => ({ default: module.AuthModal })));
const UserProfile = lazy(() => import('./components/profile/UserProfile').then(module => ({ default: module.UserProfile })));
const AdminPanel = lazy(() => import('./components/admin/AdminPanel').then(module => ({ default: module.AdminPanel })));
const ProductPage = lazy(() => import('./components/productpage/ProductPage').then(module => ({ default: module.ProductPage })));
const ShopPage = lazy(() => import('./components/shop/ShopPage').then(module => ({ default: module.ShopPage })));

type View = 'home' | 'profile' | 'admin' | 'shop';

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
          <div className="flex flex-col min-h-screen bg-white">
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

            <ToastContainer />
          </div>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

function ProductPageWrapper({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { user } = useAuth();
  const { addToCart } = useCartContext();

  const handleAddToCart = async (productId: string) => {
    if (!user) {
      return;
    }

    await addToCart(productId);
  };

  return (
    <ProductPage product={product} onAddToCart={handleAddToCart} onClose={onClose} />
  );
}

export default App;