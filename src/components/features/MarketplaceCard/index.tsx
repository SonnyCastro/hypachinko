"use client"

import React from "react"
import type { MarketplaceItem } from "@/types"
import { ASSETS } from "@/constants/assets"

interface MarketplaceCardProps {
  item: MarketplaceItem
  onClick?: () => void
}

export function MarketplaceCard({ item, onClick }: MarketplaceCardProps) {
  const handleBuyBalls = (e: React.MouseEvent) => {
    e.stopPropagation()
    // TODO: Implement buy balls functionality
    console.log("Buy balls clicked for item:", item.id)
  }

  // Determine which price change icon to use
  const getPriceChangeIcon = () => {
    if (item.priceChange.percentage.startsWith("+")) {
      return ASSETS.icons.circleUp
    } else {
      return ASSETS.icons.circleDown
    }
  }

  return (
    <div
      className='flex flex-col items-end justify-start overflow-hidden rounded-2xl cursor-pointer transition-transform hover:scale-[1.02] w-full max-w-[200px] sm:max-w-[240px]'
      onClick={onClick}
    >
      {/* Card Image Section */}
      <div
        className='flex flex-col items-center justify-start overflow-hidden relative shrink-0 w-full aspect-square bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url('${item.backgroundImage}')` }}
      >
        {/* Top Bar */}
        <div className='backdrop-blur-[10px] backdrop-filter bg-[rgba(27,14,24,0.9)] flex flex-row items-center justify-between p-1.5 sm:p-2 relative shrink-0 w-full'>
          {/* Token Badge */}
          <div className='flex flex-row gap-1 items-center justify-start p-0 relative rounded-lg shrink-0'>
            <div className='overflow-clip relative shrink-0 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5'>
              <div className='absolute inset-[2.381%]'>
                <img
                  src={item.tokenIcon}
                  alt={item.token}
                  className='w-full h-full'
                />
              </div>
            </div>
            <div className='text-instrument font-normal leading-[1.1] relative shrink-0 text-[#3fefc0] text-xs sm:text-sm md:text-xl text-center uppercase'>
              {item.token}
            </div>
          </div>

          {/* Balls Count */}
          <div className='flex flex-row gap-1 items-center justify-start p-0 relative shrink-0'>
            <div className='relative shrink-0 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4'>
              <img
                src={ASSETS.icons.sphere}
                alt='balls'
                className='w-full h-full'
              />
            </div>
            <div className='text-instrument font-normal leading-[1.1] relative shrink-0 text-[#fcfcfc] text-xs sm:text-sm md:text-base text-center'>
              {item.ballsCount}
            </div>
          </div>
        </div>

        {/* Bottom Timer */}
        <div className='basis-0 flex flex-col gap-2.5 grow items-center justify-end min-h-px min-w-px overflow-hidden p-1.5 sm:p-2 relative shrink-0 w-full'>
          <div className='backdrop-blur-[10px] backdrop-filter bg-[rgba(27,14,24,0.9)] flex flex-row gap-1 items-center justify-center px-1.5 sm:px-2 py-0.5 sm:py-1 relative rounded-[100px] shrink-0'>
            <div className='relative shrink-0 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4'>
              <img
                src={ASSETS.icons.alarm}
                alt='timer'
                className='w-full h-full'
              />
            </div>
            <div className='text-instrument font-normal leading-[1.1] relative shrink-0 text-[#3fefc0] text-xs sm:text-sm md:text-base text-center'>
              {item.timeLeft}
            </div>
          </div>
        </div>
      </div>

      {/* Card Info Section */}
      <div className='bg-[#2b1a27] flex flex-col items-center justify-start p-0 relative shrink-0 w-full'>
        {/* Price Change Row */}
        <div className='flex flex-row items-center justify-between p-1.5 sm:p-2 relative shrink-0 w-full'>
          {/* Price Change Chip */}
          <div
            className={`flex flex-row gap-1 items-center justify-start px-1.5 sm:px-2 py-0.5 sm:py-1 relative rounded shrink-0 ${
              item.priceChange.isPositive
                ? "bg-[rgba(63,239,192,0.2)]"
                : "bg-[rgba(246,35,35,0.2)]"
            }`}
          >
            <div className='flex items-center justify-center relative shrink-0'>
              <div className='overflow-clip relative w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4'>
                <img
                  src={getPriceChangeIcon()}
                  alt='price change'
                  className='w-full h-full'
                />
              </div>
            </div>
            <div
              className={`text-instrument font-normal leading-[1.1] relative shrink-0 text-xs sm:text-sm md:text-base text-center ${
                item.priceChange.isPositive
                  ? "text-[#3fefc0]"
                  : "text-[#f62323]"
              }`}
            >
              {item.priceChange.percentage}
            </div>
          </div>

          {/* OG vs Current Label */}
          <div className='text-instrument font-normal leading-[1.1] relative shrink-0 text-[#ffffff] text-xs sm:text-sm md:text-base text-center'>
            OG vs Current
          </div>
        </div>

        {/* Divider */}
        <div className='h-0 relative shrink-0 w-full'>
          <div className='absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]'>
            <img
              src={ASSETS.icons.group5}
              alt='divider'
              className='w-full h-full'
            />
          </div>
        </div>

        {/* Price Row */}
        <div className='flex flex-row gap-2.5 items-center justify-center p-1.5 sm:p-2 relative shrink-0 w-full'>
          <div className='basis-0 flex flex-col font-instrument font-bold grow justify-center leading-[1.1] min-h-px min-w-px relative shrink-0 text-[#3fefc0] text-lg sm:text-xl md:text-2xl lg:text-3xl text-center'>
            {item.price}
          </div>
        </div>

        {/* Buy Balls Button */}
        <div className='absolute bg-[#3fefc0] flex flex-row gap-2.5 items-center justify-center left-2 overflow-hidden p-[8px] sm:p-[10px] rounded-bl-[8px] rounded-br-[8px] rounded-tl-[4px] rounded-tr-[4px] top-16 sm:top-20 md:top-24 w-36 sm:w-48 md:w-56'>
          <div className='text-bagel leading-[1.1] not-italic relative shrink-0 text-[#1b0e18] text-sm sm:text-lg md:text-xl text-center'>
            Buy Balls
          </div>
          <div className='absolute inset-0 pointer-events-none shadow-[0px_4px_4px_0px_inset_rgba(255,255,255,0.5),0px_-4px_4px_0px_inset_rgba(0,0,0,0.25)]' />
        </div>
      </div>
    </div>
  )
}
