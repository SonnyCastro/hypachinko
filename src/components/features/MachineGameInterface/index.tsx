"use client"

import React, { useState } from "react"
import { formatCurrency, formatNumber } from "@/lib/utils"
import { StatisticCard } from "../StatisticCard"
import { ActionButton } from "../ActionButton"
import { ASSETS } from "@/constants/assets"
import { GameState } from "@/types/game"

interface MachineGameInterfaceProps {
  machineId: string
  gameState: GameState // Fixed: replaced 'any' with proper GameState type
  onBuyTicket?: () => void
}

export function MachineGameInterface({
  machineId,
  gameState,
  onBuyTicket,
}: MachineGameInterfaceProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleBuyTicket = async () => {
    if (isProcessing) return

    setIsProcessing(true)
    try {
      await gameState.buyTicket()
      onBuyTicket?.()
      console.log(`Successfully bought ticket for machine ${machineId}`)
    } catch (error) {
      console.error("Failed to buy ticket:", error)
      // You could add a toast notification here
    } finally {
      setIsProcessing(false)
    }
  }

  if (gameState.loading) {
    return (
      <div className='p-6 bg-gray-800/50 rounded-lg border border-gray-700'>
        <div className='flex items-center justify-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-green-500'></div>
          <span className='ml-2 text-gray-300'>Loading contract data...</span>
        </div>
      </div>
    )
  }

  if (gameState.error) {
    return (
      <div className='p-6 bg-red-900/20 rounded-lg border border-red-700'>
        <div className='text-red-400 text-sm'>
          Contract Error: {gameState.error}
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Machine Header */}
      <div className='text-center'>
        <h3 className='text-xl font-bold text-white'>Machine {machineId}</h3>
        <p className='text-gray-400'>
          Round {gameState.lotteryData?.currentRound || "Loading..."}
        </p>
      </div>

      {/* Game Stats - Using existing StatisticCard component */}
      <div className='grid grid-cols-2 gap-4'>
        <StatisticCard
          icon={ASSETS.icons.alarm}
          title='Time Remaining'
          value={gameState.formatTimeRemaining(gameState.liveTimeRemaining)}
        />

        <StatisticCard
          icon={ASSETS.icons.trophy}
          title='Total Prize'
          value={formatCurrency(gameState.lotteryData?.totalPrize || "0")}
        />

        <StatisticCard
          icon={ASSETS.icons.pokerChipPurple}
          title='Total Tickets'
          value={formatNumber(gameState.lotteryData?.totalTickets || "0")}
        />

        <StatisticCard
          icon={ASSETS.icons.usdt}
          title='Ticket Price'
          value={formatCurrency(gameState.lotteryData?.ticketPrice || "0")}
        />
      </div>

      {/* User Stats Summary */}
      <div className='bg-gray-800/50 p-4 rounded-lg border border-gray-700'>
        <h4 className='text-lg font-semibold text-white mb-3'>Your Stats</h4>
        <div className='grid grid-cols-2 gap-4 text-sm'>
          <div>
            <span className='text-gray-400'>Balance:</span>
            <span className='ml-2 text-white'>
              {formatCurrency(gameState.userBalance)}
            </span>
          </div>
          <div>
            <span className='text-gray-400'>Tickets:</span>
            <span className='ml-2 text-white'>
              {gameState.userTickets.length}
            </span>
          </div>
          <div>
            <span className='text-gray-400'>pBALLS:</span>
            <span className='ml-2 text-white'>
              {formatNumber(gameState.pballsData.balance, 2)}
            </span>
          </div>
          <div>
            <span className='text-gray-400'>Win Chance:</span>
            <span className='ml-2 text-white'>
              {gameState.userTickets.length > 0 ? "Calculating..." : "0.0000%"}
            </span>
          </div>
        </div>
      </div>

      {/* Buy Ticket - Using existing ActionButton component */}
      <div className='bg-gray-800/50 p-4 rounded-lg border border-gray-700'>
        <h4 className='text-lg font-semibold text-white mb-3'>Buy Ticket</h4>
        <ActionButton
          text={
            isProcessing
              ? "Processing..."
              : gameState.lotteryData?.roundEnded
              ? "Round Ended"
              : `Buy Ticket (${formatCurrency(
                  gameState.lotteryData?.ticketPrice || "0"
                )})`
          }
          onClick={handleBuyTicket}
          className='w-full'
        />
      </div>

      {/* Quick Stats */}
      <div className='text-xs text-gray-400 text-center'>
        <p>• Live data from blockchain</p>
        <p>• Real-time countdown timer</p>
        <p>• Automatic data refresh</p>
        <p>• Integrated with existing components</p>
        <p>• Real contract interactions</p>
      </div>
    </div>
  )
}
