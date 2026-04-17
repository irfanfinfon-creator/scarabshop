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
      color: 'text-accent',
    },
    {
      id: PAYMENT_METHODS.PAYPAL,
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: Wallet,
      color: 'text-gray-950',
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
      <h3 className="text-lg font-heading font-semibold text-gray-950">Payment Method</h3>

      <div className="space-y-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <div
              key={method.id}
              onClick={() => handleMethodSelect(method.id)}
              className={`relative border rounded-lg p-4 cursor-pointer transition-all ${isSelected
                ? 'border-accent bg-red-400/5 ring-2 ring-accent/20'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-white ${method.color}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1">
                  <h4 className="font-heading font-medium text-gray-950 mb-1">
                    {method.name}
                  </h4>
                  <p className="text-sm text-gray-500 font-body">
                    {method.description}
                  </p>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment-method"
                    checked={isSelected}
                    onChange={() => handleMethodSelect(method.id)}
                    className="h-4 w-4 text-accent focus:ring-red-400 border-gray-300"
                  />
                </div>
              </div>

              {isSelected && (
                <div className="absolute top-2 right-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Payment Form (simplified for demo) */}
      {selectedMethod === PAYMENT_METHODS.CARD && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-heading font-medium mb-4 text-gray-950">Card Details</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-950 mb-1 font-body">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 font-body"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-950 mb-1 font-body">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 font-body"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-950 mb-1 font-body">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 font-body"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-950 mb-1 font-body">
                Name on Card
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 font-body"
              />
            </div>
          </div>
        </div>
      )}

      {selectedMethod === PAYMENT_METHODS.PAYPAL && (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <Wallet className="w-12 h-12 text-gray-950 mx-auto mb-4" />
          <p className="text-gray-500 mb-4 font-body">
            You will be redirected to PayPal to complete your payment
          </p>
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 font-body">
            Continue with PayPal
          </button>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 font-medium font-body text-gray-950"
        >
          Back to Address
        </button>

        <button
          onClick={handleContinue}
          disabled={!selectedMethod}
          className="flex-1 bg-red-400 text-white py-3 px-4 rounded-lg hover:bg-red-400-dark disabled:opacity-50 disabled:cursor-not-allowed font-medium font-body"
        >
          Review Order
        </button>
      </div>
    </div>
  );
}