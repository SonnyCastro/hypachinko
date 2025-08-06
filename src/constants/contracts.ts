// Contract addresses from your App.js
export const CONTRACT_ADDRESSES = {
  lotteryPot: process.env.NEXT_PUBLIC_LOTTERY_POT_ADDRESS || "0x5CFf2e58ae540Ef173007Bae82440f84bA583f32",
  paymentToken: process.env.NEXT_PUBLIC_PAYMENT_TOKEN_ADDRESS || "0xB8CE59FC3717ada4C02eaDF9682A9e934F625ebb",
  pballsToken: process.env.NEXT_PUBLIC_PBALLS_TOKEN_ADDRESS || "0x0Dcb6f37E26673b5658337898611059126914A08",
} as const

// Contract ABIs from your App.js - Fixed to proper viem format
export const LOTTERY_POT_ABI = [
  {
    inputs: [{ name: "duration", type: "uint256" }],
    name: "startNewRound",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "buyTicket",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "_serverRandomSeed", type: "uint256" }],
    name: "endRoundAndSelectWinners",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "forceEndRound",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentTicketPrice",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTimeRemaining",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "user", type: "address" }],
    name: "getUserTickets",
    outputs: [{ name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "user", type: "address" }],
    name: "getWinningProbability",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTicketsForSale",
    outputs: [
      { name: "tokenIds", type: "uint256[]" },
      { name: "prices", type: "uint256[]" }
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentRound",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentLotteryNFT",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentRound",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalPrize",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalTickets",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "roundEnded",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "", type: "uint256" }],
    name: "rounds",
    outputs: [
      { name: "lotteryNFT", type: "address" },
      { name: "totalTickets", type: "uint256" },
      { name: "totalPrize", type: "uint256" },
      { name: "carryoverReceived", type: "uint256" },
      { name: "isComplete", type: "bool" },
      { name: "startTime", type: "uint256" },
      { name: "endTime", type: "uint256" },
      { name: "duration", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function",
  },
] as const

export const LOTTERY_TICKET_ABI = [
  {
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const

export const PAYMENT_TOKEN_ABI = [
  {
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" }
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const

export const PBALLS_ABI = [
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentMultiplier",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "user", type: "address" }],
    name: "getUserStats",
    outputs: [
      { name: "balance", type: "uint256" },
      { name: "totalMintedAmount", type: "uint256" },
      { name: "lastMintTime", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function",
  },
] as const

// Contract configuration for the context
export const CONTRACT_CONFIGS = {
  lotteryPot: {
    address: CONTRACT_ADDRESSES.lotteryPot as `0x${string}`,
    abi: LOTTERY_POT_ABI,
  },
  paymentToken: {
    address: CONTRACT_ADDRESSES.paymentToken as `0x${string}`,
    abi: PAYMENT_TOKEN_ABI,
  },
  pballsToken: {
    address: CONTRACT_ADDRESSES.pballsToken as `0x${string}`,
    abi: PBALLS_ABI,
  },
} as const 