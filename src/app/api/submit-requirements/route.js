import Stripe from "stripe";
import {
  sendRequirementConfirmationEmail,
  sendInternalRequirementNotification,
} from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "dummy_key", {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      sessionId,
      token,
      fullName,
      email,
      phone,
      selectedPlan,
      platform,
      accountNumber,
    } = body;

    // Required field validation
    if (!sessionId || !email || !fullName) {
      return Response.json(
        { error: "Session ID, full name, and email are required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Invalid email address." }, { status: 400 });
    }

    // Verify token matches session ID (prevents unauthorized access)
    const expectedToken = Buffer.from(sessionId).toString("base64url");
    if (token && token !== expectedToken) {
      return Response.json({ error: "Invalid or expired form token." }, { status: 403 });
    }

    // Verify the Stripe session exists and was paid
    let stripeSession = null;
    const isDev = process.env.STRIPE_SECRET_KEY === "sk_test_dummy_key";

    if (isDev) {
      console.log("[submit-requirements DEV] Skipping Stripe session verification.");
      stripeSession = { id: sessionId, payment_status: "paid", metadata: { planName: selectedPlan } };
    } else {
      try {
        stripeSession = await stripe.checkout.sessions.retrieve(sessionId);
        if (stripeSession.payment_status !== "paid") {
          return Response.json(
            { error: "Payment not confirmed for this session." },
            { status: 402 }
          );
        }
      } catch (err) {
        console.error("[submit-requirements] Failed to retrieve Stripe session:", err.message);
        return Response.json(
          { error: "Could not verify payment. Please contact support." },
          { status: 400 }
        );
      }
    }

    // Compile the requirement data
    const requirementData = {
      "Full Name": fullName,
      "Email": email,
      "Phone": phone || "?",
      "Package": selectedPlan || stripeSession?.metadata?.planName || "?",
      "Platform": platform || "?",
      "Account Number": accountNumber || "?",
      "Stripe Session ID": sessionId,
      "Submitted At": new Date().toISOString(),
    };

    console.log("[submit-requirements] Processing requirement for:", email);

    // Send emails
    const emailErrors = [];

    try {
      await sendRequirementConfirmationEmail({
        customerEmail: email,
        customerName: fullName,
      });
    } catch (err) {
      console.error("[submit-requirements] Failed to send customer confirmation:", err.message);
      emailErrors.push("customer_confirmation");
    }

    try {
      await sendInternalRequirementNotification({
        customerName: fullName,
        customerEmail: email,
        data: requirementData,
      });
    } catch (err) {
      console.error("[submit-requirements] Failed to send internal notification:", err.message);
      emailErrors.push("internal_notification");
    }

    return Response.json({
      success: true,
      message: "Requirements submitted successfully.",
      emailErrors: emailErrors.length > 0 ? emailErrors : undefined,
    });
  } catch (err) {
    console.error("[submit-requirements] Unexpected error:", err);
    return Response.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
