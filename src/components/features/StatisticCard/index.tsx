import React from "react"

interface StatisticCardProps {
  icon: string
  title: string
  value: string
}

export function StatisticCard({ icon, title, value }: StatisticCardProps) {
  return (
    <div className='bg-[var(--color-figma-dark-200)] flex flex-col gap-4 items-start justify-start p-4 rounded-2xl w-full h-full min-h-[140px] sm:min-h-[140px] md:min-h-[160px] transition-all duration-200 hover:bg-[var(--color-figma-dark-200)]/90'>
      <div className='flex flex-row gap-2 items-start justify-start w-full'>
        <div className='w-6 h-6 relative flex-shrink-0'>
          <img
            src={icon}
            alt={`${title} icon`}
            className='w-full h-full object-contain filter brightness-0 invert'
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>
        <div
          className='text-instrument font-normal text-lg sm:text-lg md:text-xl lg:text-2xl text-[var(--color-gray-200)] text-left leading-[1.1] flex-1'
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {title}
        </div>
      </div>
      <div className='text-bagel text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-[var(--color-figma-green-400)] text-left w-full leading-[1.1] break-words'>
        {value}
      </div>
    </div>
  )
}
