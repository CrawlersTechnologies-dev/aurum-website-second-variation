"use client";
import PageHero from "./PageHero";
import Link from "next/link";
import "./shared-page.css";
import "./LegalPage.css";

const policies = {
  privacy: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    lead: "How AURUM collects, uses, and protects your information.",
    sections: [
      {
        heading: "Information we collect",
        body: "We collect information you provide directly — such as your name, email address, billing details, and MetaTrader account information submitted during purchase or onboarding."
      },
      {
        heading: "How we use your information",
        body: "We use your information to process orders, deliver the AURUM GOLD EA, provide support, send transactional emails, and improve our services. We do not sell your personal data."
      },
      {
        heading: "Payments",
        body: "Payment processing is handled by Stripe. We do not store your full card details on our servers."
      },
      {
        heading: "Contact",
        body: "For privacy-related questions, reach us through the Contact page."
      }
    ]
  },
  terms: {
    eyebrow: "Legal",
    title: "Terms and Conditions",
    lead: "The terms that apply when you purchase or use AURUM.",
    sections: [
      {
        heading: "Licence",
        body: "Purchasing AURUM grants you a lifetime licence to use the Expert Advisor on MetaTrader accounts associated with your purchase. The licence is non-transferable except as approved by our support team."
      },
      {
        heading: "No performance guarantee",
        body: "Trading involves risk. AURUM does not guarantee profits or specific results. Past performance does not guarantee future results. You are responsible for your risk settings and trading decisions."
      },
      {
        heading: "Acceptable use",
        body: "You may not reverse-engineer, redistribute, resell, or share AURUM files without written permission."
      },
      {
        heading: "Contact",
        body: "Questions about these terms can be sent through the Contact page."
      }
    ]
  },
  refund: {
    eyebrow: "Legal",
    title: "Refund Policy",
    lead: "Our satisfaction and refund terms for AURUM purchases.",
    sections: [
      {
        heading: "7-day satisfaction guarantee",
        body: "All plans include a 7-day satisfaction guarantee. If within 7 days of purchase you believe AURUM is materially different from what was described, contact us and we will make it right."
      },
      {
        heading: "What is not covered",
        body: "The guarantee does not cover trading performance outcomes, since results depend on market conditions, broker conditions, and personal risk settings."
      },
      {
        heading: "How to request a refund",
        body: "Contact our team through the Contact page within 7 days of purchase with your order details and reason for the request."
      }
    ]
  }
};

export default function LegalPage({ type }) {
  const policy = policies[type];

  if (!policy) return null;

  return (
    <main>
      <PageHero eyebrow={policy.eyebrow} title={policy.title} lead={policy.lead} />

      <section className="section section--tight legal-page">
        <div className="container legal-page__inner">
          {policy.sections.map((section) => (
            <div className="legal-page__block reveal" key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </div>
          ))}

          <p className="legal-page__cta reveal">
            Need help? <Link href="/contact">Contact us</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
