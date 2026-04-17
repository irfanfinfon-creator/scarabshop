import { useState, useEffect} from 'react';
import { Package, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { ProductManagement } from './ProductManagement';
import { OrderManagement } from './OrderManagement';

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalCustomers: 0,
  });
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdmin();
  });

  useEffect(() => {
    if (isAdmin && activeTab === 'overview') {
      fetchStats();
    }
  }, [isAdmin, activeTab]);

  const checkAdmin = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .maybeSingle();

    setIsAdmin(data?.is_admin || false);
  };

  const fetchStats = async () => {
    const [ordersData, productsData, profilesData] = await Promise.all([
      supabase.from('orders').select('total_amount'),
      supabase.from('products').select('id', { count: 'exact' }),
      supabase.from('profiles').select('id', { count: 'exact' }),
    ]);

    const totalRevenue =
      ordersData.data?.reduce(
        (sum: number, order: { total_amount: number }) => sum + order.total_amount,
        0
      ) || 0;

    setStats({
      totalOrders: ordersData.data?.length || 0,
      totalRevenue,
      totalProducts: productsData.count || 0,
      totalCustomers: profilesData.count || 0,
    });
  };

  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <p className="text-gray-500 text-lg font-body">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-heading font-bold mb-8 text-gray-950">Admin Panel</h1>

      <div className="flex gap-2 mb-6 border-b border-gray-100">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium font-body ${
            activeTab === 'overview'
              ? 'border-b-2 border-red-400 text-accent'
              : 'text-gray-500 hover:text-gray-950'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 font-medium font-body ${
            activeTab === 'products'
              ? 'border-b-2 border-red-400 text-accent'
              : 'text-gray-500 hover:text-gray-950'
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 font-medium font-body ${
            activeTab === 'orders'
              ? 'border-b-2 border-red-400 text-accent'
              : 'text-gray-500 hover:text-gray-950'
          }`}
        >
          Orders
        </button>
      </div>

      {activeTab === 'overview' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 font-body">Total Orders</span>
                <Package className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-heading font-bold text-gray-950">{stats.totalOrders}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 font-body">Revenue</span>
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-heading font-bold text-gray-950">RM{stats.totalRevenue.toFixed(2)}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 font-body">Products</span>
                <ShoppingBag className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-heading font-bold text-gray-950">{stats.totalProducts}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 font-body">Customers</span>
                <Users className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-heading font-bold text-gray-950">{stats.totalCustomers}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && <ProductManagement />}
      {activeTab === 'orders' && <OrderManagement />}
    </div>
  );
}
