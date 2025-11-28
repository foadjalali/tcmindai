"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

type CTAColors = {
  from?: string
  to?: string
  text?: string
  border?: string
}

type CTAProps = {
  title?: string
  description?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  colors?: CTAColors
  className?: string
  id?: string
  animated?: boolean
  threshold?: number
}

export function CTASection({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  colors,
  className = "",
  id = "cta-section",
  animated = true,
  threshold = 0.12,
}: CTAProps) {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  const _title = title ?? t("readyToStart")
  const _desc = description ?? t("readyToStartDesc")
  const _primaryLabel = primaryLabel ?? t("getStarted")
  const _secondaryLabel = secondaryLabel ?? t("learnMore")

  useEffect(() => {
    if (!animated || !ref.current) return
    const el = ref.current
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setIsVisible(true))
      },
      { threshold }
    )
    io.observe(el)
    return () => io.unobserve(el)
  }, [animated, threshold])

  // CSS variables برای رنگ‌ها (در کنار utility کلاس‌ها)
  const styleVars: React.CSSProperties = {
    ["--cta-text" as any]: colors?.text ?? undefined,
    ["--cta-border" as any]: colors?.border ?? undefined,
    ["--cta-from" as any]: colors?.from ?? undefined,
    ["--cta-to" as any]: colors?.to ?? undefined,
  }

  const sectionBase = "py-20" // قبلاً text-primary-foreground حذف شد تا از vars استفاده کنیم
  const gradientCls = "bg-[linear-gradient(135deg,var(--cta-from),var(--cta-to))]"
  const containerCls = "container mx-auto px-4"
  const motionCls = animated
    ? `transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`
    : ""

  return (
    <section
      id={id}
      ref={ref as any}
      className={`${sectionBase} ${gradientCls} ${className}`}
      style={styleVars}
    >
      <div className={containerCls} style={{ color: "var(--cta-text)" }}>
        <div className={`max-w-3xl mx-auto text-center ${motionCls}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            {_title}
          </h2>

          <p className="text-lg md:text-xl mb-8 text-pretty leading-relaxed" style={{ opacity: 0.9 }}>
            {_desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryHref ? (
              <Link href={primaryHref} className="group inline-flex">
                <Button
                  size="lg"
                  className="text-base group hover:bg-[var(--cta-btn-bg-hover)]"
                  style={{
                    background: "var(--cta-btn-bg)",
                    color: "var(--cta-btn-fg)",
                    borderColor: "var(--cta-btn-border)",
                  }}
                >
                  {_primaryLabel}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                className="text-base group hover:bg-[var(--cta-btn-bg-hover)]"
                style={{
                  background: "var(--cta-btn-bg)",
                  color: "var(--cta-btn-fg)",
                  borderColor: "var(--cta-btn-border)",
                }}
              >
                {_primaryLabel}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}

            {secondaryHref ? (
              <Link href={secondaryHref} className="inline-flex">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base bg-transparent hover:bg-[var(--cta-ol-hover-bg)] hover:text-[var(--cta-ol-hover-fg)]"
                  style={{
                    color: "var(--cta-ol-fg)",
                    borderColor: "var(--cta-ol-border)",
                  }}
                >
                  {_secondaryLabel}
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                variant="outline"
                className="text-base bg-transparent hover:bg-[var(--cta-ol-hover-bg)] hover:text-[var(--cta-ol-hover-fg)]"
                style={{
                  color: "var(--cta-ol-fg)",
                  borderColor: "var(--cta-ol-border)",
                }}
              >
                {_secondaryLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
