"use client"

import { useEffect, useState } from "react"
import { Brain, ShieldCheck, Sparkles, Zap } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function FeatureSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true)
        })
      },
      { threshold: 0.1 },
    )

    const el = document.getElementById("features-section")
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [])

  const items = [
    {
      icon: <Brain className="h-7 w-7" aria-hidden="true" />,
      titleKey: "feature1Title",
      descKey: "feature1Desc",
    },
    {
      icon: <ShieldCheck className="h-7 w-7" aria-hidden="true" />,
      titleKey: "feature2Title",
      descKey: "feature2Desc",
    },
    {
      icon: <Sparkles className="h-7 w-7" aria-hidden="true" />,
      titleKey: "feature3Title",
      descKey: "feature3Desc",
    },
    {
      icon: <Zap className="h-7 w-7" aria-hidden="true" />,
      titleKey: "feature4Title",
      descKey: "feature4Desc",
    },
  ]

  return (
    <section id="features-section" className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
            {t("featuresTitle")}
          </h2>
          <p className="mt-3 text-base md:text-lg text-muted-foreground text-pretty leading-relaxed">
            {t("featuresSubtitle")}
          </p>
        </div>

        {/* Features grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map((it, i) => (
            <div
              key={it.titleKey}
              className={`group rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm p-6 hover:shadow-lg transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${150 + i * 120}ms` }}
            >
              <div className="bg-secondary inline-flex items-center justify-center rounded-xl bg-primary/10 text-primary p-3 mb-4">
                {it.icon}
              </div>
              <h3 className="text-lg font-semibold">{t(it.titleKey)}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-pretty">
                {t(it.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
