import { Address } from 'viem';

// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
  sepolia: {
    cipherCanvasLab: '0x0000000000000000000000000000000000000000' as Address, // Replace with actual deployed address
  },
  mainnet: {
    cipherCanvasLab: '0x0000000000000000000000000000000000000000' as Address, // Replace with actual deployed address
  },
} as const;

// Contract ABI - This will be updated when the contract is deployed
export const CIPHER_CANVAS_LAB_ABI = [
  // Add contract ABI here when available
] as const;
