import { useReducer, useCallback } from 'react'

// Game constants
const MAX_BALLS = 5000

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

// Helper function for ball count calculation
const calculateBallCountFromPercentage = (percentage: string): number => {
  switch (percentage) {
    case "25%":
      return Math.floor(MAX_BALLS * 0.25)
    case "50%":
      return Math.floor(MAX_BALLS * 0.5)
    case "75%":
      return Math.floor(MAX_BALLS * 0.75)
    case "MAX":
      return MAX_BALLS
    default:
      return 0
  }
}

// Game state reducer
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_PERCENTAGE':
      return {
        ...state,
        selectedPercentage: action.payload,
        ballCount: calculateBallCountFromPercentage(action.payload)
      }
    case 'SET_BALL_COUNT':
      return {
        ...state,
        ballCount: Math.min(Math.max(0, action.payload), MAX_BALLS),
        selectedPercentage: '' // Clear percentage when manually entering
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
    MAX_BALLS
  }
} 