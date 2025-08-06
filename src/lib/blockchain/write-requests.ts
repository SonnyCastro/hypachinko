import type { Contract } from '../../types/contracts'

// Lottery Pot Write Functions
export const buyTicket = async (contract: Contract) => {
  return await contract.write.buyTicket()
}

export const startNewRound = async (contract: Contract, duration: bigint) => {
  return await contract.write.startNewRound([duration])
}

export const endRoundAndSelectWinners = async (contract: Contract, serverRandomSeed: bigint) => {
  return await contract.write.endRoundAndSelectWinners([serverRandomSeed])
}

export const forceEndRound = async (contract: Contract) => {
  return await contract.write.forceEndRound()
}

// Payment Token Write Functions
export const approveToken = async (contract: Contract, spenderAddress: string, amount: bigint) => {
  return await contract.write.approve([spenderAddress as `0x${string}`, amount])
}

export const transferToken = async (contract: Contract, toAddress: string, amount: bigint) => {
  return await contract.write.transfer([toAddress as `0x${string}`, amount])
} 