import { CreditCard, Wallet } from 'lucide-react';
import { PAYMENT_METHODS } from '../../constants';

interface PaymentStepProps {
  onPaymentSelect: (method: string) => void;
  onBack: () => void;
  onContinue: () => void;
  selectedMethod?: string;
}

export function PaymentStep({
  onPaymentSelect,
  onBack,
  onContinue,
  selectedMethod = PAYMENT_METHODS.CARD
}: PaymentStepProps) {
  const paymentMethods = [
    {
      id: PAYMENT_METHODS.CARD,
      name: 'Credit/Debit Card',
      description: 'Pay with Visa, Mastercard, or other credit/debit cards',
      icon: CreditCard,
      color: 'text-blue-600',
    },
    {
      id: PAYMENT_METHODS.PAYPAL,
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: Wallet,
      color: 'text-blue-700',
    },
  ];

  const handleMethodSelect = (methodId: string) => {
    onPaymentSelect(methodId);
  };

  const handleContinue = () => {
    if (selectedMethod) {
      onPaymentSelect(selectedMethod);
      onContinue();
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Payment Method</h3>

      <div className="space-y-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <div
              key={method.id}
              onClick={() => handleMethodSelect(method.id)}
              className={`relative border rounded-lg p-4 cursor-pointer transition-all ${isSelected
                ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-white ${method.color}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {method.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {method.description}
                  </p>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment-method"
                    checked={isSelected}
                    onChange={() => handleMethodSelect(method.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                </div>
              </div>

              {isSelected && (
                <div className="absolute top-2 right-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Payment Form (simplified for demo) */}
      {selectedMethod === PAYMENT_METHODS.CARD && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-medium mb-4">Card Details</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {selectedMethod === PAYMENT_METHODS.PAYPAL && (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <Wallet className="w-12 h-12 text-blue-700 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            You will be redirected to PayPal to complete your payment
          </p>
          <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800">
            Continue with PayPal
          </button>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 font-medium"
        >
          Back to Address
        </button>

        <button
          onClick={handleContinue}
          disabled={!selectedMethod}
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          Review Order
        </button>
      </div>
    </div>
  );
}