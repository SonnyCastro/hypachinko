/**
 * Environment configuration for Hypachinko
 * All environment variables are validated and typed
 */

export const env = {
  // WalletConnect Project ID (required for wallet connections)
  WALLET_CONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,

  // Contract addresses
  LOTTERY_POT_ADDRESS: process.env.NEXT_PUBLIC_LOTTERY_POT_ADDRESS,
  PAYMENT_TOKEN_ADDRESS: process.env.NEXT_PUBLIC_PAYMENT_TOKEN_ADDRESS,
  PBALLS_TOKEN_ADDRESS: process.env.NEXT_PUBLIC_PBALLS_TOKEN_ADDRESS,

  // RPC Configuration
  PRIVATE_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,

  // Feature flags
  ENABLE_TESTNETS: process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true',
} as const

// Validate required environment variables
if (!env.WALLET_CONNECT_PROJECT_ID) {
  throw new Error('NEXT_PUBLIC_PROJECT_ID is required. Please add it to your .env.local file.')
} 