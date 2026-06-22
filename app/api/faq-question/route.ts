import { NextResponse } from "next/server"

import { sendFaqQuestionEmails } from "@/src/lib/email/mailer"
import type { FaqQuestionEmailPayload } from "@/src/lib/email/types"

export const runtime = "nodejs"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LOCALES = ["en", "ar", "tr"] as const

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function validationError(error: string) {
  return NextResponse.json({ success: false, error }, { status: 400 })
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>
    const name = stringValue(body.name)
    const email = stringValue(body.email)
    const category = stringValue(body.category)
    const question = stringValue(body.question)
    const locale = stringValue(body.locale)
    const consent = body.consent === true

    if (!email) {
      return validationError("Email is required")
    }

    if (!EMAIL_PATTERN.test(email)) {
      return validationError("Email is invalid")
    }

    if (!question) {
      return validationError("Question is required")
    }

    const payload: FaqQuestionEmailPayload = {
      name: name || undefined,
      email,
      category: category || undefined,
      question,
      consent,
      locale: LOCALES.includes(locale as (typeof LOCALES)[number])
        ? (locale as FaqQuestionEmailPayload["locale"])
        : "en",
      submittedAt: new Date(),
    }

    await sendFaqQuestionEmails(payload)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[faq-question] Failed to send FAQ question email", error)

    return NextResponse.json(
      { success: false, error: "internal error" },
      { status: 500 },
    )
  }
}
