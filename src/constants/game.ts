// Game constants - centralized for easy maintenance
export const MAX_BALLS = 5000
export const PERCENTAGE_OPTIONS = ["25%", "50%", "75%", "MAX"] as const

// Helper function for ball count calculation
export const calculateBallCountFromPercentage = (percentage: string): number => {
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

// Game validation helpers
export const validateBallCount = (count: number): number => {
  return Math.min(Math.max(0, count), MAX_BALLS)
}

export const isValidPercentage = (percentage: string): boolean => {
  return PERCENTAGE_OPTIONS.includes(percentage as typeof PERCENTAGE_OPTIONS[number])
} 