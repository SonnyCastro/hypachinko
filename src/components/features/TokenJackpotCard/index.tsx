import React from "react"

interface TokenJackpotCardProps {
  token: {
    name: string
    price: string
    icon: string
  }
  jackpotAmount: string
  borderColor: string
  bgColor: string
}

export function TokenJackpotCard({
  token,
  jackpotAmount,
  borderColor,
  bgColor,
}: TokenJackpotCardProps) {
  return (
    <div
      className={`relative rounded-lg size-full ${borderColor} overflow-hidden`}
    >
      <div className='flex flex-row items-center justify-start w-full h-full'>
        {/* Left colored strip - fills entire left side */}
        <div
          className={`${bgColor} flex flex-row gap-2.5 h-full items-center justify-start p-1 shrink-0 rounded-l-lg`}
        >
          <div className='w-6 h-6 sm:w-8 sm:h-8 relative'>
            <img
              src={token.icon}
              alt={token.name}
              className='w-full h-full object-contain filter brightness-0 invert'
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
        </div>

        {/* Right content area */}
        <div className='basis-0 flex flex-col gap-2 grow items-start justify-start p-3 bg-[var(--color-figma-dark-200)]'>
          {/* Token name and price */}
          <div className='flex flex-row gap-2 items-center justify-start text-[var(--color-gray-200)] text-nowrap'>
            <div
              className=' sm:text-lg md:text-xl text-center'
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {token.name}
            </div>
            <div
              className='text-instrument font-normal text-sm sm:text-base text-left'
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              ({token.price})
            </div>
          </div>

          {/* Jackpot section */}
          <div className='flex flex-col items-start justify-start text-[var(--color-figma-green-400)] text-left text-nowrap pb-1.5 pt-0 px-0'>
            <div
              className='text-instrument font-normal text-sm sm:text-base mb-[-6px]'
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              JACKPOT
            </div>
            <div className='text-bagel text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-[-6px]'>
              {jackpotAmount}
            </div>
          </div>
        </div>
      </div>

      {/* Border overlay */}
      <div
        className={`absolute border border-solid inset-0 pointer-events-none rounded-lg ${borderColor.replace(
          "border-",
          "border-"
        )}`}
      />
    </div>
  )
}
