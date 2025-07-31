import React from "react"
import { DashboardStats } from "@/components/features/DashboardStats"
import { MyBallsTable } from "@/components/features/MyBallsTable"
import { LeaderboardTable } from "@/components/features/LeaderboardTable"

const DashboardPage = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center pb-20 pt-4 md:py-24 bg-[#1b0e18]'>
      <div className='max-w-[1280px] w-full px-4'>
        {/* Dashboard Title */}
        <div className='text-bagel text-5xl md:text-6xl lg:text-7xl text-[var(--color-figma-green-400)] text-start mb-8 sm:mb-10 lg:mb-12'>
          Dashboard
        </div>

        {/* Statistics Cards */}
        <DashboardStats />

        {/* My Balls Section */}
        <div className='mt-12 lg:mt-16'>
          <div className='text-bagel text-5xl md:text-6xl lg:text-7xl text-[var(--color-figma-green-400)] text-start mb-8 sm:mb-10 lg:mb-12'>
            My Balls
          </div>
          <MyBallsTable />
        </div>

        {/* Leaderboard Section */}
        <div className='mt-12 lg:mt-16'>
          <div className='text-bagel text-5xl md:text-6xl lg:text-7xl text-[var(--color-figma-green-400)] text-start mb-8 sm:mb-10 lg:mb-12'>
            Leaderboard
          </div>
          <LeaderboardTable />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
