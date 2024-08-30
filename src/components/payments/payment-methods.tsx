import React from 'react';
import { cn } from '@/lib/utils';

// Define the props type for PaymentMethods
interface PaymentMethodsProps {
  selectedMethod: string;
  onChange: (method: string) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ selectedMethod, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="paymentMethod" className="block font-semibold">Payment Method</label>
      <select
        id="paymentMethod"
        name="paymentMethod"
        value={selectedMethod}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Select a payment method</option>
        <option value="creditCard">Credit Card</option>
        <option value="paypal">PayPal</option>
        <option value="crypto">Cryptocurrency</option>
        <option value="stripe">Stripe</option>
        <option value="applePay">Apple Pay</option>
      </select>
    </div>
  );
};

export default PaymentMethods;
