
import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACTS, formatUSDC, parseUSDC } from '@/lib/contracts';
import { useToast } from '@/hooks/use-toast';

export const useWeb3Integration = () => {
  const { address, isConnected } = useAccount();
  const { toast } = useToast();
  
  // USDC Balance
  const { data: usdcBalance, refetch: refetchUSDCBalance } = useReadContract({
    address: CONTRACTS.MockUSDC.address as `0x${string}`,
    abi: CONTRACTS.MockUSDC.abi,
    functionName: 'balanceOf',
    args: [address],
    query: {
      enabled: !!address,
    }
  });

  // Pool Stats
  const { data: poolStats, refetch: refetchPoolStats } = useReadContract({
    address: CONTRACTS.LendingPool.address as `0x${string}`,
    abi: CONTRACTS.LendingPool.abi,
    functionName: 'getPoolStats',
    query: {
      enabled: !!address,
    }
  });

  // User Voucher Info
  const { data: userVoucherInfo, refetch: refetchUserVoucherInfo } = useReadContract({
    address: CONTRACTS.LendingPool.address as `0x${string}`,
    abi: CONTRACTS.LendingPool.abi,
    functionName: 'getUserVoucherInfo',
    args: [address],
    query: {
      enabled: !!address,
    }
  });

  // User Deposits
  const { data: userDeposits, refetch: refetchUserDeposits } = useReadContract({
    address: CONTRACTS.LendingPool.address as `0x${string}`,
    abi: CONTRACTS.LendingPool.abi,
    functionName: 'userDeposits',
    args: [address],
    query: {
      enabled: !!address,
    }
  });

  // Faucet function
  const { writeContract: writeFaucet, data: faucetHash, isPending: isFaucetLoading } = useWriteContract();
  const { isSuccess: isFaucetSuccess } = useWaitForTransactionReceipt({
    hash: faucetHash,
  });

  useEffect(() => {
    if (isFaucetSuccess) {
      toast({
        title: "Mock USDC Received! 💰",
        description: "Test tokens have been added to your wallet.",
      });
      refetchUSDCBalance();
    }
  }, [isFaucetSuccess, toast, refetchUSDCBalance]);

  const claimFaucet = () => {
    if (isConnected && address) {
      writeFaucet({
        address: CONTRACTS.MockUSDC.address as `0x${string}`,
        abi: CONTRACTS.MockUSDC.abi,
        functionName: 'faucet',
      });
    }
  };

  // Format data for UI
  const formattedData = {
    usdcBalance: usdcBalance ? formatUSDC(usdcBalance as bigint) : '0.00',
    poolStats: poolStats ? {
      totalDeposits: formatUSDC((poolStats as any)[0]),
      totalBorrowed: formatUSDC((poolStats as any)[1]),
      totalRepaid: formatUSDC((poolStats as any)[2]),
      availableLiquidity: formatUSDC((poolStats as any)[3]),
    } : null,
    userVoucherInfo: userVoucherInfo ? {
      voucherId: (userVoucherInfo as any)[0]?.toString(),
      tier: (userVoucherInfo as any)[1],
      limit: (userVoucherInfo as any)[2] as bigint,
      utilized: (userVoucherInfo as any)[3] as bigint,
      debt: (userVoucherInfo as any)[4] as bigint,
    } : null,
    userDeposits: userDeposits ? userDeposits as bigint : BigInt(0),
  };

  return {
    isConnected,
    address,
    ...formattedData,
    claimFaucet,
    isFaucetLoading,
    refetchAll: () => {
      refetchUSDCBalance();
      refetchPoolStats();
      refetchUserVoucherInfo();
      refetchUserDeposits();
    }
  };
};
