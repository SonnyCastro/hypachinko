// App constants and configuration

export const APP_CONFIG = {
  name: 'Hypachinko',
  description: 'A modern decentralized gaming platform',
  version: '1.0.0',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;

export const SUPPORTED_CHAINS = {
  ethereum: {
    id: 1,
    name: 'Ethereum',
    rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL,
  },
  polygon: {
    id: 137,
    name: 'Polygon',
    rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC_URL,
  },
} as const;

export const GAME_CONFIG = {
  minBet: 0.001,
  maxBet: 1.0,
  countdownDuration: 30, // seconds
  maxBalls: 100,
  colors: ['blue', 'red', 'green', 'yellow'] as const,
} as const;

export const API_ENDPOINTS = {
  games: '/api/games',
  users: '/api/users',
  leaderboard: '/api/leaderboard',
  wallet: '/api/wallet',
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 250,
  slow: 350,
} as const;

export const ERROR_MESSAGES = {
  walletConnectionFailed: 'Failed to connect wallet',
  insufficientBalance: 'Insufficient balance',
  networkError: 'Network error occurred',
  unknownError: 'An unknown error occurred',
} as const;

export const SUCCESS_MESSAGES = {
  walletConnected: 'Wallet connected successfully',
  transactionSubmitted: 'Transaction submitted successfully',
  ballPurchased: 'Ball purchased successfully',
} as const;

// Re-export assets for convenience
export { ASSETS, getAssetPath } from './assets'; 