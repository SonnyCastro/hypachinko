"use client"

interface ContextButtonProps {
  text: string
  icon: string
  onClick?: () => void
}

export function ContextButton({
  text,
  icon,
  onClick,
}: ContextButtonProps) {
  return (
    <button
      className="cursor-pointer bg-[var(--color-figma-green-400)] relative rounded-[100px] shrink-0"
      style={{
        boxShadow: '0px 4px 4px 0px inset rgba(255,255,255,0.5), 0px -4px 4px 0px inset rgba(0,0,0,0.25)',
        border: '1px solid var(--color-figma-green-200)',
      }}
      onClick={onClick}
    >
      <div className="flex flex-row gap-2 items-center justify-center px-4 py-3">
        <div className="w-6 h-6 relative">
          <img src={icon} alt={text} className="w-full h-full" />
        </div>
        <div className="text-instrument font-normal text-base text-[var(--color-figma-dark-600)] text-center leading-[1.1]">
          {text}
        </div>
      </div>
    </button>
  )
} 