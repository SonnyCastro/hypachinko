"use client"

import React, { useState, useEffect } from "react"

interface LightStripProps {
  isReversed?: boolean
  className?: string
  color?: string
  activeColor?: string
}

export function LightStrip({
  isReversed = false,
  className = "",
  color = "var(--color-figma-green-400)",
  activeColor = "var(--color-figma-green-400)",
}: LightStripProps) {
  const [activeLightIndex, setActiveLightIndex] = useState(0)
  const totalLights = 10

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLightIndex((prev) => (prev + 1) % totalLights)
    }, 350)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className='flex-none scale-y-[-100%]'>
        <div className='flex flex-col gap-2 items-start justify-start'>
          {Array.from({ length: totalLights }, (_, index) => {
            const lightIndex = isReversed ? totalLights - 1 - index : index
            const isActive = lightIndex === activeLightIndex

            return (
              <div
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  isActive
                    ? "shadow-[0px_0px_16px_0px_rgba(63,239,192,0.8)]"
                    : "opacity-40"
                }`}
                style={{
                  backgroundColor: isActive ? activeColor : color,
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
