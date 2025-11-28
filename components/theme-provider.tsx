"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
type ThemeContextType = { theme: Theme; toggleTheme: () => void }

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")

  // همگام‌سازی اولیه با کلاس html (که در RootLayout از کوکی ست شده)
  useEffect(() => {
    const hasDark = document.documentElement.classList.contains("dark")
    setTheme(hasDark ? "dark" : "light")
  }, [])

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light"
    setTheme(next)

    // 1) localStorage برای کلاینت
    localStorage.setItem("theme", next)

    // 2) کوکی برای SSR رفرش/ناوبری بعدی
    // توجه: روی HTTPS "Secure" رو اضافه کن
    document.cookie = `theme=${next}; path=/; max-age=31536000; samesite=lax`

    // 3) اعمال فوری روی DOM
    document.documentElement.classList.toggle("dark", next === "dark")
    document.documentElement.style.colorScheme = next === "dark" ? "dark" : "light"
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider")
  return ctx
}
