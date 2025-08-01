import { cn } from "@/lib/utils"
import { ASSETS } from "@/constants/assets"

// Local assets
const hypachinkoLogo = ASSETS.logos.hypachinko
const githubIcon = ASSETS.icons.github
const xIcon = ASSETS.icons.x
const telegramIcon = ASSETS.icons.telegram

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "bg-[var(--color-figma-dark-600)] flex flex-row items-center justify-between px-8 py-6 w-full border-t-2 border-[var(--color-figma-dark-200)]",
        className
      )}
    >
      {/* Left side - Logo and Brand */}
      <div className='flex flex-row gap-2 items-center justify-start'>
        <div className='w-12 h-12 relative'>
          <img
            src={hypachinkoLogo}
            alt='Hypachinko Logo'
            className='w-full h-full'
          />
        </div>
        <div className='text-bagel text-3xl text-[var(--color-figma-green-400)] text-left text-nowrap'>
          Hypachinko
        </div>
      </div>

      {/* Right side - Social Links */}
      <div className='flex flex-row gap-4 items-center justify-start'>
        <a
          href='https://github.com'
          target='_blank'
          rel='noopener noreferrer'
          className='w-6 h-6 relative hover:opacity-80 transition-opacity'
        >
          <img src={githubIcon} alt='GitHub' className='w-full h-full' />
        </a>
        <a
          href='https://x.com/hypachinko'
          target='_blank'
          rel='noopener noreferrer'
          className='w-6 h-6 relative hover:opacity-80 transition-opacity'
        >
          <img src={xIcon} alt='X' className='w-full h-full' />
        </a>
        <a
          href='https://t.me'
          target='_blank'
          rel='noopener noreferrer'
          className='w-6 h-6 relative hover:opacity-80 transition-opacity'
        >
          <img src={telegramIcon} alt='Telegram' className='w-full h-full' />
        </a>
      </div>
    </footer>
  )
}
