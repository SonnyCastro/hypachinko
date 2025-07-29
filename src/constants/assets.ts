// Asset paths organized by category
export const ASSETS = {
  // Icons
  icons: {
    usdt: '/icons/usdt-icon.svg',
    usdtBlack: '/icons/usdt-black.svg',
    sphere: '/icons/sphere-icon.svg',
    sphereSmall: '/icons/sphere-icon-small.svg',
    sphereAlt: '/icons/sphere-icon-alt.svg',
    infoCircle: '/icons/info-circle.svg',
    alarm: '/icons/alarm-icon.svg',
    alarmAlt: '/icons/alarm-icon-alt.svg',
    trophy: '/icons/trophy-icon.svg',
    github: '/icons/github-icon.svg',
    x: '/icons/x-icon.svg',
    telegram: '/icons/telegram-icon.svg',
    wallet: '/icons/wallet-icon.svg',
    usdtAlt: '/icons/usdt-icon-alt.svg',
    pokerChipPurple: '/icons/poker-chip-icon-purple.svg',
    pokerChipBlue: '/icons/poker-chip-icon-blue.svg',
    hyperliquid: '/icons/hyperliquid-icon.svg',
    hyperliquidAlt: '/icons/hyperliquid-icon-alt.svg',
    ticket: '/icons/ticket-icon.svg',
    gamepad: '/icons/device-gamepad.svg',
    group4: '/icons/group-4.svg',
    group5: '/icons/group-5.svg',
  },

  // Images
  images: {
    mascot: '/images/mascot-hypachinko.png',
    gameplay: '/images/hypachinko-gameplay.png',
    mascot_playing: '/images/mascot-playing.png',
  },

  // Logos
  logos: {
    hypachinko: '/logos/hypachinko-logo.svg',
    hyperliquid: '/logos/hyperliquid-logo.svg',
  },
} as const;

// Helper function to get asset path
export const getAssetPath = (category: keyof typeof ASSETS, name: keyof typeof ASSETS[typeof category]) => {
  return ASSETS[category][name];
}; 