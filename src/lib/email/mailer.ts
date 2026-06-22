import nodemailer from "nodemailer"

import { autoReplyTemplate } from "./auto-reply-template"
import { contactTemplate } from "./contact-template"
import { faqAutoReplyTemplate } from "./faq-auto-reply-template"
import { faqQuestionTemplate } from "./faq-question-template"
import type { ContactEmailPayload, EmailResult, FaqQuestionEmailPayload } from "./types"

type Transporter = ReturnType<typeof nodemailer.createTransport>

interface SmtpConfig {
  host: string
  port: number
  secure: boolean
  user: string
  pass: string
  receiver: string
}

let cachedConfig: SmtpConfig | null = null
let cachedTransporter: Transporter | null = null

function requiredEnv(name: string) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing required email environment variable: ${name}`)
  }

  return value
}

function getSmtpConfig(): SmtpConfig {
  const port = Number(requiredEnv("SMTP_PORT"))

  if (!Number.isInteger(port)) {
    throw new Error("SMTP_PORT must be a valid integer")
  }

  return {
    host: requiredEnv("SMTP_HOST"),
    port,
    secure: requiredEnv("SMTP_SECURE") === "true",
    user: requiredEnv("SMTP_USER"),
    pass: requiredEnv("SMTP_PASS"),
    receiver: requiredEnv("CONTACT_RECEIVER"),
  }
}

function getTransporter() {
  if (cachedConfig && cachedTransporter) {
    return {
      config: cachedConfig,
      transporter: cachedTransporter,
    }
  }

  cachedConfig = getSmtpConfig()

  cachedTransporter = nodemailer.createTransport({
    host: cachedConfig.host,
    port: cachedConfig.port,
    secure: cachedConfig.secure,
    auth: {
      user: cachedConfig.user,
      pass: cachedConfig.pass,
    },
  })

  return {
    config: cachedConfig,
    transporter: cachedTransporter,
  }
}

export async function sendContactEmails(payload: ContactEmailPayload): Promise<EmailResult> {
  const { config, transporter } = getTransporter()

  console.info("[send-email] Verifying SMTP connection")
  await transporter.verify()

  console.info("[send-email] Sending internal notification")
  await transporter.sendMail({
    from: `"TechnomindAI Website" <${config.user}>`,
    to: config.receiver,
    replyTo: payload.email,
    subject: `[TechnomindAI Contact] ${payload.subject}`,
    html: contactTemplate(payload),
  })

  console.info("[send-email] Sending auto reply")
  await transporter.sendMail({
    from: `"TechnomindAI" <${config.user}>`,
    to: payload.email,
    subject: "Thank you for contacting TechnomindAI",
    html: autoReplyTemplate(payload),
  })

  return { success: true }
}

export async function sendFaqQuestionEmails(payload: FaqQuestionEmailPayload): Promise<EmailResult> {
  const { config, transporter } = getTransporter()

  console.info("[faq-question] Verifying SMTP connection")
  await transporter.verify()

  console.info("[faq-question] Sending internal notification")
  await transporter.sendMail({
    from: `"TechnomindAI FAQ" <${config.user}>`,
    to: config.receiver,
    replyTo: payload.email,
    subject: `[TechnomindAI FAQ] ${payload.category || "New question"}`,
    html: faqQuestionTemplate(payload),
  })

  console.info("[faq-question] Sending auto reply")
  await transporter.sendMail({
    from: `"TechnomindAI" <${config.user}>`,
    to: payload.email,
    subject: "Thank you for your question",
    html: faqAutoReplyTemplate(payload),
  })

  return { success: true }
}
