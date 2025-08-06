import type { Contract } from '../../types/contracts'

// Lottery Pot Read Functions
export const getCurrentRound = async (contract: Contract) => {
  return await contract.read.getCurrentRound()
}

export const getCurrentTicketPrice = async (contract: Contract) => {
  return await contract.read.getCurrentTicketPrice()
}

export const getTimeRemaining = async (contract: Contract) => {
  return await contract.read.getTimeRemaining()
}

export const getTotalPrize = async (contract: Contract) => {
  return await contract.read.getTotalPrize()
}

export const getTotalTickets = async (contract: Contract) => {
  return await contract.read.getTotalTickets()
}

export const getTicketsForSale = async (contract: Contract) => {
  return await contract.read.getTicketsForSale()
}

export const getUserTickets = async (contract: Contract, userAddress: string) => {
  return await contract.read.getUserTickets([userAddress as `0x${string}`])
}

export const getWinningProbability = async (contract: Contract, userAddress: string) => {
  return await contract.read.getWinningProbability([userAddress as `0x${string}`])
}

export const isRoundEnded = async (contract: Contract) => {
  return await contract.read.roundEnded()
}

// Payment Token Read Functions
export const getTokenBalance = async (contract: Contract, userAddress: string) => {
  return await contract.read.balanceOf([userAddress as `0x${string}`])
}

export const getTokenAllowance = async (contract: Contract, ownerAddress: string, spenderAddress: string) => {
  return await contract.read.allowance([ownerAddress as `0x${string}`, spenderAddress as `0x${string}`])
}

// PBalls Token Read Functions
export const getPBallsBalance = async (contract: Contract, userAddress: string) => {
  return await contract.read.balanceOf([userAddress as `0x${string}`])
}

export const getCurrentMultiplier = async (contract: Contract) => {
  return await contract.read.getCurrentMultiplier()
}

export const getUserStats = async (contract: Contract, userAddress: string) => {
  return await contract.read.getUserStats([userAddress as `0x${string}`])
} 