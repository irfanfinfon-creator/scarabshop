import { useState } from 'react';
import { Address } from '../../types';
import { AddressFormData, useCheckout } from '../../hooks/useCheckout';

interface AddressStepProps {
  onAddressSelect: (addressId: string) => void;
  onContinue: () => void;
}

export function AddressStep({ onAddressSelect, onContinue }: AddressStepProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { createAddress, getAddresses } = useCheckout();

  const [newAddress, setNewAddress] = useState<AddressFormData>({
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    is_default: false,
  });

  const loadAddresses = async () => {
    try {
      const addressList = await getAddresses();
      setAddresses(addressList);
      
      // Select default address if exists
      const defaultAddr = addressList.find(addr => addr.is_default);
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id);
        onAddressSelect(defaultAddr.id);
      }
    } catch (error) {
      console.error('Failed to load addresses:', error);
    }
  };

  const handleCreateAddress = async () => {
    if (!newAddress.address_line1 || !newAddress.city || !newAddress.state || !newAddress.postal_code) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const address = await createAddress(newAddress);
      setAddresses(prev => [...prev, address]);
      setSelectedAddressId(address.id);
      onAddressSelect(address.id);
      setShowNewAddressForm(false);
      setNewAddress({
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        is_default: false,
      });
    } catch (error) {
      console.error('Failed to create address:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (selectedAddressId) {
      onContinue();
    } else {
      alert('Please select or add an address');
    }
  };

  const handleInputChange = (field: keyof AddressFormData, value: string | boolean) => {
    setNewAddress(prev => ({ ...prev, [field]: value }));
  };

  // Load addresses on mount
  useState(() => {
    loadAddresses();
  });

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Shipping Address</h3>

      {/* Existing Addresses */}
      {addresses.length > 0 && !showNewAddressForm && (
        <div className="space-y-3">
          {addresses.map((address) => (
            <div
              key={address.id}
              onClick={() => {
                setSelectedAddressId(address.id);
                onAddressSelect(address.id);
              }}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedAddressId === address.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{address.address_line1}</p>
                  {address.address_line2 && (
                    <p className="text-gray-600 text-sm">{address.address_line2}</p>
                  )}
                  <p className="text-gray-600 text-sm">
                    {address.city}, {address.state} {address.postal_code}
                  </p>
                  <p className="text-gray-600 text-sm">{address.country}</p>
                  {address.is_default && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                      Default
                    </span>
                  )}
                </div>
                <div className="ml-4">
                  <input
                    type="radio"
                    checked={selectedAddressId === address.id}
                    onChange={() => {
                      setSelectedAddressId(address.id);
                      onAddressSelect(address.id);
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Address Button */}
      {!showNewAddressForm && (
        <button
          onClick={() => setShowNewAddressForm(true)}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
        >
          + Add New Address
        </button>
      )}

      {/* New Address Form */}
      {showNewAddressForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-medium mb-4">Add New Address</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 1 *
              </label>
              <input
                type="text"
                value={newAddress.address_line1}
                onChange={(e) => handleInputChange('address_line1', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 2
              </label>
              <input
                type="text"
                value={newAddress.address_line2}
                onChange={(e) => handleInputChange('address_line2', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  value={newAddress.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  value={newAddress.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code *
                </label>
                <input
                  type="text"
                  value={newAddress.postal_code}
                  onChange={(e) => handleInputChange('postal_code', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <input
                  type="text"
                  value={newAddress.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_default"
                checked={newAddress.is_default}
                onChange={(e) => handleInputChange('is_default', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="is_default" className="ml-2 block text-sm text-gray-700">
                Set as default address
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCreateAddress}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Add Address'}
              </button>
              <button
                onClick={() => setShowNewAddressForm(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Continue Button */}
      {!showNewAddressForm && (
        <button
          onClick={handleContinue}
          disabled={!selectedAddressId}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Payment
        </button>
      )}
    </div>
  );
}