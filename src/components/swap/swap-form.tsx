"use client";

import React, { useState } from 'react';
import SwapError from './swap-error';

interface SwapFormProps {
  onSubmit: (amount: number, fromToken: string, toToken: string) => void;
  loading: boolean;
}

const SwapForm: React.FC<SwapFormProps> = ({ onSubmit, loading }) => {
  const [amount, setAmount] = useState<number>(1);
  const [fromToken, setFromToken] = useState<string>('USDC');
  const [toToken, setToToken] = useState<string>('SOL');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (amount <= 0) {
      setError('Amount must be greater than zero.');
      return;
    }
    if (!fromToken) {
      setError('From Token is required.');
      return;
    }
    if (!toToken) {
      setError('To Token is required.');
      return;
    }
    setError(null);
    onSubmit(amount, fromToken, toToken);
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      {error && (
        <SwapError message={error} />
      )}
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Amount"
          aria-label="Amount to swap"
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div>
        <input
          type="text"
          value={fromToken}
          onChange={(e) => setFromToken(e.target.value)}
          placeholder="From Token"
          aria-label="Token to swap from"
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div>
        <input
          type="text"
          value={toToken}
          onChange={(e) => setToToken(e.target.value)}
          placeholder="To Token"
          aria-label="Token to swap to"
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <button
        onClick={handleSubmit}
        className={`p-2 border rounded w-full ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Submit Swap'}
      </button>
    </div>
  );
};

export default SwapForm;
