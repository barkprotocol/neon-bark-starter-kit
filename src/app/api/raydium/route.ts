import { NextApiRequest, NextApiResponse } from 'next';
import { Connection, PublicKey, Keypair, Transaction } from '@solana/web3.js';
import { Raydium } from '@raydium-io/raydium-sdk-v2';

// Define the Solana network and connection
const SOLANA_NETWORK = 'mainnet-beta'; // or 'devnet'
const connection = new Connection(`https://api.${SOLANA_NETWORK}.solana.com`);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fromToken, toToken, amount, walletSecret } = req.body;

    // Validate request data
    if (!fromToken || !toToken || !amount || !walletSecret) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Convert tokens to PublicKey
    const fromTokenPublicKey = new PublicKey(fromToken);
    const toTokenPublicKey = new PublicKey(toToken);

    // Load the user's wallet
    const wallet = Keypair.fromSecretKey(Uint8Array.from(walletSecret));

    // Initialize Raydium SDK
    const raydium = await Raydium.load({
      connection,
      owner: wallet.publicKey,
    });

    // Fetch pool info
    const poolInfo = await raydium.api.fetchPoolByMints({ mint1: fromTokenPublicKey, mint2: toTokenPublicKey });

    // Ensure poolInfo is valid
    if (!poolInfo) {
      return res.status(400).json({ error: 'No pool found for the provided tokens' });
    }

    // Build the swap transaction
    const { swapTransaction } = await raydium.swap({
      poolInfo,
      amountIn: amount, // Ensure amount is in the correct format (smallest unit if needed)
      tokenAccounts: raydium.account.tokenAccounts,
      owner: wallet.publicKey,
    });

    // Validate swapTransaction
    if (!swapTransaction) {
      return res.status(400).json({ error: 'Failed to create swap transaction' });
    }

    // Send the transaction
    const txId = await connection.sendTransaction(swapTransaction, [wallet], {
      skipPreflight: false,
      preflightCommitment: 'confirmed',
    });

    return res.status(200).json({ success: true, txId });
  } catch (error) {
    console.error('Error in Raydium API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
