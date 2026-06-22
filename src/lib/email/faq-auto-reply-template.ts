import type { FaqQuestionEmailPayload } from "./types"

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export function faqAutoReplyTemplate(payload: FaqQuestionEmailPayload) {
  const greetingName = payload.name || "there"

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>We received your question</title>
      </head>
      <body style="margin:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#111827;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;padding:32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
                <tr>
                  <td style="background:#0f172a;padding:28px 32px;">
                    <div style="color:#38bdf8;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">TechnomindAI</div>
                    <h1 style="margin:10px 0 0;color:#ffffff;font-size:24px;line-height:1.3;">We received your question</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 32px;color:#334155;font-size:15px;line-height:1.7;">
                    <p style="margin:0 0 16px;">Hello ${escapeHtml(greetingName)},</p>
                    <p style="margin:0 0 16px;">
                      Thank you for sending your question to TechnomindAI. Our team received it and will review it shortly.
                    </p>
                    <p style="margin:0 0 16px;">
                      If you asked us to contact you back, we typically respond within 1-2 business days.
                    </p>
                    <div style="margin-top:24px;padding:16px;border-radius:12px;background:#f8fafc;border:1px solid #e5e7eb;">
                      <strong style="display:block;color:#111827;margin-bottom:6px;">Your question</strong>
                      <span>${escapeHtml(payload.question)}</span>
                    </div>
                    <p style="margin:24px 0 0;">Regards,<br />The TechnomindAI Team</p>
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
