"use client";
import { useState } from "react";
import PageHero from "./PageHero";
import Link from 'next/link';
import { socialLinks } from "../data/content";
import Icon from "../components/Icon";
import MailLink from "../components/MailLink";
import "./shared-page.css";
import "./ContactPage.css";

const channels = [
  { label: "Email support", value: "info@aurum-goldea.com", href: "mailto:info@aurum-goldea.com", icon: "link" },
  { label: "Response time", value: "Same day or next business day", href: null, icon: "clock" },
  { label: "Support hours", value: "Mon\u2013Sat \u00b7 9am\u20138pm GST", href: null, icon: "shield" }
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Contact us and save your time."
        lead="Questions before you buy, issues during setup, or just want a straight answer about whether AURUM fits your account our team reads every message."
      />

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info reveal">
            <h3>Reach us directly</h3>
            <div className="contact-channels">
              {channels.map((c) => (
                <div className="contact-channel" key={c.label}>
                  <span className="contact-channel__icon">
                    <Icon name={c.icon} size={16} strokeWidth={1.8} />
                  </span>
                  <div>
                    <div className="contact-channel__label">{c.label}</div>
                    {c.href ? (
                      <MailLink className="contact-channel__value">{c.value}</MailLink>
                    ) : (
                      <div className="contact-channel__value">{c.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <h4 className="contact-info__social-title">Follow AURUM</h4>
            <div className="contact-social">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="contact-social__link">
                  <Icon name={s.icon} size={16} strokeWidth={1.8} />
                </a>
              ))}
            </div>

            <div className="contact-faq-note">
              <p>Have a quick question? It might already be answered.</p>
              <Link href="/faq" className="btn btn--ghost">Browse the FAQ</Link>
            </div>
          </div>

          <form className="contact-form reveal" onSubmit={handleSubmit}>
            {sent ? (
              <div className="contact-form__success">
                <h3>Message sent.</h3>
                <p>Thanks,we'll get back to you the same day or next business day. In the meantime, feel free to browse the FAQ or check live results.</p>
                <div className="contact-form__success-actions">
                  <Link href="/results" className="btn btn--gold">See the Results</Link>
                  <Link href="/faq" className="btn btn--ghost">Browse the FAQ</Link>
                </div>
              </div>
            ) : (
              <>
                {error && <div className="contact-form__error" style={{ color: '#ef4444', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</div>}
                <div className="contact-form__row">
                  <label>
                    Name
                    <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Your name" />
                  </label>
                  <label>
                    Email
                    <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@email.com" />
                  </label>
                </div>
                <label>
                  Message
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what you're trying to solve setup, pricing, or something else."
                  />
                </label>
                <button type="submit" className="btn btn--gold contact-form__submit" disabled={sending}>
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      <section className="section section--tight cta-block">
        <div className="container cta-block__inner reveal">
          <p className="eyebrow">Still confused?</p>
          <h2>Let&apos;s connect before you decide.</h2>
          <p>No pressure, no sales script,just an honest conversation about whether AURUM is the right fit for your account.</p>
          <div className="cta-block__actions">
            <a href="https://calendly.com/aurum-goldea-info/aurum-gold-ea" target="_blank" rel="noopener noreferrer" className="btn btn--ghost">Book a call</a>
            <MailLink className="btn btn--gold">Email the Team</MailLink>
            <Link href="/pricing" className="btn btn--ghost">View Plans</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
