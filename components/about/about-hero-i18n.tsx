"use client"

import { useLanguage } from "@/components/language-provider"
import { HeroSection } from "@/components/hero-section"

export function AboutHeroI18n() {
  const { t } = useLanguage()
  return (
    <HeroSection
      title={t("aboutHeroTitle")}
      subtitle={t("aboutHeroSubtitle")}
      primaryButtonText={t("getStarted")}
      secondaryButtonText={t("learnMore")}
    />
  )
}
