# Contract Integration with Jotai

This implementation follows the pattern used in the AI Arena Game for loading and managing smart contracts using Jotai for global state management, properly configured for Next.js App Router.

## Architecture Overview

### 1. **Types** (`src/types/contracts.ts`)

- Defines TypeScript types for contracts and contract information
- Ensures type safety across the application

### 2. **Atoms** (`src/contexts/blockchain-atoms.ts`)

- `contractsInfoStorage`: Stores contract addresses and ABIs (persisted)
- `contractsAtom`: Stores actual contract instances (in-memory)

### 3. **Contract Loading** (`src/components/LoadContracts.tsx`)

- Automatically loads contracts when the app starts (public data)
- Uses Viem's `getContract` for contract instantiation
- Tests contract connection before setting state
- Loads with public client initially, adds wallet client when user connects

### 4. **Blockchain Functions** (`src/lib/blockchain/`)

- **Read Requests** (`read-requests.ts`): All contract read operations
- **Write Requests** (`write-requests.ts`): All contract write operations
- Functions accept contract instances and parameters

### 5. **Provider Setup** (`src/app/providers.tsx`)

- Wraps app with Jotai Provider (separate client component)
- Integrates with existing Wagmi and RainbowKit providers
- Follows Next.js App Router best practices

## Next.js App Router Setup

### Jotai Provider (`src/components/JotaiProvider.tsx`)

```tsx
"use client"

import { Provider } from "jotai"
import { ReactNode } from "react"

interface JotaiProviderProps {
  children: ReactNode
}

export const JotaiProvider = ({ children }: JotaiProviderProps) => {
  return <Provider>{children}</Provider>
}
```

### Main Providers (`src/app/providers.tsx`)

```tsx
"use client"

import { WagmiProvider } from "wagmi"
import { QueryClientProvider } from "@tanstack/react-query"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { JotaiProvider } from "../components/JotaiProvider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={theme}>
          <JotaiProvider>{children}</JotaiProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

### Root Layout (`src/app/layout.tsx`)

```tsx
import { Providers } from "./providers"
import BlockchainData from "@/components/BlockchainData"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <BlockchainData />
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

## Usage Pattern

### Basic Contract Access

```tsx
import { useAtom } from "jotai"
import { contractsAtom } from "../contexts/blockchain-atoms"

const MyComponent = () => {
  const contracts = useAtom(contractsAtom)[0]

  if (!contracts.lotteryPot) {
    return <div>Loading contracts...</div>
  }

  // Use contracts.lotteryPot, contracts.paymentToken, etc.
}
```

### Using the Custom Hook

```tsx
import { useContracts } from "../hooks/useContracts"

const MyComponent = () => {
  const { contracts, isLoaded, lotteryPot } = useContracts()

  if (!isLoaded) {
    return <div>Loading contracts...</div>
  }

  // Use lotteryPot, paymentToken, pballsToken
}
```

### Reading Contract Data

```tsx
import { getCurrentRound, getTotalPrize } from "../lib/blockchain/read-requests"

const loadData = async () => {
  const currentRound = await getCurrentRound(contracts.lotteryPot)
  const totalPrize = await getTotalPrize(contracts.lotteryPot)
}
```

### Writing to Contracts

```tsx
import { buyTicket } from "../lib/blockchain/write-requests"

const handleBuyTicket = async () => {
  try {
    const receipt = await buyTicket(contracts.lotteryPot)
    console.log("Transaction successful:", receipt)
  } catch (error) {
    console.error("Transaction failed:", error)
  }
}
```

## Key Benefits

1. **DRY Pattern**: Contract loading logic is centralized
2. **Type Safety**: Full TypeScript support
3. **Efficient**: Contracts load once and are shared globally
4. **Simple**: Easy to use in any component
5. **Testable**: Functions are pure and easily testable
6. **Persistent**: Contract info persists across sessions
7. **Public Data**: Game state visible to all users before wallet connection
8. **Next.js Optimized**: Proper App Router setup with client components

## File Structure

```
src/
├── contexts/
│   └── blockchain-atoms.ts      # Jotai atoms for contract state
├── types/
│   └── contracts.ts             # TypeScript contract types
├── components/
│   ├── JotaiProvider.tsx        # Separate client component for Jotai Provider
│   ├── LoadContracts.tsx        # Contract loading component
│   ├── BlockchainData.tsx       # Wrapper for contract loading
│   └── ContractExample.tsx      # Example usage component
├── lib/
│   └── blockchain/
│       ├── read-requests.ts     # Contract read functions
│       └── write-requests.ts    # Contract write functions
├── hooks/
│   └── useContracts.ts          # Custom hook for contract access
└── app/
    ├── providers.tsx            # Main providers setup
    ├── layout.tsx               # Root layout with providers
    └── page.tsx                 # Simplified page without server-side data
```

## Adding New Contracts

1. **Update Types** (`src/types/contracts.ts`)
2. **Add to Constants** (`src/constants/contracts.ts`)
3. **Update LoadContracts** (`src/components/LoadContracts.tsx`)
4. **Add Read/Write Functions** (`src/lib/blockchain/`)
5. **Update useContracts Hook** (`src/hooks/useContracts.ts`)

This pattern ensures consistent, maintainable, and efficient contract integration across your application, properly configured for Next.js App Router with Jotai.
