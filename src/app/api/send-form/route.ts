import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

const TO_EMAIL = 'dmitry.stepanov28@gmail.com'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, service, message, source } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message' },
        { status: 400 }
      )
    }

    const subject =
      source === 'contact'
        ? `[STEPS LAB] Заявка з контактної форми: ${name}`
        : `[STEPS LAB] Запит на консультацію: ${name}`

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f6f8; color: #0E0E11;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 24px;">
    <div style="background: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
      <h1 style="margin: 0 0 24px 0; font-size: 24px; font-weight: 600; color: #0E0E11;">
        Нова заявка з сайту STEPS LAB
      </h1>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #666; width: 140px;">Ім'я</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #666;">Email</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(email)}" style="color: #3A5BFF;">${escapeHtml(email)}</a></td>
        </tr>
        ${company ? `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #666;">Компанія</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${escapeHtml(company)}</td>
        </tr>
        ` : ''}
        ${service ? `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #666;">Послуга</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${escapeHtml(service)}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 12px 0; font-weight: 600; color: #666; vertical-align: top;">Повідомлення</td>
          <td style="padding: 12px 0; white-space: pre-wrap;">${escapeHtml(message)}</td>
        </tr>
      </table>
      <p style="margin: 24px 0 0 0; font-size: 13px; color: #999;">
        Відправлено через форму на stepslab.com
        ${source ? ` (${source === 'contact' ? 'Контакти' : 'Консультація'})` : ''}
      </p>
    </div>
  </div>
</body>
</html>
    `.trim()

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'STEPS LAB <onboarding@resend.dev>',
      to: [TO_EMAIL],
      replyTo: email,
      subject,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Send form error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to send email' },
      { status: 500 }
    )
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return String(text || '').replace(/[&<>"']/g, (m) => map[m])
}
