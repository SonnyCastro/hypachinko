import React, { Suspense, lazy } from "react"
import { MachineId } from "@/constants/machines"
import { Skeleton } from "@/components/ui/Skeleton"

// Lazy load the MachineCard component
const MachineCard = lazy(() =>
  import("../MachineCard").then((module) => ({ default: module.MachineCard }))
)
// Removed unused MachineGameInterface import

interface LazyMachineCardProps {
  machineId: MachineId
  selectedToken: string
  selectedPercentage: string
  ballCount: number
  onBuyBalls: () => void
  onPercentageSelect: (percentage: string) => void
  onBallCountChange: (count: number) => void
}

// Skeleton for machine card
function MachineCardSkeleton() {
  return (
    <div className='space-y-4'>
      <div className='bg-[var(--color-figma-dark-200)] rounded-2xl p-4 sm:p-6 w-full'>
        {/* Machine Header */}
        <div className='flex items-center justify-between mb-4 sm:mb-6'>
          <div className='flex items-center gap-3'>
            <Skeleton className='w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300/30' />
            <Skeleton className='h-6 sm:h-8 w-24 sm:w-32 bg-gray-300/30' />
          </div>
          <Skeleton className='h-8 w-20 bg-gray-300/30 rounded-lg' />
        </div>

        {/* Machine Stats */}
        <div className='grid grid-cols-2 gap-4 mb-4 sm:mb-6'>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-16 bg-gray-300/30' />
            <Skeleton className='h-6 w-20 bg-gray-300/30' />
          </div>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-16 bg-gray-300/30' />
            <Skeleton className='h-6 w-20 bg-gray-300/30' />
          </div>
        </div>

        {/* Game Interface skeleton */}
        <div className='space-y-4'>
          <Skeleton className='h-12 w-full bg-gray-300/30 rounded-lg' />
          <div className='flex gap-2'>
            <Skeleton className='h-10 flex-1 bg-gray-300/30 rounded-lg' />
            <Skeleton className='h-10 flex-1 bg-gray-300/30 rounded-lg' />
            <Skeleton className='h-10 flex-1 bg-gray-300/30 rounded-lg' />
          </div>
        </div>
      </div>
    </div>
  )
}

export function LazyMachineCard({
  machineId,
  selectedToken,
  selectedPercentage,
  ballCount,
  onBuyBalls,
  onPercentageSelect,
  onBallCountChange,
}: LazyMachineCardProps) {
  return (
    <Suspense fallback={<MachineCardSkeleton />}>
      <div className='space-y-4'>
        <MachineCard
          machineId={machineId}
          selectedToken={selectedToken}
          selectedPercentage={selectedPercentage}
          ballCount={ballCount}
          onBuyBalls={onBuyBalls}
          onPercentageSelect={onPercentageSelect}
          onBallCountChange={onBallCountChange}
        />

        {/* <MachineGameInterface
          machineId={machineId}
          gameState={gameState}
          onBuyTicket={onBuyTicket}
        /> */}
      </div>
    </Suspense>
  )
}
