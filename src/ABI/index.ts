// Import ABIs from JSON files
import LendingPoolABI from './LendingPool.json';
import MockUSDCABI from './MockUSDC.json';
import CreditVoucherNFTABI from './CreditVoucherNFT.json';

export { LendingPoolABI, MockUSDCABI, CreditVoucherNFTABI };

// Contract addresses
export const CONTRACT_ADDRESSES = {
  LendingPool: '0xF26b489f44481069670d410639e1849708E8b7F5', // Replace with actual address
  MockUSDC: '0x5B8453FD96ED80Db7894450b960d284d860b7350', // Replace with actual address
  CreditVoucherNFT: '0xe469a1303f5954892FD9f03D2213237e84824667', // Replace with actual address
} as const;
