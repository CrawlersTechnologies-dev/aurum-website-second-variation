import nodemailer from "nodemailer";

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

export async function POST(request) {
  try {
    const { name, email, phone, volume } = await request.json();

    if (!name || !email || !phone) {
      return Response.json({ error: "Name, email, and phone are required." }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aurum-goldea.com";

    const isDev = process.env.SMTP_HOST === "smtp.example.com" || !process.env.SMTP_HOST;
    if (isDev) {
      console.log("[Lead Capture DEV]");
      console.log("Name: " + name + ", Email: " + email + ", Phone: " + phone + ", Volume: " + volume);
      return Response.json({ success: true });
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New Demo Request</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 40px 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); overflow: hidden; border: 1px solid #e5e7eb;">
    
    <!-- Header -->
    <div style="background-color: #ffffff; padding: 24px 32px; border-bottom: 1px solid #f3f4f6;">
      <a href="${appUrl}" style="text-decoration: none; color: #111827; display: block;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-right: 12px; vertical-align: middle;">
              <img src="${appUrl}/images/logo-navbar.png" alt="AURUM EA Logo" style="height: 36px; display: block;" />
            </td>
            <td style="vertical-align: middle;">
              <div style="font-size: 22px; font-weight: 800; letter-spacing: 0.5px;">
                AURUM<span style="color: #19d05f; font-weight: 600; font-size: 14px; letter-spacing: 1px; margin-left: 4px;">GOLD</span>
              </div>
            </td>
          </tr>
        </table>
      </a>
    </div>

    <!-- Body -->
    <div style="padding: 32px;">
      <h2 style="color: #111827; margin-top: 0; font-size: 20px;">New Demo Request</h2>
      <p style="color: #4b5563; font-size: 15px; margin-bottom: 24px;">You have received a new demo request from <strong>${name}</strong>.</p>
      
      <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
        <tr>
          <td style="padding: 14px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; width: 140px;">Name</td>
          <td style="padding: 14px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 600;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 14px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Email</td>
          <td style="padding: 14px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 600;"><a href="mailto:${email}" style="color: #19d05f; text-decoration: none;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 14px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Phone</td>
          <td style="padding: 14px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 600;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 14px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Trading Volume</td>
          <td style="padding: 14px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 600;">${volume || 'Not provided'}</td>
        </tr>
      </table>
      
      <div style="margin-top: 32px;">
        <a href="mailto:${email}" style="background-color: #19d05f; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; display: inline-block;">Reply to Lead</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9fafb; padding: 20px; text-align: center; color: #9ca3af; font-size: 13px; border-top: 1px solid #f3f4f6;">
      &copy; ${new Date().getFullYear()} AURUM EA &middot; aurum-goldea.com
    </div>
  </div>
</body>
</html>
    `;

    const transporter = createTransport();
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: "New Demo Request: " + name,
      html: htmlContent,
      text: "New demo request from " + name + " (" + email + "): Phone: " + phone + ", Volume: " + volume,
      replyTo: email,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("[Schedule API] Error:", err.message);
    return Response.json({ error: "Failed to process request." }, { status: 500 });
  }
}
