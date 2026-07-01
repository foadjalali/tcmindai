// app/layout.tsx (Root)
import type { Metadata } from "next"
import AOSProvider from "@/components/providers/aos-provider"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import AOSRouteRefresher from "@/components/AOSRouteRefresher"

export const metadata: Metadata = {
  verification: {
    google: "xH0Sjjb63egJQ6WvfZ9QMGkTQereECCWXQT__cG49HQ",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="tm-theme"
        >
          {children}
        </ThemeProvider>
        <AOSProvider />
        <AOSRouteRefresher />
      </body>
    </html>
  )
}
