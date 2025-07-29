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
      className={`bg-[#f8aaff] relative rounded-[100px] w-[116px] transition-colors ${
        isActive ? "ring-2 ring-[#861e90]" : ""
      }`}
    >
      <div className='flex flex-row gap-2.5 items-center justify-center px-2.5 py-2 w-[116px]'>
        <div
          className={`text-instrument font-normal text-[20px] text-[#861e90] text-center uppercase ${
            percentage === "MAX" ? "font-bold" : ""
          }`}
        >
          {percentage}
        </div>
      </div>
    </button>
  )
}
