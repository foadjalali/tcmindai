export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";

import { Header } from "@/components/header";
import { AboutSplitI18n } from "@/components/about/about-split-i18n";
import { AboutCenterI18n } from "@/components/about/about-center-i18n";
import { CTASection } from "@/components/cta-section";
import { makePageMetadata } from "@/lib/seo";

type Locale = "en" | "ar" | "tr";
const LOCALES: readonly Locale[] = ["en", "ar", "tr"] as const;

const uiI18n: Record<Locale, { heroTitle: string; heroSubtitle: string }> = {
  en: { heroTitle: "About Us", heroSubtitle: "Learn about our mission, expertise, and the industries we serve." },
  ar: { heroTitle: "من نحن", heroSubtitle: "تعرّف على مهمتنا وخبراتنا والقطاعات التي نخدمها." },
  tr: { heroTitle: "Hakkımızda", heroSubtitle: "Misyonumuz, uzmanlığımız ve hizmet verdiğimiz sektörler hakkında bilgi edinin." },
};

const ctaAboutI18n: Record<Locale, {
  title: string
  desc: string
  primary: string
  secondary: string
}> = {
  en: {
    title: "Want to build with us?",
    desc: "We’re hiring engineers and creators who love shipping reliable AI products.",
    primary: "See Open Roles",
    secondary: "Contact Us",
  },
  ar: {
    title: "هل ترغب بالانضمام إلينا؟",
    desc: "نبحث عن مهندسين ومبدعين متحمسين لبناء منتجات ذكاء اصطناعي موثوقة.",
    primary: "عرض الوظائف المتاحة",
    secondary: "تواصل معنا",
  },
  tr: {
    title: "Bizimle birlikte üretmek ister misiniz?",
    desc: "Güvenilir yapay zekâ ürünleri geliştirmeyi seven mühendisleri ve yaratıcıları arıyoruz.",
    primary: "Açık Pozisyonlar",
    secondary: "Bize Ulaşın",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return makePageMetadata("about", locale, `/${locale}/about`)
}

async function loadAboutDict(locale: Locale) {
  const p = path.join(process.cwd(), "db", "about", "about.json");
  const raw = await fs.readFile(p, "utf8");
  const data = JSON.parse(raw) as Record<Locale, any>;
  return data[locale] ?? data.en ?? {};
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const lang: Locale = (LOCALES as readonly string[]).includes(locale) ? locale : "en";
  const t = uiI18n[lang];
  const tr = ctaAboutI18n[locale];
  const dict = await loadAboutDict(lang);

  return (
    <div className="min-h-screen">
      {/* ==== Hero Section ==== */}
      <section
        className="relative flex items-center justify-center bg-gradient-to-br from-background via-background to-muted py-16 md:py-24 overflow-hidden"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-balance">{t.heroTitle}</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{t.heroSubtitle}</p>
        </div>
      </section>

      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <AboutSplitI18n
            imageSrc="/about/mission.webp"
            imageAlt="Mission"
            reverse={false}
            eyebrowText={dict.missionTitle}
            titleText={dict.missionTitle}
            descText={dict.missionBody}
          />
        </div>
      </section>

      <section className="py-16 px-4 sec-theme bg-[var(--sec-bg)] text-[var(--sec-fg)]" data-aos="fade-up" data-aos-duration="1000">
        <div className="container mx-auto">
          <AboutCenterI18n
            eyebrow={dict.valuesTitle}
            title={dict.valuesTitle}
            description={dict.valuesBody}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            {dict.valuesList.map((item: any, i: number) => (
              <div
                key={i}
                className="p-6 border rounded-xl bg-background/10 backdrop-blur-md text-center"
                data-aos="zoom-in"
                data-aos-delay={i * 120}
              >
                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <AboutSplitI18n
            imageSrc="/about/vision.webp"
            imageAlt="Vision"
            reverse
            eyebrowText={dict.visionTitle}
            titleText={dict.visionTitle}
            descText={dict.visionBody}
          />
        </div>
      </section>

      <CTASection
        className="cta-theme"
        title={tr.title}
        description={tr.desc}
        primaryLabel={tr.primary}
        primaryHref={`/${locale}/career`}
        secondaryLabel={tr.secondary}
        secondaryHref={`/${locale}/contact`}
        data-aos="fade-up"
        data-aos-duration="800"
      />
    </div>
  );
}
