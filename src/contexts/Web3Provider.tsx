import { createContext, useContext, ReactNode, useCallback } from 'react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { useWeb3Integration } from '@/hooks/useWeb3Integration';
import { switchToBaseSepolia } from '@/utils/networks';
import { useToast } from '@/components/ui/use-toast';

type Web3ContextType = ReturnType<typeof useWeb3Integration> & {
  ensureCorrectNetwork: () => Promise<boolean>;
  isConnected: boolean;
  address?: `0x${string}`;
  isCorrectChain: boolean;
};

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const web3 = useWeb3Integration();
  const { toast } = useToast();
  
  // Base Sepolia chain ID
  const targetChainId = 84532;
  const isCorrectChain = chainId === targetChainId;

  const ensureCorrectNetwork = useCallback(async () => {
    if (!isConnected || !address) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet first.',
        variant: 'destructive',
      });
      return false;
    }

    if (!isCorrectChain) {
      try {
        await switchToBaseSepolia();
        return true;
      } catch (error) {
        console.error('Failed to switch to Base Sepolia:', error);
        toast({
          title: 'Network Switch Failed',
          description: 'Please switch to Base Sepolia testnet to continue.',
          variant: 'destructive',
        });
        return false;
      }
    }
    return true;
  }, [isConnected, address, isCorrectChain, toast, switchChain]);
  
  const value = {
    ...web3,
    isConnected,
    address,
    isCorrectChain,
    ensureCorrectNetwork,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
