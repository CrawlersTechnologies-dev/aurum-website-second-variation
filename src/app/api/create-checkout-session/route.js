import Stripe from "stripe";
import { pricingTiers } from "@/lib/pricing";

export async function POST(request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return Response.json(
        { error: "Stripe configuration error: Missing secret key. Did you restart your server after adding keys?" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-12-18.acacia",
    });

    const body = await request.json();
    const { planId } = body;

    if (!planId) {
      return Response.json(
        { error: "planId is required." },
        { status: 400 }
      );
    }

    // Look up the plan from config — never trust prices from the frontend
    const plan = pricingTiers.find((p) => p.id === planId);
    if (!plan) {
      return Response.json({ error: "Invalid plan selected." }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // DEV MODE FALLBACK: If using dummy keys, skip Stripe and jump straight to thank you page.
    if (process.env.STRIPE_SECRET_KEY === "sk_test_dummy_key") {
      console.log("[create-checkout-session] DEV MODE: Mocking Stripe checkout session");
      const mockSessionId = `cs_test_mock_${Date.now()}`;
      const mockUrl = `${appUrl}/thank-you?session_id=${mockSessionId}&token=${Buffer.from(mockSessionId).toString("base64url")}`;
      return Response.json({ url: mockUrl });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `AURUM EA – ${plan.name} Plan`,
              description: "Lifetime licence · No recurring fees",
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

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("[create-checkout-session] Error:", err);
    return Response.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
