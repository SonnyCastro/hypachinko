"use client"

import React from "react"

interface JackpotCountdownProps {
  jackpotAmount: string
  timeLeft: string
  tokenInfo: {
    icon: string
    name: string
    rate: string
    price: string
  }
  onInfoClick?: () => void
}

export function JackpotCountdown({
  jackpotAmount,
  timeLeft,
  tokenInfo,
  onInfoClick,
}: JackpotCountdownProps) {
  return (
    <div className='flex flex-col gap-4 items-start justify-start w-full'>
      {/* Token info */}
      <div className='backdrop-blur-[10px] flex flex-row items-center justify-between rounded-lg w-full'>
        <div className='flex flex-row gap-1 items-center justify-start'>
          <div className='w-8 h-8 relative'>
            <img
              src={tokenInfo.icon}
              alt={tokenInfo.name}
              className='w-full h-full'
            />
          </div>
          <div className='text-instrument font-bold text-[20px] text-[#3fefc0] text-center'>
            {tokenInfo.name}
          </div>
        </div>
        <div className='flex flex-row gap-2 items-center justify-start text-[#dedede] text-[16px] text-center'>
          <div className='text-instrument font-normal'>{tokenInfo.rate}</div>
          <div className='text-instrument font-normal'>({tokenInfo.price})</div>
        </div>
      </div>

      {/* Jackpot and timer */}
      <div className='flex flex-row gap-4 items-center justify-start w-full'>
        {/* Left lights */}
        <div className='flex items-center justify-center'>
          <div className='flex-none scale-y-[-100%]'>
            <div className='flex flex-col gap-2 items-start justify-start'>
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`relative rounded-[100px] w-4 h-4 ${
                    i === 0 ? "" : "opacity-60"
                  }`}
                >
                  <div className='absolute inset-0 rounded-[100px] bg-gradient-radial from-[#85ffde] via-[#62f7cf] to-[#3fefc0]' />
                  <div className='absolute inset-0 rounded-[100px] border border-[#85ffde]' />
                  {i === 0 && (
                    <div className='absolute inset-0 rounded-[100px] shadow-[0px_0px_16px_0px_rgba(63,239,192,0.8)]' />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main jackpot card */}
        <div className='basis-0 bg-[#2b1a27] flex flex-col grow items-start justify-start min-h-px min-w-px rounded-2xl border border-[#3fefc0]'>
          <div className='flex flex-col items-center justify-start p-3 w-full'>
            <div className='absolute border-[#1b0e18] border-b-4 inset-0 pointer-events-none' />
            <div className='flex flex-row gap-2 items-start justify-center w-full'>
              <div className='text-instrument font-bold text-[20px] text-[#ffef0a] text-center'>
                JACKPOT
              </div>
              <button className='w-5 h-5 relative' onClick={onInfoClick}>
                <img
                  src='/icons/info-circle.svg'
                  alt='Info'
                  className='w-full h-full'
                />
              </button>
            </div>
            <div className='text-bagel text-[48px] text-[#ffef0a] text-center w-full'>
              {jackpotAmount}
            </div>
          </div>
          <div className='flex flex-col items-center justify-start p-3 text-[#3fefc0] text-center w-full'>
            <div className='text-instrument font-bold text-[20px] w-full'>
              Time Left
            </div>
            <div className='text-bagel text-[48px] w-full'>{timeLeft}</div>
          </div>
        </div>

        {/* Right lights */}
        <div className='flex items-center justify-center'>
          <div className='flex-none scale-y-[-100%]'>
            <div className='flex flex-col gap-2 items-start justify-start'>
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`relative rounded-[100px] w-4 h-4 ${
                    i === 0 ? "" : "opacity-60"
                  }`}
                >
                  <div className='absolute inset-0 rounded-[100px] bg-gradient-radial from-[#85ffde] via-[#62f7cf] to-[#3fefc0]' />
                  <div className='absolute inset-0 rounded-[100px] border border-[#85ffde]' />
                  {i === 0 && (
                    <div className='absolute inset-0 rounded-[100px] shadow-[0px_0px_16px_0px_rgba(63,239,192,0.8)]' />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
