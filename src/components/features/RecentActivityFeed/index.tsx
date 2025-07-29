import React from "react"

interface ActivityItem {
  id: string
  address: string
  action: "buy" | "won"
  amount: string
  tokenIcon: string
  isWinner?: boolean
}

interface RecentActivityFeedProps {
  activities: ActivityItem[]
}

export function RecentActivityFeed({ activities }: RecentActivityFeedProps) {
  return (
    <div className='flex flex-col gap-4 items-start justify-start w-full'>
      {activities.map((activity) => (
        <div
          key={activity.id}
          className='bg-[#2b1a27] flex flex-col gap-1 items-start justify-center p-3 rounded-2xl w-full border border-[#3fefc0]'
        >
          <div className='flex flex-row items-start justify-between w-full'>
            <div className='text-instrument font-normal text-[20px] text-[#dedede] text-left'>
              {activity.address}
            </div>
            <div className='bg-[#3fefc0] flex flex-row gap-2.5 items-center justify-center px-2 py-1 rounded-[100px]'>
              <div className='text-instrument font-normal text-[14px] text-[#1b0e18] text-center'>
                {activity.action === "buy" ? "Buy" : "Won"}
              </div>
            </div>
          </div>
          <div className='flex flex-row gap-1 items-center justify-start'>
            <div className='w-8 h-8 relative'>
              <img
                src={activity.tokenIcon}
                alt='Token'
                className='w-full h-full'
              />
            </div>
            <div className='flex flex-col gap-1 items-start justify-start text-[#3fefc0] text-left'>
              <div
                className={`text-instrument font-normal text-[16px] ${
                  activity.isWinner ? "text-[#ffdd00]" : ""
                }`}
              >
                {activity.isWinner ? "Won!!! 🎉" : "Bought"}
              </div>
              <div className='text-instrument font-bold text-[20px] text-nowrap'>
                {activity.amount}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
