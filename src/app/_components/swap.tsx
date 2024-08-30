"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Connection, PublicKey, Keypair, Transaction, TransactionInstruction } from '@solana/web3.js';
import { Raydium } from '@raydium-io/raydium-sdk-v2';
import { createTransferInstruction, getAssociatedTokenAddress } from '@solana/spl-token';
import { Button, Input } from '@/components/ui/swap-button';

const SOLANA_NETWORK = 'mainnet-beta'; // Change to 'devnet' for testing
const connection = new Connection(`https://api.${SOLANA_NETWORK}.solana.com`);
const jupiterApiUrl = 'https://quote-api.jup.ag/v1/quote'; // Example API URL for Jupiter
const BARK_FEE_WALLET = new PublicKey('BARKkeAwhTuFzcLHX4DjotRsmjXQ1MshGrZbn1CUQqMo'); // Replace with actual fee wallet address

// Example token addresses (replace with actual token addresses)
const tokens = {
  USDC: 'So11111111111111111111111111111111111111112',
  SOL: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
  BARK: '2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg',
};

const Swap: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromToken, setFromToken] = useState<string>('USDC');
  const [toToken, setToToken] = useState<string>('SOL');
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [swapMethod, setSwapMethod] = useState<'jupiter' | 'raydium'>('jupiter');
  const [feeOption, setFeeOption] = useState<'manual' | 'lowest'>('lowest');
  const [feeAmount, setFeeAmount] = useState<number>(0); // BARK fee amount in decimal

  // Fetch quote when the parameters change
  useEffect(() => {
    if (fromToken && toToken && amount) {
      fetchQuote();
    }
  }, [fromToken, toToken, amount, swapMethod]);

  // Calculate BARK fee when quote or swapMethod changes
  useEffect(() => {
    if (quote && swapMethod === 'raydium') {
      calculateBarkFee(quote);
    }
  }, [quote, swapMethod]);

  // Fetch quote from the selected swap method
  const fetchQuote = async () => {
    setLoading(true);
    try {
      if (swapMethod === 'jupiter') {
        const response = await axios.get(jupiterApiUrl, {
          params: {
            inputMint: tokens[fromToken],
            outputMint: tokens[toToken],
            amount: amount * 1e6, // Example assumes amount is in decimal
          },
        });
        setQuote(response.data);
      } else if (swapMethod === 'raydium') {
        const raydium = await Raydium.load({
          connection,
          owner: new PublicKey(tokens[fromToken]), // Replace with actual wallet PublicKey
        });
        const poolInfo = await raydium.api.fetchPoolByMints({
          mint1: tokens[fromToken],
          mint2: tokens[toToken],
        });
        // Assume we calculate a quote here for demonstration purposes
        const dummyOutputAmount = amount * 1e6 * 0.99; // Dummy output amount for example
        setQuote({ outputAmount: dummyOutputAmount });
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate BARK fee based on the quote
  const calculateBarkFee = (quoteData: any) => {
    if (!quoteData) return;

    const feePercentage = 0.005; // 0.5% fee
    const calculatedFee = quoteData.outputAmount * feePercentage / 1e6;

    if (feeOption === 'lowest') {
      setFeeAmount(calculatedFee);
    } else if (feeOption === 'manual') {
      setFeeAmount(Math.max(feeAmount, calculatedFee)); // Ensure the fee is at least the calculated minimum
    }
  };

  // Create BARK fee transfer instruction
  const createBarkFeeTransferInstruction = async (
    payer: PublicKey,
    feeWallet: PublicKey,
    amount: number
  ): Promise<TransactionInstruction> => {
    const payerTokenAddress = await getAssociatedTokenAddress(payer, new PublicKey(tokens.BARK));
    const feeWalletTokenAddress = await getAssociatedTokenAddress(feeWallet, new PublicKey(tokens.BARK));
    
    return createTransferInstruction(
      payerTokenAddress,
      feeWalletTokenAddress,
      payer,
      amount * 1e6 // Convert amount to smallest unit
    );
  };

  // Handle token swap
  const handleSwap = async () => {
    if (quote) {
      try {
        const wallet = Keypair.fromSecretKey(new Uint8Array([/* Replace with actual wallet secret key */]));
        let transaction: Transaction;

        if (swapMethod === 'jupiter') {
          // Jupiter swap logic
          console.log('Swapping with Jupiter:', quote);
          // Implement Jupiter swap logic here

        } else if (swapMethod === 'raydium') {
          // Raydium swap logic
          console.log('Swapping with Raydium:', quote);

          const raydium = await Raydium.load({
            connection,
            owner: wallet,
          });
          const poolInfo = await raydium.api.fetchPoolByMints({
            mint1: tokens[fromToken],
            mint2: tokens[toToken],
          });

          const adjustedAmount = amount - feeAmount;
          if (adjustedAmount <= 0) {
            console.error('Insufficient amount after fee deduction');
            return;
          }

          const { swapTransaction } = await raydium.swap({
            poolInfo,
            amountIn: adjustedAmount * 1e6,
            tokenAccounts: raydium.account.tokenAccounts,
            owner: wallet.publicKey,
          });

          const feeTransferInstruction = await createBarkFeeTransferInstruction(
            wallet.publicKey,
            BARK_FEE_WALLET,
            feeAmount
          );

          transaction = new Transaction().add(swapTransaction).add(feeTransferInstruction);

          const txId = await connection.sendTransaction(transaction, [wallet], {
            skipPreflight: false,
            preflightCommitment: 'confirmed',
          });

          console.log('Raydium swap successful, txId:', txId);
        }
      } catch (error) {
        console.error('Error executing swap:', error);
      }
    }
  };

  return (
    <section className="p-6 bg-background">
      <h2 className="text-2xl font-bold mb-4 text-primary">Swap Tokens</h2>
      <div className="space-y-4">
        <div>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Amount"
          />
          <Input
            type="text"
            value={fromToken}
            onChange={(e) => setFromToken(e.target.value)}
            placeholder="From Token"
          />
          <Input
            type="text"
            value={toToken}
            onChange={(e) => setToToken(e.target.value)}
            placeholder="To Token"
          />
          <select
            value={swapMethod}
            onChange={(e) => setSwapMethod(e.target.value as 'jupiter' | 'raydium')}
            className="p-2 border rounded"
          >
            <option value="jupiter">Jupiter</option>
            <option value="raydium">Raydium</option>
          </select>
          <select
            value={feeOption}
            onChange={(e) => setFeeOption(e.target.value as 'manual' | 'lowest')}
            className="p-2 border rounded"
          >
            <option value="lowest">Lowest Fee</option>
            <option value="manual">Manual Fee</option>
          </select>
          {feeOption === 'manual' && (
            <Input
              type="number"
              value={feeAmount}
              onChange={(e) => setFeeAmount(parseFloat(e.target.value))}
              placeholder="Fee Amount (BARK)"
            />
          )}
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {quote && (
              <div>
                <p>Estimated Output: {quote.outputAmount / 1e6} {toToken}</p>
                <p>Swap Fee: {feeAmount} BARK</p>
                <Button onClick={handleSwap}>Execute Swap</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Swap;
