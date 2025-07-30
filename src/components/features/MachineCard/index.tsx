"use client"

import React from "react"
import { GameInterface } from "../GameInterface"

interface MachineCardProps {
  machineId: string
  selectedToken: string
  selectedPercentage: string
  ballCount: number
  onBuyBalls: () => void
  onPercentageSelect: (percentage: string) => void
  onBallCountChange: (count: number) => void
}

export function MachineCard({
  selectedToken,
  selectedPercentage,
  ballCount,
  onBuyBalls,
  onPercentageSelect,
  onBallCountChange,
}: MachineCardProps) {
  return (
    <div className='w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[544px] mx-auto'>
      <GameInterface
        selectedToken={selectedToken}
        selectedPercentage={selectedPercentage}
        ballCount={ballCount}
        onBuyBalls={onBuyBalls}
        onPercentageSelect={onPercentageSelect}
        onBallCountChange={onBallCountChange}
      />
    </div>
  )
}
