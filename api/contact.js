export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, organization, message, honeypot } = req.body;

    // Required field validation
    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' });
    }

    // Basic spam guards
    if (honeypot) {
      // Silently succeed for bots filling the hidden field
      return res.status(200).json({ success: true });
    }

    if (message.length > 5000) {
      return res.status(400).json({ error: 'Message too long' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // HTML email body (identical to reference)
    const htmlBody = `
<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;color:#111;max-width:600px;margin:0 auto;padding:20px;">
  <div style="background:#2563eb;padding:20px;border-radius:12px 12px 0 0;">
    <h2 style="color:white;margin:0;font-size:18px;">Hours Served — Contact Form Submission</h2>
  </div>
  <div style="background:white;border:1px solid #e5e7eb;border-top:none;padding:24px;border-radius:0 0 12px 12px;">
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:8px 0;color:#6b7280;width:130px;vertical-align:top;">Name</td><td style="padding:8px 0;font-weight:600;">${name || '—'}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Phone</td><td style="padding:8px 0;">${phone || '—'}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Organization</td><td style="padding:8px 0;">${organization || '—'}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;border-top:1px solid #e5e7eb;padding-top:16px;">Message</td><td style="padding:8px 0;border-top:1px solid #e5e7eb;padding-top:16px;white-space:pre-wrap;">${message}</td></tr>
    </table>
  </div>
</body>
</html>`;

    // Plain text email body (identical to reference)
    const textBody = `Hours Served — Contact Form Submission

Name: ${name || '—'}
Email: ${email}
Phone: ${phone || '—'}
Organization: ${organization || '—'}

Message:
${message}`;

    // Send email via Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Hours Served <hello@hoursserved.com>',
        to: ['hello@hoursserved.com'],
        reply_to: email,
        subject: `Hours Served contact form submission from ${name || email}`,
        html: htmlBody,
        text: textBody,
      }),
    });

    const resData = await resendResponse.json();
    console.log('Resend response:', JSON.stringify(resData));

    if (!resendResponse.ok) {
      console.error('Resend error:', JSON.stringify(resData));
      return res.status(500).json({ error: 'Something went wrong. Please try again or email us directly.' });
    }

    console.log('Email sent successfully. Resend ID:', resData.id);
    return res.status(200).json({ success: true, id: resData.id });

  } catch (error) {
    console.error('sendContactForm error:', error.message);
    return res.status(500).json({ error: 'Something went wrong. Please try again or email us directly.' });
  }
}
