"use client";
import { useEffect, useRef, useState } from "react";
import { steps, onboardingEmailCta } from "../data/content";
import "./HowItWorks.css";

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const stepRefs = useRef([]);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean);
    if (!nodes.length) return undefined;

    const visibility = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-step-index"));
          visibility.set(index, entry.isIntersecting && entry.intersectionRatio >= 0.45);
        });

        let highest = -1;
        for (let i = 0; i < steps.length; i += 1) {
          if (visibility.get(i)) highest = i;
        }
        setActiveIndex(highest);
      },
      {
        threshold: [0.45, 0.7],
        rootMargin: "-12% 0px -35% 0px"
      }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="steps" className="section how section--white">
      <div className="container">
        <div className="how__layout">
          <div className="how__head reveal">
            <p className="eyebrow">Get Started</p>
            <h2>From purchase to live trading</h2>
            <p className="how__intro">
              Four clear steps. No coding required.
            </p>
            <div className="how__lights" aria-hidden="true">
              {steps.map((s, i) => (
                <span
                  key={s.n}
                  className={`how__light ${i <= activeIndex ? "is-on" : ""} ${i === activeIndex ? "is-current" : ""}`}
                />
              ))}
            </div>
            <a href="#pricing" className="btn btn--gold how__cta">
              Pick a plan
            </a>
          </div>

          <ol className="how-path reveal" style={{ "--reveal-delay": "100ms" }}>
            {steps.map((s, i) => {
              const isLit = i <= activeIndex;
              const isCurrent = i === activeIndex;
              return (
                <li
                  className={`how-path__step ${isLit ? "is-lit" : ""} ${isCurrent ? "is-current" : ""}`}
                  key={s.n}
                  data-step-index={i}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                >
                  <div className="how-path__rail" aria-hidden="true">
                    <span className="how-path__num">{s.n}</span>
                    {i < steps.length - 1 && (
                      <span className={`how-path__line ${i < activeIndex ? "is-lit" : ""}`} />
                    )}
                  </div>
                  <div className="how-path__content">
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="how__email reveal" style={{ "--reveal-delay": "280ms" }}>
          <div className="how__email-copy">
            <strong>{onboardingEmailCta.heading}</strong>
            <span>{onboardingEmailCta.body}</span>
          </div>
          <div className="how__email-field">
            <a href="https://calendly.com/aurum-goldea-info/aurum-gold-ea" target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              Schedule Demo
            </a>
            <a href="/pricing" className="btn btn--gold">
              Start Automating →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
