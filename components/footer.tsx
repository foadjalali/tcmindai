"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react"

export function Footer() {
  const { language, t } = useLanguage()

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div>
            <Link href={`/${language}`} className="flex items-center">
              <img
                src="/tclogo.svg"
                alt="TechnomindAI — Intelligent Solutions"
                className="h-10 md:h-12 w-auto"
                style={{ height: '5rem' }}
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
            <h4 className="font-semibold mb-4 text-foreground">{t("followUs")}</h4>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/technomind-ai/" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t("contactInfo")}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:info@technomindai.com"
                  className="flex items-start gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>info@technomindai.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Frederick%20Street%2C%20London%2C%20England%2C%20WC1X%200ND"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>Frederick Street, London, England, WC1X 0ND</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+447747984494"
                  className="flex items-start gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>+447747984494</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/447747984494"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>WhatsApp: +447747984494</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TechnoMindAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
