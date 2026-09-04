"use client";
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PageHero from "./PageHero";
import Link from 'next/link';
import {
  fxbookSummary,
  fxbookMonthlyImages,
  testimonials,
  MYFXBOOK_REPORT_URL
} from "../data/content";
import CountUp from "../components/CountUp";
import "./shared-page.css";
import "./ResultsPage.css";

const MFX_SLIDES = [
  {
    image: "/images/myfxbook-growth-chart.png",
    alt: "MyFXBook growth chart for AURUM GOLD EA Tradewize showing over 100% equity growth from May 2025 to June 2026",
    titleAttr: "AURUM GOLD EA MyFXBook growth and equity curve",
    badge: "GROWTH",
    title: "Steady Verified Growth",
    desc: "Closed-trade growth climbing past 100% over 13+ months of live tracking with equity growth staying close to the curve.",
    stat: { value: "+107.67%", label: "Verified Gain" }
  },
  {
    image: "/images/myfxbook-profit-chart.png",
    alt: "MyFXBook profit chart for AURUM GOLD EA showing cumulative profit rising to over $530,000 from May 2025 to June 2026",
    titleAttr: "AURUM GOLD EA MyFXBook cumulative profit chart",
    badge: "PROFIT",
    title: "Real Dollar Profit",
    desc: "Live account profit climbing toward $530k+ on a $500,000 deposit independently synced from the broker, not a backtest.",
    stat: { value: "$530k+", label: "Verified Profit" }
  },
  {
    image: "/images/myfxbook-advanced-statistics.png",
    alt: "MyFXBook advanced statistics for AURUM GOLD EA showing 6,287 trades, 2.37 profit factor, and 87% longs won",
    titleAttr: "AURUM GOLD EA MyFXBook advanced trade statistics",
    badge: "DEEP METRICS",
    title: "Advanced Analytics",
    desc: "6,287 trades logged with a 2.37 profit factor, 87% longs won, and 82% shorts won  every metric open for inspection.",
    stat: { value: "2.37", label: "Profit Factor" }
  },
  {
    image: "/images/myfxbook-account-stats.png",
    alt: "MyFXBook account stats for AURUM GOLD EA showing +107.67% gain, 5.48% monthly return, and 16.95% drawdown",
    titleAttr: "AURUM GOLD EA MyFXBook account performance stats",
    badge: "LIVE STATS",
    title: "Full Account Snapshot",
    desc: "Gain, monthly return, drawdown, balance, and deposits the full MyFXBook stats panel, updated from live broker data.",
    stat: { value: "5.48%", label: "Monthly Return" }
  }
];

function MfxCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const total = MFX_SLIDES.length;

  const goTo = useCallback((i) => {
    setIndex(((i % total) + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused || lightboxImg) return;
    const id = setInterval(() => goTo(index + 1), 4500);
    return () => clearInterval(id);
  }, [index, paused, goTo, lightboxImg]);

  useEffect(() => {
    if (lightboxImg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsZoomed(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxImg]);

  const slide = MFX_SLIDES[index];

  return (
    <>
      <div
        className="mfx-carousel-v2"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="mfx-carousel-v2__frame">
          {MFX_SLIDES.map((s, i) => (
            <img
              key={s.image}
              src={s.image}
              alt={s.alt}
              title={s.titleAttr}
              className={`mfx-carousel-v2__img ${i === index ? 'is-active' : ''}`}
              onClick={() => setLightboxImg(s.image)}
            />
          ))}
          <span className="mfx-carousel-v2__badge">{slide.badge}</span>
          <button type="button" className="mfx-carousel-v2__arrow mfx-carousel-v2__arrow--prev" onClick={() => goTo(index - 1)} aria-label="Previous">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button type="button" className="mfx-carousel-v2__arrow mfx-carousel-v2__arrow--next" onClick={() => goTo(index + 1)} aria-label="Next">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        <div className="mfx-carousel-v2__body" key={slide.title}>
          <div className="mfx-carousel-v2__copy">
            <h3 className="mfx-carousel-v2__title">{slide.title}</h3>
            <p className="mfx-carousel-v2__desc">{slide.desc}</p>
          </div>
        </div>

        <div className="mfx-carousel-v2__dots">
          {MFX_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`mfx-carousel-v2__dot ${i === index ? 'is-active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {lightboxImg && (() => {
        const currentIdx = MFX_SLIDES.findIndex(s => s.image === lightboxImg);
        const goNext = (e) => {
          e.stopPropagation();
          setLightboxImg(MFX_SLIDES[(currentIdx + 1) % total].image);
          setIsZoomed(false);
        };
        const goPrev = (e) => {
          e.stopPropagation();
          setLightboxImg(MFX_SLIDES[(currentIdx - 1 + total) % total].image);
          setIsZoomed(false);
        };
        
        const closeLightbox = () => {
          setLightboxImg(null);
        };
        
        const toggleZoom = (e) => {
          e.stopPropagation();
          setIsZoomed(!isZoomed);
        };
        
        const lightboxNode = (
          <div className={`mfx-lightbox ${isZoomed ? 'is-zoomed-view' : ''}`} onClick={closeLightbox}>
            <div className="mfx-lightbox__toolbar" onClick={e => e.stopPropagation()}>
              <button type="button" className="mfx-lightbox__tool-btn" onClick={toggleZoom} aria-label="Toggle Zoom">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {isZoomed ? <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM8 11h6"/> : <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM11 8v6m-3-3h6"/>}
                </svg>
              </button>
              <button type="button" className="mfx-lightbox__tool-btn" onClick={goPrev} aria-label="Previous image">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" className="mfx-lightbox__tool-btn" onClick={goNext} aria-label="Next image">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" className="mfx-lightbox__tool-btn" onClick={closeLightbox} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="mfx-lightbox__img-container">
              <img
                src={lightboxImg}
                alt="Enlarged view"
                className={`mfx-lightbox__img ${isZoomed ? 'is-zoomed' : ''}`}
                onClick={(e) => { e.stopPropagation(); toggleZoom(e); }}
                title="Click to toggle zoom"
              />
            </div>
          </div>
        );
        return typeof document !== "undefined" ? createPortal(lightboxNode, document.body) : null;
      })()}
    </>
  );
}

const TRUST_ITEMS = [
  { title: "Real Accounts", text: "Live trading results from real traders." },
  { title: "Verified by MyFXBook", text: "Industry standard verification." },
  { title: "100% Transparent", text: "No filters. No fake promises." },
  { title: "280+ Traders", text: "And growing every day." }
];

const RESULT_STATS = [
  { value: "+107.67%", label: "Verified gain on the live MyFXBook account" },
  { value: "$530k+", label: "Verified profit tracked from broker data" },
  { value: "280+", label: "Traders making money with AURUM" },
  { value: "24/7", label: "Automated execution on live accounts" }
];

export default function ResultsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Performance"
        title="Real Accounts. Real Results."
        lead="280+ active traders. A live MyFXBook track record with +107.67% verified gain. These aren't demo screenshots or backtested curves this is what AURUM has done, and continues to do, on live accounts every day."
        badge="280+ active traders · +107.67% verified gain · $530k+ verified profit"
        note="Results vary by account size, broker, and risk settings. Past performance does not guarantee future results. Always trade with capital you can afford to lose."
      />

      <section className="section section--tight">
        <div className="container">
          <div className="stats-row reveal">
            {RESULT_STATS.map((s) => (
              <div className="stat-block" key={s.label}>
                <div className="stat-block__n">
                  <CountUp value={s.value} />
                </div>
                <p className="stat-block__l">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section mfx-banner">
        <div className="container">
          <div className="mfx-banner__content reveal">
            <p className="eyebrow">Don&apos;t Trust Our Words. Trust the Live Broker Data.</p>
            <h2>What Our Myfxbook Verification Means for Your Peace of Mind</h2>
            <p className="mfx-banner__lead">
              Myfxbook is an uncheatable third-party auditor that live-tracks our product&apos;s exact performance. It completely eliminates guesswork by pulling trading data directly from the exchange backend. You see the real wins, the real losses, and the real math giving you the ultimate proof of consistency.
            </p>
            <MfxCarousel />
          </div>
        </div>
      </section>

      <section className="section section--grey">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <p className="eyebrow">Verified Performance</p>
            <h2>MyFXBook verified. No cherry-picking.</h2>
            <p>
              We use MyFXBook the industry standard for independently verified trading results
             to give you transparent, tamper-proof performance data from the live AURUM GOLD EA Tradewize account.
            </p>
          </div>

          <div className="fxbook-summary reveal">
            {fxbookSummary.map((s) => (
              <div className="fxbook-summary__item" key={s.label}>
                <div className={`fxbook-summary__v ${s.positive ? "is-positive" : ""}`}>
                  <CountUp value={s.value} />
                </div>
                <div className="fxbook-summary__l">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="fxbook-monthly reveal">
            {fxbookMonthlyImages.map((item) => (
              <figure className="fxbook-monthly__item" key={item.image}>
                <img
                  src={item.image}
                  alt={item.alt}
                  title={item.title}
                  className="fxbook-monthly__img"
                  loading="lazy"
                />
                <figcaption className="fxbook-monthly__caption">{item.caption}</figcaption>
              </figure>
            ))}
          </div>

          <div className="fxbook-actions reveal">
            <a
              href={MYFXBOOK_REPORT_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn--gold"
            >
              View the Live MyFXBook Report
            </a>
          </div>

          <p className="perf-note">
            Figures from the live AURUM GOLD EA Tradewize MyFXBook account. Individual results vary based on account
            size, broker, and risk settings.
          </p>
        </div>
      </section>
      
      <section className="section results-community">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <p className="eyebrow">Real Traders. Real Results.</p>
            <h2>280+ traders. Verified track record on MyFXBook.</h2>
            <p>These are the people behind the numbers real accounts, real returns, in their own words.</p>
          </div>

          <div className="results-testi-grid">
            {testimonials.map((t, idx) => (
              <div className={`results-testi-card reveal ${t.isCta ? "results-testi-card--cta" : ""}`} key={t.name || idx}>
                {t.isCta ? (
                  <div className="results-testi-card__cta-content">
                    <h3 className="results-testi-card__cta-title">{t.title}</h3>
                    <Link href={t.buttonLink} className="btn btn--gold">{t.buttonText}</Link>
                  </div>
                ) : (
                  <>
                    <div className="results-testi-card__meta">
                      <span className="results-testi-card__profit">{t.profit}</span>
                      <span className="results-testi-card__joined">{t.joined}</span>
                    </div>
                    <p className="results-testi-card__text">&ldquo;{t.text}&rdquo;</p>
                    <div className="results-testi-card__author">
                      <span className="results-testi-card__av">{t.name.split(" ").map((w) => w[0]).join("")}</span>
                      <div>
                        <div className="results-testi-card__name">{t.name}</div>
                        <div className="results-testi-card__role">Rating: {"\u2605".repeat(t.rating)}{"\u2606".repeat(5 - t.rating)}</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="results-trust reveal">
            {TRUST_ITEMS.map((item) => (
              <div className="results-trust__item" key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <p className="risk-banner reveal">
            Important: all testimonials reflect individual experiences and results. Trading
            results vary significantly based on account size, broker conditions, risk settings,
            and market timing. Trading carries substantial risk of loss.
          </p>
        </div>
      </section>

      <section className="section section--tight cta-block">
        <div className="container cta-block__inner reveal">
          <p className="eyebrow">Your Turn</p>
          <h2>You&apos;ve seen the results. Now get them.</h2>
          <p>
            280+ traders started where you are right now  reading this page, wondering if it&apos;s
            real. The only way to know is to start.
          </p>
          <div className="cta-block__actions">
            <Link href="/pricing#pricing" className="btn btn--gold">Get AURUM Now</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
