"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"

interface StatsCounterProps {
  icon: React.ReactNode
  value: number
  label: string
  duration?: number
}

export default function StatsCounter({ icon, value, label, duration = 2000 }: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const { language } = useLanguage()
  const isRTL = language === "ar"

  useEffect(() => {
    let start = 0
    const end = value
    const incrementTime = Math.floor(duration / end)
    let timer: NodeJS.Timeout

    const updateCount = () => {
      start += 1
      setCount(start)
      if (start < end) {
        timer = setTimeout(updateCount, incrementTime)
      }
    }

    timer = setTimeout(updateCount, incrementTime)

    return () => clearTimeout(timer)
  }, [value, duration])

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <div className="text-4xl font-bold mb-2">{count.toLocaleString(isRTL ? "ar-SA" : "en-US")}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  )
}
