// Centralized machine configuration
export const MACHINE_IDS = ["usdt0", "hype", "tkn1", "tkn2"] as const

export type MachineId = typeof MACHINE_IDS[number]

// Machine configuration for easy extension
export interface MachineConfig {
  id: MachineId
  name: string
  displayName: string
  enabled: boolean
  priority: number // For ordering
}

export const MACHINE_CONFIGS: Record<MachineId, MachineConfig> = {
  usdt0: {
    id: "usdt0",
    name: "USDT0",
    displayName: "USDT0 Machine",
    enabled: true,
    priority: 1,
  },
  hype: {
    id: "hype",
    name: "HYPE",
    displayName: "HYPE Machine",
    enabled: true,
    priority: 2,
  },
  tkn1: {
    id: "tkn1",
    name: "TKN",
    displayName: "TKN Machine",
    enabled: true,
    priority: 3,
  },
  tkn2: {
    id: "tkn2",
    name: "TKN",
    displayName: "TKN Machine",
    enabled: true,
    priority: 4,
  },
}

// Helper functions
export const getEnabledMachines = (): MachineId[] => {
  return MACHINE_IDS.filter(id => MACHINE_CONFIGS[id].enabled)
}

export const getMachineConfig = (id: MachineId): MachineConfig => {
  return MACHINE_CONFIGS[id]
}

export const getSortedMachineIds = (): MachineId[] => {
  return getEnabledMachines().sort((a, b) =>
    MACHINE_CONFIGS[a].priority - MACHINE_CONFIGS[b].priority
  )
} 