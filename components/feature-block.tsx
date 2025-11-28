"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Dir = "ltr" | "rtl"

export type FeatureBlockProps = {
  title: string
  text: string
  button: { label: string; href: string }
  image: { src: string; alt: string; width?: number; height?: number }
  reverse?: boolean
  className?: string
  dir?: Dir

  sectionBg?: string
  sectionText?: string

  buttonBg?: string
  buttonText?: string
  buttonRing?: string
  buttonClassName?: string
}

export default function FeatureBlock({
  title,
  text,
  button,
  image,
  reverse = false,
  className,
  dir = "ltr",

  sectionBg,
  sectionText,

  buttonBg = "bg-btn-primary",
  buttonText = "text-btn-primary-foreground",
  buttonRing = "focus-visible:ring-[var(--btn-primary-foreground)]",
  buttonClassName,
}: FeatureBlockProps) {
  const textFirst = !reverse
  const isRTL = dir === "rtl"

  const leftColIsText = textFirst
  const rightColIsText = !textFirst

  const fromLeft = isRTL ? "fade-right" : "fade-left"
  const fromRight = isRTL ? "fade-left" : "fade-right"

  return (
    <section
      dir={dir}
      className={cn(
        "w-full py-10 md:py-16 overflow-x-hidden", // 👈 اینو اضافه کن
        sectionBg,
        sectionText,
        className
      )}
      data-aos="fade-up"
      data-aos-once="true"
      data-aos-mirror="false"
      data-aos-duration="500"
      data-aos-easing="ease-out-cubic"
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "grid items-center gap-8 md:gap-12 lg:gap-16",
            "lg:grid-cols-2"
          )}
        >
          <div
            className={cn(textFirst ? "order-1" : "order-2")}
            data-aos={leftColIsText ? fromLeft : fromRight}
            data-aos-once="true"
            data-aos-mirror="false"
            data-aos-duration="700"
            data-aos-delay="80"
            data-aos-easing="ease-out-cubic"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-balance">
              {title}
            </h2>
            <p className="mt-4 text-base md:text-lg text-inherit/90 leading-relaxed">
              {text}
            </p>

            <div className="mt-6">
              <Link
                href={button.href}
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
                  buttonBg,
                  buttonText,
                  buttonRing,
                  buttonClassName
                )}
              >
                {button.label}
              </Link>
            </div>
          </div>

          <div
            className={cn(textFirst ? "order-2" : "order-1")}
            data-aos={leftColIsText ? fromRight : fromLeft}
            data-aos-once="true"
            data-aos-mirror="false"
            data-aos-duration="700"
            data-aos-delay="140"
            data-aos-easing="ease-out-cubic"
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl border bg-muted">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

