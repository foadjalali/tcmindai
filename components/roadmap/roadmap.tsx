import React from "react"
import fs from "fs/promises"
import path from "path"
import ProjectJourney, { JourneyStep } from "@/components/project-journey"
import { Brain, FileSearch, Boxes, Hammer, Bug, Rocket } from "lucide-react"

type Locale = "en" | "ar" | "tr"

async function loadJourney(locale: Locale) {
  const file = path.join(process.cwd(), "db", "home", "journey.json")
  const raw = await fs.readFile(file, "utf8")
  const data = JSON.parse(raw)
  return data[locale] ?? data.en
}

export default async function JourneyDemo({ locale = "en" }: { locale?: Locale }) {
  const lang = await loadJourney(locale)

  const iconList = [Brain, FileSearch, Boxes, Hammer, Bug, Rocket]
  const steps: JourneyStep[] = lang.steps.map((s: any, i: number) => ({
    percent: i * (100 / (lang.steps.length - 1)),
    title: s.title,
    description: s.description,
    icon: React.createElement(iconList[i % iconList.length], { className: "size-4" })
  }))

  return (
    <ProjectJourney
      title={lang.title}
      subtitle={lang.subtitle}
      steps={steps}
      dir={locale === "ar" ? "rtl" : "ltr"}
      target={100}
      durationMs={4200}
      fillDelayMs={300}
      progressStrokeClass="stroke-[4] stroke-primary"
      trackStrokeClass="stroke-muted"
      markerClass="bg-primary"
    />
  )
}
