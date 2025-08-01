"use client"

import { useState, useMemo } from 'react'
import { MarketplaceItem, MarketplaceFilters } from '@/types'
import { MARKETPLACE_ITEMS } from '@/constants/marketplace'

export function useMarketplace() {
  const [filters, setFilters] = useState<MarketplaceFilters>({
    selectedToken: 'all',
    sortBy: 'price',
    sortOrder: 'desc'
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null)

  const filteredAndSortedItems = useMemo(() => {
    let items = [...MARKETPLACE_ITEMS]

    // Filter by token
    if (filters.selectedToken !== 'all') {
      items = items.filter(item =>
        item.token.toLowerCase() === filters.selectedToken
      )
    }

    // Sort items
    items.sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      if (filters.sortBy === 'price') {
        // Extract numeric value from price string (e.g., "$50,000" -> 50000)
        aValue = parseInt(a.price.replace(/[$,]/g, ''))
        bValue = parseInt(b.price.replace(/[$,]/g, ''))
      } else {
        // For timeLeft, convert to seconds for comparison
        const timeToSeconds = (timeStr: string) => {
          const [hours, minutes, seconds] = timeStr.split(':').map(Number)
          return hours * 3600 + minutes * 60 + seconds
        }
        aValue = timeToSeconds(a.timeLeft)
        bValue = timeToSeconds(b.timeLeft)
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return items
  }, [filters])

  const handleFiltersChange = (newFilters: MarketplaceFilters) => {
    setFilters(newFilters)
  }

  const handleItemClick = (item: MarketplaceItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  return {
    items: filteredAndSortedItems,
    filters,
    isModalOpen,
    selectedItem,
    handleFiltersChange,
    handleItemClick,
    handleModalClose
  }
} 