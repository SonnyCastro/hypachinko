// Centralized game types to avoid duplication
export interface LotteryData {
  currentRound: string
  totalTickets: string
  totalPrize: string
  timeRemaining: string
  ticketPrice: string
  roundEnded: boolean
}

export interface PballsData {
  balance: string
  multiplier: string
  totalMinted: string
}

export interface MarketplaceListing {
  tokenId: string
  price: string
  owner: string
}

export interface BaseGameState {
  lotteryData: LotteryData | null
  userTickets: bigint[]
  userBalance: string
  marketplaceListings: MarketplaceListing[]
  pballsData: PballsData
  liveTimeRemaining: number
  loading: boolean
  error: string
}

export interface GameActions {
  buyTicket: () => Promise<void>
  listTicketForSale: (tokenId: string, price: string) => Promise<void>
  delistTicket: (tokenId: string) => Promise<void>
  buyFromMarketplace: (tokenId: string) => Promise<void>
  formatTimeRemaining: (seconds: number) => string
  refreshAllData: () => Promise<void>
}

export interface GameState extends BaseGameState, GameActions { }

export interface MachineGameState extends GameState {
  machineId: string
} 