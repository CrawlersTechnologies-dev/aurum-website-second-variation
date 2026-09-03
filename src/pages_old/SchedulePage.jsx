"use client";
import { useState, useEffect } from "react";
import PageHero from "./PageHero";
import { useRouter } from "next/navigation";
import "./shared-page.css";
import "./ContactPage.css"; // Reuse contact form styles

export default function SchedulePage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", experience: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCountryCode() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data && data.country_calling_code) {
          setForm((f) => {
            if (!f.phone) {
              return { ...f, phone: data.country_calling_code + " " };
            }
            return f;
          });
        }
      } catch (err) {
        // Silently fail if blocked by adblocker or network error
      }
    }
    fetchCountryCode();
  }, []);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      router.push("/schedule-success");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setSending(false);
    }
  }

  return (
    <main>
      <PageHero
        eyebrow="Apply"
        title="Let's Connect"
        lead="Tell us a bit about yourself so we can understand your trading needs before we speak."
      />
      <section className="section">
        <div className="container contact-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '700px', margin: '0 auto' }}>
          <form className="contact-form reveal" onSubmit={handleSubmit}>
            {error && <div className="contact-form__error" style={{ color: '#ef4444', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</div>}
            
            <div className="contact-form__row">
              <label>
                Full Name
                <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="John Doe" />
              </label>
              <label>
                Email Address
                <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="john@example.com" />
              </label>
            </div>
            
            <div className="contact-form__row">
              <label>
                Phone Number
                <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="+1 234 567 8900" />
              </label>
              <label>
                How many years of trading experience you have (Optional)
                <select name="experience" value={form.experience} onChange={handleChange} style={{ width: '100%', padding: '16px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'var(--white)', fontSize: '0.95rem' }}>
                  <option value="" style={{color: '#000'}}>Select Experience</option>
                  <option value="Less than 1 year" style={{color: '#000'}}>Less than 1 year</option>
                  <option value="1-3 years" style={{color: '#000'}}>1-3 years</option>
                  <option value="3-5 years" style={{color: '#000'}}>3-5 years</option>
                  <option value="5+ years" style={{color: '#000'}}>5+ years</option>
                </select>
              </label>
            </div>
            
            <button type="submit" className="btn btn--gold contact-form__submit" disabled={sending} style={{ width: '100%', marginTop: '16px' }}>
              {sending ? "Submitting..." : "Submit & Schedule Demo"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
