import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { Jupiter } from '@jup-ag/core';
import { Raydium } from '@raydium-io/raydium-sdk-v2';

// Use environment variables for configuration
const SOLANA_RPC_NETWORK_URL = process.env.SOLANA_RPC_NETWORK_URL || 'https://api.mainnet-beta.solana.com';
const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'mainnet-beta';
const connection = new Connection(SOLANA_RPC_NETWORK_URL);

// Load token addresses from environment variables or configuration
const tokens = {
  USDC: process.env.NEXT_PUBLIC_USDC_TOKEN || 'So11111111111111111111111111111111111111112',
  SOL: process.env.NEXT_PUBLIC_SOL_TOKEN || '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
  BARK: process.env.NEXT_PUBLIC_BARK_TOKEN || '2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg',
};

// Function to handle swaps via Jupiter
export const swapWithJupiter = async (fromToken: string, toToken: string, amount: number, walletSecret: Uint8Array) => {
  try {
    const wallet = Keypair.fromSecretKey(walletSecret);
    const jupiter = await Jupiter.load({
      connection,
      cluster: SOLANA_NETWORK,
      user: wallet.publicKey,
    });

    // Find the best route
    const routes = await jupiter.computeRoutes({
      inputMint: new PublicKey(tokens[fromToken]),
      outputMint: new PublicKey(tokens[toToken]),
      amount,
      slippage: 1, // 1% slippage tolerance
    });

    if (!routes || routes.length === 0) {
      throw new Error('No routes found');
    }

    // Build the swap transaction
    const { transactions } = await jupiter.exchange({
      routeInfo: routes[0],
      userPublicKey: wallet.publicKey,
    });

    // Send the transaction
    const txId = await connection.sendTransaction(transactions, [wallet], {
      skipPreflight: false,
      preflightCommitment: 'confirmed',
    });

    // Generate explorer link
    const explorerUrl = `https://explorer.solana.com/tx/${txId}?cluster=${SOLANA_NETWORK}`;
    
    return { success: true, txId, explorerUrl };
  } catch (error) {
    console.error('Error in Jupiter swap:', error);
    throw new Error(error.message || 'Failed to execute Jupiter swap');
  }
};

// Function to handle swaps via Raydium
export const swapWithRaydium = async (fromToken: string, toToken: string, amount: number, walletSecret: Uint8Array) => {
  try {
    const wallet = Keypair.fromSecretKey(walletSecret);
    const raydium = await Raydium.load({
      connection,
      owner: wallet,
    });

    // Fetch pool info
    const poolInfo = await raydium.api.fetchPoolByMints({
      mint1: new PublicKey(tokens[fromToken]),
      mint2: new PublicKey(tokens[toToken]),
    });

    if (!poolInfo) {
      throw new Error('Pool not found');
    }

    // Build the swap transaction
    const { swapTransaction } = await raydium.swap({
      poolInfo,
      amountIn: amount,
      tokenAccounts: raydium.account.tokenAccounts,
      owner: wallet.publicKey,
    });

    // Send the transaction
    const txId = await connection.sendTransaction(swapTransaction, [wallet], {
      skipPreflight: false,
      preflightCommitment: 'confirmed',
    });

    // Generate explorer link
    const explorerUrl = `https://explorer.solana.com/tx/${txId}?cluster=${SOLANA_NETWORK}`;
    
    return { success: true, txId, explorerUrl };
  } catch (error) {
    console.error('Error in Raydium swap:', error);
    throw new Error(error.message || 'Failed to execute Raydium swap');
  }
};
