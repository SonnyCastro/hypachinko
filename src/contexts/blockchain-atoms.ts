import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import type { ContractsType, ContractsInfoType } from '../types/contracts'

// Store contract information (addresses and ABIs)
const contractsInfoStorage = atomWithStorage<ContractsInfoType | null>('contractsInfo', null)

// Store the actual contract instances
const contractsAtom = atom<ContractsType>({})

export {
  contractsInfoStorage,
  contractsAtom
} 