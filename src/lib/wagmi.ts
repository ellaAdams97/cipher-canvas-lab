import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, mainnet } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Cipher Canvas Lab',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '21fef48091f12692cad574a6f7753643', // Default project ID for testing
  chains: [sepolia, mainnet],
  ssr: false, // If your dApp uses server side rendering (SSR)
});
