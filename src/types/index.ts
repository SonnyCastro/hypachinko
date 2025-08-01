// Common types for the hypachinko dApp

export interface User {
  id: string;
  username: string;
  walletAddress?: string;
  totalWins: number;
  highestPayout: number;
  rank?: number;
}

export interface GameState {
  currentValue: number;
  countdown: string;
  totalPool: number;
  isActive: boolean;
}

export interface Ball {
  id: string;
  value: number;
  color: 'blue' | 'red' | 'green' | 'yellow';
  isSelected: boolean;
}

export interface WalletConnection {
  isConnected: boolean;
  address?: string;
  balance?: number;
  chainId?: number;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  totalWins: number;
  highestPayout: number;
}

// Component prop types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Marketplace types
export interface MarketplaceItem {
  id: string
  token: string
  ballsCount: string
  price: string
  timeLeft: string
  priceChange: {
    percentage: string
    isPositive: boolean
  }
  backgroundImage: string
  tokenIcon: string
}

export interface MarketplaceFilters {
  selectedToken: string
  sortBy: 'price' | 'timeLeft'
  sortOrder: 'asc' | 'desc'
}

export type TokenType = 'all' | 'usdt0' | 'hype' | 'tkn' 