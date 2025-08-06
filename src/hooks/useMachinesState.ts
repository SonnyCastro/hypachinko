import { useState, useCallback, useMemo } from 'react'
import { useGameLogic } from './useGameLogic'
import { useSimpleGameState } from './useSimpleGameState'
import { MachineId } from '@/constants/machines'
import { MachineGameState } from '@/types/game'

// Machine state types
interface MachineState {
  percentage: string
  ballCount: number
}

interface MachinesState {
  [machineId: string]: MachineState
}

// Optimized hook for managing multiple machines using shared game state
export const useMachinesState = (machineIds: MachineId[]) => {
  const { handlePercentageSelect, handleBallCountChange, MAX_BALLS } = useGameLogic()

  // Initialize all machines with default state
  const initialStates: MachinesState = useMemo(() =>
    machineIds.reduce((acc, id) => {
      acc[id] = { percentage: "", ballCount: 0 }
      return acc
    }, {} as MachinesState), [machineIds])

  const [machineStates, setMachineStates] = useState<MachinesState>(initialStates)

  // Use a single shared game state for all machines (since they all use the same contracts)
  // This leverages the global multicall in useSimpleGameState
  const sharedGameState = useSimpleGameState()

  // Handlers for individual machines
  const handleMachinePercentageSelect = useCallback((machineId: MachineId, percentage: string) => {
    const result = handlePercentageSelect(percentage)
    setMachineStates(prev => ({
      ...prev,
      [machineId]: result
    }))
  }, [handlePercentageSelect])

  const handleMachineBallCountChange = useCallback((machineId: MachineId, count: number) => {
    const result = handleBallCountChange(count)
    setMachineStates(prev => ({
      ...prev,
      [machineId]: result
    }))
  }, [handleBallCountChange])

  const handleMachineBuyBalls = useCallback(async (machineId: MachineId) => {
    const machineState = machineStates[machineId]

    if (machineState.ballCount > 0) {
      try {
        console.log(`Buying ${machineState.ballCount} balls for ${machineId} at ${machineState.percentage}`)
        await sharedGameState.buyTicket()
        // The shared game state will automatically refresh all data
      } catch (error) {
        console.error(`Error buying balls for machine ${machineId}:`, error)
      }
    }
  }, [machineStates, sharedGameState])

  // Reset all machines
  const resetAllMachines = useCallback(() => {
    setMachineStates(initialStates)
  }, [initialStates])

  // Get total balls across all machines
  const getTotalBalls = useCallback(() => {
    return Object.values(machineStates).reduce((total, state) => total + state.ballCount, 0)
  }, [machineStates])

  // Get aggregated data across all machines using shared game state
  const getAggregatedData = useCallback(() => {
    const totalTickets = sharedGameState.userTickets?.length || 0
    const totalBalance = parseFloat(sharedGameState.userBalance || '0')
    const totalPballs = parseFloat(sharedGameState.pballsData?.balance || '0')

    return {
      totalTickets,
      totalBalance: totalBalance.toFixed(2),
      totalPballs: totalPballs.toFixed(2)
    }
  }, [sharedGameState])

  // Create machine-specific game state objects that use shared data
  const machineGameStates = useMemo(() => {
    return machineIds.reduce((acc, id) => {
      acc[id] = {
        ...sharedGameState,
        machineId: id,
        // Each machine gets the same shared data but with its own machineId
        lotteryData: sharedGameState.lotteryData,
        pballsData: sharedGameState.pballsData,
        userTickets: sharedGameState.userTickets,
        userBalance: sharedGameState.userBalance,
        marketplaceListings: sharedGameState.marketplaceListings,
        loading: sharedGameState.loading,
        error: sharedGameState.error,
        liveTimeRemaining: sharedGameState.liveTimeRemaining,
        buyTicket: sharedGameState.buyTicket,
        listTicketForSale: sharedGameState.listTicketForSale,
        delistTicket: sharedGameState.delistTicket,
        buyFromMarketplace: sharedGameState.buyFromMarketplace,
        formatTimeRemaining: sharedGameState.formatTimeRemaining,
        refreshAllData: sharedGameState.refreshAllData,
      }
      return acc
    }, {} as { [machineId: string]: MachineGameState })
  }, [machineIds, sharedGameState])

  return {
    // Machine state management
    machineStates,
    handleMachinePercentageSelect,
    handleMachineBallCountChange,
    handleMachineBuyBalls,
    resetAllMachines,
    getTotalBalls,
    MAX_BALLS: MAX_BALLS,

    // Optimized machine game states (shared data)
    machineGameStates,
    getAggregatedData,

    // Loading state from shared game state
    isLoadingMachines: sharedGameState.loading,

    // Refresh function from shared game state
    refreshMachinesData: sharedGameState.refreshAllData,
  }
} 