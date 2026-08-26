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

    const isDev = process.env.SMTP_HOST === "smtp.example.com" || !process.env.SMTP_HOST;

    if (isDev) {
      console.log("[Lead Capture DEV]");
      console.log("Name: " + name + ", Email: " + email + ", Phone: " + phone + ", Volume: " + volume);
      return Response.json({ success: true });
    }

    const transporter = createTransport();
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: "New Demo Request: " + name,
      html: "<h2>New Demo Request</h2><p>Name: " + name + "</p><p>Email: " + email + "</p><p>Phone: " + phone + "</p><p>Volume: " + volume + "</p>",
      text: "New demo request from " + name + " (" + email + "): Phone: " + phone + ", Volume: " + volume,
      replyTo: email,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("[Schedule API] Error:", err.message);
    return Response.json({ error: "Failed to process request." }, { status: 500 });
  }
}
