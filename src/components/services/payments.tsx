"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock data for payment methods
const paymentMethods = ['Credit Card', 'PayPal', 'Bank Transfer'];

export default function Payments() {
  const [paymentMethod, setPaymentMethod] = useState<string>(paymentMethods[0]);
  const [amount, setAmount] = useState<string>('');
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Added loading state

  const handlePayment = async () => {
    setLoading(true); // Set loading state to true when payment is processing

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
      setConfirmation(`Processed ${amount} with ${paymentMethod}`);
    } catch (error) {
      setConfirmation('Payment failed. Please try again.');
    } finally {
      setLoading(false); // Set loading state to false after processing
    }
  };

  return (
    <section className={cn('p-6 bg-background')}>
      <h2 className={cn('text-2xl font-bold mb-4 text-primary')}>Make a Payment</h2>
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="p-2 border rounded"
          >
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 border rounded"
            placeholder="Enter amount"
            min="0"
            step="0.01" // Allow decimal amounts
          />
        </div>
        <Button 
          onClick={handlePayment} 
          variant="primary"
          disabled={loading || !amount} // Disable button while processing or if amount is empty
        >
          {loading ? 'Processing...' : 'Pay'}
        </Button>
        {confirmation && <p className="mt-4 text-lg">{confirmation}</p>}
      </div>
    </section>
  );
}
