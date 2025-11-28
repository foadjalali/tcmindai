// Server Component , بدون "use client"
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import postsData from "@/db/blog/posts.json";

type Locale = "en" | "ar" | "tr";
type PostJSON = {
  slug: string;
  coverImage: { src: string; alt: Record<Locale, string> };
  author: { name: string; avatar?: string; role?: string };
  publishedAt: string;
  readingTimeMinutes?: number;
  tags: string[];
  translations: Record<Locale, { title: string; excerpt: string; description: string }>;
};

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://example.com") as string;

function getPost(slug: string) {
  const arr = postsData as PostJSON[];
  return arr.find((p) => p.slug === slug);
}
function estimateReadingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
function fmtDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "2-digit" }).format(
    new Date(iso)
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found", robots: { index: false, follow: true } };

  const tr = post.translations[locale];
  const path = `/${locale}/blog/${post.slug}`;
  const url = `${SITE_URL}${path}`;

  return {
    title: tr.title,
    description: tr.excerpt,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en/blog/${post.slug}`,
        ar: `${SITE_URL}/ar/blog/${post.slug}`,
        tr: `${SITE_URL}/tr/blog/${post.slug}`,
        "x-default": `${SITE_URL}/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      type: "article",
      url,
      title: tr.title,
      description: tr.excerpt,
      images: [{ url: post.coverImage.src, alt: post.coverImage.alt?.[locale] ?? tr.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: tr.title,
      description: tr.excerpt,
      images: [post.coverImage.src],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return notFound();

  const tr = post.translations[locale];
  const readingMinutes =
    post.readingTimeMinutes ?? estimateReadingTime(`${tr.excerpt}\n\n${tr.description}`);
  const dateLabel = fmtDate(post.publishedAt, locale);
  const coverAlt = post.coverImage.alt?.[locale] ?? tr.title;

  return (
    <article className="bg-background text-foreground">
      <section className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl pt-8 md:pt-12">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {post.tags?.[0] ? (
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-primary/20">
                {post.tags[0]}
              </span>
            ) : null}
            <span className="hidden md:inline" aria-hidden="true">
              •
            </span>
            <span>{dateLabel}</span>
            <span aria-hidden="true">•</span>
            <span>{readingMinutes} min</span>
          </div>

          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight tracking-tight text-balance">
            {tr.title}
          </h1>

          <div className="mt-5 flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted shrink-0">
              {post.author.avatar ? (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              ) : null}
            </div>
            <div className="text-sm">
              <div className="font-medium">{post.author.name}</div>
              {post.author.role ? (
                <div className="text-muted-foreground">{post.author.role}</div>
              ) : null}
            </div>
          </div>

          <p className="mt-6 text-lg md:text-md text-muted-foreground leading-relaxed">
            {tr.excerpt}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl mt-6 md:mt-8">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-border">
            <Image
              src={post.coverImage.src}
              alt={coverAlt}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-zinc dark:prose-invert max-w-none prose-a:text-primary">
            <div className="py-10 md:py-12 whitespace-pre-wrap leading-8">
              {tr.description}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="mx-auto max-w-3xl rounded-2xl border ring-1 ring-border bg-card p-6 md:p-8">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-muted">
              {post.author.avatar ? (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              ) : null}
            </div>
            <div>
              <div className="text-base font-semibold">{post.author.name}</div>
              {post.author.role ? (
                <div className="text-sm text-muted-foreground">{post.author.role}</div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="mx-auto max-w-3xl">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
            Back to all articles
          </Link>
        </div>
      </section>
    </article>
  );
}
