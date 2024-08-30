import React from 'react';
import { cn } from '@/lib/utils';
import PaymentForm from '@/components/payment-form';

export default function Payments() {
  return (
    <section className={cn('p-6 bg-background')}>
      <div className="container mx-auto px-4 md:px-6">
        <h2 className={cn('text-3xl font-bold mb-4 text-primary')}>
          Payment Processing
        </h2>
        <p className="text-lg mb-6 text-muted-foreground">
          Our payment form is designed to be simple and secure. Use the form below to process payments seamlessly.
        </p>
        <PaymentForm />
      </div>
    </section>
  );
}
