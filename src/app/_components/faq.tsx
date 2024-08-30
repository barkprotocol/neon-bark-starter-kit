import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const faqList = [
  {
    question: 'How do I integrate BARK Payments with my platform?',
    answer: 'Integration is straightforward using our APIs and SDKs. Check our [documentation](#) for detailed instructions.',
  },
  {
    question: 'What security measures are in place?',
    answer: 'We employ advanced security protocols including encryption, fraud detection, and regular security audits.',
  },
  {
    question: 'Can I accept international payments?',
    answer: 'Yes, BARK Payments supports multiple currencies and payment methods for global transactions.',
  },
  {
    question: 'How can I track my payment status?',
    answer: 'You can track payment statuses in real-time through our dashboard or via API endpoints for programmatic access.',
  },
  {
    question: 'Are there any transaction fees?',
    answer: 'Transaction fees depend on your payment plan and processing volume. Detailed information is available in our [pricing page](#).',
  },
  {
    question: 'What support options are available?',
    answer: 'We offer 24/7 customer support via chat, email, and phone. Additionally, our help center provides extensive documentation and guides.',
  },
  {
    question: 'How do I handle chargebacks?',
    answer: 'Chargebacks are managed through our platform with detailed dispute resolution processes. Refer to our [chargeback guide](#) for more information.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={cn('p-6 bg-background')}>
      <h2 className={cn('text-2xl font-bold mb-6 text-primary')}>Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqList.map((faq, idx) => (
          <div
            key={idx}
            className={cn(
              'p-4 border rounded-lg bg-card transition-all duration-300 ease-in-out',
              { 'bg-opacity-70': openIndex === idx }
            )}
          >
            <div
              className={cn(
                'cursor-pointer flex justify-between items-center',
                { 'text-primary': openIndex === idx, 'text-muted-foreground': openIndex !== idx }
              )}
              onClick={() => handleToggle(idx)}
            >
              <h3 className={cn('text-xl font-semibold')}>{faq.question}</h3>
              <span className={cn('text-xl')}>{openIndex === idx ? '-' : '+'}</span>
            </div>
            {openIndex === idx && (
              <p className={cn('mt-2 text-base text-muted-foreground transition-all duration-300 ease-in-out')}>
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
