"use client"

import type React from "react"
import { useLanguage } from "@/contexts/language-context"

interface RTLProviderProps {
  children: React.ReactNode
}

export default function RTLProvider({ children }: RTLProviderProps) {
  const { dir } = useLanguage()

  return <div dir={dir}>{children}</div>
}
