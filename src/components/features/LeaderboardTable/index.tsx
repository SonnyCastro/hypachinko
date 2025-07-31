"use client"

import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ASSETS } from "@/constants/assets"
import { DataTable } from "@/components/ui/DataTable"

// Types
interface LeaderboardEntry {
  id: string
  rank: number
  player: string
  totalEarned: number
  ballsPurchased: number
  machinesUsed: number
}

// Generate deterministic dummy data to prevent hydration errors
const generateLeaderboardData = (count: number): LeaderboardEntry[] => {
  const data: LeaderboardEntry[] = []
  const baseEarnings = [
    11631, 45852, 64372, 72006, 32603, 52111, 79226, 47119, 45323, 86567,
  ]
  const baseBalls = [150, 320, 280, 450, 200, 380, 520, 290, 310, 600]

  for (let i = 0; i < count; i++) {
    const baseEarning = baseEarnings[i % baseEarnings.length]
    const baseBall = baseBalls[i % baseBalls.length]
    const multiplier = 1 + (i % 5) * 0.2 // Creates deterministic variations

    data.push({
      id: (i + 1).toString(),
      rank: i + 1,
      player: `0xfa...${(i + 1).toString().padStart(4, "0")}`,
      totalEarned: Math.floor(baseEarning * multiplier),
      ballsPurchased: Math.floor(baseBall * multiplier),
      machinesUsed: (i % 10) + 1,
    })
  }
  return data
}

const allLeaderboardData = generateLeaderboardData(200)

// Rank display component
const RankDisplay = ({ rank }: { rank: number }) => {
  if (rank === 1) return "🥇"
  if (rank === 2) return "🥈"
  if (rank === 3) return "🥉"
  if (rank <= 10) return "🏅"

  return (
    <div className='bg-[rgba(63,239,192,0.2)] flex flex-col gap-2.5 items-center justify-center p-0 relative rounded-[100px] shrink-0 w-6 h-6'>
      <div className='text-instrument font-normal text-base text-[var(--color-figma-green-400)] text-center tracking-[0.16px] w-full'>
        {rank}
      </div>
    </div>
  )
}

// Column definitions
const columns: ColumnDef<LeaderboardEntry>[] = [
  {
    accessorKey: "rank",
    header: "Players",
    meta: { width: "200px", flex: "none" },
    cell: ({ row }) => (
      <div className='flex flex-row gap-2 h-full items-center justify-center px-2 py-0 relative w-[200px] text-[var(--color-figma-green-400)] text-center text-nowrap'>
        <div className='relative shrink-0 tracking-[0.24px]'>
          <RankDisplay rank={row.getValue("rank")} />
        </div>
        <div className='relative shrink-0 text-sm sm:text-base'>
          {row.original.player}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "totalEarned",
    header: "Total earned",
    meta: { flex: "1" },
    cell: ({ row }) => (
      <div className='basis-0 flex flex-row gap-2.5 grow h-full items-center justify-center min-h-px min-w-px px-2 py-0 relative'>
        <div className='text-instrument font-normal text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--color-figma-green-400)] text-center text-nowrap'>
          ${(row.getValue("totalEarned") as number).toLocaleString()}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "ballsPurchased",
    header: "Balls purchased",
    meta: { flex: "1" },
    cell: ({ row }) => (
      <div className='basis-0 flex flex-row gap-2.5 grow h-full items-center justify-center min-h-px min-w-px px-2 py-0 relative'>
        <div className='text-instrument font-normal text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--color-figma-green-400)] text-center text-nowrap'>
          {row.getValue("ballsPurchased")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "machinesUsed",
    header: "Machines Used",
    meta: { flex: "1" },
    cell: ({ row }) => (
      <div className='basis-0 flex flex-row gap-2.5 grow h-full items-center justify-center min-h-px min-w-px px-2 py-0 relative'>
        <div className='flex flex-row-reverse items-center justify-start pl-0 pr-2 py-0'>
          <div className='mr-[-8px] order-2 relative shrink-0 w-6 h-6 sm:w-8 sm:h-8'>
            <img
              src={ASSETS.icons.usdtAlt}
              alt='USDT'
              className='w-full h-full object-contain'
            />
          </div>
          <div className='mr-[-8px] order-1 relative shrink-0 w-6 h-6 sm:w-8 sm:h-8'>
            <img
              src={ASSETS.icons.hyperliquid}
              alt='Hyperliquid'
              className='w-full h-full object-contain'
            />
          </div>
        </div>
      </div>
    ),
  },
]

export function LeaderboardTable() {
  return (
    <DataTable
      columns={columns}
      data={allLeaderboardData}
      itemsPerPage={10}
      responsiveBreakpoints={{
        mobile: ["rank", "totalEarned"], // Show only rank and total earned on mobile
        tablet: ["rank", "totalEarned", "ballsPurchased"], // Add balls purchased on tablet
        desktop: ["rank", "totalEarned", "ballsPurchased", "machinesUsed"], // Show all on desktop
      }}
    />
  )
}
