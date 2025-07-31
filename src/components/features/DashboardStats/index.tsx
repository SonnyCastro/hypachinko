"use client"

import React from "react"
import { ASSETS } from "@/constants/assets"
import { ActionButton } from "../ActionButton"

export function DashboardStats() {
  return (
    <div className='grid grid-cols-2 lg:flex lg:flex-row gap-3 sm:gap-4 w-full'>
      {/* Participating for */}
      <div className='bg-[var(--color-figma-dark-200)] flex flex-col gap-2 sm:gap-4 items-start justify-start p-3 sm:p-4 rounded-2xl lg:flex-1'>
        <div className='text-instrument font-normal text-sm sm:text-lg lg:text-[24px] text-[#8b8b8b] text-left'>
          Participating for
        </div>
        <div className='text-bagel text-xl sm:text-2xl md:text-3xl lg:text-[48px] text-[var(--color-figma-green-400)] text-center text-nowrap'>
          $50,000
        </div>
      </div>

      {/* Points earned */}
      <div className='bg-[var(--color-figma-dark-200)] flex flex-col gap-2 sm:gap-4 items-start justify-start p-3 sm:p-4 rounded-2xl lg:flex-1'>
        <div className='text-instrument font-normal text-sm sm:text-lg lg:text-[24px] text-[#8b8b8b] text-left w-full'>
          Points earned
        </div>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between text-[var(--color-figma-green-400)] text-center text-nowrap w-full gap-1'>
          <div className='text-bagel text-xl sm:text-2xl md:text-3xl lg:text-[48px]'>
            150
          </div>
          <div className='text-instrument font-normal text-sm sm:text-lg lg:text-[24px]'>
            PACHI
          </div>
        </div>
      </div>

      {/* Total Balls */}
      <div className='bg-[var(--color-figma-dark-200)] flex flex-col gap-2 sm:gap-4 items-start justify-start p-3 sm:p-4 rounded-2xl'>
        <div className='text-instrument font-normal text-sm sm:text-lg lg:text-[24px] text-[#8b8b8b] text-left text-nowrap'>
          Total Balls
        </div>
        <div className='flex flex-row gap-3 sm:gap-6 items-center justify-start'>
          <div className='text-bagel text-xl sm:text-2xl md:text-3xl lg:text-[48px] text-[var(--color-figma-green-400)] text-center text-nowrap'>
            1500
          </div>
          <div className='flex flex-row-reverse items-center justify-start pl-0 pr-1 sm:pr-2 py-0'>
            <div className='mr-[-4px] sm:mr-[-8px] order-2 relative shrink-0 w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8'>
              <img
                src={ASSETS.icons.usdtAlt}
                alt='USDT'
                className='w-full h-full object-contain'
              />
            </div>
            <div className='mr-[-4px] sm:mr-[-8px] order-1 relative shrink-0 w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8'>
              <img
                src={ASSETS.icons.hyperliquid}
                alt='Hyperliquid'
                className='w-full h-full object-contain'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Funds available */}
      <div className='bg-[var(--color-figma-dark-200)] flex flex-col gap-2 sm:gap-4 items-start justify-end p-3 sm:p-4 rounded-2xl'>
        <div className='text-instrument font-normal text-sm sm:text-lg lg:text-[24px] text-[#8b8b8b] text-center text-nowrap'>
          Funds available
        </div>
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 lg:gap-8 items-center justify-start w-full'>
          <div className='text-bagel text-xl sm:text-2xl md:text-3xl lg:text-[48px] text-[var(--color-figma-green-400)] text-center text-nowrap'>
            $1,200
          </div>
          <ActionButton
            text='Buy Balls'
            icon={ASSETS.icons.sphere}
            onClick={() => console.log("Buy Balls clicked")}
            className='w-full lg:w-auto bg-[var(--color-figma-green-400)] text-[var(--color-figma-dark-600)] border-[var(--color-figma-green-200)] text-xs sm:text-sm lg:text-base'
          />
        </div>
      </div>
    </div>
  )
}
