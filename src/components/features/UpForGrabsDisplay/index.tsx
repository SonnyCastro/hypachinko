"use client"

import React from "react"
import { ASSETS } from "@/constants/assets"

interface UpForGrabsDisplayProps {
  prizeAmount: string
  count: number
  sphereIcon?: string
}

export function UpForGrabsDisplay({
  prizeAmount,
  count,
  sphereIcon = ASSETS.icons.sphereSmall,
}: UpForGrabsDisplayProps) {
  return (
    <div className='bg-[var(--color-figma-green-400)] flex flex-col items-center justify-start py-4 w-full overflow-hidden relative'>
      {/* Title */}
      <div className='text-bagel text-[32px] text-[var(--color-figma-dark-600)] text-center w-full leading-[1.1]'>
        UP FOR GRABS
      </div>

      {/* Content Row with Animation */}
      <div className='w-full overflow-hidden select-none pointer-events-none'>
        <div className='flex flex-row gap-6 items-center justify-start animate-scroll whitespace-nowrap'>
          {/* Duplicate items for seamless scrolling animation */}
          {[...Array(count * 3)].map((_, i) => (
            <React.Fragment key={i}>
              <div className='text-bagel text-[64px] text-[var(--color-figma-dark-600)] text-left text-nowrap leading-[normal] flex-shrink-0'>
                {prizeAmount}
              </div>
              <div className='w-5 h-5 relative flex-shrink-0'>
                <img src={sphereIcon} alt='Sphere' className='w-full h-full' />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
