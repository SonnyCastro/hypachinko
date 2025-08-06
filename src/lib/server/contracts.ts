import { createPublicClient, http } from 'viem'
import { CONTRACT_CONFIGS } from '@/constants/contracts'
import { HyperEVM, HyperEVMTestnet } from '@/config/networks'
import { getCachedData, setCachedData, CACHE_KEYS } from './cache'

// Determine which chain to use based on environment
const isTestnet = process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
const selectedChain = isTestnet ? HyperEVMTestnet : HyperEVM

// Create a server-side public client
const publicClient = createPublicClient({
  chain: selectedChain,
  transport: http(),
})

// Server-side contract data fetching
export async function getServerContractData() {
  try {
    // Check if contract address is valid
    if (!CONTRACT_CONFIGS.lotteryPot.address || CONTRACT_CONFIGS.lotteryPot.address === '0x0000000000000000000000000000000000000000') {
      throw new Error('Invalid contract address')
    }



    // Fetch lottery data - using the correct function names from ABI
    const currentRound = await publicClient.readContract({
      address: CONTRACT_CONFIGS.lotteryPot.address,
      abi: CONTRACT_CONFIGS.lotteryPot.abi,
      functionName: 'currentRound',
    }) as bigint

    const timeRemaining = await publicClient.readContract({
      address: CONTRACT_CONFIGS.lotteryPot.address,
      abi: CONTRACT_CONFIGS.lotteryPot.abi,
      functionName: 'getTimeRemaining',
    }) as bigint

    const ticketPrice = await publicClient.readContract({
      address: CONTRACT_CONFIGS.lotteryPot.address,
      abi: CONTRACT_CONFIGS.lotteryPot.abi,
      functionName: 'getCurrentTicketPrice',
    }) as bigint

    const roundEnded = await publicClient.readContract({
      address: CONTRACT_CONFIGS.lotteryPot.address,
      abi: CONTRACT_CONFIGS.lotteryPot.abi,
      functionName: 'roundEnded',
    }) as boolean

    // Get round data if round exists
    let totalTickets = BigInt(0)
    let totalPrize = BigInt(0)

    if (currentRound && currentRound > BigInt(0)) {
      try {
        const roundData = await publicClient.readContract({
          address: CONTRACT_CONFIGS.lotteryPot.address,
          abi: CONTRACT_CONFIGS.lotteryPot.abi,
          functionName: 'rounds',
          args: [currentRound],
        }) as any

        if (roundData) {
          totalTickets = roundData[1] || BigInt(0) // totalTickets is at index 1
          totalPrize = roundData[2] || BigInt(0)   // totalPrize is at index 2
        }
      } catch (error) {
        console.warn('Could not fetch round data:', error)
      }
    }

    return {
      lotteryData: {
        currentRound: currentRound.toString(),
        totalTickets: totalTickets.toString(),
        totalPrize: totalPrize.toString(),
        timeRemaining: timeRemaining.toString(),
        ticketPrice: ticketPrice.toString(),
        roundEnded: roundEnded,
      },
      error: null,
    }
  } catch (error) {
    console.error('Server contract data fetch error:', error)

    // Provide more detailed error information
    let errorMessage = 'Failed to fetch contract data'
    if (error instanceof Error) {
      errorMessage = error.message
    }

    // Return fallback data with detailed error information
    return {
      lotteryData: {
        currentRound: '0',
        totalTickets: '0',
        totalPrize: '0',
        timeRemaining: '0',
        ticketPrice: '0',
        roundEnded: false,
      },
      error: errorMessage,
      network: selectedChain.name,
      contractAddress: CONTRACT_CONFIGS.lotteryPot.address,
    }
  }
}

// Fetch data for multiple machines
export async function getServerMachinesData(machineIds: string[]) {
  const machinesData: Record<string, any> = {}

  for (const machineId of machineIds) {
    try {
      // For now, we'll use the same contract for all machines
      // In a real implementation, each machine would have its own contract
      const data = await getServerContractData()
      machinesData[machineId] = data
    } catch (error) {
      console.error(`Failed to fetch data for machine ${machineId}:`, error)
      machinesData[machineId] = {
        lotteryData: {
          currentRound: '0',
          totalTickets: '0',
          totalPrize: '0',
          timeRemaining: '0',
          ticketPrice: '0',
          roundEnded: false,
        },
        error: `Failed to fetch data for machine ${machineId}`,
      }
    }
  }

  return machinesData
}



// Fetch aggregated data across all machines
export async function getServerAggregatedData(machineIds: string[]): Promise<{
  totalTickets: number
  totalBalance: string
  totalPballs: string
  machinesData: Record<string, any>
  error: string | null
}> {
  try {
    // Check cache first
    const cacheKey = CACHE_KEYS.AGGREGATED_DATA(machineIds)
    const cached = getCachedData<{
      totalTickets: number
      totalBalance: string
      totalPballs: string
      machinesData: Record<string, any>
      error: string | null
    }>(cacheKey)
    if (cached) {
      return cached
    }

    const machinesData = await getServerMachinesData(machineIds)

    let totalTickets = 0
    let totalBalance = '0'
    let totalPballs = '0'

    Object.values(machinesData).forEach((data) => {
      if (data.lotteryData) {
        totalTickets += parseInt(data.lotteryData.totalTickets || '0')
        // Note: Balance and pBALLS would need user-specific data
        // which requires wallet connection and can't be fetched server-side
      }
    })

    const result = {
      totalTickets,
      totalBalance,
      totalPballs,
      machinesData,
      error: null,
    }

    // Cache the result for 2 minutes to reduce RPC calls
    setCachedData(cacheKey, result, 120000)

    return result
  } catch (error) {
    console.error('Error in getServerAggregatedData:', error)
    return {
      totalTickets: 0,
      totalBalance: '0',
      totalPballs: '0',
      machinesData: {},
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
} 