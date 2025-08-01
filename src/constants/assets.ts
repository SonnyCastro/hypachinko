// Asset paths organized by category
export const ASSETS = {
  // Icons
  icons: {
    usdt: '/icons/usdt-icon.svg',
    usdtBlack: '/icons/usdt-black.svg',
    usdtAlt: '/icons/usdt-icon-alt.svg',
    sphere: '/icons/sphere-icon.svg',
    sphereSmall: '/icons/sphere-icon-small.svg',
    sphereAlt: '/icons/sphere-icon-alt.svg',
    infoCircle: '/icons/info-circle.svg',
    alarm: '/icons/alarm-icon.svg',
    alarmAlt: '/icons/alarm-icon-alt.svg',
    trophy: '/icons/trophy-icon.svg',
    skull: '/icons/skull-icon.svg',
    github: '/icons/github-icon.svg',
    x: '/icons/x-icon.svg',
    telegram: '/icons/telegram-icon.svg',
    wallet: '/icons/wallet-icon.svg',
    pokerChipPurple: '/icons/poker-chip-icon-purple.svg',
    pokerChipBlue: '/icons/poker-chip-icon-blue.svg',
    hyperliquid: '/icons/hyperliquid-icon.svg',
    hyperliquidAlt: '/icons/hyperliquid-icon-alt.svg',
    ticket: '/icons/ticket-icon.svg',
    gamepad: '/icons/device-gamepad.svg',
    group4: '/icons/group-4.svg',
    group5: '/icons/group-5.svg',
    redSkull: '/icons/table-icon-skull.svg',
    trophyFilled: '/icons/table-icon-trophy-filled.svg',
    // New icons for SellingBallsModal
    coingecko: '/icons/coingecko-icon.svg',
    equal: '/icons/equal-icon.svg',
    alertTriangle: '/icons/alert-triangle-icon.svg',
    circleUp: '/icons/circle-arrow-up.svg',
    circleDown: '/icons/circle-arrow-down.svg',
    chevronUp: '/icons/chevron-up.svg',
  },

  // Images
  images: {
    mascot: '/images/mascot-hypachinko.png',
    gameplay: '/images/hypachinko-gameplay.png',
    mascotPlaying: '/images/mascot-playing.png',
    blueBallsTicket: '/images/blue-balls-ticket.png',
    greenBallsTicket: '/images/green-balls-ticket.png',
    yellowBallsTicket: '/images/yellow-balls-ticket.png',
    purpleBallsTicket: '/images/purple-balls-ticket.png',
  },

  // Videos
  videos: {
    mascot_jumping: '/videos/mascot_jumping.mp4',
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