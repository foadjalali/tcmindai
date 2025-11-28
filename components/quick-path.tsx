"use client"

import Link from "next/link"
import { Boxes, UserCircle2, FileQuestion, Phone, BriefcaseBusiness, Newspaper } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function QuickPathsSection() {
  const { t, language } = useLanguage()

  const items = [
    { href: `/${language}/products`, icon: Boxes,       title: t("products") },
    { href: `/${language}/about`,    icon: UserCircle2, title: t("aboutUs") },
    { href: `/${language}/blog`,     icon: Newspaper,   title: t("blog") },
    { href: `/${language}/faq`,      icon: FileQuestion,title: t("faq") },
    { href: `/${language}/contact`,  icon: Phone,       title: t("contactUs") },
    { href: `/${language}/career`,   icon: BriefcaseBusiness, title: t("career") },
  ]

  return (
    <section className="py-12 sm:py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{t("exploreMore")}</h2>
          <p className="mt-2 text-muted-foreground">{t("quickLinks")}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {items.map(({ href, icon: Icon, title }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-xl border border-border/60 bg-card/60 backdrop-blur p-4 flex flex-col items-center justify-center hover:shadow-md transition"
            >
              <div className="rounded-lg bg-primary/10 text-primary p-2 mb-2">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-center">{title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
