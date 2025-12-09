import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCheckout } from '../../hooks/useCheckout';
import { AddressStep } from './AddressStep';
import { PaymentStep } from './PaymentStep';
import { ReviewStep } from './ReviewStep';
import { PAYMENT_METHODS } from '../../constants';

type CheckoutStep = 1 | 2 | 3;

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

/**
 * CheckoutForm component - Multi-step checkout process
 * Refactored to use custom hooks and separated components for better maintainability
 */
export function CheckoutForm({ isOpen, onClose, onSuccess }: CheckoutFormProps) {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(PAYMENT_METHODS.CARD);

  const { user } = useAuth();
  const { loading, cartItems, placeOrder } = useCheckout();

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  const handlePaymentSelect = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handlePlaceOrder = async () => {
    try {
      await placeOrder(selectedAddressId, selectedPaymentMethod);
      onSuccess();
      onClose();
      // Reset state for next checkout
      setCurrentStep(1);
      setSelectedAddressId('');
      setSelectedPaymentMethod(PAYMENT_METHODS.CARD);
    } catch (error) {
      console.error('Failed to place order:', error);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as CheckoutStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as CheckoutStep);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset state when closing
    setCurrentStep(1);
    setSelectedAddressId('');
    setSelectedPaymentMethod(PAYMENT_METHODS.CARD);
  };

  if (!isOpen) return null;

  // Require authentication
  if (!user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Checkout</h2>
            <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-gray-600 mb-4">Please sign in to continue with checkout.</p>
            <button
              onClick={handleClose}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AddressStep
            onAddressSelect={handleAddressSelect}
            onContinue={handleNext}
          />
        );
      case 2:
        return (
          <PaymentStep
            onPaymentSelect={handlePaymentSelect}
            onBack={handleBack}
            onContinue={handleNext}
            selectedMethod={selectedPaymentMethod}
          />
        );
      case 3:
        return (
          <ReviewStep
            cartItems={cartItems}
            onPlaceOrder={handlePlaceOrder}
            onBack={handleBack}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Shipping Address';
      case 2:
        return 'Payment Method';
      case 3:
        return 'Review Order';
      default:
        return 'Checkout';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Checkout</h2>
            <p className="text-sm text-gray-600">{getStepTitle()}</p>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-center max-w-md mx-auto">
            <div className="flex items-center flex-1">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${currentStep >= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                      }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-1 transition-colors ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
