"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import clsx from "clsx"

type SplitSectionProps = {
  title: string
  description: string
  imageSrc: string
  imageAlt?: string
  reverse?: boolean
  eyebrow?: string
  children?: React.ReactNode
  className?: string
}

export function SplitSection({
  title,
  description,
  imageSrc,
  imageAlt = "",
  reverse = false,
  eyebrow,
  children,
  className,
}: SplitSectionProps) {
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
    <section ref={ref} className={clsx("bg-background", className)}>
      <div
        className={clsx(
          "mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20",
          reverse ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""
        )}
      >
        <div className={clsx(
          "relative w-full overflow-hidden rounded-[1.75rem] ring-1 ring-border/50",
          "aspect-[1.08/1] sm:aspect-[4/3] md:aspect-[1.18/1] lg:aspect-[1.28/1]",
          "bg-muted shadow-2xl shadow-primary/5 transition-all duration-700",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        )}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
            priority={false}
          />
        </div>

        <div className={clsx(
          "max-w-xl md:px-2 lg:px-0 transition-all duration-700",
          reverse ? "md:justify-self-start" : "md:justify-self-end",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        )}>
          {eyebrow && (
            <div className="mb-3 inline-flex rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              {eyebrow}
            </div>
          )}
          <h2 className="text-2xl md:text-4xl font-bold leading-tight text-balance">{title}</h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">{description}</p>

          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </section>
  )
}
