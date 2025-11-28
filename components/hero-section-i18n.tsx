"use client"

import { useLanguage } from "@/components/language-provider"
import { HeroSection } from "@/components/hero-section"

export function HeroSectionI18n() {
  const { t } = useLanguage()
  return (
    <HeroSection
      title={t("heroTitle")}
      subtitle={t("heroSubtitle")}
      primaryButtonText={t("getStarted")}
      secondaryButtonText={t("learnMore")}
    />
  )
}
