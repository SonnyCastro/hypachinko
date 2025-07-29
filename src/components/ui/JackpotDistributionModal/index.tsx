"use client"

import React from "react"
import { Modal } from "../Modal"

interface JackpotDistributionModalProps {
  isOpen: boolean
  onClose: () => void
  totalJackpot: string
}

interface DistributionItem {
  rank: string
  percentage: string
  amount: string
  emoji: string
}

export function JackpotDistributionModal({ 
  isOpen, 
  onClose, 
  totalJackpot 
}: JackpotDistributionModalProps) {
  // Calculate amounts based on total jackpot
  const totalAmount = parseFloat(totalJackpot.replace(/[$,]/g, ""))
  
  const distribution: DistributionItem[] = [
    { rank: "🥇 50%", percentage: "50%", amount: `$${(totalAmount * 0.5).toLocaleString()}`, emoji: "🥇" },
    { rank: "🥈 25%", percentage: "25%", amount: `$${(totalAmount * 0.25).toLocaleString()}`, emoji: "🥈" },
    { rank: "🥉 12.5%", percentage: "12.5%", amount: `$${(totalAmount * 0.125).toLocaleString()}`, emoji: "🥉" },
    { rank: "🏅 7.5%", percentage: "7.5%", amount: `$${(totalAmount * 0.075).toLocaleString()}`, emoji: "🏅" },
    { rank: "🏅 5%", percentage: "5%", amount: `$${(totalAmount * 0.05).toLocaleString()}`, emoji: "🏅" },
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="backdrop-blur-[10px] backdrop-filter bg-[rgba(27,14,24,0.9)] relative rounded-lg w-full">
        <div className="box-border content-stretch flex flex-col items-end justify-start overflow-clip p-0 relative w-full">
          {/* Header */}
          <div className="bg-[#2b1a27] box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[16px] relative shrink-0 w-full">
            <div
              className="basis-0 font-instrument font-bold grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#3fefc0] text-[20px] text-center"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <p className="block leading-[1.1] whitespace-pre-wrap">JACKPOT Distribution</p>
            </div>
          </div>
          
          {/* Distribution list */}
          <div className="box-border content-stretch flex flex-col gap-[9px] items-start justify-start p-[16px] relative shrink-0 w-full">
            {distribution.map((item, index) => (
              <div
                key={index}
                className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full"
              >
                <div className="box-border content-stretch flex flex-row gap-[9px] items-center justify-start p-0 relative shrink-0">
                  <div
                    className="font-instrument font-bold leading-[0] relative shrink-0 text-[#dedede] text-[20px] text-center text-nowrap"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <p className="block leading-[1.1] whitespace-pre">{item.rank}</p>
                  </div>
                </div>
                <div
                  className="font-instrument font-normal leading-[0] relative shrink-0 text-[#3fefc0] text-[20px] text-center text-nowrap"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  <p className="block leading-[1.1] whitespace-pre">{item.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Border */}
        <div className="absolute border border-[#2b1a27] border-solid inset-0 pointer-events-none rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.5)]" />
      </div>
    </Modal>
  )
} 