"use client"

import { useLanguage } from "@/components/language-provider"
import { CenterSection } from "@/components/sections/center-section"

type CenterProps = {
  eyebrow?: string
  title?: string
  description?: string
}

export function AboutCenterI18n(props: CenterProps) {
  const { t } = useLanguage()
  const eyebrow = props.eyebrow ?? t("aboutUs")
  const title = props.title ?? t("whoWeAreTitle") ?? "Who We Are"
  const description =
    props.description ??
    t("whoWeAreBody") ??
    "We deliver end-to-end solutions across AI software, IT, and specialized equipment."

  return <CenterSection eyebrow={eyebrow} title={title} description={description} />
}
