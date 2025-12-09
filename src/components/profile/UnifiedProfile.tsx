import { useState, useEffect, useCallback } from 'react';
import { User, MapPin, Package, Plus, Edit, Trash2, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { supabase } from '../../lib/supabase';
import { Order, Address } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileFormData {
  full_name: string;
  phone: string;
  email: string;
}

interface AddressFormData {
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

export function UnifiedProfile() {
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [addingAddress, setAddingAddress] = useState(false);

  const [profileFormData, setProfileFormData] = useState<ProfileFormData>({
    full_name: '',
    phone: '',
    email: '',
  });

  const [addressFormData, setAddressFormData] = useState<AddressFormData>({
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    is_default: false,
  });

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const { user } = useAuth();

  const {
    profile,
    addresses,
    updateProfile,
    createAddress,
    updateAddress,
    deleteAddress,
  } = useProfile();

  // Fetch orders
  const fetchOrders = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('orders')
      .select('*, items:order_items(*, product:products(*)), shipping_address:addresses(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error) {
      setOrders((data ?? []) as unknown as Order[]);
    }
    setOrdersLoading(false);
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, fetchOrders]);

  // Profile handlers
  const handleEditProfile = () => {
    setProfileFormData({
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
      email: profile?.email || '',
    });
    setEditingProfile(true);
  };

  const handleSaveProfile = async () => {
    await updateProfile(profileFormData);
    setEditingProfile(false);
  };

  const handleCancelProfile = () => {
    setEditingProfile(false);
  };

  // Address handlers
  const handleAddAddress = () => {
    setAddressFormData({
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
      is_default: false,
    });
    setAddingAddress(true);
  };

  const handleEditAddress = (address: Address) => {
    setAddressFormData({
      address_line1: address.address_line1,
      address_line2: address.address_line2 || '',
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
      is_default: address.is_default || false,
    });
    setEditingAddress(address.id);
  };

  const handleSaveAddress = async () => {
    if (editingAddress) {
      await updateAddress(editingAddress, addressFormData);
    } else {
      await createAddress(addressFormData);
    }
    setEditingAddress(null);
    setAddingAddress(false);
  };

  const handleCancelAddress = () => {
    setEditingAddress(null);
    setAddingAddress(false);
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      await deleteAddress(addressId);
    }
  };

  // Order utilities
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

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">My Account</h1>

      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-sm">
        {editingProfile ? (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Edit Profile
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={profileFormData.email}
                  onChange={(e) => setProfileFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileFormData.full_name}
                  onChange={(e) => setProfileFormData(prev => ({ ...prev, full_name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={profileFormData.phone}
                  onChange={(e) => setProfileFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveProfile}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancelProfile}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </h3>
              <button
                onClick={handleEditProfile}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="text-lg font-medium">{profile?.email || 'Not set'}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <p className="text-lg font-medium">{profile?.full_name || 'Not set'}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <p className="text-lg font-medium">{profile?.phone || 'Not set'}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Address Section */}
      <div className="bg-white rounded-lg shadow-sm">
        {(editingAddress || addingAddress) ? (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1
                </label>
                <input
                  type="text"
                  value={addressFormData.address_line1}
                  onChange={(e) => setAddressFormData(prev => ({ ...prev, address_line1: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  value={addressFormData.address_line2}
                  onChange={(e) => setAddressFormData(prev => ({ ...prev, address_line2: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={addressFormData.city}
                    onChange={(e) => setAddressFormData(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province
                  </label>
                  <input
                    type="text"
                    value={addressFormData.state}
                    onChange={(e) => setAddressFormData(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={addressFormData.postal_code}
                    onChange={(e) => setAddressFormData(prev => ({ ...prev, postal_code: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={addressFormData.country}
                    onChange={(e) => setAddressFormData(prev => ({ ...prev, country: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_default"
                  checked={addressFormData.is_default}
                  onChange={(e) => setAddressFormData(prev => ({ ...prev, is_default: e.target.checked }))}
                  className="mr-2"
                />
                <label htmlFor="is_default" className="text-sm font-medium text-gray-700">
                  Set as default address
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveAddress}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingAddress ? 'Update Address' : 'Add Address'}
                </button>
                <button
                  onClick={handleCancelAddress}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Shipping Addresses
              </h3>
              <button
                onClick={handleAddAddress}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Address
              </button>
            </div>

            {addresses.length === 0 ? (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No saved addresses</p>
                <p className="text-gray-400 text-sm">Add an address to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div key={address.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-medium text-gray-900">{address.address_line1}</p>
                          {address.is_default && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Default
                            </span>
                          )}
                        </div>

                        {address.address_line2 && (
                          <p className="text-gray-600 text-sm">{address.address_line2}</p>
                        )}

                        <p className="text-gray-600 text-sm">
                          {address.city}, {address.state} {address.postal_code}
                        </p>

                        <p className="text-gray-600 text-sm">{address.country}</p>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleEditAddress(address)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit address"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete address"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Orders Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Order History
        </h3>

        {ordersLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg animate-pulse h-48" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No orders yet</p>
            <p className="text-gray-400 text-sm">Start shopping to create your first order</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
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
        )}
      </div>
    </div>
  );
}