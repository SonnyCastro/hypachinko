import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  Chain,
} from '@rainbow-me/rainbowkit';
import { env } from './env';

const HyperEVM = {
  id: 999,
  name: 'HyperEVM',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/32196.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'HYPE', symbol: 'HYPE', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.hyperliquid.xyz/evm'] },
  },
  blockExplorers: {
    default: { name: 'HyperEVMScan', url: 'https://hyperevmscan.io/' },
  },
} as const satisfies Chain;

const HyperEVMTestnet = {
  id: 998,
  name: 'HyperEVM Testnet',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/32196.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'HYPE', symbol: 'HYPE', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.hyperliquid-testnet.xyz/evm'] },
  },
  blockExplorers: {
    default: { name: 'HyperLiquid Testnet Explorer', url: 'https://app.hyperliquid-testnet.xyz/explorer' },
  },
} as const satisfies Chain;


export const config = getDefaultConfig({
  appName: 'Hypachinko',
  projectId: env.WALLET_CONNECT_PROJECT_ID,
  chains: [
    HyperEVM,
    ...(env.ENABLE_TESTNETS ? [HyperEVMTestnet] : []),
  ],
  ssr: true,
});
