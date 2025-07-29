import { useReducer, useCallback } from 'react'
import { useGameLogic } from './useGameLogic'

// Game state types
interface GameState {
  selectedPercentage: string
  ballCount: number
  selectedToken: string
}

type GameAction =
  | { type: 'SET_PERCENTAGE'; payload: string }
  | { type: 'SET_BALL_COUNT'; payload: number }
  | { type: 'SET_TOKEN'; payload: string }
  | { type: 'CLEAR_PERCENTAGE' }

// Game state reducer
const gameReducer = (state: GameState, action: GameAction): GameState => {
  const gameLogic = useGameLogic()

  switch (action.type) {
    case 'SET_PERCENTAGE':
      const percentageResult = gameLogic.handlePercentageSelect(action.payload)
      return {
        ...state,
        selectedPercentage: percentageResult.percentage,
        ballCount: percentageResult.ballCount
      }
    case 'SET_BALL_COUNT':
      const ballCountResult = gameLogic.handleBallCountChange(action.payload)
      return {
        ...state,
        ballCount: ballCountResult.ballCount,
        selectedPercentage: ballCountResult.percentage
      }
    case 'SET_TOKEN':
      return {
        ...state,
        selectedToken: action.payload
      }
    case 'CLEAR_PERCENTAGE':
      return {
        ...state,
        selectedPercentage: ''
      }
    default:
      return state
  }
}

// Custom hook for game state management
export const useGameState = (initialState?: Partial<GameState>) => {
  const [gameState, dispatch] = useReducer(gameReducer, {
    selectedPercentage: "",
    ballCount: 0,
    selectedToken: "usdt0",
    ...initialState
  })

  // Memoized action creators
  const setPercentage = useCallback((percentage: string) => {
    dispatch({ type: 'SET_PERCENTAGE', payload: percentage })
  }, [])

  const setBallCount = useCallback((count: number) => {
    dispatch({ type: 'SET_BALL_COUNT', payload: count })
  }, [])

  const setToken = useCallback((tokenId: string) => {
    dispatch({ type: 'SET_TOKEN', payload: tokenId })
  }, [])

  const clearPercentage = useCallback(() => {
    dispatch({ type: 'CLEAR_PERCENTAGE' })
  }, [])

  const buyBalls = useCallback(() => {
    if (gameState.ballCount > 0) {
      console.log(`Buying ${gameState.ballCount} balls with ${gameState.selectedToken}`)
      // Here you would integrate with your game logic
      // e.g., call API, update wallet, etc.
    }
  }, [gameState.ballCount, gameState.selectedToken])

  const gameLogic = useGameLogic()

  return {
    // State
    ...gameState,
    // Actions
    setPercentage,
    setBallCount,
    setToken,
    clearPercentage,
    buyBalls,
    // Constants
    MAX_BALLS: gameLogic.MAX_BALLS
  }
} 