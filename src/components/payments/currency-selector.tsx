import React from 'react';
import { cn } from '@/lib/utils';

// Define the props type for CurrencySelector
interface CurrencySelectorProps {
  selectedCurrency: string;
  onChange: (currency: string) => void;
}

const currencies = [
  { code: 'USD', label: 'US Dollar' },
  { code: 'EUR', label: 'Euro' },
  { code: 'SOL', label: 'Solana' },
  { code: 'USDC', label: 'USD Coin' },
  { code: 'BARK', label: 'BARK' },
  // Add other currencies as needed
];

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ selectedCurrency, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="currency" className="block font-semibold">Currency</label>
      <select
        id="currency"
        name="currency"
        value={selectedCurrency}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border rounded"
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.label} ({currency.code})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
