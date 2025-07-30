"use client"

import React, { useState, useEffect } from "react"

interface CountdownTimerProps {
  startTime: Date
  className?: string
  format?: "HH:mm:ss" | "mm:ss"
}

export function CountdownTimer({
  startTime,
  className = "",
  format = "HH:mm:ss",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>("")

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const targetTime = startTime.getTime()
      const difference = targetTime - now

      if (difference <= 0) {
        setTimeLeft("00:00:00")
        return
      }

      const hours = Math.floor(difference / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      if (format === "HH:mm:ss") {
        setTimeLeft(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        )
      } else {
        setTimeLeft(
          `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        )
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [startTime, format])

  return <div className={`text-bagel w-full ${className}`}>{timeLeft}</div>
}
