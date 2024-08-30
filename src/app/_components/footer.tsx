import React from 'react';
import { cn } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className={cn('p-6 bg-background border-t border-border')}>
      <div className="container mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} BARK Protocol. All rights reserved.
        </p>
        <nav className="mt-4 flex justify-center space-x-4">
          <a href="/about" className={cn('text-primary hover:underline transition-colors duration-300')}>
            About
          </a>
          <a href="/faq" className={cn('text-primary hover:underline transition-colors duration-300')}>
            FAQ
          </a>
          <a href="/contact" className={cn('text-primary hover:underline transition-colors duration-300')}>
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
