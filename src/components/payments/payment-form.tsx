import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import PaymentDetails from './payment-details';
import CurrencySelector from './currency-selector';
import PaymentError from './payment-error';
import PaymentSuccess from './payment-success';

// Define the initial state for the form
const initialFormData = {
  paymentMethod: 'creditCard',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
  cryptoAddress: '',
  stripeId: '',
  applePayId: '',
  selectedCurrency: 'USD',
};

export default function PaymentForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle'); // To track payment status

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentMethodChange = (method: string) => {
    setFormData((prevState) => ({
      ...prevState,
      paymentMethod: method,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle payment processing here

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
      setPaymentStatus('success');
    } catch (error) {
      setPaymentStatus('error');
    }
  };

  return (
    <div className="p-6 border rounded-lg bg-white shadow-md">
      <h2 className={cn('text-2xl font-bold mb-4')}>Payment Form</h2>

      {paymentStatus === 'success' && <PaymentSuccess />}
      {paymentStatus === 'error' && <PaymentError />}

      {paymentStatus === 'idle' && (
        <form onSubmit={handleSubmit}>
          <CurrencySelector
            selectedCurrency={formData.selectedCurrency}
            onChange={(currency) => setFormData({ ...formData, selectedCurrency: currency })}
          />

          <PaymentDetails
            paymentMethod={formData.paymentMethod}
            formData={formData}
            onChange={handleChange}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="paymentMethod">Payment Method</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={(e) => handlePaymentMethodChange(e.target.value)}
              className={cn('w-full p-2 border rounded-md')}
            >
              <option value="creditCard">Credit Card</option>
              <option value="crypto">Cryptocurrency</option>
              <option value="stripe">Stripe</option>
              <option value="applePay">Apple Pay</option>
            </select>
          </div>

          <button type="submit" className={cn('w-full p-3 bg-primary text-white rounded-md')}>
            Submit Payment
          </button>
        </form>
      )}
    </div>
  );
}
