import { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { useCart } from '../../hooks/useCart';

interface HeaderProps {
  onCartClick: () => void;
  onAuthClick: () => void;
  onProfileClick: () => void;
  onAdminClick: () => void;
  onHomeClick: () => void;
  onShopClick: () => void;
  onSearchChange: (query: string) => void;
}

export function Header({
  onCartClick,
  onAuthClick,
  onProfileClick,
  onAdminClick,
  onHomeClick,
  onShopClick,
  onSearchChange,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching admin status:', error);
        setIsAdmin(false);
        return;
      }
      setIsAdmin(Boolean(data?.is_admin));
    };

    checkAdmin();
  }, [user]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchQuery);
  };

  const handleSignOut = async () => {
    await signOut();
    onHomeClick();
  };

  return (
    <header className="sticky top-0 left-0 w-full z-40 bg-white bg-opacity-75 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onHomeClick}
            className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            Scarabshop
          </button>

          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What you buying today?"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={onShopClick}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Shop
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onCartClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              title="Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onProfileClick}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Profile"
                >
                  <User className="w-6 h-6" />
                </button>
                {isAdmin && (
                  <button
                    onClick={onAdminClick}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    title="Admin"
                  >
                    <Settings className="w-6 h-6" />
                  </button>
                )}
                <button
                  onClick={handleSignOut}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
