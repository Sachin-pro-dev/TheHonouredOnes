import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'CLen - Crypto Credit Platform',
  projectId: '2f5a2f8b4e3c1d9a8e7f6a5b4c3d2e1f', // Demo project ID
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: false,
});