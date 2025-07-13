import { useState, useEffect, useCallback } from 'react';
import { useAccount, useChainId, usePublicClient, useWalletClient, useWriteContract, useWatchContractEvent } from 'wagmi';
import { parseEther, formatEther, type Address, type Hash, type Abi, type Chain } from 'viem';
import { useToast } from '@/components/ui/use-toast';

// Import ABIs with type assertion
import lendingPoolAbiJson from '@/ABI/LendingPool.json';
import mockUsdcAbiJson from '@/ABI/MockUSDC.json';
import creditVoucherNftAbiJson from '@/ABI/CreditVoucherNFT.json';

// Type assertions for ABIs
const lendingPoolAbi = lendingPoolAbiJson.abi as Abi;
const mockUsdcAbi = mockUsdcAbiJson.abi as Abi;
const creditVoucherNftAbi = creditVoucherNftAbiJson.abi as Abi;

const CONTRACT_ADDRESSES = {
  LendingPool: '0xF26b489f44481069670d410639e1849708E8b7F5',
  MockUSDC: '0x5B8453FD96ED80Db7894450b960d284d860b7350',
  CreditVoucherNFT: '0xe469a1303f5954892FD9f03D2213237e84824667',
} as const;

type VoucherInfo = {
  tokenId: bigint;
  tier: number;
  limit: bigint;
  utilized: bigint;
  available: bigint;
  hasVoucher: boolean;
  creditLimit: bigint;
  usedAmount: bigint;
  expiryDate: number;
};

type PoolStats = {
  totalDeposits: bigint;
  totalBorrowed: bigint;
  availableLiquidity: bigint;
  utilizationRate: number;
};

export const useWeb3Integration = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { toast } = useToast();
  const { writeContractAsync } = useWriteContract();
  
  // Base Sepolia testnet chain ID
  const baseSepoliaId = 84531;

  // State for contract data
  const [isLoading, setIsLoading] = useState(false);
  const [usdcBalance, setUsdcBalance] = useState<bigint>(0n);
  const [usdcAllowance, setUsdcAllowance] = useState<bigint>(0n);
  const [userDeposits, setUserDeposits] = useState<bigint>(0n);
  const [poolStats, setPoolStats] = useState<PoolStats>({
    totalDeposits: 0n,
    totalBorrowed: 0n,
    availableLiquidity: 0n,
    utilizationRate: 0,
  });
  const [voucherInfo, setVoucherInfo] = useState<VoucherInfo>({
    tokenId: 0n,
    tier: 0,
    limit: 0n,
    utilized: 0n,
    available: 0n,
    hasVoucher: false,
    creditLimit: 0n,
    usedAmount: 0n,
    expiryDate: 0,
  });

  const isCorrectChain = chainId === baseSepoliaId;

  // Event listeners for contract events
  useWatchContractEvent({
    address: CONTRACT_ADDRESSES.LendingPool as `0x${string}`,
    abi: lendingPoolAbi,
    eventName: 'Deposited',
    onLogs: (logs) => {
      if (logs.some(log => {
        const logArgs = log as unknown as { args?: { user?: string } };
        return logArgs.args?.user?.toLowerCase() === address?.toLowerCase();
      })) {
        refetchAllData();
        toast({
          title: 'Deposit Confirmed',
          description: 'Your deposit was successful!',
        });
      }
    },
  });

  useWatchContractEvent({
    address: CONTRACT_ADDRESSES.LendingPool as `0x${string}`,
    abi: lendingPoolAbi,
    eventName: 'Withdrawn',
    onLogs: (logs) => {
      if (logs.some(log => {
        const logArgs = log as unknown as { args?: { user?: string } };
        return logArgs.args?.user?.toLowerCase() === address?.toLowerCase();
      })) {
        refetchAllData();
        toast({
          title: 'Withdrawal Confirmed',
          description: 'Your withdrawal was successful!',
        });
      }
    },
  });

  // Helper function to refetch all data
  const refetchAllData = useCallback(async () => {
    if (!address) return;
    
    try {
      setIsLoading(true);
      
      // Fetch all data in parallel
      await Promise.all([
        // Fetch USDC balance
        (async () => {
          try {
            const balance = await publicClient.readContract({
              address: CONTRACT_ADDRESSES.MockUSDC as `0x${string}`,
              abi: mockUsdcAbi,
              functionName: 'balanceOf',
              args: [address as `0x${string}`],
            }) as bigint;
            setUsdcBalance(balance);
          } catch (error) {
            console.error('Error fetching USDC balance:', error);
            setUsdcBalance(0n);
          }
        })(),
        
        // Fetch USDC allowance
        (async () => {
          const allowance = await publicClient.readContract({
            address: CONTRACT_ADDRESSES.MockUSDC as `0x${string}`,
            abi: mockUsdcAbi,
            functionName: 'allowance',
            args: [address, CONTRACT_ADDRESSES.LendingPool],
          }) as bigint;
          setUsdcAllowance(allowance);
        })(),
        
        // Fetch pool stats and user deposits in parallel
        (async () => {
          try {
            const [totalDeposits, totalBorrowed, availableLiquidity, utilizationRate, depositsResult] = await Promise.all([
              // Pool stats
              publicClient.readContract({
                address: CONTRACT_ADDRESSES.LendingPool as `0x${string}`,
                abi: lendingPoolAbi,
                functionName: 'totalDeposits',
              }),
              
              publicClient.readContract({
                address: CONTRACT_ADDRESSES.LendingPool as `0x${string}`,
                abi: lendingPoolAbi,
                functionName: 'totalBorrowed',
              }),
              
              publicClient.readContract({
                address: CONTRACT_ADDRESSES.LendingPool as `0x${string}`,
                abi: lendingPoolAbi,
                functionName: 'availableLiquidity',
              }),
              
              publicClient.readContract({
                address: CONTRACT_ADDRESSES.LendingPool as `0x${string}`,
                abi: lendingPoolAbi,
                functionName: 'getUtilizationRate',
              }),
              
              // User deposits
              publicClient.readContract({
                address: CONTRACT_ADDRESSES.LendingPool as `0x${string}`,
                abi: lendingPoolAbi,
                functionName: 'userDeposits',
                args: [address as `0x${string}`],
              })
            ]);
            
            // Process pool stats
            setPoolStats({
              totalDeposits: totalDeposits as bigint,
              totalBorrowed: totalBorrowed as bigint,
              availableLiquidity: availableLiquidity as bigint,
              utilizationRate: Number(utilizationRate as bigint) / 1e18,
            });
            
            // Process user deposits
            setUserDeposits(depositsResult as bigint);
          } catch (error) {
            console.error('Error fetching pool stats or deposits:', error);
          }
        })(),
        
        // Fetch voucher info
        (async () => {
          try {
            const [hasVoucher, creditLimit, usedAmount, expiryDate] = await Promise.all([
              publicClient.readContract({
                address: CONTRACT_ADDRESSES.CreditVoucherNFT as `0x${string}`,
                abi: creditVoucherNftAbi,
                functionName: 'hasVoucher',
                args: [address],
              }),
              
              publicClient.readContract({
                address: CONTRACT_ADDRESSES.CreditVoucherNFT as `0x${string}`,
                abi: creditVoucherNftAbi,
                functionName: 'getCreditLimit',
                args: [address],
              }),
              
              publicClient.readContract({
                address: CONTRACT_ADDRESSES.CreditVoucherNFT as `0x${string}`,
                abi: creditVoucherNftAbi,
                functionName: 'getUsedAmount',
                args: [address],
              }),
              
              publicClient.readContract({
                address: CONTRACT_ADDRESSES.CreditVoucherNFT as `0x${string}`,
                abi: creditVoucherNftAbi,
                functionName: 'getExpiryDate',
                args: [address],
              }),
            ]);
            
            setVoucherInfo({
              tokenId: 0n, // Update this if you have a way to get the tokenId
              tier: 0, // Update this if you have tier information
              limit: creditLimit as bigint,
              utilized: usedAmount as bigint,
              available: (creditLimit as bigint) - (usedAmount as bigint),
              hasVoucher: hasVoucher as boolean,
              creditLimit: creditLimit as bigint,
              usedAmount: usedAmount as bigint,
              expiryDate: Number(expiryDate as bigint) * 1000, // Convert to milliseconds
            });
          } catch (error) {
            console.error('Error fetching voucher info:', error);
            setVoucherInfo({
              tokenId: 0n,
              tier: 0,
              limit: 0n,
              utilized: 0n,
              available: 0n,
              hasVoucher: false,
              creditLimit: 0n,
              usedAmount: 0n,
              expiryDate: 0,
            });
          }
        })(),
      ]);
    } catch (error) {
      console.error('Error refetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [address, publicClient, toast]);

  // Fetch user's USDC balance
  const refetchUsdcBalance = async () => {
    if (!address) return;
    
    const balance = await publicClient.readContract({
      address: CONTRACT_ADDRESSES.MockUSDC as `0x${string}`,
      abi: mockUsdcAbi,
      functionName: 'balanceOf',
      args: [address],
    }) as bigint;
    
    setUsdcBalance(balance);
  };

  // Fetch USDC allowance for LendingPool
  const refetchUsdcAllowance = async () => {
    if (!address) return;
    
    const allowance = await publicClient.readContract({
      address: CONTRACT_ADDRESSES.MockUSDC as `0x${string}`,
      abi: mockUsdcAbi,
      functionName: 'allowance',
      args: [address, CONTRACT_ADDRESSES.LendingPool],
    }) as bigint;
    
    setUsdcAllowance(allowance);
  };

  // Fetch user's voucher info
  const refetchVoucherInfo = async () => {
    if (!address) return;
    
    try {
      const hasVoucherResult = await publicClient.readContract({
        address: CONTRACT_ADDRESSES.CreditVoucherNFT as `0x${string}`,
        abi: creditVoucherNftAbi,
        functionName: 'hasVoucher',
        args: [address],
      }) as boolean;

      const creditLimitResult = await publicClient.readContract({
        address: CONTRACT_ADDRESSES.CreditVoucherNFT as `0x${string}`,
        abi: creditVoucherNftAbi,
        functionName: 'getCreditLimit',
        args: [address],
      }) as bigint;

      const usedAmountResult = await publicClient.readContract({
        address: CONTRACT_ADDRESSES.CreditVoucherNFT as `0x${string}`,
        abi: creditVoucherNftAbi,
        functionName: 'getUsedAmount',
        args: [address],
      }) as bigint;

      const expiryDateResult = await publicClient.readContract({
        address: CONTRACT_ADDRESSES.CreditVoucherNFT as `0x${string}`,
        abi: creditVoucherNftAbi,
        functionName: 'getExpiryDate',
        args: [address],
      }) as bigint;
      
      setVoucherInfo(prev => ({
        ...prev,
        hasVoucher: hasVoucherResult,
        creditLimit: creditLimitResult,
        usedAmount: usedAmountResult,
        available: creditLimitResult - usedAmountResult,
        expiryDate: Number(expiryDateResult) * 1000, // Convert to milliseconds
      }));
    } catch (error) {
      console.error('Error fetching voucher info:', error);
      setVoucherInfo(prev => ({
        ...prev,
        hasVoucher: false,
      }));
    }
  };

  // Fetch pool statistics
  const refetchPoolStats = async () => {
    try {
      const totalDeposits = await publicClient.readContract({
        address: CONTRACT_ADDRESSES.LendingPool as `0x${string}`,
        abi: lendingPoolAbi,
        functionName: 'totalDeposits',
      }) as bigint;

      const totalBorrowed = await publicClient.readContract({
        address: CONTRACT_ADDRESSES.LendingPool as `0x${string}`,
        abi: lendingPoolAbi,
        functionName: 'totalBorrowed',
      }) as bigint;

      const availableLiquidity = await publicClient.readContract({
        address: CONTRACT_ADDRESSES.LendingPool as `0x${string}`,
        abi: lendingPoolAbi,
        functionName: 'availableLiquidity',
      }) as bigint;

      const utilizationRate = await publicClient.readContract({
        address: CONTRACT_ADDRESSES.LendingPool as `0x${string}`,
        abi: lendingPoolAbi,
        functionName: 'getUtilizationRate',
      }) as bigint;
      
      setPoolStats({
        totalDeposits,
        totalBorrowed,
        availableLiquidity,
        utilizationRate: Number(utilizationRate) / 1e18,
      });
    } catch (error) {
      console.error('Error fetching pool stats:', error);
      setPoolStats({
        totalDeposits: 0n,
        totalBorrowed: 0n,
        availableLiquidity: 0n,
        utilizationRate: 0,
      });
    }
  };

  // Fetch user's deposits
  const refetchUserDeposits = async () => {
    if (!address) return;
    
    const deposits = await publicClient.readContract({
      address: CONTRACT_ADDRESSES.LendingPool as `0x${string}`,
      abi: lendingPoolAbi,
      functionName: 'userDeposits',
      args: [address],
    }) as bigint;
    
    setUserDeposits(deposits);
  };

  // Approve USDC spending for LendingPool
  const approveUSDC = async (amount: string) => {
    if (!walletClient) {
      toast({
        title: 'Error',
        description: 'Wallet client not available',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      const parsedAmount = parseEther(amount);

      const { request } = await publicClient.simulateContract({
        address: CONTRACT_ADDRESSES.MockUSDC as `0x${string}`,
        abi: mockUsdcAbi,
        functionName: 'approve',
        args: [CONTRACT_ADDRESSES.LendingPool, parsedAmount],
        account: address as `0x${string}`,
      });

      const hash = await walletClient.writeContract(request);

      toast({
        title: 'Approval Submitted',
        description: 'Waiting for transaction confirmation...',
      });

      // Wait for transaction confirmation
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: hash as `0x${string}`,
      });

      if (receipt.status === 'success') {
        await refetchAllData();
        toast({
          title: 'Approval Successful',
          description: 'Your approval has been processed.',
        });
      } else {
        throw new Error('Transaction failed');
      }

      return hash;
    } catch (error) {
      console.error('Approval failed:', error);
      toast({
        title: 'Approval Failed',
        description: error instanceof Error ? error.message : 'Transaction failed',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Deposit USDC
  const deposit = async (amount: string) => {
    if (!address) return;

    try {
      setIsLoading(true);
      const parsedAmount = parseEther(amount);

      // Check allowance first
      if (usdcAllowance < parsedAmount) {
        await approveUSDC(amount);
      }

      const { request } = await publicClient.simulateContract({
        address: CONTRACT_ADDRESSES.LendingPool as `0x${string}`,
        abi: lendingPoolAbi,
        functionName: 'deposit',
        args: [parsedAmount],
        account: address as `0x${string}`,
      });

      const hash = await walletClient.writeContract(request);

      toast({
        title: 'Deposit Submitted',
        description: 'Your deposit is being processed.',
      });

      // Wait for transaction confirmation
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: hash as `0x${string}`,
      });

      if (receipt.status === 'success') {
        await refetchAllData();
        toast({
          title: 'Deposit Successful',
          description: 'Your deposit has been processed.',
        });
      } else {
        throw new Error('Transaction failed');
      }
    } catch (error) {
      console.error('Error depositing:', error);
      toast({
        title: 'Deposit Failed',
        description: 'There was an error processing your deposit.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Withdraw USDC
  const withdraw = async (amount: string) => {
    if (!address) return;

    try {
      setIsLoading(true);
      const parsedAmount = parseEther(amount);

      const { request } = await publicClient.simulateContract({
        address: CONTRACT_ADDRESSES.LendingPool as `0x${string}`,
        abi: lendingPoolAbi,
        functionName: 'withdraw',
        args: [parsedAmount],
        account: address as `0x${string}`,
      });

      const hash = await walletClient.writeContract(request);

      toast({
        title: 'Withdrawal Submitted',
        description: 'Your withdrawal is being processed.',
      });

      // Wait for transaction confirmation
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: hash as `0x${string}`,
      });

      if (receipt.status === 'success') {
        await refetchAllData();
        toast({
          title: 'Withdrawal Successful',
          description: 'Your withdrawal has been processed.',
        });
      } else {
        throw new Error('Transaction failed');
      }
    } catch (error) {
      console.error('Error withdrawing:', error);
      toast({
        title: 'Withdrawal Failed',
        description: 'There was an error processing your withdrawal.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Request credit
  const requestCredit = async (amount: string) => {
    if (!address) return;

    try {
      setIsLoading(true);
      const parsedAmount = parseEther(amount);

      const { request } = await publicClient.simulateContract({
        address: CONTRACT_ADDRESSES.LendingPool as `0x${string}`,
        abi: lendingPoolAbi,
        functionName: 'requestCredit',
        args: [parsedAmount],
        account: address as `0x${string}`,
      });

      const hash = await walletClient.writeContract(request);

      toast({
        title: 'Credit Request Submitted',
        description: 'Your credit request is being processed.',
      });

      // Wait for transaction confirmation
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: hash as `0x${string}`,
      });

      if (receipt.status === 'success') {
        await refetchAllData();
        toast({
          title: 'Credit Approved',
          description: 'Your credit request has been approved.',
        });
      } else {
        throw new Error('Transaction failed');
      }
    } catch (error) {
      console.error('Error requesting credit:', error);
      toast({
        title: 'Credit Request Failed',
        description: 'There was an error processing your credit request.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Repay credit
  const repay = async (voucherId: bigint, amount: string) => {
    if (!address) return;

    try {
      setIsLoading(true);
      const parsedAmount = parseEther(amount);

      // First, approve USDC if needed
      if (usdcAllowance < parsedAmount) {
        await approveUSDC(amount);
      }

      const { request } = await publicClient.simulateContract({
        address: CONTRACT_ADDRESSES.LendingPool as `0x${string}`,
        abi: lendingPoolAbi,
        functionName: 'repay',
        args: [voucherId, parsedAmount],
        account: address as `0x${string}`,
      });

      const hash = await walletClient.writeContract(request);

      toast({
        title: 'Repayment Submitted',
        description: 'Your repayment is being processed.',
      });

      // Wait for transaction confirmation
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: hash as `0x${string}`,
      });

      if (receipt.status === 'success') {
        await refetchAllData();
        toast({
          title: 'Repayment Successful',
          description: 'Your repayment has been processed.',
        });
      } else {
        throw new Error('Transaction failed');
      }
    } catch (error) {
      console.error('Error repaying:', error);
      toast({
        title: 'Repayment Failed',
        description: 'There was an error processing your repayment.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Claim test USDC (alias for claimFaucet for backward compatibility)
  const claimTestUSDC = async () => {
    return claimFaucet();
  };

  // Claim faucet
  const claimFaucet = async () => {
    if (!address) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet first.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);

      const { request } = await publicClient.simulateContract({
        address: CONTRACT_ADDRESSES.MockUSDC as `0x${string}`,
        abi: mockUsdcAbi,
        functionName: 'faucet',
        account: address as `0x${string}`,
      });

      const hash = await walletClient.writeContract(request);

      toast({
        title: 'Requesting Test USDC',
        description: 'Test tokens are being sent to your wallet...',
      });

      // Wait for transaction confirmation
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: hash as `0x${string}`,
      });

      if (receipt.status === 'success') {
        await refetchAllData();
        toast({
          title: 'Test USDC Received',
          description: 'You have received test USDC tokens.',
        });
      } else {
        throw new Error('Transaction failed');
      }

      return hash;
    } catch (error) {
      console.error('Faucet request failed:', error);
      toast({
        title: 'Faucet Request Failed',
        description: error instanceof Error ? error.message : 'Transaction failed',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Refetch all data when chain or address changes
  useEffect(() => {
    if (!isConnected || !isCorrectChain || !address) return;
    
    const fetchData = async () => {
      try {
        await refetchAllData();
      } catch (error) {
        console.error('Error refetching data:', error);
      }
    };
    
    fetchData();
  }, [address, isConnected, isCorrectChain]);

  // Format data for UI
  const formatUSDC = (value: bigint) => {
    return parseFloat(formatEther(value)).toFixed(2);
  };

  const formatAPY = (rate: number) => {
    return (rate * 100).toFixed(2);
  };

  return {
    // State
    address,
    isConnected,
    isCorrectChain,
    isLoading,
    usdcBalance: formatUSDC(usdcBalance),
    usdcAllowance: formatUSDC(usdcAllowance),
    userDeposits: formatUSDC(userDeposits),
    poolStats: {
      totalDeposits: formatUSDC(poolStats?.totalDeposits || BigInt(0)),
      totalBorrowed: formatUSDC(poolStats?.totalBorrowed || BigInt(0)),
      availableLiquidity: formatUSDC(poolStats?.availableLiquidity || BigInt(0)),
      utilizationRate: formatAPY(poolStats?.utilizationRate || 0),
    },
    voucherInfo: {
      ...voucherInfo,
      limit: formatUSDC(voucherInfo.limit),
      utilized: formatUSDC(voucherInfo.utilized),
      available: formatUSDC(voucherInfo.available),
      creditLimit: formatUSDC(voucherInfo.creditLimit),
      usedAmount: formatUSDC(voucherInfo.usedAmount),
      expiryDate: voucherInfo.expiryDate > 0 ? new Date(voucherInfo.expiryDate).toLocaleDateString() : 'N/A',
    },

    // Functions
    refetchAllData,
    approveUSDC,
    deposit,
    withdraw,
    requestCredit,
    repay,
    claimTestUSDC,
    claimFaucet,

    // Formatting helpers
    formatUSDC,
    parseUSDC: parseEther,
  };
};

export default useWeb3Integration;
