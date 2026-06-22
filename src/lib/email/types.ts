export type ContactType = "individual" | "company"

export interface ContactEmailPayload {
  contactType: ContactType
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  submittedAt: Date
}

export interface FaqQuestionEmailPayload {
  name?: string
  email: string
  category?: string
  question: string
  consent: boolean
  locale: "en" | "ar" | "tr"
  submittedAt: Date
}

export interface EmailResult {
  success: true
}
