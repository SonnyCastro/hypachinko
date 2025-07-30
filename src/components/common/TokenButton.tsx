"use client"

import React from "react"
import { ASSETS } from "@/constants/assets"

interface TokenButtonProps {
  text: string
  icon: string
  isActive?: boolean
  onClick?: () => void
}

export function TokenButton({
  text,
  icon,
  isActive = false,
  onClick,
}: TokenButtonProps) {
  // Use black USDT icon when USDT token is active
  const getIcon = () => {
    if (isActive && text.toLowerCase() === "usdt0") {
      return ASSETS.icons.usdtBlack
    }
    return icon
  }

  return (
    <button
      onClick={onClick}
      className={`
        bg-[var(--color-figma-dark-600)] cursor-pointer flex flex-row gap-0.5 sm:gap-1 items-center justify-center p-1 sm:p-1.5 md:p-2 rounded-[100px] flex-1 min-w-0 h-8 sm:h-10 md:h-11 lg:h-12 transition-colors relative
        ${
          isActive
            ? "bg-[var(--color-figma-green-400)]"
            : "md:hover:bg-[rgba(63,239,192,0.2)]"
        }
      `}
      style={{ fontVariationSettings: "'wdth' 100" }}
    >
      {/* Border - always present */}
      <div className='absolute border border-[rgba(63,239,192,0.04)] border-solid inset-0 pointer-events-none rounded-[100px]' />

      {/* Icon - no extra styling when active */}
      <div className='overflow-clip relative shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8'>
        <div className='absolute inset-[2.381%]'>
          <img src={getIcon()} alt={text} className='w-full h-full' />
        </div>
      </div>

      {/* Text */}
      <div
        className={`
          text-instrument font-normal text-xs sm:text-sm md:text-base lg:text-xl text-center uppercase leading-[1.1] relative flex-1 min-w-0
          ${
            isActive
              ? "text-[var(--color-figma-dark-600)]"
              : "text-[var(--color-figma-green-400)]"
          }
        `}
      >
        <span className='truncate block w-full'>{text}</span>
      </div>
    </button>
  )
}
