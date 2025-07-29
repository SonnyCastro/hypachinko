import { ASSETS } from "./assets"

export interface TokenData {
  id: string
  name: string
  icon: string
  jackpotAmount: string
  startTime: Date
  rate: string
  price: string
  availableAmount: string
  lightStripColor: string
}

export const TOKEN_DATA: Record<string, TokenData> = {
  usdt0: {
    id: "usdt0",
    name: "USDT0",
    icon: ASSETS.icons.usdt,
    jackpotAmount: "$50,000",
    startTime: new Date(Date.now() + 7 * 60 * 60 * 1000 + 35 * 60 * 1000 + 24 * 1000), // 7:35:24 from now
    rate: "1 USDT0 = 1 BALL",
    price: "$0.99",
    availableAmount: "50,000 USDT available",
    lightStripColor: "#00B988", // Green for USDT0
  },
  hype: {
    id: "hype",
    name: "HYPE",
    icon: ASSETS.icons.hyperliquidAlt,
    jackpotAmount: "$75,000",
    startTime: new Date(Date.now() + 22 * 60 * 60 * 1000 + 32 * 60 * 1000), // 22:32:00 from now
    rate: "1 HYPE = 2 BALLS",
    price: "$47.82",
    availableAmount: "25,000 HYPE available",
    lightStripColor: "#F585FF", // Purple/Pink for HYPE (from your image)
  },
  tkn1: {
    id: "tkn1",
    name: "TKN",
    icon: ASSETS.icons.pokerChipBlue,
    jackpotAmount: "$30,000",
    startTime: new Date(Date.now() + 1 * 60 * 60 * 1000 + 35 * 60 * 1000 + 15 * 1000), // 1:35:15 from now
    rate: "1 TKN = 1 BALLS",
    price: "$16.99",
    availableAmount: "30,000 TKN available",
    lightStripColor: "#b5f1ff", // Blue for TKN1 (from Figma design)
  },
  tkn2: {
    id: "tkn2",
    name: "TKN",
    icon: ASSETS.icons.pokerChipBlue,
    jackpotAmount: "$25,000",
    startTime: new Date(Date.now() + 35 * 60 * 1000), // 0:35:00 from now
    rate: "1 TKN = 1 BALL",
    price: "$2.99",
    availableAmount: "40,000 TKN available",
    lightStripColor: "#FFD700", // Yellow/Gold for TKN2 (from your image)
  },
}

export const getTokenData = (tokenId: string): TokenData | null => {
  return TOKEN_DATA[tokenId] || null
} 