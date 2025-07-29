"use client"

import React from "react"

interface TokenSelectorProps {
  tokens: Array<{
    id: string
    name: string
    icon: string
    isActive?: boolean
  }>
  onTokenSelect?: (tokenId: string) => void
}

export function TokenSelector({ tokens, onTokenSelect }: TokenSelectorProps) {
  const handleTokenSelect = (tokenId: string) => {
    onTokenSelect?.(tokenId)
  }

  return (
    <div className='flex flex-row gap-2 items-center justify-start w-full'>
      {tokens.map((token) => {
        const isActive = token.isActive || false
        return (
          <button
            key={token.id}
            onClick={() => handleTokenSelect(token.id)}
            className={`flex flex-row gap-1 h-12 items-center justify-start p-2 rounded-[100px] w-[130px] transition-colors ${
              isActive
                ? "bg-[var(--color-figma-green-400)]"
                : "border border-[rgba(63,239,192,0.04)]"
            }`}
          >
            <div
              className={`w-8 h-8 relative ${
                isActive
                  ? "bg-[var(--color-figma-dark-600)] rounded-full p-1"
                  : ""
              }`}
            >
              <img
                src={token.icon}
                alt={token.name}
                className='w-full h-full'
              />
            </div>
            <div
              className={`text-instrument font-normal text-[20px] text-center uppercase ${
                isActive
                  ? "text-[var(--color-figma-dark-600)]"
                  : "text-[var(--color-figma-green-400)]"
              }`}
            >
              {token.name}
            </div>
          </button>
        )
      })}
    </div>
  )
}
