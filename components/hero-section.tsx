"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

type HeroSectionProps = {
  title: string
  subtitle: string
  primaryButtonText: string
  secondaryButtonText?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}

export function HeroSection({
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
}: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-start bg-gradient-to-br from-background via-background to-muted overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-3xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-balance leading-tight">{title}</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty leading-relaxed max-w-2xl">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-base group cta-theme-bt bg-cta-btn-bg text-cta-btn-fg" onClick={onPrimaryClick}>
              {primaryButtonText}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform " />
            </Button>
            {secondaryButtonText && (
              <Button size="lg" variant="outline" className="text-base bg-transparent" onClick={onSecondaryClick}>
                {secondaryButtonText}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </section>
  )
}
