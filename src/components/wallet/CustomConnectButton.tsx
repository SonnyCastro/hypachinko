"use client"

import React from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

// Simple custom connect button that only customizes the label
export function CustomConnectButton() {
  return (
    <ConnectButton
      label='Connect Wallet'
      accountStatus={{
        smallScreen: "avatar",
        largeScreen: "full",
      }}
      chainStatus={{
        smallScreen: "icon",
        largeScreen: "full",
      }}
      showBalance={{
        smallScreen: false,
        largeScreen: true,
      }}
    />
  )
}
