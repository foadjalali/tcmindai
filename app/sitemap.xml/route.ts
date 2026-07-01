import posts from "@/db/blog/posts.json"
import { SITE_URL } from "@/lib/site-url"
const LOCALES = ["en", "ar", "tr"] as const
const STATIC_ROUTES = ["", "about", "blog", "career", "contact", "faq", "products", "solutions"] as const

type Locale = (typeof LOCALES)[number]
type BlogPost = {
  slug: string
  publishedAt: string
}

type SitemapEntry = {
  path: string
  lastModified?: string
  changeFrequency: "weekly" | "monthly"
  priority: string
}

function localizedUrl(locale: Locale, path: string) {
  return `${SITE_URL}/${locale}${path ? `/${path}` : ""}`
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function urlEntry(entry: SitemapEntry, locale: Locale) {
  const alternates = [
    ...LOCALES.map(
      (alternateLocale) =>
        `    <xhtml:link rel="alternate" hreflang="${alternateLocale}" href="${escapeXml(
          localizedUrl(alternateLocale, entry.path)
        )}" />`
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(localizedUrl("en", entry.path))}" />`,
  ].join("\n")

  return [
    "  <url>",
    `    <loc>${escapeXml(localizedUrl(locale, entry.path))}</loc>`,
    entry.lastModified ? `    <lastmod>${entry.lastModified}</lastmod>` : "",
    `    <changefreq>${entry.changeFrequency}</changefreq>`,
    `    <priority>${entry.priority}</priority>`,
    alternates,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n")
}

export function GET() {
  const staticEntries: SitemapEntry[] = STATIC_ROUTES.map((path) => ({
    path,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? "1.0" : "0.8",
  }))

  const blogEntries: SitemapEntry[] = (posts as BlogPost[]).map((post) => ({
    path: `blog/${post.slug}`,
    lastModified: new Date(post.publishedAt).toISOString(),
    changeFrequency: "monthly",
    priority: "0.7",
  }))

  const urls = [...staticEntries, ...blogEntries]
    .flatMap((entry) => LOCALES.map((locale) => urlEntry(entry, locale)))
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  })
}
