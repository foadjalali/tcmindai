// app/layout.tsx (Root)
import AOSProvider from "@/components/providers/aos-provider"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import AOSRouteRefresher from "@/components/AOSRouteRefresher"

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
