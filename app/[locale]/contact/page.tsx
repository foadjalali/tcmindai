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
                      <p className="text-muted-foreground">info@company.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.81.33 1.59.63 2.33a2 2 0 0 1-.45 2.11L9 10a16 16 0 0 0 5 5l.84-1.18a2 2 0 0 1 2.11-.45c.74.3 1.52.51 2.33.63A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        {{ en: "Phone", ar: "الهاتف", tr: "Telefon" }[lang]}
                      </h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
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
                      <p className="text-muted-foreground">
                        123 Business Street, New York, NY 10001, United States
                      </p>
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
                  <a href="#" aria-label="Facebook" className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13 22v-9h3l1-4h-4V6a1 1 0 0 1 1-1h3V1h-3a5 5 0 0 0-5 5v3H6v4h3v9h4z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Twitter" className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 5.8c-.7.3-1.4.5-2.1.6.8-.5 1.3-1.1 1.6-2-.8.5-1.6.8-2.5 1-1.6-1.7-4.4-1.4-5.7.6-.7 1-1 2.2-.7 3.4-3.3-.2-6.2-1.8-8.2-4.4-1.1 1.9-.5 4.3 1.4 5.5-.6 0-1.2-.2-1.7-.5v.1c0 2.1 1.5 4 3.6 4.5-.4.1-.9.2-1.3.1.4 1.6 1.9 2.7 3.6 2.7-1.6 1.3-3.7 2-5.8 2h-.7c2.1 1.3 4.5 2 6.9 2 8.3 0 12.9-7 12.9-13V7c.8-.6 1.4-1.3 1.9-2.2z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="LinkedIn" className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zM8.5 8h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4 0 4.7 2.6 4.7 5.9V24h-4v-7.2c0-1.7 0-3.8-2.3-3.8s-2.7 1.8-2.7 3.7V24h-4V8z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Instagram" className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.3.5.6.2 1 .5 1.5 1 .5.5.8.9 1 1.5.2.5.4 1.1.5 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.5 2.3-.2.6-.5 1-1 1.5-.5.5-.9.8-1.5 1-.5.2-1.1.4-2.3.5-1.3.1-1.7.1-4.9.1s-3.4 0-4.7-.1c-1.3-.1-2.3-.3-3.1-.6-.8-.3-1.5-.7-2.2-1.4-.7-.7-1.1-1.4-1.4-2.2.3-.8.5-1.8.6-3.1.1-1.3.1-1.7.1-4.9s0-3.4-.1-4.7c-.1-1.3-.3-2.3-.6-3.1-.3-.8-.7-1.5-1.4-2.2C21.6.6 20.9.2 20.1-.1 19.3-.3 18.3-.5 17-.6 15.7-.7 15.3-.7 12-.7Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <MapSection
              locale={lang}
              embedUrl="https://www.openstreetmap.org/export/embed.html?bbox=-74.01,40.70,-73.98,40.72&layer=mapnik&marker=40.71,-74.00"
            />
          </div>
        </div>
      </section>

    </div>
  )
}
