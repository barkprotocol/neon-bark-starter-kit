import React from 'react';
import { cn } from '@/lib/utils';

export default function About() {
  return (
    <section className={cn('p-6 bg-background')}>
      <div className="container mx-auto max-w-3xl">
        <h2 className={cn('text-3xl font-bold mb-6 text-primary')}>About Us</h2>
        <p className="text-lg mb-6">
          At BARK Payments, we are committed to revolutionizing payment processing for businesses of all sizes. Our platform integrates cutting-edge technology with a user-friendly interface to offer unparalleled security and global reach.
        </p>
        <p className="text-lg mb-6">
          Whether you're a small startup or a large enterprise, BARK Payments simplifies transactions, reduces operational overhead, and enhances customer satisfaction. Our robust solutions allow you to focus on what matters most—growing your business—while we handle the complexities of payment processing.
        </p>
        <p className="text-lg">
          Join us on our mission to make payments seamless, secure, and accessible for everyone. Experience the future of payment processing with BARK Payments.
        </p>
      </div>
    </section>
  );
}
