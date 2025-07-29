"use client"

interface ActionButtonProps {
  text: string
  icon: string
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
      className={`bg-[var(--color-figma-green-400)] relative rounded-[100px] hover:opacity-90 transition-opacity ${className}`}
      onClick={onClick}
    >
      <div className='flex flex-row gap-2 items-center justify-center px-4 py-3'>
        <div className='w-6 h-6 relative'>
          <img src={icon} alt={text} className='w-full h-full' />
        </div>
        <div className='text-instrument font-normal text-base text-[var(--color-figma-dark-600)] text-center'>
          {text}
        </div>
      </div>
    </button>
  )
}
