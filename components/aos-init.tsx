// components/common/aos-init.tsx
"use client"

import { useEffect } from "react"

export default function AOSInit() {
  useEffect(() => {
    let cleanup: (() => void) | undefined
    ;(async () => {
      try {
        // dynamic import so it won't break SSR, and avoids type issues
        const AOS = (await import("aos")).default
        AOS.init({
          once: true,
          duration: 600,
          easing: "ease-out-cubic",
          mirror: false,
          offset: 40,
        })
        // expose globally so we can refresh after filtering
        // @ts-ignore
        window.AOS = AOS
        cleanup = () => AOS.refreshHard()
      } catch {
        // AOS not installed? page still works without animation
      }
    })()
    return () => {
      if (cleanup) cleanup()
    }
  }, [])
  return null
}
