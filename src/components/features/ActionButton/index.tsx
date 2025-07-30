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
      className={`cursor-pointer bg-[var(--color-figma-green-400)] relative hover:opacity-90 transition-opacity outline-1 outline-offset-[-1px] outline-[var(--color-figma-green-200)] ${className}`}
      style={{
        boxShadow:
          "0 4px 4px 0 rgba(255, 255, 255, 0.50) inset, 0 -4px 4px 0 rgba(0, 0, 0, 0.25) inset",
      }}
      onClick={onClick}
    >
      <div className='flex flex-row gap-2.5 items-center justify-center py-3'>
        {icon && (
          <div className='w-6 h-6 relative'>
            <img src={icon} alt={text} className='w-full h-full' />
          </div>
        )}
        <div className='text-bagel font-normal text-xl sm:text-2xl lg:text-3xl text-[var(--color-figma-dark-600)] text-center leading-tight sm:leading-8'>
          {text}
        </div>
      </div>
    </button>
  )
}
