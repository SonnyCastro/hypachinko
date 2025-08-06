"use client"

import React, { useEffect, useCallback, useMemo } from "react"
import { useWalletClient, useAccount, usePublicClient } from "wagmi"
import { getContract } from "viem"
import { contractsAtom } from "../contexts/blockchain-atoms"
import { CONTRACT_CONFIGS } from "../constants/contracts"
import { useAtom } from "jotai"

const LoadContracts: React.FC = () => {
  const setContracts = useAtom(contractsAtom)[1]
  const { data: walletClient } = useWalletClient()
  const { address: currentAccount } = useAccount()
  const publicClient = usePublicClient()

  // Memoize contract configs to prevent recreation
  const contractConfigs = useMemo(
    () => ({
      lotteryPot: CONTRACT_CONFIGS.lotteryPot,
      paymentToken: CONTRACT_CONFIGS.paymentToken,
      pballsToken: CONTRACT_CONFIGS.pballsToken,
    }),
    []
  )

  // Stable loadContracts function
  const loadContracts = useCallback(async () => {
    if (!publicClient) return

    try {
      // Always load contracts with public client for read operations
      const smartContracts = {
        lotteryPot: getContract({
          address: contractConfigs.lotteryPot.address,
          abi: contractConfigs.lotteryPot.abi,
          client: walletClient
            ? { public: publicClient, wallet: walletClient }
            : publicClient,
        }),
        paymentToken: getContract({
          address: contractConfigs.paymentToken.address,
          abi: contractConfigs.paymentToken.abi,
          client: walletClient
            ? { public: publicClient, wallet: walletClient }
            : publicClient,
        }),
        pballsToken: getContract({
          address: contractConfigs.pballsToken.address,
          abi: contractConfigs.pballsToken.abi,
          client: walletClient
            ? { public: publicClient, wallet: walletClient }
            : publicClient,
        }),
      }

      // Set contracts immediately without test call
      console.log("Smart Contracts Ready:", smartContracts)
      setContracts(smartContracts)
    } catch (error) {
      console.error("Error loading contracts:", error)
    }
  }, [publicClient, walletClient, contractConfigs, setContracts])

  useEffect(() => {
    loadContracts()
  }, [loadContracts])

  return null
}

export default LoadContracts
