'use client'
import { useEffect } from 'react'
import { useThemeStore } from '@/store/theme'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDark = useThemeStore((s) => s.isDark)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return <>{children}</>
}
