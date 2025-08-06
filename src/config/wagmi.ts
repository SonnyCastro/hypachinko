import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { env } from './env';
import { HyperEVM, HyperEVMTestnet } from './networks';

export const config = getDefaultConfig({
  appName: 'Hypachinko',
  projectId: env.WALLET_CONNECT_PROJECT_ID,
  chains: [
    HyperEVM,
    ...(env.ENABLE_TESTNETS ? [HyperEVMTestnet] : []),
  ],
  ssr: true,
  // Wagmi createConfig options including multicall batching
  batch: {
    multicall: {
      batchSize: 1024, // 1KB batch size
      wait: 16, // 16ms wait time for batching
    },
  },
  // Optional: Custom wallet list (uses default if not specified)
  // wallets: [rainbowWallet, metaMaskWallet, coinbaseWallet],
});
