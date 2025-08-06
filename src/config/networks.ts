import { Chain } from '@rainbow-me/rainbowkit'
import { env } from './env'

// Use custom RPC URL if provided, otherwise use default
const getRpcUrl = () => {
  return env.PRIVATE_RPC_URL || 'https://rpc.hyperliquid.xyz/evm'
}

const getTestnetRpcUrl = () => {
  return env.PRIVATE_RPC_URL || 'https://rpc.hyperliquid-testnet.xyz/evm'
}

export const HyperEVM = {
  id: 999,
  name: 'HyperEVM',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/32196.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'HYPE', symbol: 'HYPE', decimals: 18 },
  rpcUrls: {
    default: { http: [getRpcUrl()] },
  },
  blockExplorers: {
    default: { name: 'HyperEVMScan', url: 'https://hyperevmscan.io/' },
  },
} as const satisfies Chain

export const HyperEVMTestnet = {
  id: 998,
  name: 'HyperEVM Testnet',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/32196.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'HYPE', symbol: 'HYPE', decimals: 18 },
  rpcUrls: {
    default: { http: [getTestnetRpcUrl()] },
  },
  blockExplorers: {
    default: { name: 'HyperLiquid Testnet Explorer', url: 'https://app.hyperliquid-testnet.xyz/explorer' },
  },
} as const satisfies Chain

// Export all networks
export const NETWORKS = {
  HyperEVM,
  HyperEVMTestnet,
} as const 