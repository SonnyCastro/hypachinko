import React from "react"

interface DrawTimerProps {
  token: {
    name: string
    icon: string
  }
  timeLeft: string
  progressWidth: string
  progressColor: string
  alarmIcon: string
}

export function DrawTimer({
  token,
  timeLeft,
  progressWidth,
  progressColor,
  alarmIcon,
}: DrawTimerProps) {
  return (
    <div
      className='relative rounded-lg w-full overflow-hidden'
      style={{ border: `1px solid ${progressColor}` }}
    >
      <div className='flex flex-col items-center justify-start w-full h-[56px]'>
        <div className='relative w-full'>
          <div className='flex flex-row items-center justify-between px-4 py-2 w-full'>
            <div className='flex flex-row gap-2 items-center justify-start'>
              <div className='size-8 relative'>
                <img
                  src={token.icon}
                  alt={token.name}
                  className='w-full h-full'
                />
              </div>
              <div
                className='text-instrument font-bold text-[20px] text-[#dedede] text-center'
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {token.name}
              </div>
            </div>
            <div className='flex flex-row gap-2 items-center justify-start'>
              <div
                className='text-instrument font-normal text-sm sm:text-base md:text-lg lg:text-xl text-[#dedede] text-right min-w-0 flex-1'
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {timeLeft}
              </div>
              <div className='w-6 h-6 relative flex-shrink-0'>
                <img src={alarmIcon} alt='Alarm' className='w-full h-full' />
              </div>
            </div>
          </div>
          <div className='absolute border-[#dedede] border-b inset-0 pointer-events-none' />
        </div>
        <div className='flex flex-col gap-2.5 h-2 items-start justify-start w-full'>
          <div
            className='basis-0 grow min-h-8px min-w-px shrink-0'
            style={{ width: progressWidth, backgroundColor: progressColor }}
          />
        </div>
      </div>
    </div>
  )
}
