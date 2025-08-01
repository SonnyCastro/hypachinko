"use client"

import React from "react"
import type { MarketplaceItem } from "@/types"
import { MarketplaceCard } from "../MarketplaceCard"

interface MarketplaceGridProps {
  items: MarketplaceItem[]
  onItemClick?: (item: MarketplaceItem) => void
}

export function MarketplaceGrid({ items, onItemClick }: MarketplaceGridProps) {
  if (items.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-16 sm:py-24 w-full min-h-[400px]'>
        <div className='text-instrument text-[#3fefc0] text-lg sm:text-xl text-center'>
          No items found for the selected filters.
        </div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 w-full auto-rows-max'>
      {items.map((item) => (
        <div key={item.id} className='flex justify-center'>
          <MarketplaceCard
            key={item.id}
            item={item}
            onClick={() => onItemClick?.(item)}
          />
        </div>
      ))}
    </div>
  )
}
