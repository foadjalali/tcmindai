import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

type Locale = "en" | "ar" | "tr"

const locales: readonly Locale[] = ["en", "ar", "tr"]

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const initialLocale = isLocale(locale) ? locale : "en"

  return (
    <ThemeProvider>
      <LanguageProvider initialLocale={initialLocale}>
        <Header />
        <main className="pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  )
}
