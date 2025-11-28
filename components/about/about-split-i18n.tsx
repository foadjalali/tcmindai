"use client"

import { useLanguage } from "@/components/language-provider"
import { SplitSection } from "@/components/sections/split-section"

type Props = {
  imageSrc: string
  imageAlt?: string
  reverse?: boolean

  // حالت 1: متن را مستقیم پاس بده
  eyebrowText?: string
  titleText?: string
  descText?: string

  // حالت 2: فقط کلید بده تا از t() بخونیم (سابق)
  eyebrowKey?: string
  titleKey?: string
  descKey?: string
}

export function AboutSplitI18n({
  imageSrc,
  imageAlt = "",
  reverse,
  eyebrowText,
  titleText,
  descText,
  eyebrowKey,
  titleKey,
  descKey,
}: Props) {
  const { t } = useLanguage()

  const eyebrow = eyebrowText ?? (eyebrowKey ? t(eyebrowKey) : undefined)
  const title = titleText ?? (titleKey ? t(titleKey) : "")
  const description = descText ?? (descKey ? t(descKey) : "")

  return (
    <SplitSection
      eyebrow={eyebrow}
      title={title}
      description={description}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      reverse={reverse}
    />
  )
}
