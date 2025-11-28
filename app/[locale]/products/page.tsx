"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"

export default function ProductsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection
        title={t("productsHeroTitle")}
        subtitle={t("productsHeroSubtitle")}
        primaryButtonText={t("getStarted")}
        secondaryButtonText={t("learnMore")}
      />
      <CTASection />
    </div>
  )
}
