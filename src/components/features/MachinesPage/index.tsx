"use client"

import { useMemo } from "react"
import { ASSETS } from "@/constants/assets"
import { useMachinesState } from "@/hooks/useMachinesState"
import { getTokenData } from "@/constants/tokenData"
import { getSortedMachineIds, MachineId } from "@/constants/machines"
import { LazyMachineCard } from "./LazyMachineCard"
import { GameState } from "@/types/game"

interface MachinesPageProps {
  serverMachinesData?: Record<string, unknown>
  serverAggregatedData?: Record<string, unknown>
  serverError?: string | null
}

export function MachinesPage({ serverError }: MachinesPageProps) {
  // Machine IDs - easy to add/remove machines
  const machineIds = useMemo(() => getSortedMachineIds(), [])

  // Use optimized hook for machine state management with batched data fetching
  const {
    machineStates,
    machineGameStates,
    handleMachinePercentageSelect,
    handleMachineBallCountChange,
    handleMachineBuyBalls,
  } = useMachinesState(machineIds)

  // Memoized tokens array - using centralized tokenData
  const tokens = useMemo(
    () =>
      machineIds.map((id: MachineId) => {
        const tokenData = getTokenData(id)
        return {
          id,
          name: tokenData?.name || id,
          icon: tokenData?.icon || ASSETS.icons.usdt,
          lightStripColor: tokenData?.lightStripColor || "#00B988",
        }
      }),
    [machineIds]
  )

  return (
    <div className='bg-[#1b0e18] min-h-screen flex flex-col items-center overflow-x-hidden relative'>
      {/* Background mascots */}
      <div
        className='hidden xl:block absolute bg-center bg-cover bg-no-repeat left-[-189px] w-[640px] h-[640px] top-[341px]'
        style={{
          backgroundImage: `url('${ASSETS.images.mascot}')`,
        }}
      />
      <div
        className='hidden xl:block absolute bg-center bg-cover bg-no-repeat bottom-4 right-[-186px] w-[800px] h-[800px]'
        style={{
          backgroundImage: `url('${ASSETS.images.mascotPlaying}')`,
        }}
      />

      <div className='w-full max-w-[1728px] relative z-10 flex flex-col items-center'>
        {/* Navbar spacer */}
        <div className='h-10 md:h-20 w-full' />

        {/* Main content container */}
        <div className='flex flex-col gap-6 sm:gap-8 items-center justify-start w-full max-w-[1024px] px-4 py-8'>
          {/* Total for grabs section */}
          <div className='bg-[#3fefc0] flex flex-col gap-2 items-center justify-start py-2 px-2 rounded-lg w-full relative overflow-hidden'>
            <div className='text-bagel text-xl sm:text-2xl md:text-[32px] text-[#000000] text-center w-full leading-[1.1]'>
              Total for grabs
            </div>
            <div className='text-bagel text-2xl sm:text-4xl md:text-5xl lg:text-[64px] text-[#000000] text-center w-full leading-[normal]'>
              $300,000
            </div>

            {/* Decorative elements */}
            <div className='absolute h-[140px] left-0 top-[-12px] w-[134px]'>
              <img src={ASSETS.icons.group4} alt='' className='w-full h-full' />
            </div>
            <div className='absolute flex h-[140px] items-center justify-center right-0 top-[-12px] w-[134px]'>
              <div className='flex-none  scale-y-[100%]'>
                <img
                  src={ASSETS.icons.group5}
                  alt=''
                  className='h-[140px] w-[134px]'
                />
              </div>
            </div>
          </div>

          {/* Live Stats from Optimized Data */}
          {/* {!isLoadingMachines && (
            <div className='w-full mt-4'>
              <h2 className='text-2xl font-bold text-white mb-4 text-center'>
                Live Contract Stats
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <StatisticCard
                  icon={ASSETS.icons.trophy}
                  title='Total Tickets'
                  value={getAggregatedData().totalTickets.toString()}
                />
                <StatisticCard
                  icon={ASSETS.icons.usdt}
                  title='Total Balance'
                  value={formatCurrency(getAggregatedData().totalBalance)}
                />
                <StatisticCard
                  icon={ASSETS.icons.pokerChipPurple}
                  title='Total pBALLS'
                  value={getAggregatedData().totalPballs}
                />
              </div>
            </div>
          )} */}

          {/* Machines Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full mt-4 sm:mt-6'>
            {tokens.map((token) => {
              return (
                <LazyMachineCard
                  key={token.id}
                  machineId={token.id}
                  selectedToken={token.id}
                  selectedPercentage={machineStates[token.id].percentage}
                  ballCount={machineStates[token.id].ballCount}
                  onBuyBalls={() => handleMachineBuyBalls(token.id)}
                  onPercentageSelect={(percentage: string) =>
                    handleMachinePercentageSelect(token.id, percentage)
                  }
                  onBallCountChange={(count: number) =>
                    handleMachineBallCountChange(token.id, count)
                  }
                />
              )
            })}
          </div>
        </div>

        {/* Spacer */}
        <div className='h-10 md:h-20 w-full' />
      </div>

      {/* Error Display */}
      {serverError && (
        <div className='fixed top-4 right-4 bg-red-900/20 border border-red-700 rounded-lg p-4 max-w-md'>
          <p className='text-red-400 text-sm'>Server Error: {serverError}</p>
        </div>
      )}
    </div>
  )
}
