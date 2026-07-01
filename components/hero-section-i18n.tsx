"use client"

import { useLanguage } from "@/components/language-provider"
import { HeroSection } from "@/components/hero-section"

export function HeroSectionI18n() {
  const { language, t } = useLanguage()
  return (
    <HeroSection
      title={t("heroTitle")}
      subtitle={t("heroSubtitle")}
      primaryButtonText={t("getStarted")}
      primaryHref={`/${language}/contact`}
      secondaryButtonText={t("learnMore")}
      secondaryHref={`/${language}/solutions`}
    />
  )
}
