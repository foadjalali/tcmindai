import type { ContactEmailPayload } from "./types"

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export function autoReplyTemplate(payload: ContactEmailPayload) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Thank you for contacting TechnomindAI</title>
      </head>
      <body style="margin:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#111827;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;padding:32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
                <tr>
                  <td style="background:#0f172a;padding:28px 32px;">
                    <div style="color:#38bdf8;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">TechnomindAI</div>
                    <h1 style="margin:10px 0 0;color:#ffffff;font-size:24px;line-height:1.3;">Thank you for contacting us</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 32px;color:#334155;font-size:15px;line-height:1.7;">
                    <p style="margin:0 0 16px;">Hello ${escapeHtml(payload.name)},</p>
                    <p style="margin:0 0 16px;">
                      Thank you for reaching out to TechnomindAI. We received your message and our team will review it shortly.
                    </p>
                    <p style="margin:0 0 16px;">
                      We typically respond within 1-2 business days. If your request is urgent, please mention that in any follow-up email.
                    </p>
                    <div style="margin-top:24px;padding:16px;border-radius:12px;background:#f8fafc;border:1px solid #e5e7eb;">
                      <strong style="display:block;color:#111827;margin-bottom:6px;">Your subject</strong>
                      <span>${escapeHtml(payload.subject)}</span>
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
