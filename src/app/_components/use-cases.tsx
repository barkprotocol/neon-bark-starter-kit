import React from 'react';
import { cn } from '@/lib/utils';

// Define the use cases for BARK token
const useCases = [
  {
    title: 'E-commerce',
    description: 'Integrate BARK Payments to manage transactions for your online store efficiently.',
    icon: '🛒',
  },
  {
    title: 'Subscription Services',
    description: 'Handle recurring payments with ease using our subscription management features.',
    icon: '🔄',
  },
  {
    title: 'Event Management',
    description: 'Process payments for tickets and event registrations smoothly.',
    icon: '🎫',
  },
];

// Component to display the use cases
export default function UseCases() {
  return (
    <section className={cn('p-6 bg-background')}>
      <h2 className={cn('text-2xl font-bold mb-4 text-primary')}>
        Use Cases
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {useCases.map((useCase, idx) => (
          <div
            key={idx}
            className={cn(
              'p-4 border rounded-lg shadow-lg bg-card',
              'transition-transform duration-300 ease-in-out hover:scale-105'
            )}
          >
            <div className="text-4xl mb-2">{useCase.icon}</div>
            <h3 className={cn('text-xl font-semibold mb-2')}>
              {useCase.title}
            </h3>
            <p>{useCase.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
