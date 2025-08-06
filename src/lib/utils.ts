import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Lottery game utilities
export function formatTimeRemaining(seconds: number): string {
  if (seconds <= 0) return "00:00:00"

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function formatCurrency(amount: string | number, decimals: number = 2): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

export function formatNumber(num: string | number, decimals: number = 0): string {
  const number = typeof num === 'string' ? parseFloat(num) : num
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number)
}

export function shortenAddress(address: string, chars: number = 4): string {
  if (!address) return ''
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

export function calculateProbability(probability: string): number {
  const prob = parseFloat(probability)
  return prob / 100 // Convert from basis points to percentage
}

export function isRoundActive(timeRemaining: string | number): boolean {
  const time = typeof timeRemaining === 'string' ? parseInt(timeRemaining) : timeRemaining
  return time > 0
}

export function canBuyTicket(
  timeRemaining: string | number,
  roundEnded: boolean,
  userBalance: string,
  ticketPrice: string
): boolean {
  const time = typeof timeRemaining === 'string' ? parseInt(timeRemaining) : timeRemaining
  const balance = parseFloat(userBalance)
  const price = parseFloat(ticketPrice)

  return time > 0 && !roundEnded && balance >= price
}

export function getProbabilityColor(probability: number): string {
  if (probability >= 10) return 'text-green-500'
  if (probability >= 5) return 'text-yellow-500'
  if (probability >= 1) return 'text-orange-500'
  return 'text-red-500'
}

export function getProbabilityBarWidth(probability: number): string {
  // Cap at 100% for display purposes
  const capped = Math.min(probability, 100)
  return `${capped}%`
}

/**
 * Truncates a wallet address to show first 6 and last 4 characters
 * @param address - The full wallet address
 * @param startLength - Number of characters to show at the start (default: 6)
 * @param endLength - Number of characters to show at the end (default: 4)
 * @returns Truncated address string
 */
export function truncateAddress(
  address: string,
  startLength: number = 6,
  endLength: number = 4
): string {
  if (!address || address.length < startLength + endLength) {
    return address
  }

  const start = address.slice(0, startLength)
  const end = address.slice(-endLength)
  return `${start}...${end}`
}

/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Converts a string to title case
 * @param str - The string to convert
 * @returns Title case string
 */
export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
}

/**
 * Debounces a function call
 * @param func - The function to debounce
 * @param wait - The delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttles a function call
 * @param func - The function to throttle
 * @param limit - The time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Generates a random string of specified length
 * @param length - The length of the string to generate
 * @returns Random string
 */
export function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Checks if a value is a valid email address
 * @param email - The email to validate
 * @returns Boolean indicating if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Sleeps for a specified number of milliseconds
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after the delay
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
