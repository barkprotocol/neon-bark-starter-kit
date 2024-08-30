import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { Raydium } from '@raydium-io/raydium-sdk-v2';
import { Button } from '@/components/ui/button';

const SOLANA_NETWORK = 'mainnet-beta'; // or 'devnet'
const connection = new Connection(`https://api.${SOLANA_NETWORK}.solana.com`);

const tokens = {
  SOL: new PublicKey('So11111111111111111111111111111111111111112'),
  BARK: new PublicKey('2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg'),
};

export default function Swap() {
  const [fromToken, setFromToken] = useState<PublicKey>(tokens.SOL);
  const [toToken, setToToken] = useState<PublicKey>(tokens.BARK);
  const [amount, setAmount] = useState<number>(0);
  const [raydium, setRaydium] = useState<Raydium | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const wallet = Keypair.generate(); // Replace this with the actual wallet integration

  useEffect(() => {
    const initializeRaydium = async () => {
      const raydiumInstance = await Raydium.load({
        connection,
        owner: wallet,
        signAllTransactions: async (txs) => txs.map(tx => tx.partialSign(wallet)), // example of signing transactions
      });

      setRaydium(raydiumInstance);
    };

    initializeRaydium();
  }, [wallet]);

  const handleSwap = async () => {
    if (!raydium) return;

    setLoading(true);
    setError(null);

    try {
      const { swapTransaction } = await buildSwapTransaction({
        fromToken,
        toToken,
        amount,
        raydium,
      });

      const txId = await connection.sendTransaction(swapTransaction, [wallet], {
        skipPreflight: false,
        preflightCommitment: 'confirmed',
      });

      setResult(`Swap successful! Transaction ID: ${txId}`);
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const buildSwapTransaction = async ({ fromToken, toToken, amount, raydium }) => {
    const poolInfo = await raydium.api.fetchPoolByMints({ mint1: fromToken.toBase58(), mint2: toToken.toBase58() });

    const { swapTransaction } = await raydium.swap({
      poolInfo,
      amountIn: amount,
      tokenAccounts: raydium.account.tokenAccounts,
      owner: wallet.publicKey,
    });

    return { swapTransaction };
  };

  return (
    <section className="p-6 bg-background">
      <h2 className="text-2xl font-bold mb-4 text-primary">Swap</h2>
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="from-token" className="text-lg font-medium">From Token</label>
          <select
            id="from-token"
            value={fromToken.toBase58()}
            onChange={(e) => setFromToken(new PublicKey(e.target.value))}
            className="p-2 border rounded"
          >
            {Object.entries(tokens).map(([name, key]) => (
              <option key={name} value={key.toBase58()}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="to-token" className="text-lg font-medium">To Token</label>
          <select
            id="to-token"
            value={toToken.toBase58()}
            onChange={(e) => setToToken(new PublicKey(e.target.value))}
            className="p-2 border rounded"
          >
            {Object.entries(tokens).map(([name, key]) => (
              <option key={name} value={key.toBase58()}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="amount" className="text-lg font-medium">Amount</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="p-2 border rounded"
          />
        </div>
        <Button onClick={handleSwap} variant="primary" disabled={loading || !raydium}>
          {loading ? 'Swapping...' : 'Swap'}
        </Button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {result && <p className="mt-4 text-lg">{result}</p>}
      </div>
    </section>
  );
}
