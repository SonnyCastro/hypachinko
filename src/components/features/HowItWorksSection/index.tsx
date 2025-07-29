"use client"

import { ASSETS } from "@/constants/assets"
import { TokenJackpotCard } from "../TokenJackpotCard"
import { DrawTimer } from "../DrawTimer"
import { ActionButton } from "../ActionButton"

interface HowItWorksSectionProps {
  tokenCards: Array<{
    token: { name: string; price: string; icon: string }
    jackpotAmount: string
    borderColor: string
    bgColor: string
  }>
  drawTimers: Array<{
    token: { name: string; icon: string }
    timeLeft: string
    progressWidth: string
    progressColor: string
    alarmIcon: string
  }>
}

export function HowItWorksSection({
  tokenCards,
  drawTimers,
}: HowItWorksSectionProps) {
  return (
    <section className='w-full flex flex-col items-center justify-center py-24'>
      <div className='max-w-[1280px] w-full px-4'>
        {/* Section Title */}
        <div className='text-bagel text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[var(--color-figma-green-400)] text-start mb-8 sm:mb-10 lg:mb-12'>
          How it works?
        </div>

        {/* Main Content */}
        <div className='flex flex-col gap-6  items-center justify-center w-full'>
          {/* Top Row - Buy Balls and Wait for Draw */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch justify-center w-full'>
            {/* Buy Balls Card */}
            <div className='bg-[var(--color-figma-dark-200)] flex flex-col gap-12 items-center justify-start p-8 rounded-2xl w-full min-h-[400px]'>
              <div className='flex flex-col gap-4 items-start justify-start text-left w-full'>
                <div className='text-bagel text-3xl sm:text-4xl md:text-5xl  text-[var(--color-figma-green-400)] w-full'>
                  Buy Balls!
                </div>
                <div className='text-instrument font-normal text-base sm:text-lg md:text-xl text-[var(--color-gray-200)] w-full'>
                  Buy balls to enter a machine. The more balls you stack, the
                  better your odds!
                </div>
              </div>

              {/* Token Cards Grid */}
              <div className='flex flex-col gap-6 items-stretch justify-start w-full'>
                <div className='flex flex-col sm:flex-row gap-6 items-stretch justify-start w-full'>
                  <TokenJackpotCard {...tokenCards[0]} />
                  <TokenJackpotCard {...tokenCards[1]} />
                </div>
                <div className='flex flex-col sm:flex-row gap-6 items-stretch justify-start w-full'>
                  <TokenJackpotCard {...tokenCards[2]} />
                  <TokenJackpotCard {...tokenCards[3]} />
                </div>
              </div>
            </div>

            {/* Wait for the Draw Card */}
            <div className='bg-[var(--color-figma-dark-200)] flex flex-col gap-12 items-center justify-start p-8 rounded-2xl w-full min-h-[400px]'>
              <div className='flex flex-col gap-4 items-start justify-start text-left w-full'>
                <div className='text-bagel text-5xl text-[var(--color-figma-green-400)] w-full'>
                  Wait for the draw
                </div>
                <div className='text-instrument font-normal text-xl text-[var(--color-gray-200)] w-full'>
                  Hold those balls tight! Each machine has a unique draw time.
                  Winners are announced at the end of each draw.
                </div>
              </div>

              {/* Draw Timers */}
              <div className='flex flex-col gap-4 items-start justify-start w-full'>
                {drawTimers.map((timer, i) => (
                  <DrawTimer key={i} {...timer} />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row - Action Buttons */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch justify-center w-full'>
            {/* Sell Your Balls */}
            <div className='bg-[var(--color-figma-dark-200)] flex flex-col gap-8 items-end justify-start p-8 rounded-2xl w-full min-h-[300px]'>
              <div className='flex flex-col gap-4 items-start justify-start text-left w-full'>
                <div className='text-bagel text-5xl text-[var(--color-figma-green-400)] w-full'>
                  Sell your balls
                </div>
                <div className='text-instrument font-normal text-xl text-[var(--color-gray-200)] w-full'>
                  Bags too heavy? Resell your balls in the marketplace. If
                  you're lucky somebody will grab'em!
                </div>
              </div>
              <ActionButton
                text='Marketplace'
                icon={ASSETS.icons.ticket}
                onClick={() => console.log("Marketplace clicked")}
              />
            </div>

            {/* Add More Balls */}
            <div className='bg-[var(--color-figma-dark-200)] flex flex-col gap-8 items-end justify-start p-8 rounded-2xl w-full min-h-[300px]'>
              <div className='flex flex-col gap-4 items-start justify-start text-left w-full'>
                <div className='text-bagel text-5xl text-[var(--color-figma-green-400)] w-full'>
                  Add more balls!
                </div>
                <div className='text-instrument font-normal text-xl text-[var(--color-gray-200)] w-full'>
                  It takes balls to win! The more balls you stack the higher
                  your chances of hitting the jackpot.
                </div>
              </div>
              <ActionButton
                text='Machines'
                icon={ASSETS.icons.sphere}
                onClick={() => console.log("Machines clicked")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
