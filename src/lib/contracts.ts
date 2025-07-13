
// Smart Contract ABIs and Addresses
export const CONTRACTS = {
  MockUSDC: {
    address: '0x...', // Replace with actual deployed address
    abi: [
      "function faucet() external",
      "function balanceOf(address account) external view returns (uint256)",
      "function approve(address spender, uint256 amount) external returns (bool)",
      "function allowance(address owner, address spender) external view returns (uint256)",
      "function decimals() external view returns (uint8)",
      "function transfer(address to, uint256 amount) external returns (bool)"
    ]
  },
  LendingPool: {
    address: '0x...', // Replace with actual deployed address
    abi: [
      "function deposit(uint256 amount) external",
      "function withdraw(uint256 amount) external",
      "function requestCredit(uint8 tier) external returns (uint256)",
      "function repay(uint256 voucherId, uint256 amount) external",
      "function getPoolStats() external view returns (uint256 totalDeposits_, uint256 totalBorrowed_, uint256 totalRepaid_, uint256 availableLiquidity)",
      "function getCurrentDebt(uint256 voucherId) external view returns (uint256)",
      "function getUserVoucherInfo(address user) external view returns (uint256 voucherId, uint8 tier, uint256 limit, uint256 utilized, uint256 debt)",
      "function userDeposits(address user) external view returns (uint256)",
      "function pause() external",
      "function unpause() external",
      "function paused() external view returns (bool)"
    ]
  },
  CreditVoucherNFT: {
    address: '0x...', // Replace with actual deployed address
    abi: [
      "function getUserVoucher(address user) external view returns (uint256)",
      "function getVoucher(uint256 tokenId) external view returns (uint8 tier, uint256 limit, uint256 utilized)",
      "function getAvailableCredit(uint256 tokenId) external view returns (uint256)",
      "function tierLimits(uint8 tier) external view returns (uint256)",
      "function tokenURI(uint256 tokenId) external view returns (string)",
      "function setLendingPool(address lendingPool) external"
    ]
  }
};

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
