import { useEffect, useState, useCallback } from 'react';
import { Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Order } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

export function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchOrders = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('orders')
      .select('*, items:order_items(*, product:products(*)), shipping_address:addresses(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      setLoading(false);
      return;
    }

    setOrders((data ?? []) as unknown as Order[]);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, fetchOrders]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Package className="w-5 h-5 text-yellow-600" />;
      case 'processing':
        return <Package className="w-5 h-5 text-blue-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg animate-pulse h-48" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No orders yet</p>
        <p className="text-gray-400 text-sm">Start shopping to create your first order</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 col">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {getStatusIcon(order.status)}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-500">Order #{order.id.slice(0, 8)}</p>
              <p className="text-sm text-gray-500">
                {new Date(order.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">${order.total_amount.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{order.items?.length || 0} items</p>
            </div>
          </div>

          {order.tracking_number && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">Tracking: {order.tracking_number}</p>
            </div>
          )}

          <div className="border-t pt-4 space-y-2">
            {order.items?.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  {item.product?.images &&
                  Array.isArray(item.product.images) &&
                  item.product.images.length > 0 ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.product?.name}</p>
                  <p className="text-sm text-gray-600">
                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <p className="font-semibold">${(item.quantity * item.price).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {order.shipping_address && (
            <div className="border-t mt-4 pt-4">
              <p className="text-sm font-medium text-gray-700 mb-1">Shipping Address</p>
              <p className="text-sm text-gray-600">
                {order.shipping_address.address_line1}
                {order.shipping_address.address_line2 &&
                  `, ${order.shipping_address.address_line2}`}
              </p>
              <p className="text-sm text-gray-600">
                {order.shipping_address.city}, {order.shipping_address.state}{' '}
                {order.shipping_address.postal_code}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
