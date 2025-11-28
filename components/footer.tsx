"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  const { language, setLanguage, t } = useLanguage()
  const href = `/${language}`

  const quickLinks = [
    { href: "/", label: t("home") },
    { href: "/products", label: t("products") },
    { href: "/solutions", label: t("solutions") },
    { href: "/career", label: t("career") },
    { href: "/about", label: t("aboutUs") },
  ]

  const exploreLinks = [
    { href: "/blog", label: t("blog") },
    { href: "/faq", label: t("faq") },
    { href: "/contact", label: t("contactUs") },
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href={`/${language}`} className="flex items-center">
              <img
                src="/tcmindai.png"
                alt="InovativAI — Intelligent Solutions"
                className="h-10 md:h-12 w-auto"
                style={{ height: '2rem' }}
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">{t("heroSubtitle")}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t("quickLinks")}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t("exploreMore")}</h4>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TechnoMindAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
