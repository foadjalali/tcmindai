// app/[locale]/faq/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";

import { Header } from "@/components/header";
import { CTASection } from "@/components/cta-section";
import FAQAccordion from "@/components/faq/faq-accordion";
import AskQuestionSection from "@/components/faq/ask-question-section";
import { makePageMetadata } from "@/lib/seo";

type Locale = "en" | "ar" | "tr";

type FAQItem = { q: string; a: string };
type FAQCategory = { category: string; items: FAQItem[] };
type FAQData = Record<Locale, FAQCategory[]>;

const LOCALES: readonly Locale[] = ["en", "ar", "tr"] as const;

const uiI18n: Record<Locale, { heroTitle: string; heroSubtitle: string }> = {
  en: {
    heroTitle: "Frequently Asked Questions",
    heroSubtitle:
      "Answers to common questions about our AI, software, and infrastructure services.",
  },
  ar: {
    heroTitle: "الأسئلة الشائعة",
    heroSubtitle:
      "إجابات عن أكثر الأسئلة شيوعًا حول خدمات الذكاء الاصطناعي والبرمجيات والبنية التحتية.",
  },
  tr: {
    heroTitle: "Sıkça Sorulan Sorular",
    heroSubtitle:
      "Yapay zekâ, yazılım ve altyapı hizmetlerimiz hakkında sık sorulan soruların yanıtları.",
  },
};


const ctaFaqI18n: Record<Locale, {
  title: string
  desc: string
  primary: string
  secondary: string
}> = {
  en: {
    title: "Still have questions?",
    desc: "If our FAQs didn’t cover it, reach out and we’ll be happy to help.",
    primary: "Contact Us",
    secondary: "About Us",
  },
  ar: {
    title: "ما زلت تملك أسئلة؟",
    desc: "إذا لم تُجب الأسئلة الشائعة عمّا تبحث عنه، تواصل معنا وسنسعد بمساعدتك.",
    primary: "تواصل معنا",
    secondary: "من نحن",
  },
  tr: {
    title: "Hâlâ sorularınız mı var?",
    desc: "SSS sayfasında aradığınızı bulamadıysanız, bize yazın,memnuniyetle yardımcı olalım.",
    primary: "Bize Ulaşın",
    secondary: "Hakkımızda",
  },
}

async function loadFaqs(locale: Locale): Promise<FAQCategory[]> {
  const filePath = path.join(process.cwd(), "db", "faq", "faqs.json");
  const raw = await fs.readFile(filePath, "utf8");
  const data: FAQData = JSON.parse(raw);
  return data[locale] ?? data["en"] ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return makePageMetadata("faq", locale, `/${locale}/faq`)
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const lang: Locale = (LOCALES as readonly string[]).includes(locale)
    ? (locale as Locale)
    : "en";
  const t = uiI18n[lang];
  const tr = ctaFaqI18n[lang]


  const categories = await loadFaqs(lang);
  const categoryNames = categories.map((c) => c.category);

  return (
    <div className="min-h-screen">
      <section className="relative flex items-center justify-center bg-gradient-to-br from-background via-background to-muted py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-balance">{t.heroTitle}</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{t.heroSubtitle}</p>
        </div>
      </section>

      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <FAQAccordion categories={categories} />
        </div>
      </section>

      <AskQuestionSection
        locale={lang}
        categories={categoryNames}
        sectionClassName="bg-feature-block"
      />

      <CTASection
        className="cta-theme"
        title={tr.title}
        description={tr.desc}
        primaryLabel={tr.primary}
        primaryHref={`/${lang}/contact`}
        secondaryLabel={tr.secondary}
        secondaryHref={`/${lang}/about`}
      />
    </div>
  );
}
