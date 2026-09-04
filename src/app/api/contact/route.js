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
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Invalid email address." }, { status: 400 });
    }

    const isDev =
      process.env.SMTP_HOST === "smtp.example.com" || !process.env.SMTP_HOST;

    if (isDev) {
      console.log("\n📧 [Contact Form DEV - NOT SENT]");
      console.log(`  From: ${name} <${email}>`);
      console.log(`  Message: ${message}`);
      return Response.json({ success: true, message: "Message logged (dev mode)." });
    }

    const transporter = createTransport();

    // Send notification to team
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `📩 New Contact Form: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Message</strong></td><td>${message}</td></tr>
          <tr><td><strong>Submitted At</strong></td><td>${new Date().toISOString()}</td></tr>
        </table>`,
      text: `New contact from ${name} (${email}):\n\n${message}`,
      replyTo: email,
    });

    // Send confirmation to customer
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "We received your message – AURUM GOLD EA",
      html: `
        <div style="font-family:-apple-system,sans-serif;max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
          <div style="background:#0a1628;padding:32px 40px;text-align:center">
            <h1 style="color:#c8a951;margin:0;font-size:1.6rem">AURUM GOLD EA</h1>
            <p style="color:rgba(255,255,255,0.7);margin:8px 0 0">Message Received</p>
          </div>
          <div style="padding:40px;color:#374151;line-height:1.7">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for reaching out. We've received your message and our team will get back to you within the same day or next business day.</p>
            <p>If you need immediate assistance, you can reply directly to this email.</p>
            <p>— The AURUM GOLD EA Team</p>
          </div>
          <div style="background:#f4f6f9;padding:20px 40px;text-align:center;font-size:0.82rem;color:#9ca3af">
            © ${new Date().getFullYear()} AURUM GOLD EA · aurum-goldea.com
          </div>
        </div>`,
      text: `Hi ${name},\n\nThank you for reaching out. We've received your message and will get back to you within the same day or next business day.\n\n— The AURUM GOLD EA Team`,
    });

    console.log(`[Contact] Email sent for ${name} <${email}>`);
    return Response.json({ success: true, message: "Message sent successfully." });
  } catch (err) {
    console.error("[Contact] Error:", err.message);
    return Response.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
