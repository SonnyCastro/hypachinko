"use client"

import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ASSETS } from "@/constants/assets"
import { DataTable } from "@/components/ui/DataTable"
import { SellingBallsModal } from "../SellingBallsModal"
import { useSellingBallsModal } from "@/hooks/useModal"

// Types
interface BallEntry {
  id: string
  coin: string
  balls: number
  jackpot: number
  odds: number
  status: "active" | "selling" | "won" | "expired"
  action: "sell" | "cancel" | "claim" | "none"
  timeRemaining?: string
}

// Generate dummy data
const generateDummyData = (): BallEntry[] => {
  const baseValues = [20000, 22500, 50000, 18000, 33000]
  const multiplier = 1.2

  return baseValues.map((baseValue, index) => {
    const balls = Math.round(baseValue * (1 + index * 0.1))
    const jackpot = Math.round(balls * multiplier)
    const odds = index + 1

    let status: BallEntry["status"]
    let action: BallEntry["action"]
    let timeRemaining: string | undefined

    switch (index) {
      case 0:
        status = "selling"
        action = "sell"
        timeRemaining = "07:35:24"
        break
      case 1:
        status = "selling"
        action = "cancel"
        timeRemaining = "07:35:24"
        break
      case 2:
        status = "won"
        action = "claim"
        break
      case 3:
        status = "expired"
        action = "none"
        break
      default:
        status = "active"
        action = "sell"
        timeRemaining = "07:35:24"
    }

    return {
      id: `ball-${index + 1}`,
      coin: "USDT",
      balls,
      jackpot,
      odds,
      status,
      action,
      timeRemaining,
    }
  })
}

const allBallsData = generateDummyData()

// Status display component
const StatusDisplay = ({
  status,
  timeRemaining,
}: {
  status: BallEntry["status"]
  timeRemaining?: string
}) => {
  switch (status) {
    case "active":
    case "selling":
      return (
        <div className='flex flex-row gap-1 items-center justify-center w-full'>
          <div className='relative shrink-0 w-3 h-3 sm:w-4 sm:h-4'>
            <img
              src={ASSETS.icons.alarm}
              alt='Timer'
              className='w-full h-full object-contain'
            />
          </div>
          <div className='text-instrument font-normal text-xs sm:text-sm md:text-base text-[var(--color-figma-green-400)] text-center text-nowrap'>
            {timeRemaining}
          </div>
        </div>
      )
    case "won":
      return (
        <div className='bg-[rgba(255,239,10,0.2)] flex flex-row gap-1 items-center justify-center px-2 py-1 rounded w-full'>
          <div className='relative shrink-0 w-3 h-3 sm:w-4 sm:h-4'>
            <img
              src={ASSETS.icons.trophyFilled}
              alt='Trophy'
              className='w-full h-full object-contain'
            />
          </div>
          <div className='text-instrument font-normal text-xs sm:text-sm md:text-base text-[var(--color-figma-yellow-200)] text-center text-nowrap'>
            WON!
          </div>
        </div>
      )
    case "expired":
      return (
        <div className='bg-[rgba(246,35,35,0.2)] flex flex-row gap-1 items-center justify-start px-2 py-1 rounded w-full'>
          <div className='relative shrink-0 w-3 h-3 sm:w-4 sm:h-4'>
            <img
              src={ASSETS.icons.redSkull}
              alt='Skull'
              className='w-full h-full object-contain'
            />
          </div>
          <div className='text-instrument font-normal text-xs sm:text-sm md:text-base text-[#f62323] text-center text-nowrap'>
            Expired
          </div>
        </div>
      )
    default:
      return null
  }
}

export function MyBallsTable() {
  const {
    isOpen,
    data: selectedBallData,
    openModal,
    closeModal,
  } = useSellingBallsModal()

  const handleSellClick = (ballData: any) => {
    openModal(ballData)
  }

  // Action button component with handler
  const ActionButtonWithHandler = ({
    action,
    ballData,
  }: {
    action: BallEntry["action"]
    ballData?: any
  }) => {
    switch (action) {
      case "sell":
        return (
          <button
            className='bg-[rgba(248,170,255,0.3)] flex flex-row items-center justify-center px-3 sm:px-4 py-2 rounded-[100px] w-[120px] sm:w-[140px] hover:opacity-90 cursor-pointer transition-opacity'
            onClick={() => handleSellClick(ballData)}
          >
            <div className='text-instrument font-normal text-xs sm:text-sm md:text-base text-[#f8aaff] text-center text-nowrap'>
              SELL
            </div>
          </button>
        )
      case "cancel":
        return (
          <div className='bg-[rgba(248,170,255,0.3)] flex flex-row items-center justify-center px-3 sm:px-4 py-2 rounded-[100px] w-[120px] sm:w-[140px] cursor-pointer'>
            <div className='text-instrument font-normal text-xs sm:text-sm md:text-base text-[#f8aaff] text-center text-nowrap'>
              Cancel Sell
            </div>
          </div>
        )
      case "claim":
        return (
          <div className='bg-[rgba(63,239,192,0.2)] flex flex-row items-center justify-center px-3 sm:px-4 py-2 rounded-[100px] w-[120px] sm:w-[140px] cursor-pointer'>
            <div className='text-instrument font-normal text-xs sm:text-sm md:text-base text-[var(--color-figma-green-400)] text-center text-nowrap'>
              Claim
            </div>
          </div>
        )
      case "none":
        return (
          <div className='flex flex-row items-center justify-center px-3 sm:px-4 py-2 rounded-[100px] w-[120px] sm:w-[140px]'>
            <div className='text-instrument font-normal text-xs sm:text-sm md:text-base text-[var(--color-figma-green-400)] text-center text-nowrap'>
              -
            </div>
          </div>
        )
      default:
        return null
    }
  }

  // Column definitions with handler
  const columnsWithHandler: ColumnDef<BallEntry>[] = [
    {
      accessorKey: "coin",
      header: "Coin",
      meta: { width: "80px", flex: "none" },
      cell: ({ row }) => (
        <div className='flex flex-row gap-2 h-full items-center justify-center overflow-hidden px-1 py-2 relative w-[80px]'>
          <div className='relative shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8'>
            <img
              src={ASSETS.icons.usdtAlt}
              alt={row.getValue("coin")}
              className='w-full h-full object-contain'
            />
          </div>
        </div>
      ),
    },
    {
      accessorKey: "balls",
      header: "Balls",
      meta: { flex: "1" },
      cell: ({ row }) => {
        const balls = row.getValue("balls") as number
        return (
          <div className='basis-0 flex flex-col sm:flex-row gap-1 grow h-full items-center justify-center min-h-px min-w-px px-2 py-0 relative text-[#dedede] text-center'>
            <div className='text-instrument font-bold text-sm sm:text-base md:text-lg lg:text-xl'>
              {balls.toLocaleString()}
            </div>
            <div className='text-instrument font-normal opacity-80 text-xs sm:text-sm md:text-base'>
              (${balls.toLocaleString()})
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "jackpot",
      header: "Jackpot",
      meta: { flex: "1" },
      cell: ({ row }) => {
        const jackpot = row.getValue("jackpot") as number
        return (
          <div className='basis-0 flex flex-col sm:flex-row gap-1 grow h-full items-center justify-center min-h-px min-w-px px-2 py-0 relative text-[#dedede] text-center'>
            <div className='text-instrument font-bold text-base sm:text-lg md:text-xl'>
              {jackpot.toLocaleString()}
            </div>
            <div className='text-instrument font-normal opacity-80 text-xs sm:text-sm md:text-base'>
              (${jackpot.toLocaleString()})
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "odds",
      header: "Odds",
      meta: { width: "100px", flex: "none" },
      cell: ({ row }) => (
        <div className='flex flex-row gap-1 h-full items-center justify-center px-2 py-0 relative w-[100px]'>
          <div className='text-instrument font-bold text-base sm:text-lg md:text-xl text-[#dedede] text-center text-nowrap'>
            {row.getValue("odds")}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      meta: { width: "140px", flex: "none" },
      cell: ({ row }) => (
        <div className='flex flex-col items-center justify-center h-full px-2 py-2 relative w-[140px]'>
          <StatusDisplay
            status={row.getValue("status")}
            timeRemaining={row.original.timeRemaining}
          />
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      meta: { width: "180px", flex: "none" },
      cell: ({ row }) => (
        <div className='flex flex-col items-center justify-center h-full px-3 py-2 relative w-[180px]'>
          <ActionButtonWithHandler
            action={row.getValue("action")}
            ballData={row.original}
          />
        </div>
      ),
    },
  ]

  return (
    <>
      <DataTable
        columns={columnsWithHandler}
        data={allBallsData}
        itemsPerPage={5}
        responsiveBreakpoints={{
          mobile: ["coin", "balls", "action"], // Show coin, balls, and action on mobile
          tablet: ["coin", "balls", "status", "action"], // Add status on tablet
          desktop: ["coin", "balls", "jackpot", "odds", "status", "action"], // Show all on desktop
        }}
      />

      <SellingBallsModal
        isOpen={isOpen}
        onClose={closeModal}
        ballData={selectedBallData}
      />
    </>
  )
}
