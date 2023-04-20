import { mainnet, goerli } from 'wagmi/chains';
import { Chain } from 'wagmi';

const bscExplorer = { name: 'BscScan', url: 'https://bscscan.com' };

export const bsc: Chain = {
  id: 56,
  name: 'BNB Smart Chain',
  network: 'bsc',
  rpcUrls: {
    default: {
      http: ['https://bsc-dataseed1.binance.org/'],
      webSocket: [],
    },
    public: {
      http: ['https://bsc-dataseed1.binance.org/'],
      webSocket: [],
    },
  },
  blockExplorers: {
    default: bscExplorer,
    etherscan: bscExplorer,
  },
  nativeCurrency: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
};

export const bscTest: Chain = {
  id: 97,
  name: 'BNB Smart Chain Testnet',
  network: 'bsc-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Binance Chain Native Token',
    symbol: 'tBNB',
  },
  rpcUrls: {
    default: {
      http: ['https://data-seed-prebsc-1-s2.binance.org:8545/'],
      webSocket: [],
    },
    public: {
      http: ['https://data-seed-prebsc-1-s2.binance.org:8545/'],
      webSocket: [],
    },
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
  },
  testnet: true,
};

export { mainnet, goerli };
