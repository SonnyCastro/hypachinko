"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ASSETS } from "@/constants/assets"
import { CustomConnectButton } from "@/components/wallet/CustomConnectButton"

// Local assets
const hypachinkoLogo = ASSETS.logos.hypachinko

interface BtnTextProps {
  text: string
  isActive?: boolean
  href?: string
  onClick?: () => void
}

function BtnText({ text, href, onClick }: BtnTextProps) {
  const content = (
    <div className='flex flex-row gap-2.5 items-center justify-center px-2 py-1 relative rounded-[100px] hover:bg-[rgba(63,239,192,0.1)] transition-colors'>
      <div
        className='text-instrument font-normal text-[16px] leading-[1.1] text-center text-[var(--color-figma-green-400)] text-nowrap'
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <span className='whitespace-pre hover:opacity-80 transition-opacity'>
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

  return <button onClick={onClick}>{content}</button>
}

interface MenuProps {
  className?: string
}

export function Menu({ className }: MenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

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
        <div className='flex items-center gap-3'>
          {/* Logo and Brand */}
          <Link
            href='/'
            className='flex items-center gap-2 h-12 cursor-pointer hover:opacity-80 transition-opacity'
          >
            <div className='w-12 h-12 relative'>
              <img
                src={hypachinkoLogo}
                alt='Hypachinko Logo'
                className='w-full h-full'
              />
            </div>
            <div className='text-bagel text-[32px] leading-[normal] text-[var(--color-figma-green-400)] text-nowrap'>
              Hypachinko
            </div>
          </Link>

          {/* Desktop Navigation Buttons */}
          <div className='hidden md:flex items-center gap-2.5 h-12'>
            <BtnText text='Machines' href='/machines' />
            <BtnText text='Dashboard' href='/dashboard' />
            <BtnText text='Marketplace' href='/marketplace' />
          </div>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className='md:hidden'>
          <button
            onClick={toggleMobileMenu}
            className='text-[var(--color-figma-green-400)] p-2'
          >
            <div className='w-6 h-6 flex flex-col justify-center items-center gap-1'>
              <div
                className={cn(
                  "w-5 h-0.5 bg-current transition-all duration-300",
                  isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                )}
              />
              <div
                className={cn(
                  "w-5 h-0.5 bg-current transition-all duration-300",
                  isMobileMenuOpen ? "opacity-0" : ""
                )}
              />
              <div
                className={cn(
                  "w-5 h-0.5 bg-current transition-all duration-300",
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                )}
              />
            </div>
          </button>
        </div>

        {/* Right side - Desktop Wallet Connection */}
        <div className='hidden md:block relative'>
          <CustomConnectButton />
        </div>
      </div>

      {/* Mobile Menu Full Screen Overlay */}
      {isMobileMenuOpen && (
        <div className='md:hidden fixed inset-0 bg-[var(--color-figma-dark-600)] z-[9999] flex flex-col overflow-hidden'>
          {/* Header with X button */}
          <div className='flex justify-end p-6'>
            <button
              onClick={closeMobileMenu}
              className='text-[var(--color-figma-green-400)] p-2'
            >
              <div className='w-6 h-6 relative'>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='w-5 h-0.5 bg-current rotate-45' />
                  <div className='absolute w-5 h-0.5 bg-current -rotate-45' />
                </div>
              </div>
            </button>
          </div>

          {/* Centered Navigation Items */}
          <div className='flex-1 flex flex-col items-center justify-center gap-8 px-6'>
            <BtnText
              text='Machines'
              href='/machines'
              onClick={closeMobileMenu}
            />
            <BtnText
              text='Dashboard'
              href='/dashboard'
              onClick={closeMobileMenu}
            />
            <BtnText
              text='Marketplace'
              href='/marketplace'
              onClick={closeMobileMenu}
            />

            {/* Mobile Wallet Connection */}
            <div className='mt-8'>
              <CustomConnectButton />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
