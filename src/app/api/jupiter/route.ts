import { NextApiRequest, NextApiResponse } from 'next';
import { Connection, PublicKey, Keypair, Transaction } from '@solana/web3.js';
import { Jupiter, RouteInfo } from '@jup-ag/core';

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

    // Load the user's wallet
    const wallet = Keypair.fromSecretKey(Uint8Array.from(walletSecret));

    // Initialize Jupiter SDK
    const jupiter = await Jupiter.load({
      connection,
      cluster: SOLANA_NETWORK,
      user: wallet.publicKey,
    });

    // Find the best route
    const routes = await jupiter.computeRoutes({
      inputMint: new PublicKey(fromToken),
      outputMint: new PublicKey(toToken),
      amount,
      slippage: 1, // 1% slippage tolerance
    });

    if (!routes || routes.length === 0) {
      return res.status(400).json({ error: 'No routes found' });
    }

    // Build the swap transaction
    const { transactions } = await jupiter.exchange({
      routeInfo: routes[0] as RouteInfo, // Ensure the type matches RouteInfo
      userPublicKey: wallet.publicKey,
    });

    // Send the transaction
    const txId = await connection.sendTransaction(transactions[0], [wallet], {
      skipPreflight: false,
      preflightCommitment: 'confirmed',
    });

    return res.status(200).json({ success: true, txId });
  } catch (error) {
    console.error('Error executing swap:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
