
import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { CONTRACTS, formatUSDC, parseUSDC } from '@/lib/contracts';
import { useToast } from '@/hooks/use-toast';

export const useWeb3Integration = () => {
  const { address, isConnected } = useAccount();
  const { toast } = useToast();
  
  // USDC Balance
  const { data: usdcBalance, refetch: refetchUSDCBalance } = useContractRead({
    address: CONTRACTS.MockUSDC.address as `0x${string}`,
    abi: CONTRACTS.MockUSDC.abi,
    functionName: 'balanceOf',
    args: [address],
    enabled: !!address,
    watch: true,
  });

  // Pool Stats
  const { data: poolStats, refetch: refetchPoolStats } = useContractRead({
    address: CONTRACTS.LendingPool.address as `0x${string}`,
    abi: CONTRACTS.LendingPool.abi,
    functionName: 'getPoolStats',
    enabled: !!address,
    watch: true,
  });

  // User Voucher Info
  const { data: userVoucherInfo, refetch: refetchUserVoucherInfo } = useContractRead({
    address: CONTRACTS.LendingPool.address as `0x${string}`,
    abi: CONTRACTS.LendingPool.abi,
    functionName: 'getUserVoucherInfo',
    args: [address],
    enabled: !!address,
    watch: true,
  });

  // User Deposits
  const { data: userDeposits, refetch: refetchUserDeposits } = useContractRead({
    address: CONTRACTS.LendingPool.address as `0x${string}`,
    abi: CONTRACTS.LendingPool.abi,
    functionName: 'userDeposits',
    args: [address],
    enabled: !!address,
    watch: true,
  });

  // Faucet function
  const { config: faucetConfig } = usePrepareContractWrite({
    address: CONTRACTS.MockUSDC.address as `0x${string}`,
    abi: CONTRACTS.MockUSDC.abi,
    functionName: 'faucet',
    enabled: isConnected,
  });

  const { write: writeFaucet, data: faucetData } = useContractWrite(faucetConfig);
  const { isLoading: isFaucetLoading, isSuccess: isFaucetSuccess } = useWaitForTransaction({
    hash: faucetData?.hash,
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
    if (writeFaucet) {
      writeFaucet();
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
      limit: formatUSDC((userVoucherInfo as any)[2]),
      utilized: formatUSDC((userVoucherInfo as any)[3]),
      debt: formatUSDC((userVoucherInfo as any)[4]),
    } : null,
    userDeposits: userDeposits ? formatUSDC(userDeposits as bigint) : '0.00',
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
