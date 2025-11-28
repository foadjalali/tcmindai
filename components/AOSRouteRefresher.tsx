"use client"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function AOSRouteRefresher() {
  const pathname = usePathname()
  useEffect(() => {
    // @ts-ignore
    window.AOS?.refreshHard?.()
  }, [pathname])
  return null
}
