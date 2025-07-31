"use client"

interface ActionButtonProps {
  text: string
  icon?: string
  onClick?: () => void
  className?: string
}

export function ActionButton({
  text,
  icon,
  onClick,
  className = "",
}: ActionButtonProps) {
  return (
    <button
      className={`cursor-pointer bg-[var(--color-figma-green-400)] relative hover:opacity-90 transition-opacity rounded-[100px] w-full px-2 sm:px-4 py-2 sm:py-3 ${className}`}
      style={{
        boxShadow:
          "0px 4px 4px 0px inset rgba(255,255,255,0.5), 0px -4px 4px 0px inset rgba(0,0,0,0.25)",
        border: "1px solid var(--color-figma-green-200)",
      }}
      onClick={onClick}
    >
      <div className='flex flex-row gap-1 sm:gap-2 items-center justify-center'>
        {icon && (
          <div className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 relative'>
            <img
              src={icon}
              alt={text}
              className='w-full h-full object-contain'
            />
          </div>
        )}
        <div
          className='text-instrument font-normal text-xs sm:text-sm md:text-base text-[var(--color-figma-dark-600)] text-center leading-[1.1] text-nowrap'
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {text}
        </div>
      </div>
    </button>
  )
}
