import { useCallback } from 'react'
import { MAX_BALLS, calculateBallCountFromPercentage, validateBallCount } from '@/constants/game'

// Base game logic types
export interface BaseGameState {
  percentage: string
  ballCount: number
}

// Common game logic functions
export const useGameLogic = () => {
  const handlePercentageSelect = useCallback((percentage: string) => {
    return {
      percentage,
      ballCount: calculateBallCountFromPercentage(percentage)
    }
  }, [])

  const handleBallCountChange = useCallback((count: number) => {
    return {
      ballCount: validateBallCount(count),
      percentage: '' // Clear percentage when manually entering
    }
  }, [])

  const validateBuyAction = useCallback((ballCount: number) => {
    return ballCount > 0
  }, [])

  return {
    handlePercentageSelect,
    handleBallCountChange,
    validateBuyAction,
    MAX_BALLS
  }
} 