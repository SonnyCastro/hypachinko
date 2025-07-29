"use client"

import React from "react"
import { ASSETS } from "@/constants/assets"

interface TokenButtonProps {
  text: string
  icon: string
  isActive?: boolean
  onClick?: () => void
}

export function TokenButton({ text, icon, isActive = false, onClick }: TokenButtonProps) {
  // Use black USDT icon when USDT token is active
  const getIcon = () => {
    if (isActive && text.toLowerCase() === 'usdt0') {
      return ASSETS.icons.usdtBlack
    }
    return icon
  }

  return (
    <button
      onClick={onClick}
      className={`
        cursor-pointer flex flex-row gap-1 items-center justify-start p-2 rounded-[100px] w-[130px] h-12 transition-colors relative
        ${isActive 
          ? "bg-[var(--color-figma-green-400)]" 
          : "hover:bg-[rgba(63,239,192,0.2)]"
        }
      `}
      style={{ fontVariationSettings: "'wdth' 100" }}
    >
      {/* Border - always present */}
      <div className="absolute border border-[rgba(63,239,192,0.04)] border-solid inset-0 pointer-events-none rounded-[100px]" />
      
      {/* Icon - no extra styling when active */}
      <div className="overflow-clip relative shrink-0 w-8 h-8">
        <div className="absolute inset-[2.381%]">
          <img src={getIcon()} alt={text} className="w-full h-full" />
        </div>
      </div>
      
      {/* Text */}
      <div
        className={`
          text-instrument font-normal text-[20px] text-center uppercase leading-[1.1] text-nowrap relative shrink-0
          ${isActive 
            ? "text-[var(--color-figma-dark-600)]" 
            : "text-[var(--color-figma-green-400)]"
          }
        `}
      >
        <span className="whitespace-pre">{text}</span>
      </div>
    </button>
  )
} 