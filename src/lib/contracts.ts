
import { Abi } from 'viem';
import MockUSDC_ABI from '@/ABI/MockUSDC.json';
import LendingPool_ABI from '@/ABI/LendingPool.json';
import CreditVoucherNFT_ABI from '@/ABI/CreditVoucherNFT.json';

// Base Sepolia testnet contract addresses
export const CONTRACT_ADDRESSES = {
  // MockUSDC deployed on Base Sepolia
  MockUSDC: '0x5B8453FD96ED80Db7894450b960d284d860b7350',
  // LendingPool deployed on Base Sepolia
  LendingPool: '0xF26b489f44481069670d410639e1849708E8b7F5',
  // CreditVoucherNFT deployed on Base Sepolia
  CreditVoucherNFT: '0xe469a1303f5954892FD9f03D2213237e84824667'
} as const;

// Contract ABIs with TypeScript types
export const CONTRACTS = {
  MockUSDC: {
    address: CONTRACT_ADDRESSES.MockUSDC as `0x${string}`,
    abi: MockUSDC_ABI.abi as Abi
  },
  LendingPool: {
    address: CONTRACT_ADDRESSES.LendingPool as `0x${string}`,
    abi: LendingPool_ABI.abi as Abi
  },
  CreditVoucherNFT: {
    address: CONTRACT_ADDRESSES.CreditVoucherNFT as `0x${string}`,
    abi: CreditVoucherNFT_ABI.abi as Abi
  }
} as const;

// Type exports for better type safety
export type ContractName = keyof typeof CONTRACTS;
export type ContractAddress = `0x${string}`;
export type ContractABI = Abi;

// USDC utilities
export const USDC_DECIMALS = 6;

export const formatUSDC = (amount: bigint): string => {
  const divisor = BigInt(10 ** USDC_DECIMALS);
  const dollars = Number(amount) / Number(divisor);
  return dollars.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const parseUSDC = (amount: string): bigint => {
  const dollars = parseFloat(amount);
  return BigInt(Math.round(dollars * (10 ** USDC_DECIMALS)));
};
