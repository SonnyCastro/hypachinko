import { type Address } from 'viem'

export type Contract = {
  address: Address
  abi: readonly any[]
  read: {
    [key: string]: (...args: any[]) => Promise<any>
  }
  write?: {
    [key: string]: (...args: any[]) => Promise<any>
  }
  estimateGas?: {
    [key: string]: (...args: any[]) => Promise<any>
  }
  simulate?: {
    [key: string]: (...args: any[]) => Promise<any>
  }
}

export type ContractsType = {
  lotteryPot?: Contract
  paymentToken?: Contract
  pballsToken?: Contract
}

export type ContractInfoType = {
  address: Address
  abi: readonly any[]
}

export type ContractsInfoType = {
  lotteryPot: ContractInfoType
  paymentToken: ContractInfoType
  pballsToken: ContractInfoType
} 