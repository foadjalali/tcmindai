// app/[locale]/careers/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";

import { Header } from "@/components/header";
import JobCard from "@/components/careers/job-card"; // (Client Component)
import { CTASection } from "@/components/cta-section";
import { makePageMetadata } from "@/lib/seo";

type Locale = "en" | "ar" | "tr";
const LOCALES: readonly Locale[] = ["en", "ar", "tr"] as const;

type Job = {
  id: string;
  title: string;
  short: string;        // خلاصه
  tags?: string[];
  email?: string;       // ایمیل مقصد apply
  description: string;  // توضیحات کامل
};
type JobsData = Record<Locale, Job[]>;

const uiI18n: Record<Locale, { heroTitle: string; heroSubtitle: string; readMore: string; apply: string }> = {
  en: {
    heroTitle: "Careers",
    heroSubtitle: "Join our team to build the future of AI, software, and infrastructure.",
    readMore: "Read more",
    apply: "Apply",
  },
  ar: {
    heroTitle: "الوظائف",
    heroSubtitle: "انضم إلى فريقنا لبناء مستقبل الذكاء الاصطناعي والبرمجيات والبنية التحتية.",
    readMore: "اقرأ المزيد",
    apply: "قدّم الآن",
  },
  tr: {
    heroTitle: "Kariyer",
    heroSubtitle: "Yapay zekâ, yazılım ve altyapının geleceğini birlikte inşa edelim.",
    readMore: "Devamını oku",
    apply: "Başvur",
  },
};
const ctaCareerI18n: Record<Locale, {
  title: string
  desc: string
  primary: string
  secondary: string
}> = {
  en: {
    title: "Have questions about our company?",
    desc: "Browse our FAQs to learn how we work, what we build, and the value we bring to clients.",
    primary: "Visit FAQs",
    secondary: "Contact Us",
  },
  ar: {
    title: "لديك أسئلة حول شركتنا؟",
    desc: "تصفّح قسم الأسئلة الشائعة لتتعرف على أسلوب عملنا وما نبنيه والقيمة التي نقدّمها لعملائنا.",
    primary: "الأسئلة الشائعة",
    secondary: "تواصل معنا",
  },
  tr: {
    title: "Şirketimiz hakkında sorularınız mı var?",
    desc: "SSS sayfamızda nasıl çalıştığımızı, neler geliştirdiğimizi ve müşterilerimize kattığımız değeri keşfedin.",
    primary: "SSS’yi Ziyaret Et",
    secondary: "Bizimle İletişime Geçin",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return makePageMetadata("career", locale, `/${locale}/career`)
}

async function loadJobs(locale: Locale): Promise<Job[]> {
  const filePath = path.join(process.cwd(), "db", "careers", "jobs.json");
  const raw = await fs.readFile(filePath, "utf8");
  const data: JobsData = JSON.parse(raw);
  return data[locale] ?? data["en"] ?? [];
}

export default async function CareerPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const lang: Locale = (LOCALES as readonly string[]).includes(locale) ? locale : "en";
  const t = uiI18n[lang];
  const jobs = await loadJobs(lang);
  const tr = ctaCareerI18n[locale]


  return (
    <div className="min-h-screen">
      {/* Hero سروری (الگوی بلاگ/FAQ) */}
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

      {/* Grid کارت‌های شغلی */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job, idx) => (
              <JobCard
                key={job.id}
                job={job}
                locale={lang}
                aosDelay={idx * 50}
                labels={{ readMore: t.readMore, apply: t.apply }}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        className="cta-theme"
        title={tr.title}
        description={tr.desc}
        primaryLabel={tr.primary}
        primaryHref={`/${locale}/faq`}        // ← هدایت به FAQs
        secondaryLabel={tr.secondary}
        secondaryHref={`/${locale}/contact`} // ← مسیر مکمل
      // dir={locale === "ar" ? "rtl" : "ltr"} // اگر RTL می‌خواهی
      />
    </div>
  );
}
