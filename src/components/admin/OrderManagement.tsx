import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { Order } from '../../types';

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, items:order_items(*, product:products(*)), shipping_address:addresses(*)')
      .order('created_at', { ascending: false });

    if (error) return;

    setOrders((data ?? []) as unknown as Order[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    fetchOrders();
  };

  const updateTrackingNumber = async (orderId: string, trackingNumber: string) => {
    await supabase
      .from('orders')
      .update({ tracking_number: trackingNumber, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    fetchOrders();
  };

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">Order #{order.id.slice(0, 8)}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">${order.total_amount.toFixed(2)}</p>
                <p className="text-sm text-gray-500">
                  {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tracking Number
                </label>
                <input
                  type="text"
                  value={order.tracking_number || ''}
                  onChange={(e) => updateTrackingNumber(order.id, e.target.value)}
                  placeholder="Enter tracking number"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Items</h4>
              <div className="space-y-2">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.product?.name} × {item.quantity}
                    </span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {order.shipping_address && (
              <div className="border-t mt-4 pt-4">
                <h4 className="font-medium mb-2">Shipping Address</h4>
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
    </div>
  );
}
