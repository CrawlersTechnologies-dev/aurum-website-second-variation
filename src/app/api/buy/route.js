import Stripe from "stripe";
import { pricingTiers } from "@/lib/pricing";
import { redirect } from "next/navigation";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const planId = searchParams.get("planId");

  if (!planId) {
    return new Response("planId is required.", { status: 400 });
  }

  const plan = pricingTiers.find((p) => p.id === planId);
  if (!plan) {
    return new Response("Invalid plan selected.", { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return new Response("Stripe configuration error: Missing secret key.", { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia",
  });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (process.env.STRIPE_SECRET_KEY === "sk_test_dummy_key") {
    const mockSessionId = `cs_test_mock_${Date.now()}`;
    const mockUrl = `${appUrl}/thank-you?session_id=${mockSessionId}&token=${Buffer.from(mockSessionId).toString("base64url")}`;
    redirect(mockUrl);
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `AURUM EA - ${plan.name} Plan`,
              description: "Lifetime licence - No recurring fees",
              metadata: {
                planId,
                planName: plan.name,
              },
            },
            unit_amount: plan.priceBase * 100, // cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      billing_address_collection: "auto",
      success_url: `${appUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing?cancelled=1`,
      metadata: {
        planId,
        planName: plan.name,
        basePrice: String(plan.priceBase),
        currency: "USD",
        application: "aurum_variation_2",
      },
      customer_creation: "always",
    });

    redirect(session.url);
  } catch (err) {
    console.error("[api/buy] Error:", err);
    return new Response("Internal server error. Please try again.", { status: 500 });
  }
}
