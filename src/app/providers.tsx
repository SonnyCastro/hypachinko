"use client"

import type React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { RainbowKitProvider, Theme } from "@rainbow-me/rainbowkit"
import { config } from "../config/wagmi"
import "@rainbow-me/rainbowkit/styles.css"

const queryClient = new QueryClient()

// Custom theme matching Hypachinko design system
const hypachinkoTheme: Theme = {
  blurs: {
    modalOverlay: "blur(8px)",
  },
  colors: {
    accentColor: "#3fefc0",
    accentColorForeground: "#1b0e18",
    actionButtonBorder: "rgba(255, 255, 255, 0.1)",
    actionButtonBorderMobile: "rgba(255, 255, 255, 0.1)",
    actionButtonSecondaryBackground: "rgba(255, 255, 255, 0.05)",
    closeButton: "#dedede",
    closeButtonBackground: "rgba(255, 255, 255, 0.05)",
    connectButtonBackground: "#3fefc0",
    connectButtonBackgroundError: "#ff6b6b",
    connectButtonInnerBackground: "#3fefc0",
    connectButtonText: "#1b0e18",
    connectButtonTextError: "#ffffff",
    connectionIndicator: "#3fefc0",
    downloadBottomCardBackground: "#2b1a27",
    downloadTopCardBackground: "#1b0e18",
    error: "#ff6b6b",
    generalBorder: "rgba(255, 255, 255, 0.1)",
    generalBorderDim: "rgba(255, 255, 255, 0.05)",
    menuItemBackground: "rgba(255, 255, 255, 0.05)",
    modalBackdrop: "rgba(27, 14, 24, 0.8)",
    modalBackground: "#1b0e18",
    modalBorder: "rgba(255, 255, 255, 0.1)",
    modalText: "#ffffff",
    modalTextDim: "#dedede",
    modalTextSecondary: "#a0a0a0",
    profileAction: "rgba(255, 255, 255, 0.05)",
    profileActionHover: "rgba(255, 255, 255, 0.1)",
    profileForeground: "#1b0e18",
    selectedOptionBorder: "#3fefc0",
    standby: "#ffef0a",
  },
  fonts: {
    body: "var(--font-instrument), system-ui, sans-serif",
  },
  radii: {
    actionButton: "12px",
    connectButton: "100px",
    menuButton: "12px",
    modal: "16px",
    modalMobile: "16px",
  },
  shadows: {
    connectButton:
      "0px 4px 4px 0px inset rgba(255,255,255,0.5), 0px -4px 4px 0px inset rgba(0,0,0,0.25)",
    dialog: "0 8px 32px rgba(0, 0, 0, 0.4)",
    profileDetailsAction: "0 2px 8px rgba(0, 0, 0, 0.2)",
    selectedOption: "0 2px 8px rgba(63, 239, 192, 0.2)",
    selectedWallet: "0 4px 12px rgba(63, 239, 192, 0.2)",
    walletLogo: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={hypachinkoTheme} modalSize='compact'>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
