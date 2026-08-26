"use client";
import { useEffect } from "react";
import PageHero from "./PageHero";

export default function ScheduleSuccessPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main>
      <PageHero
        eyebrow="Success"
        title="Details Submitted"
        lead="Thank you for providing your information. Please select a time below to complete your booking."
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div 
            className="calendly-inline-widget reveal" 
            data-url="https://calendly.com/aurum-goldea-info/aurum-gold-ea" 
            style={{ minWidth: '320px', height: '700px' }}
          ></div>
        </div>
      </section>
    </main>
  );
}
