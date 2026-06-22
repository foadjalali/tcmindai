import { NextResponse } from "next/server"

import { sendContactEmails } from "@/src/lib/email/mailer"
import type { ContactEmailPayload, ContactType } from "@/src/lib/email/types"

export const runtime = "nodejs"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CONTACT_TYPES: readonly ContactType[] = ["individual", "company"]

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function validationError(error: string) {
  return NextResponse.json({ success: false, error }, { status: 400 })
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>
    const contactType = stringValue(body.contactType) as ContactType
    const name = stringValue(body.name)
    const email = stringValue(body.email)
    const phone = stringValue(body.phone)
    const subject = stringValue(body.subject)
    const message = stringValue(body.message)

    if (!CONTACT_TYPES.includes(contactType)) {
      return validationError("Contact type is required")
    }

    if (!name) {
      return validationError("Name is required")
    }

    if (!email) {
      return validationError("Email is required")
    }

    if (!EMAIL_PATTERN.test(email)) {
      return validationError("Email is invalid")
    }

    if (!subject) {
      return validationError("Subject is required")
    }

    if (!message) {
      return validationError("Message is required")
    }

    const payload: ContactEmailPayload = {
      contactType,
      name,
      email,
      phone: phone || undefined,
      subject,
      message,
      submittedAt: new Date(),
    }

    await sendContactEmails(payload)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[send-email] Failed to send contact email", error)

    return NextResponse.json(
      { success: false, error: "internal error" },
      { status: 500 },
    )
  }
}
