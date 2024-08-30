import React from 'react';
import { cn } from '@/lib/utils';

const PaymentSuccess: React.FC = () => {
  return (
    <div className={cn('p-6 border rounded-lg bg-green-50')}>
      <h3 className={cn('text-xl font-bold mb-4 text-green-600')}>Payment Successful</h3>
      <p>Your payment has been processed successfully. Thank you for your purchase!</p>
    </div>
  );
};

export default PaymentSuccess;
