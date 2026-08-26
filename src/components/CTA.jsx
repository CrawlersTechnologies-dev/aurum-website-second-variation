"use client";
import Icon from "./Icon";
import Link from 'next/link';
import "./CTA.css";

export default function CTA() {
  return (
    <section className="section section--tight section--white">
      <div className="container">
        <div className="cta-grid">
          <div className="cta-box cta-box--primary">
            <div className="cta-box__glow" aria-hidden="true" />
            <span className="eyebrow" style={{ color: "var(--navy-deep)" }}>Ready When You Are</span>
            <h2 className="cta-box__title">Start Trading Smarter</h2>
            <p className="cta-box__lead">Pick a plan. Install in 30 minutes. AURUM handles the rest tonight, while you sleep.</p>
            <a href="#pricing" className="btn btn--dark cta-box__btn">
              View Packages
              <Icon name="trend" size={16} strokeWidth={2.2} />
            </a>
          </div>

          <div className="cta-box cta-box--secondary" style={{ "--reveal-delay": "120ms" }}>
            <span className="cta-box__icon" aria-hidden="true">
              <Icon name="help" size={22} strokeWidth={1.8} />
            </span>
            {/* <span className="automation-panel__eyebrow">Talk To A Aurum</span> */}
            <h2 className="cta-box__title">Still Confused? Let&apos;s Connect.</h2>
            <p className="cta-box__lead">
              Not sure which plan fits you? Have a question about your broker or account size?
              Talk to the team no sales pressure, just answers.
            </p>
            <a href="/schedule" className="btn btn--outline cta-box__btn">
              Talk To The Team
              <Icon name="link" size={16} strokeWidth={2.2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
