import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { formatUnits, parseUnits } from 'viem'
import {
  LotteryData,
  PballsData,
  MarketplaceListing,
  BaseGameState,
  GameActions
} from '@/types/game'
import { useContractDataCache, useUserDataCache } from './useDataCache'
import {
  useLotteryPotContract,
  usePaymentTokenContract,
  usePballsContract,
  useLotteryTicketContract
} from './useLoadContracts'

export function useSimpleGameState(machineId?: string): BaseGameState & GameActions {
  const lotteryPot = useLotteryPotContract()
  const paymentToken = usePaymentTokenContract()
  const pballs = usePballsContract()
  const contractCache = useContractDataCache()
  const userCache = useUserDataCache()

  const [currentLotteryNFTAddress, setCurrentLotteryNFTAddress] = useState<string | null>(null)
  const lotteryTicket = useLotteryTicketContract(currentLotteryNFTAddress || undefined)

  // Refs to prevent multiple simultaneous fetches
  const isFetchingLottery = useRef(false)
  const isFetchingUser = useRef(false)
  const isFetchingPballs = useRef(false)
  const isFetchingMarketplace = useRef(false)

  // Initialization tracking
  const hasInitializedLottery = useRef(false)
  const hasInitializedUser = useRef(false)
  const hasInitializedMarketplace = useRef(false)

  // State
  const [lotteryData, setLotteryData] = useState<LotteryData | null>(null)
  const [pballsData, setPballsData] = useState<PballsData>({
    balance: '0',
    multiplier: '1',
    totalMinted: '0',
  })
  const [userTickets, setUserTickets] = useState<bigint[]>([])
  const [userBalance, setUserBalance] = useState<string>('0')
  const [marketplaceListings, setMarketplaceListings] = useState<MarketplaceListing[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [liveTimeRemaining, setLiveTimeRemaining] = useState<number>(0)

  // Memoize stable references to prevent unnecessary re-renders
  const stableMachineId = useMemo(() => machineId || 'default', [machineId])
  const stableAccount = useMemo(() => lotteryPot.account, [lotteryPot.account])
  const stablePballsAccount = useMemo(() => pballs.account, [pballs.account])

  // Memoize contract functions to prevent recreation
  const stableLotteryPot = useMemo(() => ({
    getCurrentRound: lotteryPot.getCurrentRound,
    getTimeRemaining: lotteryPot.getTimeRemaining,
    getCurrentTicketPrice: lotteryPot.getCurrentTicketPrice,
    getRoundEnded: lotteryPot.getRoundEnded,
    getUserTickets: lotteryPot.getUserTickets,
    getTicketsForSale: lotteryPot.getTicketsForSale,
    getRoundData: lotteryPot.getRoundData,
    contract: lotteryPot.contract,
  }), [lotteryPot])

  const stablePaymentToken = useMemo(() => ({
    getBalance: paymentToken.getBalance,
  }), [paymentToken])

  const stablePballs = useMemo(() => ({
    getBalance: pballs.getBalance,
    getUserStats: pballs.getUserStats,
    getCurrentMultiplier: pballs.getCurrentMultiplier,
    totalMinted: pballs.totalMinted,
  }), [pballs])

  // Single global multicall function to batch ALL contract reads
  const fetchAllData = useCallback(async () => {
    if (isFetchingLottery.current || isFetchingUser.current || isFetchingPballs.current || isFetchingMarketplace.current) return

    isFetchingLottery.current = true
    isFetchingUser.current = true
    isFetchingPballs.current = true
    isFetchingMarketplace.current = true

    try {
      // Single multicall request for ALL data
      const [
        // Lottery data
        currentRound,
        timeRemaining,
        ticketPrice,
        roundEnded,
        // User data (if connected)
        userTickets,
        userBalance,
        userPballsBalance,
        userStats,
        // pBALLS data
        pballsBalance,
        currentMultiplier,
        totalMinted,
        // Marketplace data
        ticketsForSale,
        // Round data (if round exists)
        roundData,
      ] = await Promise.all([
        // Lottery pot reads
        stableLotteryPot.getCurrentRound(),
        stableLotteryPot.getTimeRemaining(),
        stableLotteryPot.getCurrentTicketPrice(),
        stableLotteryPot.getRoundEnded(),
        // User-specific reads (if connected)
        stableAccount ? stableLotteryPot.getUserTickets() : Promise.resolve([]),
        stableAccount ? stablePaymentToken.getBalance(stableAccount) : Promise.resolve(BigInt(0)),
        stableAccount ? stablePballs.getBalance(stableAccount) : Promise.resolve(BigInt(0)),
        stableAccount ? stablePballs.getUserStats(stableAccount) : Promise.resolve(null),
        // pBALLS reads
        stablePballsAccount ? stablePballs.getBalance(stablePballsAccount) : Promise.resolve(BigInt(0)),
        stablePballs.getCurrentMultiplier(),
        stablePballs.totalMinted(),
        // Marketplace reads
        stableLotteryPot.getTicketsForSale().catch(() => ({ tokenIds: [], prices: [] })),
        // Round data (conditional)
        stableLotteryPot.getCurrentRound().then(async (round) => {
          if (round && round > BigInt(0)) {
            try {
              return await stableLotteryPot.getRoundData(round)
            } catch (error) {
              console.warn('Could not fetch round data:', error)
              return null
            }
          }
          return null
        })
      ])

      // Process lottery data
      let totalTickets = BigInt(0)
      let totalPrize = BigInt(0)

      if (roundData && typeof roundData === 'object' && 'totalTickets' in roundData && 'totalPrize' in roundData) {
        const typedRoundData = roundData as { totalTickets: bigint; totalPrize: bigint }
        totalTickets = typedRoundData.totalTickets
        totalPrize = typedRoundData.totalPrize
      }

      const lotteryData: LotteryData = {
        currentRound: currentRound.toString(),
        timeRemaining: timeRemaining.toString(),
        ticketPrice: formatUnits(ticketPrice, 18),
        roundEnded: roundEnded,
        totalTickets: totalTickets.toString(),
        totalPrize: formatUnits(totalPrize, 18),
      }

      // Process pBALLS data
      const pballsData: PballsData = {
        balance: formatUnits(pballsBalance, 18),
        multiplier: currentMultiplier.toString(),
        totalMinted: formatUnits(totalMinted, 18),
      }

      // Process user data
      const userBalanceFormatted = formatUnits(userBalance, 18)
      const userPballsBalanceFormatted = formatUnits(userPballsBalance, 18)

      // Process marketplace data
      const tokenIds = Array.isArray(ticketsForSale) ? ticketsForSale[0] || [] : ticketsForSale.tokenIds || []
      const prices = Array.isArray(ticketsForSale) ? ticketsForSale[1] || [] : ticketsForSale.prices || []

      const marketplaceListings: MarketplaceListing[] = tokenIds.map((tokenId: bigint, i: number) => ({
        tokenId: tokenId.toString(),
        price: formatUnits(BigInt(prices[i] || 0), 18),
        seller: '',
      }))

      // Update all state at once
      setLotteryData(lotteryData)
      setPballsData(pballsData)
      setUserTickets(userTickets)
      setUserBalance(userBalanceFormatted)
      setMarketplaceListings(marketplaceListings)

      // Cache all data
      const lotteryCacheKey = `lottery_data_${stableMachineId}`
      const pballsCacheKey = `pballs_data_${stablePballsAccount}`
      const userCacheKey = `user_data_${stableAccount}`
      const marketplaceCacheKey = `marketplace_data_${stableLotteryPot.contract?.address}`

      contractCache.set(lotteryCacheKey, lotteryData, 10 * 60 * 1000)
      contractCache.set(pballsCacheKey, pballsData, 5 * 60 * 1000)
      userCache.set(userCacheKey, {
        tickets: userTickets,
        balance: userBalanceFormatted,
        pballsBalance: userPballsBalanceFormatted,
        userStats,
      }, 5 * 60 * 1000)
      contractCache.set(marketplaceCacheKey, marketplaceListings, 10 * 60 * 1000)

    } catch (error) {
      console.error('Error fetching all data:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch data')
    } finally {
      isFetchingLottery.current = false
      isFetchingUser.current = false
      isFetchingPballs.current = false
      isFetchingMarketplace.current = false
    }
  }, [
    stableLotteryPot,
    stablePaymentToken,
    stablePballs,
    stableAccount,
    stablePballsAccount,
    stableMachineId,
    contractCache,
    userCache,
  ])

  // Individual fetch functions for backward compatibility (but they use the global fetch)
  const fetchLotteryData = useCallback(async () => {
    await fetchAllData()
  }, [fetchAllData])

  const fetchUserData = useCallback(async () => {
    await fetchAllData()
  }, [fetchAllData])

  const fetchPballsData = useCallback(async () => {
    await fetchAllData()
  }, [fetchAllData])

  const fetchMarketplaceData = useCallback(async () => {
    await fetchAllData()
  }, [fetchAllData])

  // Buy ticket
  const buyTicket = useCallback(async () => {
    if (!stableLotteryPot.contract || !stablePaymentToken) return

    setLoading(true)
    setError('')

    try {
      const ticketPrice = await stableLotteryPot.getCurrentTicketPrice()
      if (!ticketPrice) throw new Error('Could not get ticket price')

      const priceWei = parseUnits(formatUnits(ticketPrice, 18), 18) // 18 decimals

      await paymentToken.approve(stableLotteryPot.contract!.address, priceWei)
      await lotteryPot.buyTicket()

      // Invalidate caches and refetch data
      contractCache.invalidate()
      userCache.invalidate()
      await fetchAllData()
    } catch (error) {
      console.error('Error buying ticket:', error)
      setError(error instanceof Error ? error.message : 'Failed to buy ticket')
    } finally {
      setLoading(false)
    }
  }, [stableLotteryPot, stablePaymentToken, paymentToken, lotteryPot, fetchAllData, contractCache, userCache])

  // List ticket for sale
  const listTicketForSale = useCallback(async (tokenId: string, price: string) => {
    if (!lotteryTicket.isReady) return

    setLoading(true)
    setError('')

    try {
      const priceWei = parseUnits(price, 18) // 18 decimals
      await lotteryTicket.listTicketForSale(BigInt(tokenId), priceWei)

      contractCache.invalidate()
      await fetchAllData()
    } catch (error) {
      console.error('Error listing ticket:', error)
      setError(error instanceof Error ? error.message : 'Failed to list ticket')
    } finally {
      setLoading(false)
    }
  }, [lotteryTicket, fetchAllData, contractCache])

  // Delist ticket
  const delistTicket = useCallback(async (tokenId: string) => {
    if (!lotteryTicket.isReady) return

    setLoading(true)
    setError('')

    try {
      await lotteryTicket.delistTicket(BigInt(tokenId))

      contractCache.invalidate()
      await fetchAllData()
    } catch (error) {
      console.error('Error delisting ticket:', error)
      setError(error instanceof Error ? error.message : 'Failed to delist ticket')
    } finally {
      setLoading(false)
    }
  }, [lotteryTicket, fetchAllData, contractCache])

  // Buy from marketplace
  const buyFromMarketplace = useCallback(async (tokenId: string) => {
    if (!lotteryTicket.isReady) return

    setLoading(true)
    setError('')

    try {
      await lotteryTicket.buyFromMarketplace(BigInt(tokenId))

      contractCache.invalidate()
      userCache.invalidate()
      await fetchAllData()
    } catch (error) {
      console.error('Error buying from marketplace:', error)
      setError(error instanceof Error ? error.message : 'Failed to buy from marketplace')
    } finally {
      setLoading(false)
    }
  }, [lotteryTicket, fetchAllData, contractCache, userCache])

  // Utility functions
  const formatTimeRemaining = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  // Optimized data refresh - single multicall for everything
  const refreshAllData = useCallback(async () => {
    contractCache.invalidate()
    userCache.invalidate()
    await fetchAllData()
  }, [fetchAllData, contractCache, userCache])

  // Live time remaining effect
  useEffect(() => {
    if (!lotteryData?.timeRemaining) return

    const interval = setInterval(() => {
      const remaining = parseInt(lotteryData.timeRemaining) - Math.floor(Date.now() / 1000)
      setLiveTimeRemaining(Math.max(0, remaining))
    }, 1000)

    return () => clearInterval(interval)
  }, [lotteryData?.timeRemaining])

  // Initial data fetch - only once when contract is available
  useEffect(() => {
    if (stableLotteryPot.contract && !hasInitializedLottery.current) {
      hasInitializedLottery.current = true
      fetchAllData()
    }
  }, [stableLotteryPot.contract, fetchAllData])

  // User data fetch - only when wallet connects and hasn't been initialized
  useEffect(() => {
    if (stableAccount && !hasInitializedUser.current) {
      hasInitializedUser.current = true
      fetchAllData()
    }
  }, [stableAccount, fetchAllData])

  // Marketplace data fetch - only once when contract is available
  useEffect(() => {
    if (stableLotteryPot.contract && !hasInitializedMarketplace.current) {
      hasInitializedMarketplace.current = true
      fetchAllData()
    }
  }, [stableLotteryPot.contract, fetchAllData])

  // Reset initialization flags when wallet disconnects
  useEffect(() => {
    if (!stableAccount && hasInitializedUser.current) {
      hasInitializedUser.current = false
      setUserTickets([])
      setUserBalance('0')
      setPballsData({ balance: '0', multiplier: '1', totalMinted: '0' })
    }
  }, [stableAccount])

  return {
    // Data
    lotteryData,
    pballsData,
    userTickets,
    userBalance,
    marketplaceListings,

    // State
    loading,
    error,
    liveTimeRemaining,

    // Actions
    buyTicket,
    listTicketForSale,
    delistTicket,
    buyFromMarketplace,

    // Utilities
    formatTimeRemaining,
    refreshAllData,
  }
} 