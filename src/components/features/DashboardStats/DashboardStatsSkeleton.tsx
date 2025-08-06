import React from "react"
import { Skeleton } from "@/components/ui/Skeleton"

export function DashboardStatsSkeleton() {
  return (
    <div className='grid grid-cols-2 lg:flex lg:flex-row gap-3 sm:gap-4 w-full'>
      {/* Participating for skeleton */}
      <div className='bg-[var(--color-figma-dark-200)] flex flex-col gap-2 sm:gap-4 items-start justify-start p-3 sm:p-4 rounded-2xl lg:flex-1'>
        <Skeleton className='h-4 sm:h-6 lg:h-8 w-24 sm:w-32 lg:w-40 bg-gray-300/30' />
        <Skeleton className='h-6 sm:h-8 md:h-12 lg:h-16 w-20 sm:w-24 md:w-32 lg:w-40 bg-gray-300/30' />
      </div>

      {/* Points earned skeleton */}
      <div className='bg-[var(--color-figma-dark-200)] flex flex-col gap-2 sm:gap-4 items-start justify-start p-3 sm:p-4 rounded-2xl lg:flex-1'>
        <Skeleton className='h-4 sm:h-6 lg:h-8 w-24 sm:w-32 lg:w-40 bg-gray-300/30' />
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-1'>
          <Skeleton className='h-6 sm:h-8 md:h-12 lg:h-16 w-16 sm:w-20 md:w-24 lg:w-32 bg-gray-300/30' />
          <Skeleton className='h-4 sm:h-6 lg:h-8 w-12 sm:w-16 lg:w-20 bg-gray-300/30' />
        </div>
      </div>

      {/* Total Balls skeleton */}
      <div className='bg-[var(--color-figma-dark-200)] flex flex-col gap-2 sm:gap-4 items-start justify-start p-3 sm:p-4 rounded-2xl'>
        <Skeleton className='h-4 sm:h-6 lg:h-8 w-20 sm:w-24 lg:w-32 bg-gray-300/30' />
        <div className='flex flex-row gap-3 sm:gap-6 items-center justify-start'>
          <Skeleton className='h-6 sm:h-8 md:h-12 lg:h-16 w-20 sm:w-24 md:w-32 lg:w-40 bg-gray-300/30' />
          <div className='flex flex-row-reverse items-center justify-start pl-0 pr-1 sm:pr-2 py-0'>
            <Skeleton className='w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full bg-gray-300/30' />
            <Skeleton className='w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full bg-gray-300/30' />
          </div>
        </div>
      </div>

      {/* Funds available skeleton */}
      <div className='bg-[var(--color-figma-dark-200)] flex flex-col gap-2 sm:gap-4 items-start justify-end p-3 sm:p-4 rounded-2xl'>
        <Skeleton className='h-4 sm:h-6 lg:h-8 w-24 sm:w-32 lg:w-40 bg-gray-300/30' />
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 lg:gap-8 items-center justify-start w-full'>
          <Skeleton className='h-6 sm:h-8 md:h-12 lg:h-16 w-20 sm:w-24 md:w-32 lg:w-40 bg-gray-300/30' />
          <Skeleton className='h-8 sm:h-10 lg:h-12 w-full lg:w-24 bg-gray-300/30 rounded-lg' />
        </div>
      </div>
    </div>
  )
}
