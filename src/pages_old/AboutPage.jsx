"use client";
import PageHero from "./PageHero";
import Link from 'next/link';
import CountUp from "../components/CountUp";
import { founderProfile } from "../data/content";
import "./shared-page.css";
import "./AboutPage.css";

const stats = [
  { n: "20+", l: "Years Combined Experience" },
  { n: "800+", l: "Traders Mentored" },
  { n: "280+", l: "Active AURUM Users" },
  { n: "KHDA", l: "Approved Institution" }
];

const pointers = [
  {
    title: "Remove Emotional Trading",
    desc: "Fear, greed, and hesitation often lead to bad decisions. AURUM follows your trading plan without emotions."
  },
  {
    title: "Build Trading Discipline",
    desc: "Success comes from following the same strategy every time. AURUM helps you stay disciplined in every trade."
  },
  {
    title: "Faster Trade Execution",
    desc: "Markets move quickly. AURUM executes trades instantly when your trading conditions are met."
  },
  {
    title: "Protect Your Capital",
    desc: "Built-in risk management helps control losses and keeps your trading more organised."
  }
];

const principles = [
  {
    title: "Adaptive Intelligence",
    desc: "AURUM uses ATR-based logic to adjust to changing market volatility, helping the strategy react to different market conditions instead of using fixed trade spacing."
  },
  {
    title: "Precision Execution",
    desc: "Every trade is executed based on predefined rules at important price zones, reducing delays and emotional decision-making."
  },
  {
    title: "Quant-Driven Logic",
    desc: "AURUM follows a data-driven trading framework using market structure, ATR calculations, and grid methodology to make structured trading decisions."
  },
  {
    title: "Capital First",
    desc: "Before aiming for returns, AURUM focuses on protecting trading capital through controlled risk management and systematic trade handling."
  }
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About AURUM"
        title="Built by Traders. Backed by Experience."
        lead="AURUM was built by a team of experienced traders who understand the real challenges of trading. With over 20 years of experience across banking, hedge funds, quantitative research, and financial markets, our team has seen what makes traders successful.We learned that long-term success is not just about having a good strategy it's about following it with discipline. That's why AURUM was created to help traders execute their strategy with consistency, confidence, and without emotional decisions."
      />

      <section className="section" style={{ padding: '24px 0' }}>
        <div className="container certs-strip reveal">
          <span>KHDA Approved</span>
          <span aria-hidden="true">·</span>
          <span>Moneytize Trading Academy</span>
          <span aria-hidden="true">·</span>
          <span>MyFXBook Verified</span>
          <span aria-hidden="true">·</span>
          <span>MT5 Compatible</span>
        </div>
      </section>

      <section className="section bgv-white about-stats-section">
        <div className="container about-stats reveal">
          {stats.map((s) => (
            <div className="about-stats__item" key={s.l}>
              <div className="about-stats__n">
                <CountUp value={s.n} />
              </div>
              <p className="about-stats__l">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--grey">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <p className="eyebrow">Why AURUM Exists</p>
            <h2>The problem was never the strategy.</h2>
            <p>
              At Moneytize Trading Academy, we've worked with hundreds of traders over the years
              and noticed the same problem, over and over. They understood the market, learned the
              concepts, and knew when to trade. But when it came to live trading, emotions took
              over. We realised the problem was never the strategy it was the execution.
            </p>
          </div>
          <div className="about-pointers">
            {pointers.map((p, i) => (
              <div className="about-pointer reveal" key={p.title}>
                <div className="about-pointer__num">{i + 1}</div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="founder-card reveal">
            <h3 className="founder-card__eyebrow-title">Meet Our Founder</h3>
            <div className="founder-card__layout">
              <div className="founder-card__photo-wrap">
                <img
                  src={founderProfile.image}
                  alt="Nikhil Malhotra Co-Founder AURUM EA Moneytize Trading Academy Dubai"
                  className="founder-card__photo"
                />
              </div>
              <div className="founder-card__content">
                <p className="founder-card__title">Nikkhil &middot; Founder, Moneytize Trading Academy</p>
                <p className="founder-card__org">KHDA Approved · Dubai, UAE</p>
                <p className="founder-card__bio">
                  With over 12 years of experience in stocks, forex, and cryptocurrency markets, Nikhil
                  has dedicated his career to understanding how successful traders think and operate.
                  As the founder of Moneytize Trading Academy, a KHDA-approved trading institution in
                  Dubai, he has helped more than 800 traders build confidence through structured
                  education and real market experience. A certified financial analyst and liquidity
                  expert, his vision behind AURUM was simple to build a trading system that helps
                  traders execute with discipline, reduce emotional decisions, and follow a structured
                  approach to the markets.
                </p>
              </div>
            </div>
            <div className="founder-card__stats">
              {stats.map((s) => (
                <div key={s.l}>
                  <div className="founder-card__stat-n">
                    <CountUp value={s.n} />
                  </div>
                  <div className="founder-card__stat-l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--grey">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <p className="eyebrow">The Principles</p>
            <h2>What AURUM was built on.</h2>
          </div>
          <div className="about-pointers about-pointers--principles">
            {principles.map((p) => (
              <div className="about-pointer reveal" key={p.title}>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight cta-block">
        <div className="container cta-block__inner reveal">
          <p className="eyebrow">Ready</p>
          <h2>Meet the strategy behind the story.</h2>
          <p>See exactly how AURUM trades, what it protects against, and how to get it running on your account.</p>
          <div className="cta-block__actions">
            <a href="https://calendly.com/aurum-goldea-info/aurum-gold-ea" target="_blank" rel="noopener noreferrer" className="btn btn--ghost">Schedule Demo</a>
            <Link href="/pricing#pricing" className="btn btn--gold">Get AURUM Now</Link>
            <Link href="/results" className="btn btn--ghost">See the Results</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
