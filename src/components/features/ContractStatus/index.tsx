"use client"

import React from "react"
import { useLoadContracts } from "@/hooks/useLoadContracts"
import { useGameState } from "@/hooks/useGameState"

export function ContractStatus() {
  const { contracts, isLoading, error, isReady } = useLoadContracts()
  const gameState = useGameState()

  if (isLoading) {
    return (
      <div className='p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg'>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 bg-yellow-500 rounded-full animate-pulse'></div>
          <span className='text-yellow-500 text-sm'>Loading contracts...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='p-4 bg-red-500/10 border border-red-500/20 rounded-lg'>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 bg-red-500 rounded-full'></div>
          <span className='text-red-500 text-sm'>
            Error loading contracts: {error}
          </span>
        </div>
      </div>
    )
  }

  if (!isReady) {
    return (
      <div className='p-4 bg-gray-500/10 border border-gray-500/20 rounded-lg'>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 bg-gray-500 rounded-full'></div>
          <span className='text-gray-500 text-sm'>Contracts not ready</span>
        </div>
      </div>
    )
  }

  return (
    <div className='p-4 bg-green-500/10 border border-green-500/20 rounded-lg'>
      <div className='flex items-center gap-2'>
        <div className='w-2 h-2 bg-green-500 rounded-full'></div>
        <span className='text-green-500 text-sm'>
          Contracts loaded successfully
        </span>
      </div>
      <div className='mt-2 text-xs text-gray-400'>
        Loaded:{" "}
        {Object.keys(contracts)
          .filter((key) => contracts[key as keyof typeof contracts] !== null)
          .join(", ")}
      </div>

      {/* Show actual contract data */}
      {gameState.lotteryData && (
        <div className='mt-3 space-y-1 text-xs text-gray-300'>
          <div>Round: {gameState.lotteryData.currentRound}</div>
          <div>
            Time Remaining:{" "}
            {gameState.formatTimeRemaining(gameState.liveTimeRemaining)}
          </div>
          <div>
            Ticket Price: $
            {parseFloat(gameState.lotteryData.ticketPrice).toFixed(2)}
          </div>
          <div>
            Total Prize: $
            {parseFloat(gameState.lotteryData.totalPrize).toFixed(2)}
          </div>
          <div>Your Tickets: {gameState.userTickets.length}</div>
          <div>
            Your Balance: ${parseFloat(gameState.userBalance).toFixed(2)}
          </div>
          <div>
            pBALLS: {parseFloat(gameState.pballsData.balance).toFixed(2)}
          </div>
        </div>
      )}
    </div>
  )
}
