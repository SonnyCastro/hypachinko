import { MarketplaceItem } from '@/types'
import { ASSETS } from './assets'

// Simple mapping of token names to background images
const TOKEN_BACKGROUND_MAP = {
  'USDT0': ASSETS.images.greenBallsTicket,
  'HYPE': ASSETS.images.purpleBallsTicket,
  'TKN': ASSETS.images.blueBallsTicket,
  'TKN2': ASSETS.images.yellowBallsTicket, // Second TKN token
  'TKN3': ASSETS.images.blueBallsTicket,   // Third TKN token
} as const

// Mock marketplace data - structured for easy replacement with real data
export const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: '1',
    token: 'USDT0',
    ballsCount: '5000',
    price: '$50,000',
    timeLeft: '07:35:24',
    priceChange: {
      percentage: '+10%',
      isPositive: true
    },
    backgroundImage: TOKEN_BACKGROUND_MAP.USDT0,
    tokenIcon: ASSETS.icons.usdt
  },
  {
    id: '2',
    token: 'HYPE',
    ballsCount: '5000',
    price: '$25,000',
    timeLeft: '07:35:24',
    priceChange: {
      percentage: '-10%',
      isPositive: false
    },
    backgroundImage: TOKEN_BACKGROUND_MAP.HYPE,
    tokenIcon: ASSETS.icons.hyperliquidAlt
  },
  {
    id: '3',
    token: 'USDT0',
    ballsCount: '5000',
    price: '$5,000',
    timeLeft: '07:35:24',
    priceChange: {
      percentage: '+10%',
      isPositive: true
    },
    backgroundImage: TOKEN_BACKGROUND_MAP.USDT0,
    tokenIcon: ASSETS.icons.usdt
  },
  {
    id: '4',
    token: 'TKN',
    ballsCount: '5000',
    price: '$50,000',
    timeLeft: '07:35:24',
    priceChange: {
      percentage: '+10%',
      isPositive: true
    },
    backgroundImage: TOKEN_BACKGROUND_MAP.TKN,
    tokenIcon: ASSETS.icons.pokerChipBlue
  },
  {
    id: '5',
    token: 'TKN2',
    ballsCount: '5000',
    price: '$50,000',
    timeLeft: '07:35:24',
    priceChange: {
      percentage: '+10%',
      isPositive: true
    },
    backgroundImage: TOKEN_BACKGROUND_MAP.TKN2,
    tokenIcon: ASSETS.icons.pokerChipBlue
  },
  {
    id: '6',
    token: 'TKN3',
    ballsCount: '5000',
    price: '$50,000',
    timeLeft: '07:35:24',
    priceChange: {
      percentage: '+10%',
      isPositive: true
    },
    backgroundImage: TOKEN_BACKGROUND_MAP.TKN3,
    tokenIcon: ASSETS.icons.pokerChipBlue
  },
  {
    id: '7',
    token: 'HYPE',
    ballsCount: '5000',
    price: '$25,000',
    timeLeft: '07:35:24',
    priceChange: {
      percentage: '-10%',
      isPositive: false
    },
    backgroundImage: TOKEN_BACKGROUND_MAP.HYPE,
    tokenIcon: ASSETS.icons.hyperliquidAlt
  },
  {
    id: '8',
    token: 'USDT0',
    ballsCount: '5000',
    price: '$50,000',
    timeLeft: '07:35:24',
    priceChange: {
      percentage: '+10%',
      isPositive: true
    },
    backgroundImage: TOKEN_BACKGROUND_MAP.USDT0,
    tokenIcon: ASSETS.icons.usdt
  },
  {
    id: '9',
    token: 'USDT0',
    ballsCount: '5000',
    price: '$5,000',
    timeLeft: '07:35:24',
    priceChange: {
      percentage: '+10%',
      isPositive: true
    },
    backgroundImage: TOKEN_BACKGROUND_MAP.USDT0,
    tokenIcon: ASSETS.icons.usdt
  },
  {
    id: '10',
    token: 'USDT0',
    ballsCount: '5000',
    price: '$50,000',
    timeLeft: '07:35:24',
    priceChange: {
      percentage: '+10%',
      isPositive: true
    },
    backgroundImage: TOKEN_BACKGROUND_MAP.USDT0,
    tokenIcon: ASSETS.icons.usdt
  }
]

export const TOKEN_FILTERS = [
  { id: 'all', name: 'ALL', icon: null },
  { id: 'usdt0', name: 'USDT0', icon: ASSETS.icons.usdt },
  { id: 'hype', name: 'HYPE', icon: ASSETS.icons.hyperliquidAlt },
  { id: 'tkn', name: 'TKN', icon: ASSETS.icons.pokerChipBlue }
]

export const SORT_OPTIONS = [
  { id: 'price', label: 'Price' },
  { id: 'timeLeft', label: 'Time Left' }
] 