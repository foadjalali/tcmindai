// components/providers/aos-provider.tsx
"use client"
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function AOSProvider() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-out-cubic", offset: 80, once: true, mirror: false })
  }, [])
  return null
}
