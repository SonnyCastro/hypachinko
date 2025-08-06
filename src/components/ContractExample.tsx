"use client"

import React, { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { useAtom } from "jotai"
import { contractsAtom } from "../contexts/blockchain-atoms"
import {
  getCurrentRound,
  getCurrentTicketPrice,
  getTotalPrize,
  getUserTickets,
} from "../lib/blockchain/read-requests"
import { buyTicket } from "../lib/blockchain/write-requests"

const ContractExample: React.FC = () => {
  const { address } = useAccount()
  const contracts = useAtom(contractsAtom)[0]
  const [loading, setLoading] = useState(false)
  const [gameData, setGameData] = useState({
    currentRound: BigInt(0),
    ticketPrice: BigInt(0),
    totalPrize: BigInt(0),
    userTickets: [] as bigint[],
  })

  // Load game data when contracts are available
  useEffect(() => {
    const loadGameData = async () => {
      if (contracts.lotteryPot) {
        try {
          const [currentRound, ticketPrice, totalPrize] = await Promise.all([
            getCurrentRound(contracts.lotteryPot),
            getCurrentTicketPrice(contracts.lotteryPot),
            getTotalPrize(contracts.lotteryPot),
          ])

          setGameData({
            currentRound: currentRound as bigint,
            ticketPrice: ticketPrice as bigint,
            totalPrize: totalPrize as bigint,
            userTickets: [],
          })

          // Only load user-specific data if user is connected
          if (address) {
            try {
              const userTickets = await getUserTickets(
                contracts.lotteryPot,
                address
              )
              setGameData((prev) => ({
                ...prev,
                userTickets: userTickets as bigint[],
              }))
            } catch (error) {
              console.error("Error loading user tickets:", error)
            }
          }
        } catch (error) {
          console.error("Error loading game data:", error)
        }
      }
    }

    loadGameData()
  }, [address, contracts.lotteryPot])

  const handleBuyTicket = async () => {
    if (!contracts.lotteryPot || !address) return

    setLoading(true)
    try {
      const receipt = await buyTicket(contracts.lotteryPot)
      console.log("Ticket purchased:", receipt)
      // Refresh user tickets after purchase
      const userTickets = await getUserTickets(contracts.lotteryPot, address)
      setGameData((prev) => ({ ...prev, userTickets: userTickets as bigint[] }))
    } catch (error) {
      console.error("Error buying ticket:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!contracts.lotteryPot) {
    return <div>Loading contracts...</div>
  }

  return (
    <div className='p-6 bg-gray-800 rounded-lg'>
      <h2 className='text-2xl font-bold mb-4'>Hypachinko Game Data</h2>

      <div className='space-y-4'>
        <div>
          <p className='text-gray-300'>Current Round:</p>
          <p className='text-xl font-mono'>
            {gameData.currentRound.toString()}
          </p>
        </div>

        <div>
          <p className='text-gray-300'>Ticket Price:</p>
          <p className='text-xl font-mono'>
            {gameData.ticketPrice.toString()} wei
          </p>
        </div>

        <div>
          <p className='text-gray-300'>Total Prize:</p>
          <p className='text-xl font-mono'>
            {gameData.totalPrize.toString()} wei
          </p>
        </div>

        {address && (
          <div>
            <p className='text-gray-300'>Your Tickets:</p>
            <p className='text-xl font-mono'>{gameData.userTickets.length}</p>
          </div>
        )}

        {address ? (
          <button
            onClick={handleBuyTicket}
            disabled={loading}
            className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50'
          >
            {loading ? "Buying..." : "Buy Ticket"}
          </button>
        ) : (
          <p className='text-gray-400 italic'>Connect wallet to buy tickets</p>
        )}
      </div>
    </div>
  )
}

export default ContractExample
