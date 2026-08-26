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
<body style="font-family: Arial, sans-serif; background-color: #050814; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #0a0f24; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
    <div style="background-color: #070a1a; padding: 30px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">
      <a href="${appUrl}" style="text-decoration: none; display: inline-block;">
        <img src="${appUrl}/images/logo-navbar.png" alt="AURUM EA Logo" style="height: 45px; display: block; margin: 0 auto 10px;" />
        <div style="font-size: 24px; font-weight: bold; color: #ffffff; letter-spacing: 1px;">
          AURUM<span style="color: #19d05f; font-weight: normal; font-size: 14px; letter-spacing: 2px; margin-left: 4px;">GOLD</span>
        </div>
      </a>
    </div>
    <div style="padding: 30px; color: #d1d5db; line-height: 1.6;">
      <h2 style="color: #ffffff; margin-top: 0;">New Demo Request</h2>
      <p>You have received a new demo request from <strong>${name}</strong>.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #9ca3af; width: 120px;">Name</td>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffffff; font-weight: bold;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #9ca3af;">Email</td>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffffff; font-weight: bold;"><a href="mailto:${email}" style="color: #19d05f; text-decoration: none;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #9ca3af;">Phone</td>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffffff; font-weight: bold;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #9ca3af;">Volume</td>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffffff; font-weight: bold;">${volume || 'Not provided'}</td>
        </tr>
      </table>
      
      <div style="margin-top: 30px; text-align: center;">
        <a href="mailto:${email}" style="background-color: #19d05f; color: #0a1628; padding: 12px 24px; text-decoration: none; border-radius: 99px; font-weight: bold; display: inline-block;">Reply to Lead</a>
      </div>
    </div>
    <div style="background-color: #070a1a; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid rgba(255,255,255,0.1);">
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
