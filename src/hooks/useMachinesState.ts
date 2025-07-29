import { useState, useCallback } from 'react'
import { useGameLogic } from './useGameLogic'

// Machine state types
interface MachineState {
  percentage: string
  ballCount: number
}

interface MachinesState {
  [machineId: string]: MachineState
}

// Custom hook for managing multiple machines
export const useMachinesState = (machineIds: string[]) => {
  const { handlePercentageSelect, handleBallCountChange, MAX_BALLS } = useGameLogic()

  // Initialize all machines with default state
  const initialStates: MachinesState = machineIds.reduce((acc, id) => {
    acc[id] = { percentage: "", ballCount: 0 }
    return acc
  }, {} as MachinesState)

  const [machineStates, setMachineStates] = useState<MachinesState>(initialStates)

  // Handlers for individual machines
  const handleMachinePercentageSelect = useCallback((machineId: string, percentage: string) => {
    const result = handlePercentageSelect(percentage)
    setMachineStates(prev => ({
      ...prev,
      [machineId]: result
    }))
  }, [handlePercentageSelect])

  const handleMachineBallCountChange = useCallback((machineId: string, count: number) => {
    const result = handleBallCountChange(count)
    setMachineStates(prev => ({
      ...prev,
      [machineId]: result
    }))
  }, [handleBallCountChange])

  const handleMachineBuyBalls = useCallback((machineId: string) => {
    const machineState = machineStates[machineId]
    if (machineState.ballCount > 0) {
      console.log(`Buying ${machineState.ballCount} balls for ${machineId} at ${machineState.percentage}`)
      // Add your buy logic here
    }
  }, [machineStates])

  // Reset all machines
  const resetAllMachines = useCallback(() => {
    setMachineStates(initialStates)
  }, [])

  // Get total balls across all machines
  const getTotalBalls = useCallback(() => {
    return Object.values(machineStates).reduce((total, state) => total + state.ballCount, 0)
  }, [machineStates])

  return {
    machineStates,
    handleMachinePercentageSelect,
    handleMachineBallCountChange,
    handleMachineBuyBalls,
    resetAllMachines,
    getTotalBalls,
    MAX_BALLS: MAX_BALLS
  }
} 