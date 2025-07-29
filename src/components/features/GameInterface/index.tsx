"use client"

import React from "react"
import { ASSETS } from "@/constants/assets"
import { PercentageButton } from "./PercentageButton"
import { ActionButton } from "../ActionButton"
import { LightStrip } from "../../common/LightStrip"
import { CountdownTimer } from "../CountdownTimer"
import { TokenData, getTokenData } from "@/constants/tokenData"
import { JackpotDistributionModal } from "../../ui/JackpotDistributionModal"
import { useJackpotModal } from "@/hooks/useJackpotModal"
import { MAX_BALLS, PERCENTAGE_OPTIONS } from "@/constants/game"

interface GameInterfaceProps {
  selectedToken: string
  selectedPercentage: string
  ballCount: number
  onBuyBalls?: () => void
  onPercentageSelect?: (percentage: string) => void
  onBallCountChange?: (count: number) => void
}

export function GameInterface({
  selectedToken,
  selectedPercentage,
  ballCount,
  onBuyBalls,
  onPercentageSelect,
  onBallCountChange,
}: GameInterfaceProps) {
  // Get token data based on selected token
  const tokenData: TokenData | null = React.useMemo(() => {
    return getTokenData(selectedToken)
  }, [selectedToken])

  // Fallback to default data if token not found
  const defaultTokenData: TokenData = {
    id: "usdt0",
    name: "USDT0",
    icon: ASSETS.icons.usdt,
    jackpotAmount: "$50,000",
    startTime: new Date(
      Date.now() + 7 * 60 * 60 * 1000 + 35 * 60 * 1000 + 24 * 1000
    ),
    rate: "1 USDT0 = 1 BALL",
    price: "$0.99",
    availableAmount: "50,000 USDT available",
    lightStripColor: "#00B988", // Default green
  }

  const currentTokenData = tokenData || defaultTokenData

  // Modal state
  const { isModalOpen, openModal, closeModal } = useJackpotModal()

  return (
    <div className='h-[564px] relative rounded-bl-[48px] rounded-br-[48px] rounded-tl-[8px] rounded-tr-[8px] w-full border-4 border-[#dedede] bg-[var(--color-figma-dark-600)] overflow-hidden'>
      <div className='flex flex-col h-full items-start justify-start w-full'>
        {/* Header section */}
        <div className='flex flex-col gap-4 items-start justify-start p-4 w-full'>
          {/* Token info and rate */}
          <div className='backdrop-blur-[10px] backdrop-filter flex flex-row items-center justify-between w-full rounded-lg'>
            <div className='flex flex-row gap-1 items-center justify-start'>
              <div className='w-8 h-8 relative'>
                <img
                  src={currentTokenData.icon}
                  alt={currentTokenData.name}
                  className='w-full h-full'
                />
              </div>
              <div className='text-instrument font-bold text-[20px] text-[var(--color-figma-green-400)] text-center'>
                {currentTokenData.name}
              </div>
            </div>
            <div className='flex flex-row gap-2 items-center justify-start text-[var(--color-gray-400)] text-[16px] text-center'>
              <div>{currentTokenData.rate}</div>
              <div>({currentTokenData.price})</div>
            </div>
          </div>

          {/* Jackpot and timer section */}
          <div className='flex flex-row gap-4 items-center justify-start w-full'>
            {/* Left lights */}
            <LightStrip
              color={currentTokenData.lightStripColor}
              activeColor={currentTokenData.lightStripColor}
            />

            {/* Jackpot card */}
            <div className='bg-[var(--color-figma-dark-200)] flex flex-col items-start justify-start rounded-2xl w-full'>
              <div className='flex flex-col items-center justify-start p-3 w-full relative'>
                <div className='absolute border-[var(--color-figma-dark-600)] border-[0px_0px_4px] border-solid bottom-0 left-0 right-0 pointer-events-none' />
                <div className='flex flex-row gap-2 items-start justify-center w-full'>
                  <div
                    className='text-instrument font-bold text-[20px] text-[var(--color-figma-yellow-200)] text-center text-nowrap'
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontSize: "1.25rem",
                      fontWeight: "700",
                      lineHeight: "110%",
                    }}
                  >
                    JACKPOT
                  </div>
                  <button
                    onClick={openModal}
                    className='w-5 h-5 relative cursor-pointer overflow-clip'
                  >
                    <div className='absolute bottom-[8.3%] left-[8.333%] right-[8.333%] top-[8.333%]'>
                      <img
                        src={ASSETS.icons.infoCircle}
                        alt='Info'
                        className='w-full h-full'
                      />
                    </div>
                  </button>
                </div>
                <div
                  className='text-bagel text-[48px] text-[var(--color-figma-yellow-200)] text-center w-full'
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {currentTokenData.jackpotAmount}
                </div>
              </div>
              <div className='flex flex-col items-center justify-start p-3 text-[var(--color-figma-green-400)] text-center w-full'>
                <div
                  className='text-instrument text-center w-full'
                  style={{
                    fontVariationSettings: "'wdth' 100",
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    lineHeight: "110%",
                  }}
                >
                  Time Left
                </div>
                <CountdownTimer
                  startTime={currentTokenData.startTime}
                  className='text-[var(--color-figma-green-400)]'
                />
              </div>
            </div>

            {/* Right lights */}
            <LightStrip
              color={currentTokenData.lightStripColor}
              activeColor={currentTokenData.lightStripColor}
            />
          </div>
        </div>

        {/* Purchase section */}
        <div className='flex flex-col gap-2 items-start justify-start p-4 w-full bg-gradient-to-l from-neutral-600 via-neutral-400 to-neutral-600'>
          <div className='bg-[rgba(255,255,255,0.6)] flex flex-col gap-3 items-start justify-start p-3 rounded-lg w-full backdrop-blur-sm'>
            <div className='flex flex-row gap-2 items-center justify-start w-full'>
              <div className='basis-0 flex flex-col grow items-start justify-start min-h-px min-w-px text-start'>
                <input
                  type='number'
                  value={ballCount || ""}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0
                    onBallCountChange?.(value)
                  }}
                  onKeyDown={(e) => {
                    // Allow: backspace, delete, tab, escape, enter, and arrow keys
                    if (
                      [8, 9, 27, 13, 37, 38, 39, 40].includes(e.keyCode) ||
                      // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                      (e.keyCode === 65 && e.ctrlKey === true) ||
                      (e.keyCode === 67 && e.ctrlKey === true) ||
                      (e.keyCode === 86 && e.ctrlKey === true) ||
                      (e.keyCode === 88 && e.ctrlKey === true)
                    ) {
                      return
                    }
                    // Ensure that it is a number and stop the keypress if not
                    if (
                      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
                      (e.keyCode < 96 || e.keyCode > 105)
                    ) {
                      e.preventDefault()
                    }
                  }}
                  min='0'
                  max={MAX_BALLS.toString()}
                  className='text-[var(--color-figma-dark-600)] text-5xl text-start bg-transparent border-none outline-none w-full font-instrument font-normal leading-[1.1] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-number-spin-button]:appearance-none focus:ring-0 focus:border-none cursor-text placeholder:text-black'
                  placeholder='0'
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                    fontVariationSettings: "'wdth' 100",
                  }}
                />
                <div className='text-[#8b8b8b] text-sm text-nowrap'>
                  {currentTokenData.availableAmount}
                </div>
              </div>
              <div className='bg-[#dedede] flex flex-row gap-1 items-center justify-start p-1 rounded'>
                <div className='w-4 h-4 relative'>
                  <img
                    src={ASSETS.icons.sphere}
                    alt='Balls'
                    className='w-full h-full'
                  />
                </div>
                <div className='text-instrument font-normal text-base text-[#8b8b8b] text-center'>
                  {ballCount} Balls
                </div>
              </div>
            </div>
            <div className='flex flex-row gap-2 items-center justify-between w-full'>
              {PERCENTAGE_OPTIONS.map((percentage) => (
                <PercentageButton
                  key={percentage}
                  percentage={percentage}
                  onClick={() => onPercentageSelect?.(percentage)}
                  isActive={selectedPercentage === percentage}
                />
              ))}
            </div>
          </div>
          <ActionButton
            text='Buy Balls'
            onClick={onBuyBalls}
            className='h-15 rounded-bl-[32px] rounded-br-[32px] rounded-tl-[4px] rounded-tr-[4px] w-full'
          />
        </div>
      </div>

      {/* Jackpot Distribution Modal */}
      <JackpotDistributionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        totalJackpot={currentTokenData.jackpotAmount}
      />
    </div>
  )
}
