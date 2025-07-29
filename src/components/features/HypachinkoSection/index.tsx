"use client"

import { ASSETS } from "@/constants/assets"
import { StatisticCard } from "../StatisticCard"

interface HypachinkoSectionProps {
  statistics: Array<{
    icon: string
    title: string
    value: string
  }>
}

export function HypachinkoSection({ statistics }: HypachinkoSectionProps) {
  return (
    <section className='w-full flex flex-col items-center justify-center py-24'>
      <div className='max-w-[1280px] w-full px-4'>
        {/* Section Title */}
        <div className='text-bagel text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[var(--color-figma-green-400)] text-start mb-8 sm:mb-10 lg:mb-12'>
          Hypachinko
        </div>

        {/* Main Content */}
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-6 items-start justify-center w-full'>
          {/* Left Column - Image and Description */}
          <div className='flex flex-col gap-8 items-start justify-center w-full max-w-[628px]'>
            {/* Gameplay Image */}
            <div
              className='w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[332px] rounded-2xl bg-center bg-cover bg-no-repeat'
              style={{ backgroundImage: `url('${ASSETS.images.gameplay}')` }}
            />

            {/* Description */}
            <div className='flex flex-col gap-4 items-start justify-start w-full'>
              <div className='text-instrument font-normal text-base sm:text-lg md:text-xl text-[var(--color-gray-200)] text-left leading-relaxed'>
                <p className='mb-4'>
                  Let your balls drop! Watch them bounce and hit massive
                  jackpots!
                </p>
                <p>
                  The most thrilling onchain pachinko experience on HyperEVM.
                  Drop your balls, watch them bounce, and win massive jackpots!
                </p>
              </div>

              {/* Powered by */}
              <div className='flex flex-row gap-4 items-center justify-start'>
                <div className='text-instrument font-normal text-xl text-[var(--color-figma-green-200)] text-left'>
                  Powered by
                </div>
                <div className='h-5 w-24 relative'>
                  <img
                    src={ASSETS.logos.hyperliquid}
                    alt='Hyperliquid'
                    className='w-full h-full object-contain'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Statistics */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6 lg:gap-8 items-start justify-start w-full max-w-[628px]'>
            {statistics.map((stat, i) => (
              <StatisticCard key={i} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
