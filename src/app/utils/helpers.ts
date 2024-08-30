import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import { createTransferInstruction, getAssociatedTokenAddress } from '@solana/spl-token';

/**
 * Function to calculate the BARK fee based on the quote data.
 * @param outputAmount The output amount from the swap.
 * @param feePercentage The fee percentage (e.g., 0.5% as 0.005).
 * @returns The calculated fee amount in BARK.
 */
const calculateBarkFee = (outputAmount: number, feePercentage: number): number => {
  return outputAmount * feePercentage / 1e6; // Convert to decimal and apply the fee percentage
};

/**
 * Function to create a transaction instruction for transferring BARK fees.
 * @param payer The public key of the fee payer.
 * @param feeWallet The public key of the fee wallet.
 * @param amount The amount of BARK to transfer.
 * @param connection The Solana connection object.
 * @returns A TransactionInstruction for the fee transfer.
 */
const createBarkFeeTransferInstruction = async (
  payer: PublicKey,
  feeWallet: PublicKey,
  amount: number,
  connection: Connection
): Promise<TransactionInstruction> => {
  const payerTokenAddress = await getAssociatedTokenAddress(payer, feeWallet);
  const feeWalletTokenAddress = await getAssociatedTokenAddress(feeWallet, payer);
  
  return createTransferInstruction(
    payerTokenAddress, // Source
    feeWalletTokenAddress, // Destination
    payer, // Owner
    amount * 1e6, // Convert amount to smallest unit
    [], // No signers (because this is a direct transfer)
  );
};
