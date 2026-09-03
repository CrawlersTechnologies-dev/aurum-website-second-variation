/**
 * Email Service using Nodemailer
 *
 * Sends:
 * 1. Payment success email to customer (with secure form link)
 * 2. Requirement form confirmation email to customer
 * 3. Internal payment notification to team
 * 4. Internal requirement submission notification to team
 *
 * All SMTP credentials come from environment variables.
 */

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

const isDev = () =>
  process.env.SMTP_HOST === "smtp.example.com" ||
  !process.env.SMTP_HOST;

async function sendMail({ to, subject, html, text }) {
  if (isDev()) {
    // In development: log the email instead of sending
    console.log("\n📧 [Email DEV - NOT SENT]");
    console.log(`  To:      ${to}`);
    console.log(`  Subject: ${subject}`);
    console.log(`  Body:\n${text || html}`);
    console.log("─".repeat(60));
    return { messageId: `dev_${Date.now()}` };
  }

  const transporter = createTransport();
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
    text,
  });

  console.log(`[Email] Sent to ${to}: ${info.messageId}`);
  return info;
}

// ----------------------------------------------------------------
// 1. Payment Success Email → Customer
// ----------------------------------------------------------------
export async function sendPaymentSuccessEmail({
  customerEmail,
  customerName,
  planName,
  amount,
  currency,
  basePrice,
  vatAmount,
  vatPercentage,
  stripePaymentId,
  stripeSessionId,
  invoiceNumber,
  formToken,
}) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const formLink = `${appUrl}/thank-you?session_id=${stripeSessionId}&token=${formToken}`;
  const currencySymbol = currency === "AED" ? "AED " : "€";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Payment Confirmed – AURUM EA</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #050814; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #0a0f24; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 20px 60px rgba(0,0,0,0.6); }
    .header { background: #070a1a; padding: 32px 40px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .header-logo { display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px; text-decoration: none; }
    .header-logo img { height: 45px; margin-right: 12px; }
    .header-logo-text { font-family: 'Outfit', sans-serif; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: 1px; }
    .header-logo-text span { color: #19d05f; font-weight: 400; font-size: 14px; letter-spacing: 2px; margin-left: 4px; }
    .header h1 { color: #ffffff; margin: 0; font-size: 1.6rem; font-family: 'Outfit', sans-serif; font-weight: 600; }
    .body { padding: 40px; color: #d1d5db; line-height: 1.6; }
    .success-badge { background: rgba(25, 208, 95, 0.1); border: 1px solid rgba(25, 208, 95, 0.25); color: #19d05f; border-radius: 8px; padding: 14px 20px; font-size: 0.95rem; margin-bottom: 30px; font-weight: 500; text-align: center; }
    .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .details-table td { padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 0.95rem; color: #d1d5db; }
    .details-table td { padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 0.95rem; color: #d1d5db; }
    .total-row td { border-bottom: none; font-size: 1.1rem; font-weight: 700; color: #19d05f; }
    .cta-section { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 30px 24px; margin: 30px 0; text-align: center; }
    .cta-section p { margin: 0 0 20px; color: #d1d5db; font-size: 0.95rem; line-height: 1.6; }
    .btn { display: inline-block; background: #19d05f; color: #050814; text-decoration: none; padding: 14px 32px; border-radius: 999px; font-weight: 600; font-size: 1rem; font-family: 'Outfit', sans-serif; }
    .note { font-size: 0.85rem; color: #6b7280; margin-top: 16px; }
    .footer { background: #070a1a; padding: 24px 40px; text-align: center; font-size: 0.82rem; color: #6b7280; border-top: 1px solid rgba(255,255,255,0.05); }
    .footer a { color: #19d05f; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <a href="${appUrl}" class="header-logo">
        <img src="${appUrl}/images/logo-navbar.png" alt="AURUM EA Logo" />
        <div class="header-logo-text">AURUM<span>GOLD</span></div>
      </a>
      <h1>Payment Confirmed</h1>
    </div>
    <div class="body">
      <p>Hi <strong style="color: #ffffff;">${customerName || "Valued Customer"}</strong>,</p>
      <div class="success-badge">✅ Your payment has been successfully completed. Thank you for choosing AURUM EA!</div>
      <p style="text-align:center;">Here is a summary of your purchase:</p>
      <table class="details-table">
        <tr><td style="color:#9ca3af;width:45%;">Plan</td><td style="font-weight:500;text-align:right;color:#ffffff;">${planName} Plan</td></tr>
        <tr><td style="color:#9ca3af;width:45%;">Base Price</td><td style="font-weight:500;text-align:right;color:#ffffff;">${currencySymbol}${basePrice.toLocaleString()}</td></tr>
        ${vatAmount > 0 ? `<tr><td style="color:#9ca3af;width:45%;">VAT (${vatPercentage}%)</td><td style="font-weight:500;text-align:right;color:#ffffff;">${currencySymbol}${vatAmount.toLocaleString()}</td></tr>` : ""}
        <tr class="total-row"><td style="color:#9ca3af;width:45%;">Total Paid</td><td style="font-weight:700;text-align:right;color:#19d05f;">${currencySymbol}${amount.toLocaleString()} ${currency}</td></tr>
        <tr><td style="color:#9ca3af;width:45%;">Payment ID</td><td style="font-size:0.82rem;font-family:monospace;color:#9ca3af;text-align:right;font-weight:500;">${stripePaymentId || stripeSessionId}</td></tr>
        ${invoiceNumber ? `<tr><td style="color:#9ca3af;width:45%;">Invoice</td><td style="font-weight:500;text-align:right;color:#ffffff;">${invoiceNumber}</td></tr>` : ""}
      </table>

      <div class="cta-section">
        <h3 style="color:#ffffff;font-size:1.15rem;font-family:'Outfit',sans-serif;margin:0 0 10px 0;font-weight:600;">Complete your requirements form</h3>
        <p style="margin:0 0 28px 0;color:#d1d5db;font-size:0.95rem;line-height:1.6;">Please complete the short form below so our team can understand your needs and get started.</p>
        <a href="${formLink}" class="btn" style="line-height:1.2;display:inline-block;">Complete My Requirements Form</a>
        <p class="note" style="margin:24px 0 0 0;font-size:0.85rem;color:#6b7280;">Don't have time right now? No problem — this secure link will work whenever you're ready.</p>
      </div>

      <p style="font-size:0.93rem;">
        Our team will begin processing your order once your requirements are submitted. 
        If you have any questions, reply to this email or contact us at 
        <a href="mailto:support@aurum-goldea.com" style="color:#19d05f;font-weight:500;">support@aurum-goldea.com</a>.
      </p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} AURUM EA · Moneytize Trading Academy · <a href="${appUrl}">aurum-goldea.com</a>
    </div>
  </div>
</body>
</html>`;

  const text = `Hi ${customerName || "Valued Customer"},

Your payment has been successfully completed. Thank you for choosing AURUM EA!

Plan: ${planName} Plan
Base Price: ${currencySymbol}${basePrice}
${vatAmount > 0 ? `VAT (${vatPercentage}%): ${currencySymbol}${vatAmount}\n` : ""}Total Paid: ${currencySymbol}${amount} ${currency}
Payment ID: ${stripePaymentId || stripeSessionId}
${invoiceNumber ? `Invoice: ${invoiceNumber}` : ""}

Please complete your requirements form here:
${formLink}

This link is secure and connected to your payment. You can complete it at your convenience.

Questions? Email us: support@aurum-goldea.com
`;

  return sendMail({
    to: customerEmail,
    subject: `✅ Payment Confirmed – AURUM EA ${planName} Plan`,
    html,
    text,
  });
}

// ----------------------------------------------------------------
// 2. Internal Payment Notification → Team
// ----------------------------------------------------------------
export async function sendInternalPaymentNotification({
  customerName,
  customerEmail,
  planName,
  amount,
  currency,
  vatAmount,
  vatPercentage,
  stripePaymentId,
  stripeSessionId,
  invoiceId,
  invoiceNumber,
  paidDate,
  zohoError,
}) {
  const html = `
<h2>🆕 New Payment Received – AURUM EA</h2>
<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;font-family:sans-serif;">
  <tr><td><strong>Customer Name</strong></td><td>${customerName}</td></tr>
  <tr><td><strong>Customer Email</strong></td><td>${customerEmail}</td></tr>
  <tr><td><strong>Plan</strong></td><td>${planName}</td></tr>
  <tr><td><strong>Amount</strong></td><td>${amount} ${currency}</td></tr>
  <tr><td><strong>VAT</strong></td><td>${vatAmount} ${currency} (${vatPercentage}%)</td></tr>
  <tr><td><strong>Stripe Payment ID</strong></td><td>${stripePaymentId || "N/A"}</td></tr>
  <tr><td><strong>Stripe Session ID</strong></td><td>${stripeSessionId}</td></tr>
  <tr><td><strong>Zoho Invoice Number</strong></td><td>${invoiceNumber || "N/A"}</td></tr>
  <tr><td><strong>Zoho Invoice ID</strong></td><td>${invoiceId || "N/A"}</td></tr>
  <tr><td><strong>Zoho Sync Error</strong></td><td style="color:red; font-weight:bold;">${zohoError || "None - Sync Successful"}</td></tr>
  <tr><td><strong>Payment Date</strong></td><td>${paidDate || new Date().toISOString()}</td></tr>
</table>`;

  return sendMail({
    to: process.env.EMAIL_TO,
    subject: `💰 New Payment: ${customerName} – ${planName} Plan`,
    html,
    text: `New payment received.\nCustomer: ${customerName} (${customerEmail})\nPlan: ${planName}\nAmount: ${amount} ${currency}\nStripe: ${stripePaymentId}\nInvoice: ${invoiceNumber}`,
  });
}

// ----------------------------------------------------------------
// 3. Requirement Form Confirmation Email → Customer
// ----------------------------------------------------------------
export async function sendRequirementConfirmationEmail({ customerEmail, customerName }) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Requirements Received – AURUM EA</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #050814; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #0a0f24; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 20px 60px rgba(0,0,0,0.6); }
    .header { background: #070a1a; padding: 32px 40px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .header-logo { display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px; text-decoration: none; }
    .header-logo img { height: 45px; margin-right: 12px; }
    .header-logo-text { font-family: 'Outfit', sans-serif; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: 1px; }
    .header-logo-text span { color: #19d05f; font-weight: 400; font-size: 14px; letter-spacing: 2px; margin-left: 4px; }
    .header h1 { color: #ffffff; margin: 0; font-size: 1.6rem; font-family: 'Outfit', sans-serif; font-weight: 600; }
    .body { padding: 40px; color: #d1d5db; line-height: 1.7; text-align: left; }
    .footer { background: #070a1a; padding: 24px 40px; text-align: center; font-size: 0.82rem; color: #6b7280; border-top: 1px solid rgba(255,255,255,0.05); }
    .footer a { color: #19d05f; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <a href="${appUrl}" class="header-logo">
        <img src="${appUrl}/images/logo-navbar.png" alt="AURUM EA Logo" />
        <div class="header-logo-text">AURUM<span>GOLD</span></div>
      </a>
      <h1>Requirements Received</h1>
    </div>
    <div class="body">
      <p>Hi <strong style="color: #ffffff;">${customerName || "Valued Customer"}</strong>,</p>
      <p>Thank you for submitting your requirements. We have successfully received your information.</p>
      <p>Our team will review the details and get back to you as soon as possible. In most cases, you can expect a response within the same business day.</p>
      <p>If you have any questions in the meantime, feel free to reply to this email or contact us at 
        <a href="mailto:support@aurum-goldea.com" style="color:#19d05f;font-weight:500;">support@aurum-goldea.com</a>.
      </p>
      <p>Thank you for choosing AURUM GOLD EA. We look forward to assisting you.</p>
      <p style="margin-top:24px;">Best regards,<br/><br/><strong style="color:#ffffff;">Team AURUM GOLD EA</strong></p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} AURUM EA · Moneytize Trading Academy · <a href="${appUrl}">aurum-goldea.com</a>
    </div>
  </div>
</body>
</html>`;

  return sendMail({
    to: customerEmail,
    subject: "✅ Requirements Received – AURUM EA",
    html,
    text: `Hi ${customerName || "Valued Customer"},\n\nThank you for submitting your requirements. We have successfully received your information.\n\nOur team will review the details and get back to you as soon as possible. In most cases, you can expect a response within the same business day.\n\nIf you have any questions in the meantime, feel free to reply to this email or contact us at support@aurum-goldea.com.\n\nThank you for choosing AURUM GOLD EA. We look forward to assisting you.\n\nBest regards,\n\nTeam AURUM GOLD EA`,
  });
}

// ----------------------------------------------------------------
// 4. Internal Requirement Submission Notification → Team
// ----------------------------------------------------------------
export async function sendInternalRequirementNotification({ customerName, customerEmail, data }) {
  const rows = Object.entries(data)
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${v || "—"}</td></tr>`)
    .join("");

  const html = `
<h2>📋 New Requirements Submitted – AURUM EA</h2>
<p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;font-family:sans-serif;">
  ${rows}
</table>`;

  return sendMail({
    to: process.env.EMAIL_TO,
    subject: `📋 Requirements Submitted: ${customerName}`,
    html,
    text: `New requirements submitted by ${customerName} (${customerEmail}).\n\n${JSON.stringify(data, null, 2)}`,
  });
}
