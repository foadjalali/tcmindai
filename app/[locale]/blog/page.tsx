// app/[locale]/blog/page.tsx
// no "use client" here ✅
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import postsData from "@/db/blog/posts.json"
import { CTASection } from "@/components/cta-section"
import BlogExplorer from "@/components/blog/blog-explorer"
import AOSInit from "@/components/aos-init"
import { makePageMetadata } from "@/lib/seo"

type Locale = "en" | "ar" | "tr"

type PostJSON = {
  slug: string
  coverImage: { src: string; alt: Record<Locale, string> }
  author: { name: string; avatar?: string }
  publishedAt: string
  readingTimeMinutes?: number
  tags: string[]
  translations: Record<
    Locale,
    { title: string; excerpt: string; description: string }
  >
}

const ctaI18n: Record<Locale, {
  title: string
  desc: string
  primary: string
  secondary: string
}> = {
  en: {
    title: "Get to know us better",
    desc: "Explore our mission, team, and how we turn AI ideas into reliable products.",
    primary: "About Us",
    secondary: "Our Solutions",
  },
  ar: {
    title: "تعرّف علينا أكثر",
    desc: "اكتشف رسالتنا وفريقنا وكيف نحوّل أفكار الذكاء الاصطناعي إلى منتجات موثوقة.",
    primary: "من نحن",
    secondary: "حلولنا",
  },
  tr: {
    title: "Bizi daha yakından tanıyın",
    desc: "Misyonumuzu, ekibimizi ve yapay zekâ fikirlerini güvenilir ürünlere nasıl dönüştürdüğümüzü keşfedin.",
    primary: "Hakkımızda",
    secondary: "Çözümlerimiz",
  },
}

const uiI18n: Record<Locale, any> = {
  en: {
    heroTitle: "Insights & Updates",
    heroSubtitle: "Stay informed with the latest trends, news, and expert perspectives from our team.",
    readMore: "Read More",
    searchPlaceholder: "Search posts…",
    all: "All",
  },
  ar: {
    heroTitle: "رؤى وتحديثات",
    heroSubtitle: "ابقَ على اطلاع بأحدث الاتجاهات والأخبار ووجهات النظر من فريقنا.",
    readMore: "اقرأ المزيد",
    searchPlaceholder: "ابحث في المقالات…",
    all: "الكل",
  },
  tr: {
    heroTitle: "İçgörüler ve Güncellemeler",
    heroSubtitle: "Ekibimizden en son trendler, haberler ve uzman görüşleriyle bilgilenin.",
    readMore: "Devamını Oku",
    searchPlaceholder: "Yazılarda ara…",
    all: "Tümü",
  },
}

function estimateReadingTime(text: string) {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

function fmtDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(iso))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return makePageMetadata("blog", locale, `/${locale}/blog`)
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const t = uiI18n[locale]
  const tr = ctaI18n[locale]

  const raw = postsData as PostJSON[]
  const posts = raw
    .map((p) => {
      const trp = p.translations[locale]
      const reading =
        p.readingTimeMinutes ??
        estimateReadingTime(`${trp.excerpt}\n\n${trp.description}`)
      return {
        slug: p.slug,
        title: trp.title,
        excerpt: trp.excerpt,
        imageSrc: p.coverImage.src,
        imageAlt: p.coverImage.alt?.[locale] ?? trp.title,
        author: p.author.name,
        dateISO: p.publishedAt,
        dateLabel: fmtDate(p.publishedAt, locale),
        readTime: `${reading} min`,
        // category = first tag (element 0) as you requested
        category: p.tags?.[0] ?? t.all,
      }
    })
    .sort((a, b) => +new Date(b.dateISO) - +new Date(a.dateISO))

  // Unique categories from element 0 (first tag)
  const categories = Array.from(new Set(posts.map(p => p.category || t.all)))

  return (
    <div className="min-h-screen">
      {/* init AOS once on this page */}
      <AOSInit />

      {/* Hero with subtle grid + AOS */}
      <section
        className="relative flex items-center justify-center bg-gradient-to-br from-background via-background to-muted py-16 md:py-24 overflow-hidden"
        data-aos="fade-up"
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-balance">{t.heroTitle}</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{t.heroSubtitle}</p>
        </div>
      </section>

      {/* Search + Category filter + Animated Grid (client) */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <BlogExplorer
            locale={locale}
            i18n={{
              readMore: t.readMore,
              searchPlaceholder: t.searchPlaceholder,
              all: t.all,
            }}
            categories={categories}
            posts={posts}
          />
        </div>
      </section>

      <CTASection
        className="cta-theme"
        title={tr.title}
        description={tr.desc}
        primaryLabel={tr.primary}
        primaryHref={`/${locale}/about`}
        secondaryLabel={tr.secondary}
        secondaryHref={`/${locale}/solutions`}
      />
    </div>
  )
}
