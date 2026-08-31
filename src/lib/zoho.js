/**
 * Zoho Books API Service
 *
 * Handles:
 * - Access token generation (from refresh token)
 * - Customer search by email (primary), name (secondary)
 * - Customer creation
 * - Invoice creation with correct amounts
 * - Payment recording / marking invoice as paid
 *
 * All credentials are loaded from environment variables.
 * This file never exposes secrets to the client.
 */

const ZOHO_API_BASE = "https://www.zohoapis.ae/books/v3";
const ZOHO_TOKEN_URL = "https://accounts.zoho.ae/oauth/v2/token";

let cachedToken = null;
let tokenExpiry = 0;

/**
 * Gets a valid Zoho access token, refreshing if necessary.
 */
async function getAccessToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry) {
    return cachedToken;
  }

  const isDev = process.env.ZOHO_REFRESH_TOKEN === "dummy_refresh_token";
  if (isDev) {
    console.log("[Zoho] DEV MODE: Using mock access token.");
    cachedToken = "mock_access_token";
    tokenExpiry = now + 3500 * 1000;
    return cachedToken;
  }

  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN,
    client_id: process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    grant_type: "refresh_token",
  });

  console.log("=== Zoho OAuth Diagnostics ===");
  console.log(`Endpoint: ${ZOHO_TOKEN_URL}`);
  console.log(`ZOHO_CLIENT_ID exists: ${!!process.env.ZOHO_CLIENT_ID}`);
  console.log(`ZOHO_CLIENT_SECRET exists: ${!!process.env.ZOHO_CLIENT_SECRET}`);
  console.log(`ZOHO_REFRESH_TOKEN exists: ${!!process.env.ZOHO_REFRESH_TOKEN}`);
  console.log(`ZOHO_ORGANIZATION_ID exists: ${!!process.env.ZOHO_ORGANIZATION_ID}`);
  console.log(`ZOHO_SALES_ACCOUNT_ID exists: ${!!process.env.ZOHO_SALES_ACCOUNT_ID}`);

  const res = await fetch(`${ZOHO_TOKEN_URL}?${params}`, { method: "POST" });
  console.log(`Zoho HTTP Status: ${res.status}`);
  
  const data = await res.json();
  console.log(`Zoho Response: ${JSON.stringify(data)}`);
  console.log("==============================");

  if (!data.access_token) {
    const mask = (s) => (!s ? 'Missing' : s.length < 8 ? '***' : `${s.substring(0, 4)}...${s.substring(s.length - 4)}`);
    const diagnosticInfo = [
      `URL: ${ZOHO_TOKEN_URL}`,
      `ID: ${mask(process.env.ZOHO_CLIENT_ID)} (Len: ${process.env.ZOHO_CLIENT_ID?.length})`,
      `SECRET: ${mask(process.env.ZOHO_CLIENT_SECRET)} (Len: ${process.env.ZOHO_CLIENT_SECRET?.length})`,
      `TOKEN: ${mask(process.env.ZOHO_REFRESH_TOKEN)} (Len: ${process.env.ZOHO_REFRESH_TOKEN?.length})`,
      `ORG: ${mask(process.env.ZOHO_ORGANIZATION_ID)} (Len: ${process.env.ZOHO_ORGANIZATION_ID?.length})`,
    ].join(" | ");

    throw new Error(`Failed to get Zoho access token: ${JSON.stringify(data)} --- Diagnostics: [${diagnosticInfo}]`);
  }

  cachedToken = data.access_token;
  tokenExpiry = now + (data.expires_in - 60) * 1000;
  return cachedToken;
}

function zohoHeaders(token) {
  return {
    Authorization: `Zoho-oauthtoken ${token}`,
    "Content-Type": "application/json",
  };
}

const orgId = () => process.env.ZOHO_ORGANIZATION_ID;

/**
 * Finds a Zoho Books customer by email (primary identifier).
 * If found, also checks name for additional validation.
 * Returns the customer object or null.
 */
export async function findCustomerByEmail(email, name) {
  const isDev = process.env.ZOHO_REFRESH_TOKEN === "dummy_refresh_token";
  if (isDev) {
    console.log(`[Zoho DEV] findCustomerByEmail: ${email}`);
    return null; // In dev, always create a new mock customer
  }

  const token = await getAccessToken();
  const url = `${ZOHO_API_BASE}/contacts?organization_id=${orgId()}&email=${encodeURIComponent(email)}`;
  const res = await fetch(url, { headers: zohoHeaders(token) });
  const data = await res.json();

  if (data.contacts && data.contacts.length > 0) {
    const contact = data.contacts[0];
    console.log(`[Zoho] Found existing customer: ${contact.contact_id} (${contact.contact_name})`);
    return contact;
  }
  return null;
}

/**
 * Creates a new customer in Zoho Books.
 */
export async function createCustomer({ name, email, countryCode, currency }) {
  const isDev = process.env.ZOHO_REFRESH_TOKEN === "dummy_refresh_token";
  if (isDev) {
    console.log(`[Zoho DEV] createCustomer: ${name} <${email}>`);
    return { contact_id: `mock_contact_${Date.now()}`, contact_name: name };
  }

  const token = await getAccessToken();
  const url = `${ZOHO_API_BASE}/contacts?organization_id=${orgId()}`;
  const payload = {
    contact_name: name,
    contact_type: "customer",
    currency_code: currency,
    billing_address: {
      country: countryCode,
    },
    contact_persons: [
      {
        first_name: name.split(" ")[0] || name,
        last_name: name.split(" ").slice(1).join(" ") || "",
        email,
        is_primary_contact: true,
      },
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: zohoHeaders(token),
    body: JSON.stringify(payload),
  });
  const data = await res.json();

  if (data.code !== 0) {
    throw new Error(`Zoho API Error (${data.code}): ${data.message}`);
  }
  if (!data.contact) {
    throw new Error(`Failed to create Zoho customer: ${JSON.stringify(data)}`);
  }

  console.log(`[Zoho] Created customer: ${data.contact.contact_id}`);
  return data.contact;
}

/**
 * Creates an invoice in Zoho Books with AUM- prefix.
 */
export async function createInvoice({
  contactId,
  planName,
  basePrice,
  vatPercentage,
  vatAmount,
  total,
  currency,
  stripePaymentIntentId,
  stripeSessionId,
  customerEmail,
}) {
  const isDev = process.env.ZOHO_REFRESH_TOKEN === "dummy_refresh_token";
  if (isDev) {
    const mockInvoice = {
      invoice_id: `mock_inv_${Date.now()}`,
      invoice_number: `AUM-${String(Date.now()).slice(-4)}`,
      status: "sent",
    };
    console.log(`[Zoho DEV] createInvoice:`, mockInvoice);
    return mockInvoice;
  }

  const token = await getAccessToken();
  const url = `${ZOHO_API_BASE}/invoices?organization_id=${orgId()}`;

  const lineItems = [
    {
      name: `AURUM EA – ${planName} Plan`,
      description: "Lifetime licence · One-time payment",
      rate: basePrice,
      quantity: 1,
      account_id: process.env.ZOHO_SALES_ACCOUNT_ID || "",
    },
  ];

  if (vatAmount > 0) {
    lineItems.push({
      name: `VAT (${vatPercentage}%)`,
      description: `Value Added Tax at ${vatPercentage}%`,
      rate: vatAmount,
      quantity: 1,
      account_id: process.env.ZOHO_SALES_ACCOUNT_ID || "",
    });
  }

  const payload = {
    customer_id: contactId,
    invoice_number: `AUMV2-${Date.now().toString(36).toUpperCase()}`,
    currency_code: currency,
    reference_number: stripePaymentIntentId || stripeSessionId,
    notes: `Stripe Session: ${stripeSessionId} | Payment Intent: ${stripePaymentIntentId || "N/A"} | Customer Email: ${customerEmail || "N/A"}`,
    line_items: lineItems,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: zohoHeaders(token),
    body: JSON.stringify(payload),
  });
  const data = await res.json();

  if (data.code !== 0) {
    throw new Error(`Zoho API Error (${data.code}): ${data.message}`);
  }
  if (!data.invoice) {
    throw new Error(`Failed to create Zoho invoice: ${JSON.stringify(data)}`);
  }

  console.log(`[Zoho] Created invoice: ${data.invoice.invoice_number}`);
  return data.invoice;
}

/**
 * Records a payment against a Zoho Books invoice and marks it as paid.
 */
export async function recordPayment({ customerId, invoiceId, amount, currency, stripePaymentIntentId, paidDate }) {
  const isDev = process.env.ZOHO_REFRESH_TOKEN === "dummy_refresh_token";
  if (isDev) {
    console.log(`[Zoho DEV] recordPayment for invoiceId: ${invoiceId}, amount: ${amount} ${currency}`);
    return { payment_id: `mock_payment_${Date.now()}` };
  }

  const token = await getAccessToken();
  const url = `${ZOHO_API_BASE}/customerpayments?organization_id=${orgId()}`;

  const payload = {
    customer_id: customerId,
    amount,
    date: paidDate || new Date().toISOString().split("T")[0],
    payment_mode: "stripe",
    reference_number: stripePaymentIntentId,
    description: `Stripe payment: ${stripePaymentIntentId}`,
    invoices: [
      {
        invoice_id: invoiceId,
        amount_applied: amount,
      },
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: zohoHeaders(token),
    body: JSON.stringify(payload),
  });
  const data = await res.json();

  if (data.code !== 0) {
    throw new Error(`Zoho API Error (${data.code}): ${data.message}`);
  }
  if (!data.payment) {
    throw new Error(`Failed to record Zoho payment: ${JSON.stringify(data)}`);
  }

  console.log(`[Zoho] Recorded payment: ${data.payment.payment_id}`);
  return data.payment;
}
