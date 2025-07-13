export const BASE_SEPOLIA = {
  chainId: '0x14a34', // 84532 in decimal
  chainName: 'Base Sepolia',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://sepolia.base.org'],
  blockExplorerUrls: ['https://sepolia.basescan.org'],
  iconUrls: ['https://app.chainlist.org/unknown-logo.png'],
} as const;

export const addBaseSepoliaToWallet = async () => {
  if (!window.ethereum) {
    throw new Error('No crypto wallet found. Please install MetaMask.');
  }

  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [BASE_SEPOLIA],
    });
    return true;
  } catch (error) {
    console.error('Error adding Base Sepolia to wallet:', error);
    throw error;
  }
};

export const switchToBaseSepolia = async () => {
  if (!window.ethereum) {
    throw new Error('No crypto wallet found. Please install MetaMask.');
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: BASE_SEPOLIA.chainId }],
    });
    return true;
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask
    if ((switchError as any).code === 4902) {
      return addBaseSepoliaToWallet();
    }
    console.error('Error switching to Base Sepolia:', switchError);
    throw switchError;
  }
};
