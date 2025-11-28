import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

type Locale = "en" | "ar" | "tr"

export default async function SiteLayout({ children, params }: { children: React.ReactNode; params: Promise<{locale:"en"|"ar"|"tr"}>}) {
  const { locale } = await params
  return (
    <ThemeProvider>
      <LanguageProvider initialLocale={locale}>
        <Header />
        <main className="pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  )
}
