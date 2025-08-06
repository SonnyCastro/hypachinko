"use client"

import React from "react"
import LoadContracts from "./LoadContracts"

const BlockchainData: React.FC = () => {
  // Load contracts immediately - public data should be available to all users
  return <LoadContracts />
}

export default BlockchainData
