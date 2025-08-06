import { useAtom } from 'jotai'
import { contractsAtom } from '../contexts/blockchain-atoms'

export const useContracts = () => {
  const contracts = useAtom(contractsAtom)[0]

  return {
    contracts,
    isLoaded: !!contracts.lotteryPot,
    lotteryPot: contracts.lotteryPot,
    paymentToken: contracts.paymentToken,
    pballsToken: contracts.pballsToken,
  }
} 