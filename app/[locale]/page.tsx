// app/[locale]/(site)/page.tsx
// (Server Component , عمداً "use client" نگذار)

import type { Metadata } from "next"
import { HeroSectionI18n } from "@/components/hero-section-i18n"
import { FeatureSection } from "@/components/feature-section"
import { CTASection } from "@/components/cta-section"
import { QuickPathsSection } from "@/components/quick-path"
import FeatureBlock from "@/components/feature-block"
import sections from "@/db/home/sections.json"
import JourneyDemo from "@/components/roadmap/roadmap"
import { makePageMetadata } from "@/lib/seo"

type Locale = "en" | "ar" | "tr"

type Section = {
  id: string
  reverse?: boolean
  title: string
  text: string
  button: { label: string; href: string }
  image: { src: string; alt: string }
}

const SITE_URL = "http://localhost:3000"

const metaI18n: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Transform Your Business with Innovation",
    description:
      "Empower your organization with cutting-edge solutions that drive growth and efficiency in the digital age.",
  },
  ar: {
    title: "حوّل عملك بالابتكار",
    description:
      "قم بتمكين مؤسستك بحلول متطورة تدفع النمو والكفاءة في العصر الرقمي.",
  },
  tr: {
    title: "İşinizi İnovasyonla Dönüştürün",
    description:
      "Dijital çağda büyüme ve verimliliği artıran yenilikçi çözümlerle organizasyonunuzu güçlendirin.",
  },
}
const ctaHomeI18n: Record<Locale, {
  title: string
  desc: string
  primary: string
  secondary: string
}> = {
  en: {
    title: "Ready to build with AI?",
    desc: "Explore our end-to-end solutions for AI products, platforms, and infrastructure.",
    secondary: "Explore Solutions",
    primary: "Contact Us",
  },
  ar: {
    title: "هل أنت مستعد للبناء بالذكاء الاصطناعي؟",
    desc: "استكشف حلولنا الشاملة لمنتجات الذكاء الاصطناعي والمنصات والبنية التحتية.",
    secondary: "استكشاف الحلول",
    primary: "تواصل معنا",
  },
  tr: {
    title: "Yapay zekâ ile inşa etmeye hazır mısınız?",
    desc: "Yapay zekâ ürünleri, platformlar ve altyapı için uçtan uca çözümlerimizi keşfedin.",
    secondary: "Çözümleri Keşfet",
    primary: "Bize Ulaşın",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return makePageMetadata("home", locale, `/${locale}/en`)
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const lang: Locale = (["en", "ar", "tr"] as const).includes(locale) ? locale : "en"
  const tr = ctaHomeI18n[locale]
  const data = (sections as Record<Locale, Section[]>)[lang] ?? (sections as any).en
  const dir = lang === "ar" ? "rtl" : "ltr"

  return (
    <div className="min-h-screen">
      <HeroSectionI18n />
      <FeatureSection />

      {/* <QuickPathsSection /> */}
      <main>
        {data.map((s, idx) => {
          const effectiveReverse = s.reverse ?? (idx % 2 === 1)
          return (
            <FeatureBlock
              key={s.id ?? `${lang}-${idx}`}
              title={s.title}
              text={s.text}
              button={s.button}
              image={s.image}
              reverse={effectiveReverse}
              dir={dir}
              className="section-padding"
              sectionBg="bg-feature-block"
              sectionText="fg-feature-block"

            />
          )
        })}
      </main>
      <JourneyDemo locale={lang} />
      <CTASection
        className="cta-theme"
        title={tr.title}
        description={tr.desc}
        primaryLabel={tr.primary}
        primaryHref={`/${locale}/contact`}
        secondaryLabel={tr.secondary}
        secondaryHref={`/${locale}/solutions`}
      />
    </div>
  )
}
