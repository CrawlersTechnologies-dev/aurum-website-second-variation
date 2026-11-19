"use client";
import { useEffect } from "react";

export default function ScheduleSuccessPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <main style={{ minHeight: "80vh" }}>
      <div style={{ padding: "85px 20px 16px", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "680px", margin: "0 auto" }}>
          <p className="eyebrow" style={{ marginBottom: "6px" }}>Success</p>
          <h1 style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.3rem)", margin: "0 0 10px 0", fontWeight: 700 }}>
            Details Submitted
          </h1>
          <p style={{ color: "var(--ink-muted)", fontSize: "0.95rem", lineHeight: "1.5", margin: 0 }}>
            Thank you for providing your information. Please select a time below to complete your booking.
          </p>
        </div>
      </div>

      <section style={{ padding: "8px 0 60px" }}>
        <div className="container" style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 16px" }}>
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/iSyXRJVwOaGO3yBQxvzC"
            style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "600px", display: "block" }}
            scrolling="no"
            id="iSyXRJVwOaGO3yBQxvzC"
          />
        </div>
      </section>
    </main>
  );
}
