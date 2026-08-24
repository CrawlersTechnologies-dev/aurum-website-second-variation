"use client";
import { useRef } from "react";
import HeroCanvas from "./HeroCanvas";
import HeroCarousel from "./HeroCarousel";
import "./Hero.css";

export default function Hero() {
  const glowRef = useRef(null);

  function handleMouseMove(e) {
    const glow = glowRef.current;
    if (!glow) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glow.style.setProperty("--mx", `${x}%`);
    glow.style.setProperty("--my", `${y}%`);
  }

  return (
    <section id="top" className="hero" onMouseMove={handleMouseMove}>
      <div className="hero__bg" aria-hidden="true">
        <HeroCanvas />
        <div className="hero__cursor-glow" ref={glowRef} />
        <div className="hero__vignette" />
        <div className="hero__scanline" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow reveal">Myfxbook Verified Results</p>
          <h1 className="hero__title reveal" style={{ "--reveal-delay": "80ms" }}>
            Most traders work hard.The smart ones
<span className="italic"> AUTOMATE.</span>
          </h1>
          <p className="hero__lead reveal" style={{ "--reveal-delay": "160ms" }}>
            AURUM is an institutional-inspired trading system built for traders who value discipline over emotions. It uses advanced ATR-based Grid logic to identify important price zones, execute trades automatically, and manage positions with precision.
Designed for Gold, Forex, and traders who believe consistency matters more than guessing.

          </p>

          <div className="hero__actions reveal" style={{ "--reveal-delay": "240ms" }}>
            <a href="#pricing" className="btn btn--gold">Get Started</a>
            <a href="#performance" className="btn btn--ghost">Strategy of AURUM</a>
            <a href="https://calendly.com/aurum-goldea-info/aurum-gold-ea" target="_blank" rel="noopener noreferrer" className="btn btn--ghost">Book a call</a>
          </div>
        </div>

        <div className="hero__visual reveal" style={{ "--reveal-delay": "200ms" }}>
          <HeroCarousel />
        </div>
      </div>

      <a href="#stats" className="hero__scroll-cue" aria-label="Scroll to performance">
        <span />
      </a>
    </section>
  );
}
