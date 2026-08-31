/**
 * Stripe Webhook Handler
 *
 * Listens for: checkout.session.completed
 *
 * On successful payment:
 * 1. Verifies Stripe signature
 * 2. Checks for duplicate event processing
 * 3. Searches for existing Zoho Books customer by email
 * 4. Creates or reuses the Zoho Books customer
 * 5. Creates a Zoho Books invoice matching the Stripe amounts
 * 6. Records the payment in Zoho Books
 * 7. Sends payment success email to customer (with secure form link)
 * 8. Sends internal notification to team
 *
 * NOTE: Raw body is required for Stripe signature verification.
 * This is handled by exporting config with bodyParser: false.
 */

import Stripe from "stripe";
import { headers } from "next/headers";
import {
  findCustomerByEmail,
  createCustomer,
  createInvoice,
  recordPayment,
} from "@/lib/zoho";
import {
  sendPaymentSuccessEmail,
  sendInternalPaymentNotification,
} from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "dummy_key", {
  apiVersion: "2024-12-18.acacia",
});

// In-memory store for processed event IDs (use Redis/DB in production)
const processedEvents = new Set();

export async function POST(request) {
  const body = await request.text(); // Raw body needed for signature verification
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return Response.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event;

  // In dev mode with dummy secret, skip signature verification
  const isDev = process.env.STRIPE_WEBHOOK_SECRET === "whsec_dummy_key";

  if (isDev) {
    try {
      event = JSON.parse(body);
      console.log("[Webhook DEV] Skipping signature verification (dummy secret).");
    } catch (err) {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }
  } else {
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("[Webhook] Signature verification failed:", err.message);
      return Response.json({ error: `Webhook signature invalid: ${err.message}` }, { status: 400 });
    }
  }

  // Duplicate event protection
  if (processedEvents.has(event.id)) {
    console.log(`[Webhook] Duplicate event ignored: ${event.id}`);
    return Response.json({ received: true, status: "duplicate_ignored" });
  }

  console.log(`[Webhook] Event received: ${event.type} (${event.id})`);

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      if (session.metadata?.application !== "aurum_variation_2") {
        console.log(`[Webhook] Ignored event ${event.id} - belongs to another application (${session.metadata?.application})`);
        break;
      }
      await handleCheckoutSessionCompleted(event);
      break;

    case "payment_intent.payment_failed":
      console.log("[Webhook] Payment failed:", event.data.object.id);
      break;

    default:
      console.log(`[Webhook] Unhandled event type: ${event.type}`);
  }

  // Mark as processed
  processedEvents.add(event.id);
  // Clean up old events (keep last 1000)
  if (processedEvents.size > 1000) {
    const firstKey = processedEvents.values().next().value;
    processedEvents.delete(firstKey);
  }

  return Response.json({ received: true });
}

async function handleCheckoutSessionCompleted(event) {
  const session = event.data.object;

  if (session.payment_status !== "paid") {
    console.log(`[Webhook] Session ${session.id} not paid yet, status: ${session.payment_status}`);
    return;
  }

  const {
    planId,
    planName,
  } = session.metadata || {};

  const customerEmail = session.customer_details?.email || "";
  const customerName = session.customer_details?.name || "";
  const customerCountry = session.customer_details?.address?.country || "";
  const stripeSessionId = session.id;
  const stripePaymentIntentId = typeof session.payment_intent === "string"
    ? session.payment_intent
    : session.payment_intent?.id || "";
  const currency = (session.currency || "usd").toUpperCase();
  const amountTotal = session.amount_total / 100;
  const amountSubtotal = amountTotal;
  const amountTax = 0;
  const vatPercentage = 0;
  const paidDate = new Date().toISOString().split("T")[0];

  console.log(`[Webhook] Processing payment for ${customerEmail}, Plan: ${planName}, Amount: ${amountTotal} ${currency}`);

  // -- Zoho Books Integration --
  let zohoCustomer = null;
  let zohoInvoice = null;
  let zohoPayment = null;
  let zohoErrorMsg = null;

  try {
    // 1. Find or create customer
    zohoCustomer = await findCustomerByEmail(customerEmail, customerName);
    if (!zohoCustomer) {
      zohoCustomer = await createCustomer({
        name: customerName,
        email: customerEmail,
        countryCode: customerCountry,
        currency,
      });
    }

    // 2. Create invoice
    zohoInvoice = await createInvoice({
      contactId: zohoCustomer.contact_id,
      planName,
      basePrice: amountSubtotal,
      vatPercentage,
      vatAmount: amountTax,
      total: amountTotal,
      currency,
      stripePaymentIntentId,
      stripeSessionId,
      customerEmail,
    });

    // 3. Record payment
    zohoPayment = await recordPayment({
      customerId: zohoCustomer.contact_id,
      invoiceId: zohoInvoice.invoice_id,
      amount: amountTotal,
      currency,
      stripePaymentIntentId,
      paidDate,
    });

    console.log(`[Webhook] Zoho Books sync complete. Invoice: ${zohoInvoice.invoice_number}`);
  } catch (zohoErr) {
    // Zoho failure should NOT prevent email from being sent.
    // Log and continue — retry logic can be added later.
    console.error("[Webhook] Zoho Books sync FAILED:", zohoErr.message);
    zohoErrorMsg = zohoErr.message;
    // TODO: Store failed sync for retry (e.g., in a database queue)
  }

  // -- Email Automation --
  // Generate a secure form token based on session ID
  const formToken = Buffer.from(stripeSessionId).toString("base64url");

  try {
    await sendPaymentSuccessEmail({
      customerEmail,
      customerName,
      planName,
      amount: amountTotal,
      currency,
      basePrice: amountSubtotal,
      vatAmount: amountTax,
      vatPercentage,
      stripePaymentId: stripePaymentIntentId,
      stripeSessionId,
      invoiceNumber: zohoInvoice?.invoice_number,
      formToken,
    });
  } catch (emailErr) {
    console.error("[Webhook] Failed to send customer email:", emailErr.message);
  }

  try {
    await sendInternalPaymentNotification({
      customerName,
      customerEmail,
      planName,
      amount: amountTotal,
      currency,
      vatAmount: Number(amountTax),
      vatPercentage: Number(vatPercentage),
      stripePaymentId: stripePaymentIntentId,
      stripeSessionId,
      invoiceId: zohoInvoice?.invoice_id,
      invoiceNumber: zohoInvoice?.invoice_number,
      paidDate,
      zohoError: zohoErrorMsg,
    });
  } catch (emailErr) {
    console.error("[Webhook] Failed to send internal notification:", emailErr.message);
  }
}
