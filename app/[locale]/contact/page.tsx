// app/[locale]/contact/page.tsx
export const dynamic = "force-dynamic"
export const revalidate = 0
export const runtime = "nodejs"

import type { Metadata } from "next"
import { Header } from "@/components/header"
import { CTASection } from "@/components/cta-section"
import ContactForm from "@/components/contact/contact-form"
import MapSection from "@/components/contact/map-section"
import { makePageMetadata } from "@/lib/seo"

type Locale = "en" | "ar" | "tr"
const LOCALES: readonly Locale[] = ["en", "ar", "tr"] as const

const uiI18n: Record<Locale, { heroTitle: string; heroSubtitle: string; contactInfo: string; followUs: string; desc: string }> = {
  en: {
    heroTitle: "Contact Us",
    heroSubtitle: "Let’s talk about your AI, software, or infrastructure needs.",
    contactInfo: "Contact Information",
    followUs: "Follow us",
    desc: "Reach us via email or phone. We typically reply within 1–2 business days.",
  },
  ar: {
    heroTitle: "اتصل بنا",
    heroSubtitle: "دعنا نناقش احتياجاتك في الذكاء الاصطناعي أو البرمجيات أو البنية التحتية.",
    contactInfo: "معلومات الاتصال",
    followUs: "تابعنا",
    desc: "تواصل عبر البريد أو الهاتف. عادةً ما نرد خلال 1–2 يوم عمل.",
  },
  tr: {
    heroTitle: "Bize Ulaşın",
    heroSubtitle: "Yapay zekâ, yazılım veya altyapı ihtiyaçlarınızı konuşalım.",
    contactInfo: "İletişim Bilgileri",
    followUs: "Bizi takip edin",
    desc: "E-posta veya telefonla ulaşın. Genellikle 1–2 iş gününde dönüş yapıyoruz.",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return makePageMetadata("contact", locale, `/${locale}/contact`)
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const lang: Locale = (LOCALES as readonly string[]).includes(locale) ? locale : "en"
  const t = uiI18n[lang]

  return (
    <div className="min-h-screen">
      <section className="relative flex items-center justify-center bg-gradient-to-br from-background via-background to-muted py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-balance">{t.heroTitle}</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      <Header />

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="w-full">
              <ContactForm locale={lang} />
            </div>

            <div className="w-full space-y-6">
              <div
                className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm"
                data-aos="fade-left"
              >
                <h2 className="text-2xl font-semibold mb-2">{t.contactInfo}</h2>
                <p className="text-muted-foreground mb-6">{t.desc}</p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        {{ en: "Email", ar: "البريد الإلكتروني", tr: "E-posta" }[lang]}
                      </h3>
                      <a
                        href="mailto:info@technomindai.com"
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        info@technomindai.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        {{ en: "Address", ar: "العنوان", tr: "Adres" }[lang]}
                      </h3>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Frederick%20Street%2C%20London%2C%20England%2C%20WC1X%200ND"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        Frederick Street, London, England, WC1X 0ND
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92Z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        {{ en: "Phone", ar: "الهاتف", tr: "Telefon" }[lang]}
                      </h3>
                      <a
                        href="tel:+447747984494"
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        +447747984494
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">WhatsApp</h3>
                      <a
                        href="http://wa.me/447747984494"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        WhatsApp: +447747984494
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                <h3 className="font-semibold mb-4">{t.followUs}</h3>
                <div className="flex gap-3">
                  <a href="https://www.linkedin.com/company/technomind-ai/" aria-label="LinkedIn" className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zM8.5 8h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4 0 4.7 2.6 4.7 5.9V24h-4v-7.2c0-1.7 0-3.8-2.3-3.8s-2.7 1.8-2.7 3.7V24h-4V8z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <MapSection
              locale={lang}
              embedUrl="https://www.openstreetmap.org/export/embed.html?bbox=-0.1181885,51.5275467,-0.1161885,51.5285467&layer=mapnik&marker=51.5280467,-0.1171885"
            />
          </div>
        </div>
      </section>

    </div>
  )
}
