import type { FaqQuestionEmailPayload } from "./types"

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#475569;font-weight:600;width:180px;">${label}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#111827;">${value}</td>
    </tr>
  `
}

export function faqQuestionTemplate(payload: FaqQuestionEmailPayload) {
  const submittedAt = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(payload.submittedAt)

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>TechnomindAI FAQ Question</title>
      </head>
      <body style="margin:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#111827;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;padding:32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
                <tr>
                  <td style="background:#0f172a;padding:28px 32px;">
                    <div style="color:#38bdf8;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">TechnomindAI</div>
                    <h1 style="margin:10px 0 0;color:#ffffff;font-size:24px;line-height:1.3;">New FAQ question</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 32px;">
                    <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.6;">
                      A visitor submitted a question through the TechnomindAI FAQ page.
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:12px;border-collapse:separate;border-spacing:0;overflow:hidden;">
                      ${row("Name", escapeHtml(payload.name || "Not provided"))}
                      ${row("Email", escapeHtml(payload.email))}
                      ${row("Category", escapeHtml(payload.category || "Not selected"))}
                      ${row("Locale", escapeHtml(payload.locale))}
                      ${row("Contact Consent", escapeHtml(payload.consent ? "Yes" : "No"))}
                      ${row("Submission Date/Time", escapeHtml(`${submittedAt} UTC`))}
                    </table>
                    <div style="margin-top:24px;">
                      <h2 style="margin:0 0 10px;color:#111827;font-size:16px;">Question</h2>
                      <div style="white-space:pre-wrap;background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;padding:16px;color:#111827;line-height:1.6;">${escapeHtml(payload.question)}</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}
