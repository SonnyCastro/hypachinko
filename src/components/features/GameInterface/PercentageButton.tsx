"use client"

import React from "react"

interface PercentageButtonProps {
  percentage: string
  onClick?: () => void
  isActive?: boolean
}

export function PercentageButton({
  percentage,
  onClick,
  isActive = false,
}: PercentageButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer relative rounded-[6.25rem] flex-1 min-w-0 h-8 sm:h-9 lg:h-10 transition-all duration-200 flex items-center justify-center`}
      style={{
        border: isActive
          ? "2px solid #861e90"
          : "1px solid var(--pink-200, #FBD2FF)",
        background: "var(--pink-400, #F8AAFF)",
        boxShadow:
          "0 4px 4px 0 rgba(255, 255, 255, 0.50) inset, 0 -4px 4px 0 rgba(0, 0, 0, 0.25) inset",
      }}
    >
      <div
        className={`text-instrument font-normal text-xs sm:text-sm lg:text-lg text-center uppercase leading-snug w-full ${
          percentage === "MAX" ? "text-max-button" : "text-[#861e90]"
        }`}
      >
        {percentage}
      </div>
    </button>
  )
}
