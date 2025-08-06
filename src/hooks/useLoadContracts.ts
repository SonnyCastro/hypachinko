import { useCallback, useMemo } from 'react'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'
import { getContract, type Abi } from 'viem'
import { CONTRACT_CONFIGS } from '@/constants/contracts'
import { throttleRequest } from '@/lib/utils/requestThrottler'

export function useLoadContracts() {
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const { address: account } = useAccount()

  // Memoize contracts to prevent recreation
  const contracts = useMemo(() => {
    if (!publicClient) return {
      lotteryPot: null,
      paymentToken: null,
      pballsToken: null,
    }

    const configs = {
      lotteryPot: CONTRACT_CONFIGS.lotteryPot,
      paymentToken: CONTRACT_CONFIGS.paymentToken,
      pballsToken: CONTRACT_CONFIGS.pballsToken,
    }

    return {
      lotteryPot: (() => {
        try {
          return getContract({
            address: configs.lotteryPot.address,
            abi: configs.lotteryPot.abi,
            client: {
              public: publicClient,
              wallet: walletClient || undefined,
            },
          })
        } catch (error) {
          console.error('Error creating lottery pot contract:', error)
          return null
        }
      })(),
      paymentToken: (() => {
        try {
          return getContract({
            address: configs.paymentToken.address,
            abi: configs.paymentToken.abi,
            client: {
              public: publicClient,
              wallet: walletClient || undefined,
            },
          })
        } catch (error) {
          console.error('Error creating payment token contract:', error)
          return null
        }
      })(),
      pballsToken: (() => {
        try {
          return getContract({
            address: configs.pballsToken.address,
            abi: configs.pballsToken.abi,
            client: {
              public: publicClient,
              wallet: walletClient || undefined,
            },
          })
        } catch (error) {
          console.error('Error creating pballs token contract:', error)
          return null
        }
      })(),
    }
  }, [publicClient, walletClient])

  const isLoading = !publicClient
  const isReady = !!publicClient && !!account
  const error = null

  // Stable multicall function
  const stableMulticall = useCallback(async <T = unknown>(
    contracts: Array<{ address: `0x${string}`; abi: Abi; functionName: string; args?: readonly unknown[] }>
  ): Promise<Array<{ data: T; status: 'success' } | { error: string; status: 'failure' }>> => {
    if (!publicClient) {
      throw new Error('Public client not available')
    }

    try {
      const results = await publicClient.multicall({
        contracts,
        allowFailure: true,
      })

      return results.map((result) => {
        if (result.status === 'success') {
          return {
            data: result.result as T,
            status: 'success' as const,
          }
        } else {
          return {
            error: result.error?.message || 'Unknown error',
            status: 'failure' as const,
          }
        }
      })
    } catch (error) {
      console.error('Multicall error:', error)
      throw error
    }
  }, [publicClient])

  // Batch read multiple functions using multicall
  const batchReadContract = useCallback(async (
    contractName: keyof typeof contracts,
    functions: Array<{ functionName: string; args?: readonly unknown[] }>
  ) => {
    const contract = contracts[contractName]
    if (!contract) throw new Error(`Contract ${contractName} not available`)

    const multicallContracts = functions.map(({ functionName, args = [] }) => ({
      address: contract.address,
      abi: contract.abi,
      functionName,
      args,
    }))

    return throttleRequest(
      `${contractName}_batch_${functions.map(f => f.functionName).join('_')}`,
      async () => {
        try {
          const results = await stableMulticall(multicallContracts)
          return results.map((result, index) => {
            if (result.status === 'success') {
              return result.data
            } else {
              console.warn(`Function ${functions[index].functionName} failed:`, result.error)
              // Return default values based on function name
              const functionName = functions[index].functionName
              if (functionName === 'totalSupply' || functionName === 'totalMinted') return BigInt(0)
              if (functionName === 'balanceOf') return BigInt(0)
              if (functionName === 'getCurrentMultiplier') return BigInt(1)
              if (functionName === 'roundEnded') return false
              if (functionName === 'currentRound') return BigInt(0)
              if (functionName === 'getTimeRemaining') return BigInt(0)
              if (functionName === 'getCurrentTicketPrice') return BigInt(0)
              if (functionName === 'getUserTickets') return []
              if (functionName === 'getWinningProbability') return BigInt(0)
              if (functionName === 'getTicketsForSale') return { tokenIds: [], prices: [] }
              if (functionName === 'currentLotteryNFT') return '0x0000000000000000000000000000000000000000'
              if (functionName === 'getUserStats') return { balance: BigInt(0), totalMintedAmount: BigInt(0), lastMintTime: BigInt(0) }
              return null
            }
          })
        } catch (error) {
          console.error('Batch read error:', error)
          throw error
        }
      }
    )
  }, [contracts, stableMulticall])

  // Throttled read functions (keeping for backward compatibility)
  const readContract = useCallback(async (contractName: keyof typeof contracts, functionName: string, args: readonly unknown[] = []) => {
    const contract = contracts[contractName]
    if (!contract) throw new Error(`Contract ${contractName} not available`)

    return throttleRequest(
      `${contractName}_${functionName}`,
      async () => {
        try {
          return await (contract.read as Record<string, (...args: readonly unknown[]) => Promise<unknown>>)[functionName](args)
        } catch (error) {
          console.warn(`Function ${functionName} not found on ${contractName} contract:`, error)
          // Return default values based on function name
          if (functionName === 'totalSupply' || functionName === 'totalMinted') return BigInt(0)
          if (functionName === 'balanceOf') return BigInt(0)
          if (functionName === 'getCurrentMultiplier') return BigInt(1)
          if (functionName === 'roundEnded') return false
          if (functionName === 'currentRound') return BigInt(0)
          if (functionName === 'getTimeRemaining') return BigInt(0)
          if (functionName === 'getCurrentTicketPrice') return BigInt(0)
          if (functionName === 'getUserTickets') return []
          if (functionName === 'getWinningProbability') return BigInt(0)
          if (functionName === 'getTicketsForSale') return { tokenIds: [], prices: [] }
          if (functionName === 'currentLotteryNFT') return '0x0000000000000000000000000000000000000000'
          if (functionName === 'getUserStats') return { balance: BigInt(0), totalMintedAmount: BigInt(0), lastMintTime: BigInt(0) }
          return null
        }
      }
    )
  }, [contracts])

  // Write functions using wallet client directly
  const writeContract = useCallback(async (contractName: keyof typeof contracts, functionName: string, args: readonly unknown[] = []) => {
    const contract = contracts[contractName]
    if (!contract) throw new Error(`Contract ${contractName} not available`)
    if (!account) throw new Error('No account connected')
    if (!walletClient) throw new Error('Wallet client not available')

    return walletClient.writeContract({
      address: contract.address,
      abi: contract.abi,
      functionName: functionName as never,
      args: args as never,
      account,
    })
  }, [contracts, account, walletClient])

  return {
    contracts,
    isLoading,
    isReady,
    error,
    readContract,
    batchReadContract,
    writeContract,
    account,
  }
}

// Specialized hooks for each contract
export function useLotteryPotContract() {
  const { contracts, readContract, batchReadContract, writeContract, account, isReady } = useLoadContracts()

  // Batch read all lottery pot data
  const batchReadLotteryData = useCallback(async (includeUserData = false) => {
    const functions = [
      { functionName: 'currentRound', args: [] as readonly unknown[] },
      { functionName: 'getTimeRemaining', args: [] as readonly unknown[] },
      { functionName: 'getCurrentTicketPrice', args: [] as readonly unknown[] },
      { functionName: 'roundEnded', args: [] as readonly unknown[] },
      { functionName: 'getTotalPrize', args: [] as readonly unknown[] },
      { functionName: 'getTotalTickets', args: [] as readonly unknown[] },
    ]

    if (includeUserData && account) {
      functions.push(
        { functionName: 'getUserTickets', args: [account] as readonly unknown[] },
        { functionName: 'getWinningProbability', args: [account] as readonly unknown[] }
      )
    }

    const results = await batchReadContract('lotteryPot', functions)

    return {
      currentRound: results[0] as bigint,
      timeRemaining: results[1] as bigint,
      ticketPrice: results[2] as bigint,
      roundEnded: results[3] as boolean,
      totalPrize: results[4] as bigint,
      totalTickets: results[5] as bigint,
      userTickets: includeUserData && account ? (results[6] as bigint[]) : [],
      winningProbability: includeUserData && account ? (results[7] as bigint) : BigInt(0),
    }
  }, [batchReadContract, account])

  const getCurrentRound = useCallback(async () => {
    return readContract('lotteryPot', 'currentRound') as Promise<bigint>
  }, [readContract])

  const getTimeRemaining = useCallback(async () => {
    return readContract('lotteryPot', 'getTimeRemaining') as Promise<bigint>
  }, [readContract])

  const getCurrentTicketPrice = useCallback(async () => {
    return readContract('lotteryPot', 'getCurrentTicketPrice') as Promise<bigint>
  }, [readContract])

  const getRoundEnded = useCallback(async () => {
    return readContract('lotteryPot', 'roundEnded') as Promise<boolean>
  }, [readContract])

  const getCurrentLotteryNFT = useCallback(async () => {
    return readContract('lotteryPot', 'currentLotteryNFT') as Promise<string>
  }, [readContract])

  const getUserTickets = useCallback(async () => {
    if (!account) return []
    return readContract('lotteryPot', 'getUserTickets', [account]) as Promise<bigint[]>
  }, [readContract, account])

  const getWinningProbability = useCallback(async () => {
    if (!account) return '0'
    return readContract('lotteryPot', 'getWinningProbability', [account]) as Promise<string>
  }, [readContract, account])

  const getTicketsForSale = useCallback(async () => {
    return readContract('lotteryPot', 'getTicketsForSale') as Promise<unknown[]>
  }, [readContract])

  const getRoundData = useCallback(async (round: bigint) => {
    return readContract('lotteryPot', 'rounds', [round]) as Promise<unknown>
  }, [readContract])

  const buyTicket = useCallback(async () => {
    return writeContract('lotteryPot', 'buyTicket')
  }, [writeContract])

  return {
    contract: contracts.lotteryPot,
    account,
    isReady,
    batchReadLotteryData,
    getCurrentRound,
    getTimeRemaining,
    getCurrentTicketPrice,
    getRoundEnded,
    getCurrentLotteryNFT,
    getUserTickets,
    getWinningProbability,
    getTicketsForSale,
    getRoundData,
    buyTicket,
  }
}

export function usePaymentTokenContract() {
  const { contracts, readContract, batchReadContract, writeContract, account, isReady } = useLoadContracts()

  // Batch read payment token data
  const batchReadPaymentTokenData = useCallback(async (address?: string) => {
    const functions = [
      { functionName: 'totalSupply', args: [] as readonly unknown[] },
    ]

    if (address) {
      functions.push(
        { functionName: 'balanceOf', args: [address] as readonly unknown[] }
      )
    }

    const results = await batchReadContract('paymentToken', functions)

    return {
      totalSupply: results[0] as bigint,
      balance: address ? (results[1] as bigint) : BigInt(0),
    }
  }, [batchReadContract])

  const getBalance = useCallback(async (address: string) => {
    return readContract('paymentToken', 'balanceOf', [address]) as Promise<bigint>
  }, [readContract])

  const getAllowance = useCallback(async (owner: string, spender: string) => {
    return readContract('paymentToken', 'allowance', [owner, spender]) as Promise<bigint>
  }, [readContract])

  const approve = useCallback(async (spender: string, amount: bigint) => {
    return writeContract('paymentToken', 'approve', [spender, amount])
  }, [writeContract])

  return {
    contract: contracts.paymentToken,
    account,
    isReady,
    batchReadPaymentTokenData,
    getBalance,
    getAllowance,
    approve,
  }
}

export function usePballsContract() {
  const { contracts, readContract, batchReadContract, account, isReady } = useLoadContracts()

  // Batch read pBALLS data
  const batchReadPballsData = useCallback(async (address?: string) => {
    const functions = [
      { functionName: 'totalSupply', args: [] as readonly unknown[] },
      { functionName: 'getCurrentMultiplier', args: [] as readonly unknown[] },
    ]

    if (address) {
      functions.push(
        { functionName: 'balanceOf', args: [address] as readonly unknown[] },
        { functionName: 'getUserStats', args: [address] as readonly unknown[] }
      )
    }

    const results = await batchReadContract('pballsToken', functions)

    return {
      totalSupply: results[0] as bigint,
      currentMultiplier: results[1] as bigint,
      balance: address ? (results[2] as bigint) : BigInt(0),
      userStats: address ? (results[3] as unknown) : null,
    }
  }, [batchReadContract])

  const getBalance = useCallback(async (address: string) => {
    return readContract('pballsToken', 'balanceOf', [address]) as Promise<bigint>
  }, [readContract])

  const getCurrentMultiplier = useCallback(async () => {
    return readContract('pballsToken', 'getCurrentMultiplier') as Promise<bigint>
  }, [readContract])

  const getUserStats = useCallback(async (address: string) => {
    return readContract('pballsToken', 'getUserStats', [address]) as Promise<unknown>
  }, [readContract])

  const totalMinted = useCallback(async () => {
    return readContract('pballsToken', 'totalSupply') as Promise<bigint>
  }, [readContract])

  return {
    contract: contracts.pballsToken,
    account,
    isReady,
    batchReadPballsData,
    getBalance,
    getCurrentMultiplier,
    getUserStats,
    totalMinted,
  }
}

export function useLotteryTicketContract(ticketContractAddress?: string) {
  const { account } = useLoadContracts()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const createTicketContract = useCallback(() => {
    if (!ticketContractAddress || !publicClient) return null
    return getContract({
      address: ticketContractAddress as `0x${string}`,
      abi: CONTRACT_CONFIGS.lotteryPot.abi, // Using lottery pot ABI for ticket contract
      client: {
        public: publicClient,
        wallet: walletClient || undefined,
      },
    })
  }, [ticketContractAddress, publicClient, walletClient])

  const contract = createTicketContract()

  const readTicketContract = useCallback(async (functionName: string, args: readonly unknown[] = []) => {
    if (!contract) throw new Error('Lottery ticket contract not available')

    return throttleRequest(
      `lotteryTicket_${functionName}`,
      () => (contract.read as Record<string, (...args: readonly unknown[]) => Promise<unknown>>)[functionName](args)
    )
  }, [contract])

  const writeTicketContract = useCallback(async (functionName: string, args: readonly unknown[] = []) => {
    if (!contract) throw new Error('Lottery ticket contract not available')
    if (!account) throw new Error('No account connected')
    if (!walletClient) throw new Error('Wallet client not available')

    return walletClient.writeContract({
      address: contract.address,
      abi: contract.abi,
      functionName: functionName as never,
      args: args as never,
      account,
    })
  }, [contract, account, walletClient])

  const ownerOf = useCallback(async (tokenId: bigint) => {
    return readTicketContract('ownerOf', [tokenId]) as Promise<string>
  }, [readTicketContract])

  const getBalanceOf = useCallback(async (address: string) => {
    return readTicketContract('balanceOf', [address]) as Promise<bigint>
  }, [readTicketContract])

  const listTicketForSale = useCallback(async (tokenId: bigint, price: bigint) => {
    return writeTicketContract('listTicketForSale', [tokenId, price])
  }, [writeTicketContract])

  const delistTicket = useCallback(async (tokenId: bigint) => {
    return writeTicketContract('delistTicket', [tokenId])
  }, [writeTicketContract])

  const buyFromMarketplace = useCallback(async (tokenId: bigint) => {
    return writeTicketContract('buyFromMarketplace', [tokenId])
  }, [writeTicketContract])

  return {
    contract,
    account,
    isReady: !!contract && !!account,
    ownerOf,
    getBalanceOf,
    listTicketForSale,
    delistTicket,
    buyFromMarketplace,
  }
}
