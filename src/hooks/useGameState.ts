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
  switch (action.type) {
    case 'SET_PERCENTAGE':
      return {
        ...state,
        selectedPercentage: action.payload,
        ballCount: 0 // Will be calculated in the hook
      }
    case 'SET_BALL_COUNT':
      return {
        ...state,
        ballCount: action.payload,
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

  const gameLogic = useGameLogic()

  // Memoized action creators
  const setPercentage = useCallback((percentage: string) => {
    const result = gameLogic.handlePercentageSelect(percentage)
    dispatch({ type: 'SET_PERCENTAGE', payload: result.percentage })
    // Update ball count separately
    dispatch({ type: 'SET_BALL_COUNT', payload: result.ballCount })
  }, [gameLogic])

  const setBallCount = useCallback((count: number) => {
    const result = gameLogic.handleBallCountChange(count)
    dispatch({ type: 'SET_BALL_COUNT', payload: result.ballCount })
    // Update percentage separately
    dispatch({ type: 'SET_PERCENTAGE', payload: result.percentage })
  }, [gameLogic])

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
    MAX_BALLS: gameLogic.MAX_BALLS
  }
} 