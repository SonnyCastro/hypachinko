"use client"

import React from "react"
import type { MarketplaceFilters, TokenType } from "@/types"
import { TOKEN_FILTERS, SORT_OPTIONS } from "@/constants/marketplace"
import { ASSETS } from "@/constants/assets"

interface MarketplaceFiltersProps {
  filters: MarketplaceFilters
  onFiltersChange: (filters: MarketplaceFilters) => void
}

export function MarketplaceFilters({
  filters,
  onFiltersChange,
}: MarketplaceFiltersProps) {
  const handleTokenSelect = (tokenId: string) => {
    onFiltersChange({
      ...filters,
      selectedToken: tokenId,
    })
  }

  const handleSortChange = (sortBy: "price" | "timeLeft") => {
    const newSortOrder =
      filters.sortBy === sortBy && filters.sortOrder === "asc" ? "desc" : "asc"
    onFiltersChange({
      ...filters,
      sortBy,
      sortOrder: newSortOrder,
    })
  }

  return (
    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full'>
      {/* Token Filters */}
      <div className='flex flex-wrap gap-2 items-center justify-start w-full sm:w-auto'>
        {TOKEN_FILTERS.map((token) => {
          const isActive = filters.selectedToken === token.id
          return (
            <button
              key={token.id}
              onClick={() => handleTokenSelect(token.id)}
              className={`
                flex flex-row gap-1.5 items-center justify-center px-4 py-2 rounded-[100px] h-10 sm:h-12 transition-all duration-200 relative min-w-[70px] sm:min-w-[90px]
                ${
                  isActive
                    ? "bg-[#3fefc0] text-[#1b0e18]"
                    : "bg-[rgba(63,239,192,0.2)] text-[#3fefc0]"
                }
              `}
            >
              {/* Icon */}
              {token.icon && (
                <div className='overflow-clip relative shrink-0 w-4 h-4 sm:w-5 sm:h-5'>
                  <img
                    src={
                      isActive && token.id === "usdt0"
                        ? ASSETS.icons.usdtBlack
                        : token.icon
                    }
                    alt={token.name}
                    className='w-full h-full object-contain'
                  />
                </div>
              )}

              {/* Text */}
              <div
                className={`
                  text-instrument font-normal leading-[1.1] relative shrink-0 text-sm sm:text-base text-center uppercase
                  ${isActive ? "text-[#1b0e18]" : "text-[#3fefc0]"}
                `}
              >
                {token.name}
              </div>
            </button>
          )
        })}
      </div>

      {/* Sort Options - Positioned on the right */}
      <div className='flex flex-row gap-2 items-center justify-start w-full sm:w-auto'>
        {SORT_OPTIONS.map((option) => {
          const isActive = filters.sortBy === option.id
          const isDesc =
            filters.sortBy === option.id && filters.sortOrder === "desc"

          return (
            <button
              key={option.id}
              onClick={() =>
                handleSortChange(option.id as "price" | "timeLeft")
              }
              className='bg-[rgba(63,239,192,0.2)] flex flex-row gap-1.5 items-center justify-center px-4 py-2 relative rounded-[100px] shrink-0 transition-all duration-200 h-10 sm:h-12'
            >
              <div className='text-instrument font-normal leading-[1.1] relative shrink-0 text-sm sm:text-base text-center text-[#3fefc0]'>
                {option.label}
              </div>
              <div className='relative shrink-0 w-3 h-3 sm:w-4 sm:h-4'>
                <img
                  src={ASSETS.icons.chevronUp}
                  alt='sort'
                  className={`w-full h-full transition-transform duration-200 ${
                    isDesc ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
