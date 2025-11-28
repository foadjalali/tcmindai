import { promises as fs } from "fs";
import path from "path";
import type { Metadata } from "next";

export type Locale = "en" | "ar" | "tr";
const LOCALES: readonly Locale[] = ["en", "ar", "tr"] as const;
const SITE_URL = "https://technomindai.com";

type PageKey =
  | "home" | "about" | "blog" | "career" | "contact" | "faq" | "solution";

type PageSEO = {
  title: string;
  description: string;
  keywords?: string;            // comma-separated in JSON
  canonical: string;            // absolute
  image?: string;               // relative (/og/...)
};
type SEOJSON = Record<PageKey, Record<Locale, PageSEO>>;

let _seoCache: SEOJSON | null = null;

async function loadSEO(): Promise<SEOJSON> {
  if (_seoCache) return _seoCache;
  const filePath = path.join(process.cwd(), "db", "seo", "meta.json");
  const raw = await fs.readFile(filePath, "utf8");
  _seoCache = JSON.parse(raw) as SEOJSON;
  return _seoCache!;
}

/**
 * خواندن بسته متا برای صفحه‌ای مشخص و ساخت Metadata کامل Next.js
 * @param pageKey کلید صفحه در JSON (مثلاً "blog")
 * @param locale  زبان مسیر داینامیک
 * @param routePath مسیر نسبی صفحه با locale، مثل `/${locale}/blog`
 */
export async function makePageMetadata(
  pageKey: PageKey,
  locale: Locale,
  routePath: string
): Promise<Metadata> {
  const data = await loadSEO();
  const lang: Locale = (LOCALES as readonly string[]).includes(locale) ? locale : "en";
  const entry = data[pageKey]?.[lang];

  if (!entry) {
    // fallback امن
    return {
      title: "TechnomindAI",
      description: "AI driven technology and infrastructure",
    };
  }

  const imageAbs = entry.image?.startsWith("http")
    ? entry.image
    : `${SITE_URL}${entry.image ?? "/og/default.jpg"}`;

  // build alternates for all locales from same pageKey
  const langs = data[pageKey];
  const alternatesLanguages = Object.fromEntries(
    (LOCALES as readonly Locale[]).map(l => [l, `${SITE_URL}/${l}/${pageKey === "home" ? "" : pageKey}`.replace(/\/$/, "")])
  ) as Record<string, string>;

  return {
    title: entry.title,
    description: entry.description,
    keywords: entry.keywords ? entry.keywords.split(",").map(s => s.trim()).filter(Boolean) : undefined,
    alternates: {
      canonical: entry.canonical,
      languages: {
        ...alternatesLanguages,
        "x-default": alternatesLanguages.en,
      },
    },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url: `${SITE_URL}${routePath}`,
      type: "website",
      siteName: "TechnomindAI",
      images: [{ url: imageAbs }],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
      images: [imageAbs],
    },
  };
}
