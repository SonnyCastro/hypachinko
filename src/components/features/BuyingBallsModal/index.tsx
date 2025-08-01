"use client"

import React, { useState } from "react"
import { Modal } from "@/components/ui/Modal"
import { ASSETS } from "@/constants/assets"
import type { MarketplaceItem } from "@/types"

interface BuyingBallsModalProps {
  isOpen: boolean
  onClose: () => void
  itemData?: MarketplaceItem | null
}

export function BuyingBallsModal({
  isOpen,
  onClose,
  itemData,
}: BuyingBallsModalProps) {
  const [price, setPrice] = useState("0")

  const defaultData = {
    token: "HYPE",
    balls: 200,
    currentValue: 2337,
    jackpot: 50000,
    odds: 200,
    tokenPrice: 46.74,
  }

  // Map itemData to the expected structure
  const data = itemData
    ? {
        token: itemData.token,
        balls: parseInt(itemData.ballsCount) || defaultData.balls,
        currentValue:
          parseInt(itemData.price.replace(/[^0-9]/g, "")) ||
          defaultData.currentValue,
        jackpot: 50000, // Default jackpot
        odds: 200, // Default odds
        tokenPrice: defaultData.tokenPrice, // Keep default price
      }
    : defaultData

  // Handle manual price input
  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "")
    setPrice(numericValue)
  }

  // Calculate percentage from price
  const calculatePercentageFromPrice = (priceValue: string): string => {
    const currentValue = data.currentValue || 1
    const priceNum = parseFloat(priceValue) || 0
    if (priceNum === 0) return "0"
    return Math.round((priceNum / currentValue) * 100).toString()
  }

  const handleBack = () => {
    onClose()
  }

  const handleBuyBalls = () => {
    // TODO: Implement buy balls functionality
    console.log("Buying balls for:", itemData?.id, "at price:", price)
    onClose()
  }

  // Get token icon based on token type
  const getTokenIcon = (token: string) => {
    switch (token.toLowerCase()) {
      case "usdt0":
        return ASSETS.icons.usdt
      case "hype":
        return ASSETS.icons.hyperliquid
      case "tkn":
      case "tkn2":
      case "tkn3":
        return ASSETS.icons.pokerChipBlue
      default:
        return ASSETS.icons.hyperliquid
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className='max-w-md'>
      <div className='bg-[#1b0e18] relative rounded-2xl w-full'>
        <div className='flex flex-col gap-5 items-center justify-start overflow-hidden px-3 py-3.5 relative w-full'>
          {/* Header */}
          <div className='flex flex-row items-start justify-between p-0 relative shrink-0 w-full'>
            <div className='flex flex-col gap-1 items-start justify-start p-0 relative w-[261px]'>
              <div className='text-bagel text-[32px] text-[var(--color-figma-green-400)] w-full'>
                Buying Balls
              </div>
              <div className='text-instrument font-normal text-[16px] text-[#dedede] w-full'>
                That's a nice bag of balls you're buying.
              </div>
            </div>
            <button
              className='block cursor-pointer relative shrink-0 w-6 h-6'
              onClick={onClose}
            >
              <div className='absolute inset-1/4'>
                <img
                  src={ASSETS.icons.x}
                  alt='Close'
                  className='w-full h-full object-contain'
                />
              </div>
            </button>
          </div>

          {/* Token Information Section */}
          <div className='flex flex-col items-start justify-end p-0 relative rounded-2xl shrink-0 w-full'>
            <div className='absolute border border-[rgba(63,239,192,0.04)] border-solid inset-0 pointer-events-none rounded-2xl' />
            <div className='flex flex-row items-start justify-between p-2 relative shrink-0 w-full'>
              <div className='absolute border-[0px_0px_1px] border-[rgba(63,239,192,0.04)] border-solid inset-0 pointer-events-none' />
              <div className='flex flex-row gap-2 items-center justify-start p-0 relative shrink-0'>
                <div className='flex flex-row gap-1 items-center justify-start p-0 relative shrink-0'>
                  <div className='overflow-hidden relative shrink-0 w-5 h-5'>
                    <img
                      src={getTokenIcon(data.token)}
                      alt={data.token}
                      className='w-full h-full object-contain'
                    />
                  </div>
                  <div className='text-instrument font-bold text-[20px] text-[var(--color-figma-green-400)] text-center text-nowrap'>
                    {data.token}
                  </div>
                </div>
                <div className='text-instrument font-normal text-[20px] text-[#dedede] text-left text-nowrap'>
                  {data.balls?.toLocaleString() || "0"}
                </div>
              </div>
              <div className='bg-[#2b1a27] flex flex-row gap-1 items-center justify-start p-1 relative rounded shrink-0'>
                <div className='overflow-hidden relative shrink-0 w-4 h-4'>
                  <img
                    src={ASSETS.icons.sphere}
                    alt='Sphere'
                    className='w-full h-full object-contain'
                  />
                </div>
                <div className='text-instrument font-normal text-[16px] text-[#dedede] text-left text-nowrap'>
                  {data.balls?.toLocaleString() || "0"}
                </div>
              </div>
            </div>

            {/* Current Value Section */}
            <div className='flex flex-col gap-2 items-start justify-start p-4 relative shrink-0 w-full'>
              <div className='absolute border-[0px_0px_1px] border-[rgba(63,239,192,0.04)] border-solid inset-0 pointer-events-none' />
              <div className='flex flex-row items-center justify-between p-0 relative shrink-0 w-full'>
                <div className='text-instrument font-normal text-[20px] text-[#dedede] text-left text-nowrap'>
                  Current Value
                </div>
                <div className='flex flex-row gap-1 items-center justify-start p-0 relative shrink-0'>
                  <div className='overflow-hidden relative shrink-0 w-4 h-4'>
                    <img
                      src={ASSETS.icons.coingecko}
                      alt='CoinGecko'
                      className='w-full h-full object-contain'
                    />
                  </div>
                  <div className='text-instrument font-normal text-[14px] text-[#dedede] text-center text-nowrap'>
                    1 {data.token} = ${data.tokenPrice}
                  </div>
                </div>
              </div>
              <div className='text-instrument font-normal text-[32px] text-[#dedede] text-center text-nowrap'>
                ${data.currentValue?.toLocaleString() || "0"}
              </div>
            </div>

            {/* Jackpot and Odds Section */}
            <div className='flex flex-row items-end justify-start p-0 relative shrink-0 w-full'>
              <div className='basis-0 flex flex-row gap-2 grow items-start justify-center p-2 relative shrink-0'>
                <div className='absolute border-[0px_1px_0px_0px] border-[rgba(63,239,192,0.04)] border-solid inset-0 pointer-events-none' />
                <div className='basis-0 font-instrument font-normal grow relative shrink-0 text-[#dedede] text-[16px] text-left'>
                  Jackpot
                </div>
                <div className='text-instrument font-normal text-[16px] text-[#dedede] text-left text-nowrap'>
                  ${data.jackpot?.toLocaleString() || "0"}
                </div>
              </div>
              <div className='basis-0 flex flex-row gap-2 grow items-start justify-start p-2 relative shrink-0 text-[#dedede] text-[16px] text-left'>
                <div className='basis-0 grow relative shrink-0'>Odds</div>
                <div className='relative shrink-0 text-nowrap'>
                  {data.odds || "0"}
                </div>
              </div>
            </div>
          </div>

          {/* Price Input Section */}
          <div className='flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full'>
            <div className='text-instrument font-normal text-[16px] text-[#ffffff] text-left w-full'>
              Set Total price in USD
            </div>

            {/* Price Input */}
            <div className='bg-[#2b1a27] flex flex-row items-center justify-between p-2 relative rounded-lg shrink-0 w-full'>
              <div className='flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px text-start'>
                <input
                  type='text'
                  value={price}
                  onChange={(e) => handlePriceChange(e.target.value)}
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
                    // Allow numbers only
                    if (e.keyCode >= 48 && e.keyCode <= 57) {
                      return
                    }
                    e.preventDefault()
                  }}
                  placeholder='0'
                  className='bg-transparent text-instrument font-normal text-[32px] text-[#dedede] w-full outline-none border-none'
                />
              </div>
              <div className='text-instrument font-normal text-[16px] text-[#dedede] text-center text-nowrap'>
                = {calculatePercentageFromPrice(price)}%
              </div>
            </div>
          </div>

          {/* Warning Message */}
          <div className='flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full'>
            <div className='overflow-hidden relative shrink-0 w-4 h-4'>
              <img
                src={ASSETS.icons.alertTriangle}
                alt='Warning'
                className='w-full h-full object-contain'
              />
            </div>
            <div className='text-instrument font-normal text-[14px] text-[#f62323] text-left'>
              Balls listed on the marketplace are not eligible for prizes.
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-row gap-3 items-center justify-end p-0 relative shrink-0 w-full'>
            <button
              onClick={handleBack}
              className='text-instrument font-normal text-[16px] text-[#dedede] text-center hover:text-[#3fefc0] transition-colors'
            >
              Back
            </button>
            <button
              onClick={handleBuyBalls}
              className='bg-[#3fefc0] flex flex-row gap-2 items-center justify-center px-4 py-2 relative rounded-lg shrink-0 hover:bg-[#2dd4a8] transition-colors'
            >
              <div className='overflow-hidden relative shrink-0 w-5 h-5'>
                <img
                  src={ASSETS.icons.sphereSmall}
                  alt='Sphere'
                  className='w-full h-full object-contain'
                />
              </div>
              <div className='text-instrument font-medium text-[16px] text-[#1b0e18] text-center'>
                Buy Balls
              </div>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
