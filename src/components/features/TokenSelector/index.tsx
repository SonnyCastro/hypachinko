"use client"

import React from "react"
import { TokenButton } from "../../common/TokenButton"

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
          <TokenButton
            key={token.id}
            text={token.name}
            icon={token.icon}
            isActive={isActive}
            onClick={() => handleTokenSelect(token.id)}
          />
        )
      })}
    </div>
  )
}
