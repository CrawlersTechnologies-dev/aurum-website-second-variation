"use client";
import PageHero from "./PageHero";
import Link from 'next/link';
import Image from 'next/image';
import "./shared-page.css";
import "./SetupGuidePage.css";

const SetupVideoDisplay = ({ src, poster }) => {
  return (
    <div className="setup-video-card">
      <video
        className="setup-video-card__player"
        src={src}
        poster={poster}
        controls
        playsInline
      />
    </div>
  );
};

/* ---------------------------------------------------------------------- */
/* Inline icon set (no external icon library in this project)             */
/* ---------------------------------------------------------------------- */

const IconServer = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="7" rx="1.5" />
    <rect x="3" y="14" width="18" height="7" rx="1.5" />
    <circle cx="7" cy="6.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="7" cy="17.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const IconBolt = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  </svg>
);

const IconPlug = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 2v5M15 2v5M7.5 7h9v4.5A4.5 4.5 0 0 1 12 16a4.5 4.5 0 0 1-4.5-4.5V7Z" />
    <path d="M12 16v3M9 22h6" />
  </svg>
);

const IconGlobe = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.6 2.6 4 5.8 4 9s-1.4 6.4-4 9c-2.6-2.6-4-5.8-4-9s1.4-6.4 4-9Z" />
  </svg>
);

const IconInfo = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5.5M12 7.5h.01" />
  </svg>
);

const IconDownload = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </svg>
);

const steps = [
  {
    title: "Purchase & Register",
    desc: "Purchase AURUM EA from the website. After payment, reply to the confirmation email with your Name, Subscribed Package, Trading Account Number, and Trading Platform (MT5). Once verified, you'll receive a second email containing your AURUM EA file."
  },
  {
    title: "Set Up Your Windows VPS",
    desc: "Purchase a Windows VPS (such as MyForexVPS or FXVM). You'll receive an IP Address, Username, and Password. Connect to the VPS using Windows App on Mac or Remote Desktop on Windows."
  },
  {
    title: "Install & Log In to MetaTrader 5",
    desc: "On the VPS, download and install your broker's MetaTrader 5 platform. Open MT5, select your broker, choose Connect with an Existing Account, then log in using your Trading Account Number, Master Password, and Server."
  },
  {
    title: "Install the AURUM EA File",
    desc: "Download the AURUM EA file (.ex5) from the email received after registration. Copy it to MetaTrader 5 via File \u2192 Open Data Folder \u2192 MQL5 \u2192 Experts folder.",
    code: "File \u2192 Open Data Folder \u2192 MQL5 \u2192 Experts"
  },
  {
    title: "Refresh & Attach the EA",
    desc: "In MetaTrader 5, open the Navigator panel. Right-click Expert Advisors and select Refresh. Then drag the AURUM EA onto your XAUUSD chart or right-click it and select Attach to Chart."
  },
  {
    title: "Start Trading",
    desc: "Confirm the EA is attached successfully. Keep your VPS running to ensure AURUM EA trades continuously, 24 hours a day, 7 days a week."
  }
];

const vpsBenefits = [
  { title: "Runs 24/7", desc: "No missed overnight Gold moves your VPS never sleeps.", Icon: IconServer },
  { title: "Low Latency", desc: "Faster execution than a home internet connection.", Icon: IconBolt },
  { title: "No Power Outage Risk", desc: "Independent of your local electricity or internet.", Icon: IconPlug },
  { title: "Access Anywhere", desc: "Reach your MetaTrader terminal from any device, anywhere.", Icon: IconGlobe }
];

const vpsProviders = [
  {
    name: "Beeks FX VPS",
    href: "https://beeksgroup.com/services/trading-infrastructure/virtual-private-servers-vps/",
    packageName: "Bronze",
    packageHref: "https://www.beeksfinancialcloud.com/catalogue/VPS-BRONZE_1/",
    price: "£32/mo",
    specs: ["1 vCPU", "2560MB RAM", "30GB disk", "London", "Windows Server 2022"]
  },
  {
    name: "ForexVPS.net",
    href: "https://www.forexvps.net",
    packageName: "Core",
    packageHref: "https://www.forexvps.net",
    price: "$40/mo",
    specs: ["2 cores", "4 GB RAM", "100 GB SSD", "London", "Windows Server 2022", "English"],
    note: "Daily backups optional"
  },
  {
    name: "MyForexVPS",
    href: "https://myforexvps.com",
    packageName: "Silver VPS",
    packageHref: "https://myforexvps.com/billing/cart.php?a=confproduct&i=1",
    price: "$14.99/mo",
    specs: ["2 cores", "2 GB RAM", "50 GB disk", "London", "Windows 2025"]
  },
  {
    name: "FXVM",
    href: "https://fxvm.net/forex-vps-trading",
    packageName: "Lite VPS",
    packageHref: "https://fxvm.net/forex-vps-trading#js-pricing-section",
    price: "$25/mo",
    specs: ["2 cores", "1536 MB RAM", "60 GB disk", "London", "Windows Server 2025"]
  }
];

const trustedBrokers = [
  {
    name: "AvaTrade",
    href: "https://www.avatrade.com/trading-account?p=MetaTrader5&tag=222605",
    logo: "/images/brokers/avatrade.png",
    logoWidth: 810,
    logoHeight: 115,
    square: false,
    blurb: "MetaTrader 5 · the conditions we run ourselves"
  },
  {
    name: "FXPro",
    href: "https://direct-fxpro.com/en/partner/11046364",
    logo: "/images/brokers/fxpro.png",
    logoWidth: 800,
    logoHeight: 800,
    square: true,
    blurb: "MetaTrader 5 · the conditions we run ourselves"
  }
];

export default function SetupGuidePage() {
  return (
    <main>
      <PageHero
        eyebrow="MT5 Setup Guide 6 Steps"
        title="Install AURUM EA on MT5 in 6 steps."
        lead="No coding. No complex configuration. From purchase to live automated Gold trading on MetaTrader 5 follow these 6 steps."
        badge="6 steps · No coding required · MetaTrader 5"
      />

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <p className="eyebrow">6-Step MT5 Installation Guide</p>
            <p>
              These 6 steps cover the complete AURUM EA installation on MetaTrader 5 from purchase
              through to live automated Gold trading on XAUUSD.
            </p>
          </div>

          <div className="setup-steps-alt">
            {/* Group 1: First 3 steps */}
            <div className="setup-step-row reveal">
              <div className="setup-step-row__content-group">
                {steps.slice(0, 3).map((s, i) => (
                  <div className="setup-step" key={s.title}>
                    <div className="setup-step__num">{i + 1}</div>
                    <div className="setup-step__body">
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                      {s.code && <code className="setup-step__code">{s.code}</code>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="setup-step-row__media">
                  <SetupVideoDisplay
                    label="WATCH TUTORIAL: STEPS 1 - 3 (REGISTRATION & VPS)"
                    src="https://buy.aurum-goldea.com/videos/tutorials/tutorial-1.mp4"
                    poster="/images/setup-part-1.png"
                  isIframe={false}
                />
              </div>
            </div>

            {/* Group 2: Next 3 steps */}
            <div className="setup-step-row is-reversed reveal">
              <div className="setup-step-row__content-group">
                {steps.slice(3, 6).map((s, i) => (
                  <div className="setup-step" key={s.title}>
                    <div className="setup-step__num">{i + 4}</div>
                    <div className="setup-step__body">
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                      {s.code && <code className="setup-step__code">{s.code}</code>}
                    </div>
                  </div>
                ))}
              </div>
                  <div className="setup-step-row__media">
                    <SetupVideoDisplay
                      label="WATCH TUTORIAL: STEPS 4 - 6 (MT5 & EA INSTALLATION)"
                      src="https://buy.aurum-goldea.com/videos/tutorials/tutorial-2.mp4"
                      poster="/images/setup-part-2.png"
                      isIframe={false}
                    />
                  </div>
            </div>
          </div>
        </div>
      </section>

      <section id="vps" className="section section--grey vps-section">
        <div className="container">
          <div className="vps-grid">
            <div className="vps-left reveal">
              <div className="vps-left__text">
                <p className="eyebrow">Always On</p>
                <h2>Why serious traders use a VPS.</h2>
                <p className="vps-body">
                  AURUM needs MetaTrader to be running to trade. If your computer turns off, loses
                  internet, or goes to sleep AURUM stops. Gold moves at 3am. Gold moves over
                  weekends. Gold does not care about your power schedule.
                </p>
                <p className="vps-body">
                  A VPS (Virtual Private Server) is a cloud computer that runs 24/7 with zero downtime.
                  You connect to it remotely, install MetaTrader on it, and AURUM runs continuously 
                  whether your own machine is on or not.
                </p>
                <p className="vps-body">
                  Monthly cost is typically under $20. For an EA trading Gold at institutional grade,
                  this is non-negotiable for serious traders.
                </p>
              </div>

              <div className="vps-left__spacer">
                <div className="vps-benefits">
                  {vpsBenefits.map(({ title, desc, Icon }) => (
                    <div className="vps-benefit-card" key={title}>
                      <div className="vps-benefit-card__icon">
                        <Icon />
                      </div>
                      <h3>{title}</h3>
                      <p>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="reveal">
              <div className="vps-providers">
                <div className="vps-providers__title">
                  <IconServer className="vps-providers__title-icon" />
                  Recommended VPS Providers
                </div>
                <div className="vps-providers__list">
                  {vpsProviders.map((p) => (
                    <a
                      className="vps-provider"
                      key={p.name}
                      href={p.packageHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.name} ${p.packageName}, ${p.price}`}
                    >
                      <div className="vps-provider__top">
                        <div className="vps-provider__info">
                          <span className="vps-provider__name">{p.name}</span>
                          <span className="vps-provider__package">{p.packageName}</span>
                        </div>
                        <span className="vps-provider__price">{p.price}</span>
                      </div>
                      <ul className="vps-provider__specs">
                        {p.specs.map((spec) => (
                          <li key={spec}>{spec}</li>
                        ))}
                      </ul>
                      {p.note && <p className="vps-provider__extra">{p.note}</p>}
                    </a>
                  ))}
                </div>
                {/* <div className="vps-providers__note">
                  <IconInfo className="vps-providers__note-icon" />
                  <p>
                    Diamond plan holders receive step-by-step VPS setup guidance from our team
                    during onboarding. We'll help you connect, install MetaTrader, and move AURUM
                    across to your VPS.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="risk" className="section risk-section">
        <div className="container">
          <div className="brokers-panel reveal">
            <div className="brokers-panel__intro">
              <p className="eyebrow">Brokers we use</p>
              <h2>AURUM works with any MT5 broker. These are the two we trust.</h2>
              <p>
                AURUM is not locked to one platform. If your broker supports MetaTrader 5
                and Expert Advisors, it will run. Gold conditions still differ from broker
                to broker — spread, slippage, and how XAUUSD behaves during news. We hold
                our own live accounts with AvaTrade and FXPro. Those are the conditions we
                know, so they are the two we recommend when someone is still choosing.
              </p>
            </div>

            <div className="brokers-grid">
              {trustedBrokers.map((broker) => (
                <article className="broker-card" key={broker.name}>
                  <div className={`broker-card__logo${broker.square ? " is-square" : ""}`}>
                    <Image
                      src={broker.logo}
                      alt={`${broker.name} logo`}
                      width={broker.logoWidth}
                      height={broker.logoHeight}
                    />
                  </div>
                  <h3>{broker.name}</h3>
                  <p>{broker.blurb}</p>
                  <a
                    href={broker.href}
                    className="btn btn--ghost"
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                  >
                    Visit {broker.name}
                  </a>
                </article>
              ))}
            </div>

            <p className="brokers-panel__note">
              Already with another broker? Stay there — AURUM will run the same way.
              If you open an account through these links, we may receive a referral.
              It does not change what you pay.
            </p>
          </div>

          <div className="risk-cta reveal">
            <div className="risk-cta__left">
              <div className="risk-cta__icon">
                <IconDownload />
              </div>
              <div>
                <h4>Want to learn more?</h4>
                <p>Download our Risk Settings guide and learn how to choose the right settings for your account.</p>
              </div>
            </div>
            <div className="risk-cta__right">
              <a
                href="/downloads/aurum-risk-settings-guide.pdf"
                className="btn btn--gold btn--lg"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                Download the Risk Settings PDF
              </a>
              {/* <span className="risk-cta__note">100% Free · No sign-up required</span> */}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight cta-block">
        <div className="container cta-block__inner reveal">
          <p className="eyebrow">MT5 Installation</p>
          <h2>6 steps. Then it runs itself.</h2>
          <p>For any queries or setup assistance, reach out to us here our team responds quickly with a straight answer.</p>
          <div className="cta-block__actions">
            <Link href="/pricing" className="btn btn--gold">Start Automating Now</Link>
            <Link href="/faq" className="btn btn--ghost">Browse the FAQ</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
