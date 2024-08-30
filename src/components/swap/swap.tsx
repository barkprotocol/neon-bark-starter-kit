"use client";

import React, { useState } from 'react';
import SwapForm from '../components/swap/swap-form';
import SwapButton from '../components/swap/swap-button';
import SwapInfo from '../components/swap/swap-info';
import SwapError from '../components/swap/swap-error';
import axios from 'axios';

const Swap: React.FC = () => {
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [feeAmount, setFeeAmount] = useState<number>(0);

  // Fetch quote for the swap
  const fetchQuote = async (amount: number, fromToken: string, toToken: string) => {
    setLoading(true);
    setError(null); // Reset error on new request
    try {
      const response = await axios.post('/api/swap', { fromToken, toToken, amount });
      setQuote(response.data);
      setFeeAmount(amount * 0.005); // Example: 0.5% fee calculation
    } catch (error) {
      console.error('Error fetching quote:', error);
      setError('Failed to fetch quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (amount: number, fromToken: string, toToken: string) => {
    fetchQuote(amount, fromToken, toToken);
  };

  // Handle swap execution
  const handleSwap = async () => {
    if (!quote) {
      setError('No quote available for the swap.');
      return;
    }
    setLoading(true);
    setError(null); // Reset error on new request
    try {
      const response = await axios.post('/api/execute-swap', {
        fromToken: quote.fromToken,
        toToken: quote.toToken,
        amount: quote.amount,
        walletSecret: quote.walletSecret
      });
      console.log('Swap executed successfully:', response.data);
      // Optionally handle successful swap (e.g., display a confirmation message or redirect)
    } catch (error) {
      console.error('Error executing swap:', error);
      setError('Failed to execute swap. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Swap Tokens</h2>
      <SwapForm onSubmit={handleSubmit} loading={loading} />
      {error && <SwapError message={error} />}
      {quote && (
        <div className="mt-4">
          <SwapInfo
            message={`Estimated Output: ${quote.estimatedOutput} ${quote.toToken}, Fee: ${feeAmount} ${quote.fromToken}`}
          />
          <SwapButton onClick={handleSwap} loading={loading} />
        </div>
      )}
    </section>
  );
};

export default Swap;
