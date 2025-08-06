import React from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  children?: React.ReactNode
}

export function Skeleton({ className, children }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gradient-to-r from-gray-200/20 via-gray-300/20 to-gray-200/20 rounded-md",
        "backdrop-blur-sm bg-opacity-10",
        className
      )}
    >
      {children}
    </div>
  )
}

// Predefined skeleton variants
export function SkeletonText({ className }: { className?: string }) {
  return <Skeleton className={cn("h-4 bg-gray-300/30", className)} />
}

export function SkeletonTitle({ className }: { className?: string }) {
  return <Skeleton className={cn("h-8 bg-gray-300/30", className)} />
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <Skeleton className={cn("h-32 bg-gray-300/20 rounded-2xl", className)} />
  )
}

export function SkeletonButton({ className }: { className?: string }) {
  return (
    <Skeleton className={cn("h-10 bg-gray-300/30 rounded-lg", className)} />
  )
}

export function SkeletonCircle({ className }: { className?: string }) {
  return (
    <Skeleton
      className={cn("w-8 h-8 bg-gray-300/30 rounded-full", className)}
    />
  )
}
