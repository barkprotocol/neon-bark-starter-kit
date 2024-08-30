import React from 'react';
import { cn } from '@/lib/utils';

export default function PaymentError() {
  return (
    <div className={cn('p-6 border rounded-lg bg-card')}>
      <h3 className={cn('text-xl font-bold mb-4 text-red-600')}>Payment Error</h3>
      <p>There was an error processing your payment. Please try again later or contact support.</p>
    </div>
  );
}
