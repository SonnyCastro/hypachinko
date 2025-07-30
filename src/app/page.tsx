"use client"

import { useMemo } from "react"
import { ASSETS } from "@/constants/assets"
import { useGameState } from "@/hooks/useGameState"
import {
  TokenSelector,
  UpForGrabsDisplay,
  RecentActivityFeed,
  HowItWorksSection,
  HypachinkoSection,
  MachineCard,
} from "@/components/features"

export default function Home() {
  // Game state management with custom hook
  const {
    selectedPercentage,
    ballCount,
    selectedToken,
    setPercentage: handlePercentageSelect,
    setBallCount: handleBallCountChange,
    setToken: handleTokenSelect,
    buyBalls: handleBuyBalls,
  } = useGameState()

  // Memoized static data
  const tokens = useMemo(
    () => [
      { id: "usdt0", name: "usdt0", icon: ASSETS.icons.usdt },
      { id: "hype", name: "hype", icon: ASSETS.icons.hyperliquidAlt },
      { id: "tkn1", name: "tkn", icon: ASSETS.icons.pokerChipBlue },
      { id: "tkn2", name: "tkn", icon: ASSETS.icons.pokerChipBlue },
    ],
    []
  )

  // Memoized tokens array with active state
  const tokensWithActiveState = useMemo(() => {
    return tokens.map((token) => ({
      ...token,
      isActive: token.id === selectedToken,
    }))
  }, [tokens, selectedToken])

  const activities = useMemo(
    () => [
      {
        id: "1",
        address: "0xfr...52ga",
        action: "buy" as const,
        amount: "50,000 balls",
        tokenIcon: ASSETS.icons.usdt,
      },
      {
        id: "2",
        address: "0xab...1234",
        action: "buy" as const,
        amount: "50,000 balls",
        tokenIcon: ASSETS.icons.usdt,
      },
      {
        id: "3",
        address: "0xab...1234",
        action: "buy" as const,
        amount: "50,000 balls",
        tokenIcon: ASSETS.icons.usdt,
      },
      {
        id: "4",
        address: "0xab...1234",
        action: "buy" as const,
        amount: "50,000 balls",
        tokenIcon: ASSETS.icons.usdt,
      },
      {
        id: "5",
        address: "0xfr...52ga",
        action: "won" as const,
        amount: "$50,000",
        tokenIcon: ASSETS.icons.usdt,
        isWinner: true,
      },
    ],
    []
  )

  const tokenCards = [
    {
      token: { name: "USDT0", price: "$0.99", icon: ASSETS.icons.usdt },
      jackpotAmount: "$50,000",
      borderColor: "border-[#00b988]",
      bgColor: "bg-[#00b988]",
    },
    {
      token: { name: "TOKEN", price: "$16.99", icon: ASSETS.icons.sphere },
      jackpotAmount: "$50,000",
      borderColor: "border-[#b5f1ff]",
      bgColor: "bg-[#b5f1ff]",
    },
    {
      token: { name: "HYPE", price: "$47.82", icon: ASSETS.icons.usdt },
      jackpotAmount: "$50,000",
      borderColor: "border-[#50ffd6]",
      bgColor: "bg-[#50ffd6]",
    },
    {
      token: { name: "TOKEN", price: "$2.99", icon: ASSETS.icons.sphere },
      jackpotAmount: "$50,000",
      borderColor: "border-[#e0bdff]",
      bgColor: "bg-[#e0bdff]",
    },
  ]

  const drawTimers = [
    {
      token: { name: "USDT0", icon: ASSETS.icons.usdt },
      timeLeft: "07:35:00",
      progressWidth: "454px",
      progressColor: "#00B988",
      alarmIcon: ASSETS.icons.alarm,
    },
    {
      token: { name: "HYPE", icon: ASSETS.icons.hyperliquid },
      timeLeft: "22:32:00",
      progressWidth: "530px",
      progressColor: "#50ffd6",
      alarmIcon: ASSETS.icons.alarm,
    },
    {
      token: { name: "TOKEN", icon: ASSETS.icons.pokerChipBlue },
      timeLeft: "01:35:15",
      progressWidth: "184px",
      progressColor: "#b5f1ff",
      alarmIcon: ASSETS.icons.alarm,
    },
    {
      token: { name: "TOKEN", icon: ASSETS.icons.pokerChipPurple },
      timeLeft: "00:35:00",
      progressWidth: "78px",
      progressColor: "#e0bdff",
      alarmIcon: ASSETS.icons.alarm,
    },
  ]

  const statistics = [
    {
      icon: ASSETS.icons.sphere,
      title: "Total Balls in Play",
      value: "380,000",
    },
    { icon: ASSETS.icons.alarm, title: "Next Draw In", value: "07:35:24" },
    { icon: ASSETS.icons.trophy, title: "Winners This Week", value: "342" },
  ]

  return (
    <div className='bg-[var(--color-figma-dark-600)] min-h-screen flex flex-col items-center overflow-x-hidden'>
      <div className='w-full max-w-[1728px]'>
        {/* Hero Section */}
        <div className='w-full relative'>
          {/* Navbar spacer */}
          <div className='h-8 sm:h-10 w-full' />

          {/* Hero content */}
          <div className='flex flex-col gap-6 sm:gap-8 lg:gap-[38px] min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] items-center justify-center relative w-full py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8'>
            {/* Mascot character */}
            <div
              className='absolute left-[-20px] sm:left-[-45px] lg:left-[-60px] w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] top-[80px] sm:top-[130px] lg:top-[155px] bg-center bg-cover bg-no-repeat opacity-30 sm:opacity-75 lg:opacity-100'
              style={{
                backgroundImage: `url('${ASSETS.images.mascot}')`,
              }}
            />

            {/* Main title */}
            <div className='text-bagel text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-[var(--color-figma-green-400)] text-center relative z-10'>
              <p className='block mb-0'>CASH IN!</p>
              <p className='block'>CRASH OUT.</p>
            </div>

            {/* Game interface */}
            <div className='flex flex-col gap-3 sm:gap-4 lg:gap-2.5 items-start justify-start w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[544px] relative z-10'>
              {/* Token selection buttons */}
              <TokenSelector
                tokens={tokensWithActiveState}
                onTokenSelect={handleTokenSelect}
              />

              {/* Main game interface */}
              <MachineCard
                machineId='home'
                selectedToken={selectedToken}
                selectedPercentage={selectedPercentage}
                ballCount={ballCount}
                onBuyBalls={handleBuyBalls}
                onPercentageSelect={handlePercentageSelect}
                onBallCountChange={handleBallCountChange}
              />
            </div>

            {/* Purchase history sidebar */}
            <div className='hidden xl:block absolute right-4 top-[100px] sm:top-[130px] lg:top-[156px] w-64 z-10'>
              <RecentActivityFeed activities={activities} />
            </div>
          </div>

          {/* UP FOR GRABS section */}
          <div className='mt-8 sm:mt-12 lg:mt-16'>
            <UpForGrabsDisplay prizeAmount='$300,000' count={8} />
          </div>
        </div>

        {/* How it works section */}
        <HowItWorksSection tokenCards={tokenCards} drawTimers={drawTimers} />

        {/* Hypachinko section */}
        <HypachinkoSection statistics={statistics} />
      </div>
    </div>
  )
}
