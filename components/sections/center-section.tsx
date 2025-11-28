"use client"

import { useEffect, useRef, useState } from "react"
import clsx from "clsx"

type CenterSectionProps = {
  /** عنوان وسط‌چین */
  title: string
  /** توضیحات زیر عنوان */
  description?: string
  /** متن بالای عنوان (اختیاری) */
  eyebrow?: string
  /** محتوا/کارت‌ها/هرچیز دلخواه زیر توضیحات (اختیاری) */
  children?: React.ReactNode
  /** حداکثر عرض محتوا */
  maxWidthClass?: string // مثلا: "max-w-3xl"
  /** کلاس اضافی برای root */
  className?: string
}

export function CenterSection({
  title,
  description,
  eyebrow,
  children,
  maxWidthClass = "max-w-3xl",
  className,
}: CenterSectionProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { setVisible(true); io.disconnect(); break }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className={clsx("py-16 md:py-20 bg-muted/20", className)}>
      <div className="container mx-auto px-4">
        <div
          className={clsx(
            "mx-auto text-center transition-all duration-700",
            maxWidthClass,
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
        >
          {/* {eyebrow && (
            <div className="mb-3 inline-flex rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              {eyebrow}
            </div>
          )} */}
          <h2 className="text-2xl md:text-3xl font-bold text-balance">{title}</h2>
          {description && (
            <p className="mt-3 leading-relaxed">{description}</p>
          )}
        </div>

        {children && <div className={clsx("mx-auto mt-8", maxWidthClass)}>{children}</div>}
      </div>
    </section>
  )
}
