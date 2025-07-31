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
        <div className='flex flex-row items-center justify-start animate-scroll whitespace-nowrap'>
          {/* Generate multiple sets for seamless infinite loop */}
          {[...Array(6)].map((_, setIndex) => (
            <React.Fragment key={`set-${setIndex}`}>
              {[...Array(count)].map((_, i) => (
                <React.Fragment key={`${setIndex}-${i}`}>
                  <div className='text-bagel text-[32px] sm:text-[48px] md:text-[56px] lg:text-[64px] text-[var(--color-figma-dark-600)] text-left text-nowrap leading-[normal] flex-shrink-0 px-3'>
                    {prizeAmount}
                  </div>
                  <div className='w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 relative flex-shrink-0'>
                    <img
                      src={sphereIcon}
                      alt='Sphere'
                      className='w-full h-full object-contain'
                    />
                  </div>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
