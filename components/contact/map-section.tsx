// components/contact/map-section.tsx
"use client"

export default function MapSection({
  locale,
  embedUrl,
}: {
  locale: "en" | "ar" | "tr"
  embedUrl: string
}) {
  const title = { en: "Find Us on the Map", ar: "اعثر علينا على الخريطة", tr: "Haritada Bizi Bulun" }[locale]
  const subtitle = {
    en: "Our office location and surroundings.",
    ar: "موقع مكتبنا والمناطق المحيطة.",
    tr: "Ofis konumumuz ve çevresi.",
  }[locale]

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 md:p-5 shadow-sm">
      <div className="mb-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      <div className="rounded-xl overflow-hidden border border-border/50">
        <iframe
          src={embedUrl}
          width="100%"
          height="360"
          loading="lazy"
          style={{ border: 0 }}
          aria-label={title}
        />
      </div>
      {/* لینک OSM کامل (اختیاری) */}
      {/* <div className="mt-2 text-xs text-muted-foreground">
        <a className="underline" href="https://www.openstreetmap.org/" target="_blank" rel="noreferrer">OpenStreetMap</a>
      </div> */}
    </div>
  )
}
