import { type Address } from 'viem'

export type Contract = {
  address: Address
  abi: readonly unknown[]
  read: {
    [key: string]: (...args: readonly unknown[]) => Promise<unknown>
  }
  write?: {
    [key: string]: (...args: readonly unknown[]) => Promise<unknown>
  }
  estimateGas?: {
    [key: string]: (...args: readonly unknown[]) => Promise<unknown>
  }
  simulate?: {
    [key: string]: (...args: readonly unknown[]) => Promise<unknown>
  }
}

export type ContractsType = {
  lotteryPot?: Contract
  paymentToken?: Contract
  pballsToken?: Contract
}

export type ContractInfoType = {
  address: Address
  abi: readonly unknown[]
}

export type ContractsInfoType = {
  lotteryPot: ContractInfoType
  paymentToken: ContractInfoType
  pballsToken: ContractInfoType
} 