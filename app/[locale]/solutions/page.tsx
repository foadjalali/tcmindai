// app/[locale]/solutions/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import type { Metadata } from "next";
import path from "path";
import { promises as fs } from "fs";
import ScrollImage from "@/components/solutions/scroll-image";
import { makePageMetadata } from "@/lib/seo";

type Locale = "en" | "ar" | "tr";

type Solution = {
  title: string;
  subtitle: string;
  image: string;
  paragraphs: string[];
};
type SolutionsData = Record<Locale, Solution[]>;

async function loadSolutions(locale: Locale): Promise<Solution[]> {
  const filePath = path.join(process.cwd(), "db", "solutions", "solutions.json");
  const raw = await fs.readFile(filePath, "utf8");
  const data: SolutionsData = JSON.parse(raw);
  return data[locale] ?? data.en ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return makePageMetadata("solution", locale, `/${locale}/solutions`)
}

export default async function SolutionsPage({
  params,
}: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const lang: Locale = (["en", "ar", "tr"] as const).includes(locale) ? locale : "en";

  const solutions = await loadSolutions(lang);

  return (
    <div className="min-h-screen">
      <section className="relative flex items-center justify-center bg-gradient-to-br from-background via-background to-muted py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-balance">
            {lang === "ar" ? "الحلول" : lang === "tr" ? "Çözümler" : "Solutions"}
          </h1>
          <p className="mt-4 text-inherit/90 max-w-2xl mx-auto">
            {lang === "ar"
              ? "نقدّم حلولاً متكاملة تغطي المنتجات والمنصات والبنية التحتية."
              : lang === "tr"
              ? "Ürünlerden platformlara ve altyapıya uzanan uçtan uca çözümler sunuyoruz."
              : "End-to-end solutions across products, platforms, and infrastructure."}
          </p>
        </div>
      </section>

      {solutions.map((s, idx) => (
        <section
          key={s.title + idx}
          className={`py-14 md:py-20 ${
            idx % 2 === 1 ? "bg-muted/30" : "bg-background"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold">{s.title}</h2>
              <p className="mt-3 text-inherit/90 text-lg md:text-xl">{s.subtitle}</p>
            </div>

            <div className="mt-8 md:mt-50 mx-auto" data-aos="fade-up">
              <ScrollImage
                heightClass="h-[40rem] md:h-[34rem]"
                titleComponent={null}
                src={s.image}
                alt={s.title}
              />
            </div>

            <div className="mt-8 md:mt-30 mx-auto text-center">
              <div className="space-y-5 text-inherit/90 leading-relaxed">
                {(s.paragraphs ?? []).slice(0, 2).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
