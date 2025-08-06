import { useSimpleGameState } from './useSimpleGameState'
import { MachineGameState } from '@/types/game'

export function useMachineGameState(machineId: string): MachineGameState {
  const baseGameState = useSimpleGameState(machineId)

  return {
    ...baseGameState,
    machineId,
  }
} 