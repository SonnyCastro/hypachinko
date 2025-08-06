import React from "react"
import { Skeleton } from "@/components/ui/Skeleton"
import { ASSETS } from "@/constants/assets"

export function MachinesPageSkeleton() {
  return (
    <div className='bg-[#1b0e18] min-h-screen flex flex-col items-center overflow-x-hidden relative'>
      {/* Background mascots */}
      <div
        className='hidden xl:block absolute bg-center bg-cover bg-no-repeat left-[-189px] w-[640px] h-[640px] top-[341px]'
        style={{
          backgroundImage: `url('${ASSETS.images.mascot}')`,
        }}
      />
      <div
        className='hidden xl:block absolute bg-center bg-cover bg-no-repeat bottom-4 right-[-186px] w-[800px] h-[800px]'
        style={{
          backgroundImage: `url('${ASSETS.images.mascotPlaying}')`,
        }}
      />

      <div className='w-full max-w-[1728px] relative z-10 flex flex-col items-center'>
        {/* Navbar spacer */}
        <div className='h-10 md:h-20 w-full' />

        {/* Main content container */}
        <div className='flex flex-col gap-6 sm:gap-8 items-center justify-start w-full max-w-[1024px] px-4 py-8'>
          {/* Total for grabs section skeleton */}
          <div className='bg-[#3fefc0] flex flex-col gap-2 items-center justify-start py-2 px-2 rounded-lg w-full relative overflow-hidden'>
            <Skeleton className='h-8 w-48 bg-black/20' />
            <Skeleton className='h-16 w-64 bg-black/20' />
          </div>

          {/* Live Stats skeleton */}
          <div className='w-full mt-4'>
            <Skeleton className='h-8 w-48 mx-auto mb-4 bg-gray-300/30' />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className='bg-[var(--color-figma-dark-200)] rounded-2xl p-4'
                >
                  <div className='flex items-center gap-3 mb-2'>
                    <Skeleton className='w-6 h-6 rounded-full bg-gray-300/30' />
                    <Skeleton className='h-4 w-24 bg-gray-300/30' />
                  </div>
                  <Skeleton className='h-6 w-20 bg-gray-300/30' />
                </div>
              ))}
            </div>
          </div>

          {/* Machines Grid skeleton */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full mt-4 sm:mt-6'>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className='space-y-4'>
                <div className='bg-[var(--color-figma-dark-200)] rounded-2xl p-4 sm:p-6 w-full'>
                  {/* Machine Header */}
                  <div className='flex items-center justify-between mb-4 sm:mb-6'>
                    <div className='flex items-center gap-3'>
                      <Skeleton className='w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300/30' />
                      <Skeleton className='h-6 sm:h-8 w-24 sm:w-32 bg-gray-300/30' />
                    </div>
                    <Skeleton className='h-8 w-20 bg-gray-300/30 rounded-lg' />
                  </div>

                  {/* Machine Stats */}
                  <div className='grid grid-cols-2 gap-4 mb-4 sm:mb-6'>
                    <div className='space-y-2'>
                      <Skeleton className='h-4 w-16 bg-gray-300/30' />
                      <Skeleton className='h-6 w-20 bg-gray-300/30' />
                    </div>
                    <div className='space-y-2'>
                      <Skeleton className='h-4 w-16 bg-gray-300/30' />
                      <Skeleton className='h-6 w-20 bg-gray-300/30' />
                    </div>
                  </div>

                  {/* Game Interface skeleton */}
                  <div className='space-y-4'>
                    <Skeleton className='h-12 w-full bg-gray-300/30 rounded-lg' />
                    <div className='flex gap-2'>
                      <Skeleton className='h-10 flex-1 bg-gray-300/30 rounded-lg' />
                      <Skeleton className='h-10 flex-1 bg-gray-300/30 rounded-lg' />
                      <Skeleton className='h-10 flex-1 bg-gray-300/30 rounded-lg' />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div className='h-10 md:h-20 w-full' />
      </div>
    </div>
  )
}
