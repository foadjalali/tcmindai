"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

type Locale = "en" | "ar" | "tr"

type PostItem = {
  slug: string
  title: string
  excerpt: string
  imageSrc: string
  imageAlt: string
  author: string
  dateISO: string
  dateLabel: string
  readTime: string
  category: string
}

export default function BlogExplorer({
  locale,
  i18n,
  categories,
  posts,
}: {
  locale: Locale
  i18n: { readMore: string; searchPlaceholder: string; all: string }
  categories: string[]
  posts: PostItem[]
}) {
  const [query, setQuery] = useState("")
  const [activeCat, setActiveCat] = useState<string>(i18n.all)
  const inputRef = useRef<HTMLInputElement>(null)

  // ⌘/Ctrl+K فوکوس سرچ
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes("mac")
      if ((isMac && e.metaKey && e.key.toLowerCase() === "k") || (!isMac && e.ctrlKey && e.key.toLowerCase() === "k")) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // ensure "All" exists and is first
  const catList = useMemo(() => {
    const set = new Set([i18n.all, ...categories.filter(Boolean)])
    return Array.from(set)
  }, [categories, i18n.all])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter(p => {
      const matchesCat = activeCat === i18n.all || p.category === activeCat
      if (!q) return matchesCat
      const hay = `${p.title} ${p.excerpt} ${p.author} ${p.category}`.toLowerCase()
      return matchesCat && hay.includes(q)
    })
  }, [posts, query, activeCat, i18n.all])

  // AOS refresh after filter changes
  useEffect(() => {
    // @ts-ignore
    if (window.AOS?.refreshHard) setTimeout(() => window.AOS.refreshHard(), 60)
  }, [filtered.length, activeCat])

  return (
    <div className="space-y-8">
      {/* Controls: Search (flex-1, بزرگ) + Category dropdown */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center" data-aos="fade-up">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={i18n.searchPlaceholder}
            className="w-full h-12 md:h-14 rounded-2xl border bg-background px-5 pr-14 text-base md:text-lg outline-none ring-0 focus:ring-2 focus:ring-primary transition"
            aria-label={i18n.searchPlaceholder}
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xs md:text-sm">
            ⌘K
          </span>
        </div>

        <div className="relative w-full md:w-64" data-aos="fade-up" data-aos-delay="50">
          <select
            value={activeCat}
            onChange={(e) => setActiveCat(e.target.value)}
            className="w-full h-12 md:h-14 appearance-none rounded-2xl border bg-card text-foreground px-4 pr-10 text-sm md:text-base outline-none ring-0 focus:ring-2 focus:ring-primary transition"
            aria-label="Category"
          >
            {catList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {/* chevron */}
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filtered.map((post, idx) => (
          <article
            key={post.slug}
            className="group overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay={Math.min(240, (idx % 4) * 60)}
          >
            <Link href={`/${locale}/blog/${post.slug}`} className="relative block overflow-hidden">
              <div className="relative w-full aspect-[9/5]">
                <Image
                  src={post.imageSrc}
                  alt={post.imageAlt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(min-width:1024px) 25vw, (min-width:768px) 50vw, 100vw"
                />
              </div>
              {post.category && (
                <span className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {post.category}
                </span>
              )}
            </Link>

            <div className="p-6">
              <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                <span>{post.dateLabel}</span>
                <span aria-hidden="true">•</span>
                <span>{post.readTime}</span>
              </div>

              <Link href={`/${locale}/blog/${post.slug}`}>
                <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
              </Link>

              <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{post.author}</span>
              </div>

              <div className="mt-4">
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="inline-flex items-center font-semibold hover:text-primary transition-colors"
                >
                  {i18n.readMore}
                  <svg
                    className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-muted-foreground border rounded-xl p-10" data-aos="fade-up">
          No posts found.
        </div>
      )}
    </div>
  )
}
