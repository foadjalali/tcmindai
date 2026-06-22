import type { ContactEmailPayload } from "./types"

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function formatContactType(value: ContactEmailPayload["contactType"]) {
  return value === "company" ? "Company" : "Individual"
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#475569;font-weight:600;width:180px;">${label}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#111827;">${value}</td>
    </tr>
  `
}

export function contactTemplate(payload: ContactEmailPayload) {
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
        <title>TechnomindAI Contact</title>
      </head>
      <body style="margin:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#111827;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;padding:32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
                <tr>
                  <td style="background:#0f172a;padding:28px 32px;">
                    <div style="color:#38bdf8;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">TechnomindAI</div>
                    <h1 style="margin:10px 0 0;color:#ffffff;font-size:24px;line-height:1.3;">New contact form submission</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 32px;">
                    <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.6;">
                      A new message was submitted through the TechnomindAI website contact form.
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:12px;border-collapse:separate;border-spacing:0;overflow:hidden;">
                      ${row("Contact Type", escapeHtml(formatContactType(payload.contactType)))}
                      ${row("Name", escapeHtml(payload.name))}
                      ${row("Email", escapeHtml(payload.email))}
                      ${row("Phone", escapeHtml(payload.phone || "Not provided"))}
                      ${row("Subject", escapeHtml(payload.subject))}
                      ${row("Submission Date/Time", escapeHtml(`${submittedAt} UTC`))}
                    </table>
                    <div style="margin-top:24px;">
                      <h2 style="margin:0 0 10px;color:#111827;font-size:16px;">Message</h2>
                      <div style="white-space:pre-wrap;background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;padding:16px;color:#111827;line-height:1.6;">${escapeHtml(payload.message)}</div>
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
