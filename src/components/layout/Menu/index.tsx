"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { truncateAddress } from "@/lib/utils"
import type { WalletConnection } from "@/types"
import { ASSETS } from "@/constants/assets"

// Local assets
const hypachinkoLogo = ASSETS.logos.hypachinko
const walletIcon = ASSETS.icons.wallet

interface BtnTextProps {
  text: string
  isActive?: boolean
  onClick?: () => void
}

function BtnText({ text, isActive = false, onClick }: BtnTextProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center px-2 py-1 rounded-[100px] transition-colors",
        "text-instrument font-normal text-[16px] leading-[1.1] text-center",
        isActive
          ? "text-[var(--color-figma-green-400)] bg-[var(--color-figma-dark-600)]"
          : "text-[var(--color-figma-green-400)] hover:bg-[var(--color-figma-dark-600)]/20"
      )}
    >
      <span className='whitespace-nowrap'>{text}</span>
    </button>
  )
}

interface MenuProps {
  className?: string
}

export function Menu({ className }: MenuProps) {
  const [walletConnection, setWalletConnection] = useState<WalletConnection>({
    isConnected: false,
  })

  const handleConnectWallet = async () => {
    // TODO: Implement wallet connection logic
    console.log("Connecting wallet...")
    // For now, simulate connection
    setWalletConnection({
      isConnected: true,
      address: "0x1234567890abcdef1234567890abcdef12345678",
      balance: 1.5,
      chainId: 1,
    })
  }

  const handleDisconnectWallet = () => {
    setWalletConnection({
      isConnected: false,
    })
  }

  return (
    <div
      className={cn(
        "backdrop-blur-[10px] bg-[var(--color-figma-dark-a)] border-b border-[var(--color-figma-dark-200)]",
        "flex items-center justify-between px-6 py-4 w-full",
        className
      )}
    >
      {/* Left side - Logo and Navigation */}
      <div className='flex items-center gap-3'>
        {/* Logo and Brand */}
        <div className='flex items-center gap-2'>
          <div className='w-12 h-12 relative'>
            <img
              src={hypachinkoLogo}
              alt='Hypachinko Logo'
              className='w-full h-full'
            />
          </div>
          <div className='text-bagel text-[32px] leading-[normal] text-[var(--color-figma-green-400)]'>
            Hypachinko
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className='flex items-center gap-2.5'>
          <BtnText text='Machines' />
          <BtnText text='Dashboard' />
          <BtnText text='Marketplace' />
        </div>
      </div>

      {/* Right side - Wallet Connection */}
      <div className='relative'>
        {walletConnection.isConnected ? (
          <div className='flex items-center gap-3'>
            <div className='text-[var(--color-figma-green-400)] text-[16px] text-instrument'>
              {truncateAddress(walletConnection.address || "")}
            </div>
            <button
              onClick={handleDisconnectWallet}
              className='bg-[var(--color-figma-green-400)] text-[var(--color-figma-dark-600)] px-4 py-3 rounded-[100px] text-instrument text-[16px] font-normal transition-colors hover:bg-[var(--color-figma-green-200)] relative'
            >
              <div className='absolute inset-0 pointer-events-none shadow-[0px_4px_4px_0px_inset_rgba(255,255,255,0.5),0px_-4px_4px_0px_inset_rgba(0,0,0,0.25)] rounded-[100px]' />
              <div className='absolute inset-0 pointer-events-none border border-[var(--color-figma-green-200)] rounded-[100px]' />
              <span className='relative'>Disconnect</span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleConnectWallet}
            className='bg-[var(--color-figma-green-400)] text-[var(--color-figma-dark-600)] px-4 py-3 rounded-[100px] text-instrument text-[16px] font-normal transition-colors hover:bg-[var(--color-figma-green-200)] relative flex items-center gap-2'
          >
            <div className='absolute inset-0 pointer-events-none shadow-[0px_4px_4px_0px_inset_rgba(255,255,255,0.5),0px_-4px_4px_0px_inset_rgba(0,0,0,0.25)] rounded-[100px]' />
            <div className='absolute inset-0 pointer-events-none border border-[var(--color-figma-green-200)] rounded-[100px]' />
            <div className='relative w-6 h-6'>
              <img
                src={walletIcon}
                alt='Wallet Icon'
                className='w-full h-full'
              />
            </div>
            <span className='relative'>Connect Wallet</span>
          </button>
        )}
      </div>
    </div>
  )
}
