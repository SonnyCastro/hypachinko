"use client"

import React from "react"
import {
  MarketplaceFilters,
  MarketplaceGrid,
  BuyingBallsModal,
} from "@/components/features"
import { useMarketplace } from "@/hooks/useMarketplace"

const MarketplacePage = () => {
  const {
    items,
    filters,
    isModalOpen,
    selectedItem,
    handleFiltersChange,
    handleItemClick,
    handleModalClose,
  } = useMarketplace()

  return (
    <div className='min-h-screen w-full flex flex-col bg-[#1b0e18]'>
      <div className='flex-1 w-full flex flex-col items-center justify-start py-4 md:py-8 lg:py-12'>
        <div className='max-w-[1280px] w-full px-4 flex flex-col flex-1'>
          {/* Marketplace Title */}
          <div className='text-bagel text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--color-figma-green-400)] text-start mb-6 sm:mb-8 lg:mb-10'>
            Marketplace
          </div>

          {/* Filters Section */}
          <div className='mb-6 sm:mb-8 lg:mb-10'>
            <MarketplaceFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </div>

          {/* Marketplace Grid */}
          <div className='flex-1 w-full'>
            <MarketplaceGrid items={items} onItemClick={handleItemClick} />
          </div>
        </div>
      </div>

      {/* Buying Balls Modal */}
      <BuyingBallsModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        itemData={selectedItem}
      />
    </div>
  )
}

export default MarketplacePage
