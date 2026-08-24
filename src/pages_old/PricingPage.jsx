"use client";
import { useState } from "react";
import PageHero from "./PageHero";
import Pricing from "../components/Pricing";
import Link from 'next/link';
import "../components/Pricing.css";
import "../components/FAQ.css";
import "./shared-page.css";
import "./PricingPage.css";
import "./FAQPage.css";

const comparePlans = [
  { name: "Silver", price: "$1,099" },
  { name: "Gold", price: "$1,399" },
  { name: "Diamond", price: "$1,999", featured: true }
];

const compareRows = [
  ["Trading Direction", "Buy Only or Sell Only", "Buy & Sell (Bi-directional)", "Buy & Sell (Bi-directional)"],
  ["Instruments", "Gold + EUR/USD", "5 currency pairs", "Unlimited pairs"],
  ["ATR-Based Grid Strategy", "\u2713", "\u2713", "\u2713"],
  ["Enhanced Re-entry Logic", "\u2014", "\u2713", "\u2713"],
  ["Priority Support", "\u2014", "\u2713", "\u2713"],
  ["Live Setup Call with the AURUM team", "\u2014", "\u2014", "\u2713"],
  ["Full System Customisation", "\u2014", "\u2014", "\u2713"],
  ["Lifetime VIP Support & Updates", "\u2014", "\u2014", "\u2713"],
  ["Installation Guide", "\u2713", "\u2713", "\u2713"],
  ["Support", "Email support", "Priority email support", "Lifetime VIP support"]
];

const faqs = [
  {
    q: "Is this really a one-time payment?",
    a: "Yes. You pay once and AURUM is yours to use-no monthly fees, no annual renewals, no hidden charges."
  },
  {
    q: "Which plan should I choose?",
    a: "If you mainly trade Gold (XAUUSD), the Silver Plan is a great place to start. If you want to trade multiple markets like Forex, Gold, Silver, and Indices, we recommend our Diamond Plan — our most popular plan."
  },
  {
    q: "How quickly can I get AURUM running after purchase?",
    a: "You'll receive the AURUM files on the same day or by the next business day. Most users are ready to start trading within 1\u20132 days, and our team is here to help with setup."
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Yes — contact our support team and we'll calculate the difference. You only pay the gap between your current plan and the new one."
  }
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState(-1);

  const scrollToPlan = (planName) => {
    const el = document.getElementById(`${planName.toLowerCase()}-pricing-card`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main>
      <PageHero
        eyebrow="Pricing"
        title="One payment. Trade forever."
        lead="No monthly fees. No subscriptions. No recurring charges. 280+ active users trust AURUM because it works, and because they only had to pay once."
        badge="Lifetime licence · No recurring fees · 280+ active users"
      />

      <Pricing themeClass="bgv-white" />

      <section className="section section--tight bgv-white">
        <div className="container">
          <div className="pricing-assurance reveal">
            <div className="pricing-assurance__copy">
              <strong>Pay once. Own it forever.</strong>
              <span>All plans are lifetime licences  no subscriptions, ever.</span>
            </div>
            <a href="https://calendly.com/aurum-goldea-info/aurum-gold-ea" target="_blank" rel="noopener noreferrer" className="btn btn--gold">
              Talk to us first
            </a>
          </div>
        </div>
      </section>

      <section className="section bgv-navy">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Compare Plans</p>
            <h2>Every feature, side by side.</h2>
          </div>

          <div className="compare-table reveal">
            <div className="compare-table__row compare-table__row--head">
              <span className="compare-table__feature">Feature</span>
              {comparePlans.map((plan) => (
                  <button
                    type="button"
                    className={`compare-table__plan ${plan.featured ? "compare-table__plan--featured" : ""}`}
                    key={plan.name}
                    onClick={() => scrollToPlan(plan.name)}
                    aria-label={`Jump to the ${plan.name} pricing card`}
                  >
                    {plan.featured && <em className="compare-table__flag">Most Popular</em>}
                    <strong>{plan.name}</strong>
                    <small>{plan.price}</small>
                  </button>
))}

            </div>
            {compareRows.map((row) => (
              <div className="compare-table__row" key={row[0]}>
                {row.map((cell, i) => (
                  <span
                    key={i}
                    className={`${i === 0 ? "compare-table__feature" : "compare-table__value"} ${i === 3 ? "compare-table__value--featured" : ""}`}
                  >
                    {cell === "\u2713" ? (
                      <i className="compare-table__mark compare-table__mark--yes" aria-label="Included">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </i>
                    ) : cell === "\u2014" ? (
                      <i className="compare-table__mark compare-table__mark--no" aria-label="Not included">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                      </i>
                    ) : (
                      cell
                    )}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        
      </section>

      <section className="section section--tight faq-page-block bgv-white">
        <div className="container">
          <h2 className="faq-page-block__title reveal">FAQs About Payment</h2>
          <div className="faq-list faq-page-list">
            {faqs.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.q}>
                  <button
                    type="button"
                    className="faq-item__trigger"
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-item__q">{item.q}</span>
                    <span className="faq-item__icon" aria-hidden="true"></span>
                  </button>
                  <div className="faq-item__panel">
                    <div className="faq-item__panel-inner">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="faq-view-all">
            <Link href="/faq" className="btn btn--ghost">View All FAQs</Link>
        </div>
        
      </section>

      <section className="section section--tight cta-block bgv-navy">
        <div className="container cta-block__inner reveal">
          <p className="eyebrow">Ready</p>
          <h2>280+ traders are in. Are you?</h2>
          <p>
            Gold moves at 3am. AURUM doesn't sleep and now it doesn't have to cost you a monthly
            fee either. One payment. Lifetime access.
          </p>
          <div className="cta-block__actions">
            <Link href="/pricing#pricing" className="btn btn--gold">Get AURUM Now</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
