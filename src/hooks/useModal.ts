import { useState, useCallback } from "react"

export interface ModalState<T = unknown> {
  isOpen: boolean
  data: T | null
}

export interface UseModalReturn<T = unknown> {
  isOpen: boolean
  data: T | null
  openModal: (data?: T) => void
  closeModal: () => void
  updateData: (data: T) => void
}

export function useModal<T = unknown>(): UseModalReturn<T> {
  const [modalState, setModalState] = useState<ModalState<T>>({
    isOpen: false,
    data: null,
  })

  const openModal = useCallback((data?: T) => {
    setModalState({
      isOpen: true,
      data: data || null,
    })
  }, [])

  const closeModal = useCallback(() => {
    setModalState({
      isOpen: false,
      data: null,
    })
  }, [])

  const updateData = useCallback((data: T) => {
    setModalState(prev => ({
      ...prev,
      data,
    }))
  }, [])

  return {
    isOpen: modalState.isOpen,
    data: modalState.data,
    openModal,
    closeModal,
    updateData,
  }
}

// Specific modal hooks for common use cases
export function useSellingBallsModal() {
  return useModal<{
    balls?: number
    jackpot?: number
    odds?: number
    [key: string]: unknown
  }>()
}

export function useJackpotModal() {
  return useModal<unknown>()
}

export function useConfirmationModal() {
  return useModal<{
    title: string
    message: string
    confirmText?: string
    cancelText?: string
    onConfirm?: () => void
    onCancel?: () => void
  }>()
}

export function useInfoModal() {
  return useModal<{
    title: string
    message: string
    type?: 'info' | 'success' | 'warning' | 'error'
  }>()
} 