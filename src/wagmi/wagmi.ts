import { configureChains, createClient } from 'wagmi';
import { bsc, bscTest } from '/@/wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi';
import { publicProvider } from 'wagmi/providers/public';

const CHAINS = [bsc, bscTest];

export const { provider, chains, webSocketProvider } = configureChains(CHAINS, [
  jsonRpcProvider({
    rpc: (chain) => ({
      http: chain.rpcUrls.default.http[0],
    }),
  }),
]);

export const injectedConnector = new InjectedConnector({
  chains,
  options: {
    shimDisconnect: false,
  },
});

export const coinbaseConnector = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: 'PancakeSwap',
    appLogoUrl: 'https://pancakeswap.com/logo.png',
  },
});

// export const walletConnectConnector = new WalletConnectConnector({
//   chains,
//   options: {
//     projectId: '...',
//     showQrModal: true,
//   },
// });

export const metaMaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: false,
  },
});
export const client = createClient({
  autoConnect: true,
  provider,
  connectors: [new SafeConnector({ chains }), metaMaskConnector, injectedConnector, coinbaseConnector],
  webSocketProvider,
});
