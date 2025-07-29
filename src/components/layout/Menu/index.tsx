"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
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
  href?: string
  onClick?: () => void
}

function BtnText({ text, href, onClick }: BtnTextProps) {
  const content = (
    <div className="flex flex-row gap-2.5 items-center justify-center px-2 py-1 relative rounded-[100px] hover:bg-[rgba(63,239,192,0.1)] transition-colors">
      <div
        className="text-instrument font-normal text-[16px] leading-[1.1] text-center text-[var(--color-figma-green-400)] text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <span className="whitespace-pre hover:opacity-80 transition-opacity">
          {text}
        </span>
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} onClick={onClick}>
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick}>
      {content}
    </button>
  )
}

interface BtnIcontextProps {
  text: string
  leftIcon?: React.ReactNode
  onClick?: () => void
}

function BtnIcontext({ text, leftIcon, onClick }: BtnIcontextProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[var(--color-figma-green-400)] relative rounded-[100px] shrink-0"
      style={{
        boxShadow: '0px 4px 4px 0px inset rgba(255,255,255,0.5), 0px -4px 4px 0px inset rgba(0,0,0,0.25)',
        border: '1px solid var(--color-figma-green-200)',
      }}
    >
      <div className="flex flex-row gap-2 items-center justify-center px-4 py-3">
        {leftIcon && <div className="w-6 h-6 relative">{leftIcon}</div>}
        <div
          className="text-instrument font-normal text-[16px] text-[var(--color-figma-dark-600)] text-center leading-[1.1] text-nowrap"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          <span className="whitespace-pre">{text}</span>
        </div>
      </div>
    </button>
  )
}

function TablerIconWallet() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-[16.667%]">
        <div className="absolute inset-[-6.25%]">
          <img src={walletIcon} alt="Wallet" className="w-full h-full" />
        </div>
      </div>
    </div>
  )
}

interface MenuProps {
  className?: string
}

export function Menu({ className }: MenuProps) {
  const [walletConnection, setWalletConnection] = useState<WalletConnection>({
    isConnected: false,
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

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
    setIsMobileMenuOpen(false)
  }

  const handleDisconnectWallet = () => {
    setWalletConnection({
      isConnected: false,
    })
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <div
        className={cn(
          "backdrop-blur-[10px] bg-[var(--color-figma-dark-600)] border-b border-[var(--color-figma-dark-200)]",
          "flex items-center justify-between px-6 py-4 w-full relative",
          className
        )}
      >
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center gap-3">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-2 h-12 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 relative">
              <img
                src={hypachinkoLogo}
                alt="Hypachinko Logo"
                className="w-full h-full"
              />
            </div>
            <div className="text-bagel text-[32px] leading-[normal] text-[var(--color-figma-green-400)] text-nowrap">
              Hypachinko
            </div>
          </Link>

          {/* Desktop Navigation Buttons */}
          <div className="hidden md:flex items-center gap-2.5 h-12">
            <BtnText text="Machines" href="/machines" />
            <BtnText text="Dashboard" href="/dashboard" />
            <BtnText text="Marketplace" href="/marketplace" />
          </div>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-[var(--color-figma-green-400)] p-2"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center gap-1">
              <div className={cn(
                "w-5 h-0.5 bg-current transition-all duration-300",
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              )} />
              <div className={cn(
                "w-5 h-0.5 bg-current transition-all duration-300",
                isMobileMenuOpen ? "opacity-0" : ""
              )} />
              <div className={cn(
                "w-5 h-0.5 bg-current transition-all duration-300",
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              )} />
            </div>
          </button>
        </div>

        {/* Right side - Desktop Wallet Connection */}
        <div className="hidden md:block relative">
          {walletConnection.isConnected ? (
            <div className="flex items-center gap-3">
              <div className="text-[var(--color-figma-green-400)] text-[16px] text-instrument">
                {truncateAddress(walletConnection.address || "")}
              </div>
              <BtnIcontext
                text="Disconnect"
                onClick={handleDisconnectWallet}
              />
            </div>
          ) : (
            <BtnIcontext
              text="Connect Wallet"
              leftIcon={<TablerIconWallet />}
              onClick={handleConnectWallet}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu Full Screen Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[var(--color-figma-dark-600)] z-[9999] flex flex-col overflow-hidden">
          {/* Header with X button */}
          <div className="flex justify-end p-6">
            <button
              onClick={closeMobileMenu}
              className="text-[var(--color-figma-green-400)] p-2"
            >
              <div className="w-6 h-6 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-0.5 bg-current rotate-45" />
                  <div className="absolute w-5 h-0.5 bg-current -rotate-45" />
                </div>
              </div>
            </button>
          </div>

          {/* Centered Navigation Items */}
          <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
            <BtnText text="Machines" href="/machines" onClick={closeMobileMenu} />
            <BtnText text="Dashboard" href="/dashboard" onClick={closeMobileMenu} />
            <BtnText text="Marketplace" href="/marketplace" onClick={closeMobileMenu} />
            
            {/* Mobile Wallet Connection */}
            <div className="mt-8">
              {walletConnection.isConnected ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="text-[var(--color-figma-green-400)] text-[16px] text-instrument text-center">
                    {truncateAddress(walletConnection.address || "")}
                  </div>
                  <BtnIcontext
                    text="Disconnect"
                    onClick={handleDisconnectWallet}
                  />
                </div>
              ) : (
                <BtnIcontext
                  text="Connect Wallet"
                  leftIcon={<TablerIconWallet />}
                  onClick={handleConnectWallet}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
