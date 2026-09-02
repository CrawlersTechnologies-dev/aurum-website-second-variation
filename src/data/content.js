export const navLinks = [
  { label: "How It Works", href: "/#how-it-works", icon: "flow" },
  { label: "About", href: "/about", icon: "shield" },
  { label: "Pricing", href: "/pricing", icon: "tag" },
  { label: "Result", href: "/results", icon: "chart" },
  { label: "Setup Guide", href: "/setup-guide", icon: "clock" },
  { label: "FAQ", href: "/faq", icon: "help" },
  { label: "Contact Us", href: "/contact", icon: "link" },
];

// Hero carousel — image-based slides. Swap the `image` path for real assets
// (drop files into client/public/images/ and update the path below).
export const MYFXBOOK_REPORT_URL =
  "https://www.myfxbook.com/members/MONEYTIZE/aurum-gold-ea-tradewize/12125057";

export const heroCarouselSlides = [
  {
    image: "/images/myfxbook-stats-profit-overview.png",
    title: "Verified on MyFXBook",
    thumbLabel: "Overview",
    alt: "MyFXBook verified AURUM Gold EA Tradewize stats showing +107.67% gain and $530,678 profit on a live account",
    titleAttr: "AURUM EA MyFXBook verified performance gain, profit, and equity overview",
    description: "Every trade AURUM places is logged and independently verified no cherry-picked screenshots, just the real track record.",
    cta: { label: "View Verified Report", href: "/results" }
  },
  {
    image: "/images/myfxbook-growth-chart.png",
    title: "100%+ Live Growth",
    thumbLabel: "Growth",
    alt: "MyFXBook growth chart for AURUM Gold EA showing over 100% equity growth from May 2025 to June 2026",
    titleAttr: "AURUM EA MyFXBook growth and equity curve",
    description: "Closed-trade growth climbing past 100% over 13+ months of live tracking equity stays close to the curve.",
    cta: { label: "See Full Results", href: "/results" }
  },
  {
    image: "/images/myfxbook-profit-chart.png",
    title: "$530k+ Verified Profit",
    thumbLabel: "Profit",
    alt: "MyFXBook profit chart for AURUM Gold EA showing cumulative profit rising to over $530,000",
    titleAttr: "AURUM EA MyFXBook cumulative profit chart",
    description: "Live account profit tracked from a $500,000 deposit broker-synced on MyFXBook, not a backtest curve.",
    cta: { label: "Open Live Report", href: "/results" }
  }
];

// Homepage "Who This Is For" + "The Actual Problem" content block.
export const whoThisIsFor = {
  eyebrow: "Who This Is For",
  title: "Not a beginner's tool.",
  body: "AURUM is built for traders who already understand technical or fundamental analysis and have a defined risk approach. It automates execution, it does not teach trading from scratch. If you don't yet have a working understanding of market analysis and risk management, this isn't the right starting point."
};

export const actualProblem = {
  eyebrow: "Built on 3 Core Principles",
  title: "Built on 3 Core Principles",
  intro: "AURUM is designed to solve what manual trading can't. Helping you trade with discipline, precision, and confidence.",
  footer: "Three Principles. One Goal Consistent Growth.",
  points: [
    {
      title: "Emotional Control",
      desc: "Emotions are the #1 reason traders lose. AURUM removes fear, greed, and hesitation from the equation by executing trades based on rules, not feelings. Stay disciplined and consistent every single time.",
      closing: "Trade with logic. Not with emotions."
    },
    {
      title: "Save Time",
      desc: "Markets move 24/7. You can't watch charts all day. AURUM monitors the market, identifies high-probability opportunities, and executes trades for you so you can focus on what matters most.",
      closing: "More time for life. Less screen time."
    },
    {
      title: "Consistency",
      desc: "Success in trading comes from repetition and consistency. AURUM follows your strategy without deviation, helping you stay on track and build long-term, steady performance.",
      closing: "Same strategy. Same discipline. Every time."
    }
  ]
};

export const steps = [
  {
    n: "1",
    title: "Buy AURUM",
    body: "Choose a plan and pay once. We email you the EA file the same day."
  },
  {
    n: "2",
    title: "Install it in MetaTrader 5",
    body: "Open MT5, drop the file into your Experts folder, and refresh. The setup guide shows exactly where."
  },
  {
    n: "3",
    title: "Tell it your risk level",
    body: "Enter your account size and max risk per trade. You set this once AURUM follows it every time."
  },
  {
    n: "4",
    title: "Attach to Gold and go live",
    body: "Drag AURUM onto XAUUSD, turn AutoTrading on, and you’re done. It trades while you’re away."
  }
];

export const strategyTabs = [
  {
    id: "execution",
    label: "Execution Logic",
    points: [
      "Trades XAUUSD and major Forex pairs during optimal London and New York sessions.",
      "Uses volatility-adjusted entries the engine waits for confirmation, not guesses.",
      "Multiple confluence checks run before any order is placed, not just a single signal."
    ],
    chartData: [8, 14, 12, 20, 18, 27, 24, 33, 30, 41, 38, 48, 44, 56, 60, 72],
    stats: [
      { label: "Trades / Month", value: "42" },
      { label: "Max Drawdown", value: "6.2%" },
      { label: "Sharpe Ratio", value: "2.1" },
      { label: "Recovery Factor", value: "4.8" }
    ]
  },
  {
    id: "risk",
    label: "Risk Controls",
    points: [
      "Risk capped per trade. No martingale, no grid, no doubling down.",
      "Every position carries a hard stop-loss the moment it opens.",
      "Daily and weekly drawdown limits pause the engine automatically if breached."
    ],
    chartData: [10, 13, 12, 15, 14, 16, 15, 18, 17, 20, 19, 22, 21, 24, 23, 26],
    stats: [
      { label: "Max Drawdown", value: "3.1%" },
      { label: "Stop-loss Hit %", value: "8.4%" },
      { label: "Risk per Trade", value: "1.2%" },
      { label: "Recovery Factor", value: "6.2" }
    ]
  },
  {
    id: "sessions",
    label: "Session Coverage",
    points: [
      "Stops trading automatically during high-impact news events.",
      "Monitors London, New York, and Tokyo sessions for liquidity windows.",
      "Sits out low-liquidity, high-spread hours instead of forcing trades."
    ],
    chartData: [5, 10, 8, 18, 14, 28, 22, 38, 32, 46, 40, 54, 48, 62, 68, 78],
    stats: [
      { label: "Sessions Covered", value: "3" },
      { label: "News Filters", value: "Active" },
      { label: "Peak Hours", value: "London" },
      { label: "Avg Spread", value: "0.8 pts" }
    ]
  }
];

export const equityCurve = [8, 14, 12, 20, 18, 27, 24, 33, 30, 41, 38, 48, 44, 56, 60, 72];

export const performanceStats = [
  { label: "Trades / Month", value: "42" },
  { label: "Max Drawdown", value: "6.2%" },
  { label: "Sharpe Ratio", value: "2.1" },
  { label: "Recovery Factor", value: "4.8" }
];

// ATR Grid panel — "Strategy Behind AURUM"
export const atrGridFeatures = [
  { icon: "chart", label: "Volatile day", value: "wider grid" },
  { icon: "target", label: "Quiet day", value: "tighter grid" },
  { icon: "radar", label: "The system reads the market,", value: "not a static chart." }
];

// Bar heights (%) for the ATR Grid Simulation chart — alternating
// high/low volatility bars, tallest in the middle like the reference.
export const atrGridSimulation = [
  { height: 28, volatility: "low" },
  { height: 46, volatility: "high" },
  { height: 38, volatility: "low" },
  { height: 68, volatility: "high" },
  { height: 58, volatility: "low" },
  { height: 88, volatility: "high" },
  { height: 74, volatility: "low" },
  { height: 100, volatility: "high" },
  { height: 82, volatility: "low" },
  { height: 60, volatility: "high" },
  { height: 44, volatility: "low" },
  { height: 66, volatility: "high" },
  { height: 50, volatility: "low" },
  { height: 76, volatility: "high" },
  { height: 62, volatility: "low" },
  { height: 40, volatility: "high" }
];

// "Why Automation Is Mandatory" — human vs AURUM comparison table
export const humanVsAurum = [
  { human: "Sees signal", aurum: "Detects signal" },
  { human: "Thinks it over", aurum: "Executes in 1ms" },
  { human: "Hesitates", aurum: "SL locked" },
  { human: "Panics", aurum: "TP set" },
  { human: "Misses it, in pain", aurum: "Done. Next." }
];

// Tutorial video shown in "How AURUM makes you a Rule based trader."
// Drop your video file into client/public/videos/ and update `src` below
// (an .mp4 is the safest cross-browser format). `poster` is the thumbnail
// shown before playback — optional, drop an image into client/public/images/.
export const tutorialVideo = {
  src: "https://buy.aurum-goldea.com/videos/home.mp4",
  isIframe: false,
  poster: "",
  label: "2 Min Watch",
  title: "See AURUM in action"
};

export const trustCards = [
  {
    icon: "clock",
    title: "Runs 24/7",
    body: "Never sleeps. Never emotional. Never misses a setup because life got in the way."
  },
  {
    icon: "shield",
    title: "Verified Live",
    body: "Every performance number is tracked and published on MyFXBook. No screenshots, no hype."
  },
  {
    icon: "lock",
    title: "You Stay in Control",
    body: "Your funds stay in your broker account. AURUM only places trades it never touches withdrawals."
  }
];

export const pricingTiers = [
  {
    id: "starter",
    name: "Silver",
    price: "$1",
    audience: "Perfect for beginners",
    highlight: "For Single Direction Trading",
    featuresHeading: "Key Features:",
    supportNote: "30-day email support included",
    featureRows: [
      { included: true, label: "Trading Direction", value: "Choose Buy Only OR Sell Only" },
      { included: true, label: "Instruments", value: "EURUSD, GOLD" },
      { included: true, label: "Stop-Loss", value: "Standard unified protection" },
      { included: true, label: "Interface", value: "Basic dashboard" },
      { included: false, label: "Bi-directional trading" },
      { included: false, label: "Enhanced re-entry logic" },
      { included: false, label: "Advanced customization" }
    ],
    tagline: "For traders starting out with a single-direction, single-instrument setup.",
    period: "Buy Only or Sell Only · Gold + EUR/USD",
    features: ["AURUM EA · MT5", "Buy Only or Sell Only mode", "Gold + EUR/USD settings", "Installation guide", "Email support"],
    benefits: [
      "Lowest-friction way to test automated execution on a live account",
      "Same core ATR-grid engine used across every plan nothing watered down",
      "Upgrade to Gold or Diamond any time, you only pay the difference"
    ],
    strategy: "Runs AURUM's ATR-based grid strategy in a single trading direction (Buy Only or Sell Only) on Gold (XAUUSD) and EUR/USD  a focused setup for traders who want to prove the system out before scaling instruments.",
    details: [
      { label: "Instruments", value: "Gold (XAUUSD) + EUR/USD" },
      { label: "Trading direction", value: "Buy Only or Sell Only" },
      { label: "Platform", value: "MT5" },
      { label: "Support window", value: "Email support" }
    ],
    cta: "Choose Silver →",
    variant: "ghost"
  },
  {
    id: "enterprise",
    name: "Gold",
    price: "$2",
    audience: "For professional traders",
    highlight: "Best for Bi-directional Trading",
    featuresHeading: "Everything in Silver, Plus:",
    supportNote: "90-day priority support",
    featureRows: [
      { included: true, label: "Trading Direction", value: "Buy Only, Sell Only and Both Mode" },
      { included: true, label: "Trading Potential", value: "Increases with bi-directional trading" },
      { included: true, label: "Instruments", value: "EURUSD, GOLD, GBPUSD, AUDUSD, USDJPY" },
      { included: true, label: "Market Adaptability", value: "Performance in Trending Markets" },
      { included: true, label: "Risk Management", value: "Advanced protection" },
      { included: false, label: "Custom trading schedules" },
      { included: false, label: "Advanced customization options" }
    ],
    tagline: "Bi-directional trading across 5 pairs with enhanced re-entry logic.",
    period: "Bi-directional · 5 pairs · Enhanced re-entry",
    features: [
      "Everything in Silver",
      "Bi-directional trading",
      "5 currency pairs",
      "Enhanced re-entry logic",
      "Priority email support"
    ],
    benefits: [
      "Trade both directions at once designed for trending and ranging markets.",
      "Diversify across 5 pairs instead of being tied to a single instrument",
      "Faster response times with priority email support"
    ],
    strategy: "Runs AURUM's ATR-based grid strategy bi-directionally (Buy & Sell simultaneously) across 5 major currency pairs plus Gold, with enhanced re-entry logic that captures continuation moves emotional traders tend to close too early.",
    details: [
      { label: "Instruments", value: "5 currency pairs + Gold" },
      { label: "Trading direction", value: "Buy & Sell (bi-directional)" },
      { label: "Platform", value: "MT5" },
      { label: "Support window", value: "Priority email support" }
    ],
    cta: "Choose Gold →",
    variant: "ghost"
  },
  {
    id: "diamond",
    name: "Diamond",
    price: "$3",
    audience: "For professional traders",
    highlight: "Maximum Customization & Power",
    featuresHeading: "Everything in Gold, Plus:",
    supportNote: "Lifetime VIP support",
    popular: true,
    bestSeller: true,
    featured: true,
    featureRows: [
      { included: true, label: "Advanced Features", value: "Full system customization" },
      { included: true, label: "Trading Schedule", value: "Set custom trading hours" },
      { included: true, label: "Price Range", value: "Set specific trading zones" },
      { included: true, label: "Position Sizing", value: "Advanced risk control" },
      { included: true, label: "Instruments", value: "Unlimited Pairs", emphasize: true },
      { included: true, label: "Re-entry", value: "Visual tracking lines" },
      { included: true, label: "Support", value: "Lifetime VIP Support" }
    ],
    tagline: "Full customisation, unlimited pairs, and a lifetime of VIP support.",
    period: "Full customisation · Unlimited pairs · Lifetime VIP",
    features: [
      "Everything in Gold",
      "Full customisation",
      "Unlimited pairs",
      "Live setup call with the AURUM team",
      "Lifetime VIP support",
      "Lifetime free updates"
    ],
    benefits: [
      "One-on-one onboarding call your risk settings configured with you, not for you",
      "Every future AURUM update included for life, no re-purchase ever",
      "Priority queue on support VIP traders get answered first"
    ],
    strategy: "Runs the full bi-directional ATR-grid engine across unlimited instruments with no pair restrictions, plus advanced re-entry logic tuned per-instrument during your live setup call built for traders running AURUM across a full portfolio.",
    details: [
      { label: "Instruments", value: "Unlimited pairs" },
      { label: "Trading direction", value: "Buy & Sell (bi-directional)" },
      { label: "Platform", value: "MT5" },
      { label: "Support window", value: "Lifetime VIP support" }
    ],
    cta: "Choose Diamond →",
    variant: "gold"
  }
];

export const faqs = [
  {
    q: "Do I need to know how to code or trade?",
    a: "No. If you can install an app on your phone, you can run AURUM. Our team also offers free setup help we'll walk you through it personally."
  },
  {
    q: "How much money do I need to start?",
    a: "We recommend a minimum of $1,000 in your trading account. For the Diamond plan, $3,000+ gives the strategy proper room to operate. Risk settings are fully adjustable."
  },
  {
    q: "Will it work with my broker?",
    a: "AURUM works with any broker that supports MetaTrader 5 and allows automated trading. We recommend ECN brokers with tight spreads on Gold. Not sure? Message us."
  },
  {
    q: "Can AURUM guarantee I'll make money?",
    a: "No and anyone who guarantees returns is misleading you. AURUM is a disciplined system backed by a verified live track record. Trading involves risk. What AURUM removes is the emotional decision-making that costs most traders the most money."
  },
  {
    q:"Does my computer need to stay on 24/7?",
    a:"No. Most traders run AURUM on a VPS (Virtual Private Server) which keeps it running around the clock without your computer. We provide VPS setup guidance with Gold and Diamond plans."
  },
  {
    q:"What makes this different from cheap EAs on MQL5?",
    a:"Cheap EAs are built once and abandoned. AURUM is backed by a team with 20+ years of real market experience, actively traded by its creators, and supported by a KHDA-approved trading academy in Dubai. You're buying into a team, not a file."
  },
  {
    q: "What is the best Gold Expert Advisor for MT5 in 2026?",
    a: "AURUM EA uses an ATR-based intelligent grid strategy optimised specifically for XAUUSD. It has 1.5 years of live verified performance on MyFXBook, is actively traded by the team that built it, and is supported by a KHDA-approved trading institution in Dubai."
  }
];

export const footerColumns = [
  {
    heading: "Product",
    links: [
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Results", href: "/results" },
      { label: "Pricing", href: "/pricing#pricing" },
      { label: "Setup Guide", href: "/setup-guide" }
    ]
  },
  {
    heading: "Company",
    links: [
      { label: "About AURUM", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "Get AURUM", href: "/pricing#pricing" }
    ]
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms and Conditions", href: "/terms" },
      { label: "Refund Policy", href: "/refund" }
    ]
  }
];

export const socialLinks = [
  { label: "WhatsApp", href: "https://wa.me/971507741490", icon: "whatsapp" },
  { label: "Instagram", href: "https://www.instagram.com/aurumgoldea", icon: "instagram" },
  { label: "Telegram", href: "https://t.me/hextechalgo", icon: "telegram" },
  { label: "YouTube", href: "https://youtube.com/@moneytizellc", icon: "youtube" }
];

export const tickerSeed = [
  { pair: "XAUUSD", change: 2.34 },
  { pair: "EURUSD", change: 0.42 },
  { pair: "GBPJPY", change: -0.18 },
  { pair: "USDCAD", change: -0.11 },
  { pair: "NZDUSD", change: 0.51 },
  { pair: "EURGBP", change: 0.08 },
  { pair: "USDJPY", change: 0.29 }
];

export const fxbookSummary = [
  { value: "+107.67%", label: "Verified gain", positive: true },
  { value: "5.48%", label: "Average monthly return", positive: true },
  { value: "16.95%", label: "Max drawdown" },
  { value: "$530k+", label: "Verified profit" }
];

export const fxbookMonthlyImages = [
  {
    image: "/images/myfxbook-monthly-gain-2025.png",
    alt: "MyFXBook monthly gain chart for AURUM Gold EA in 2025 showing consistent returns from May to December",
    title: "2025 monthly gains",
    caption: "May–Dec 2025 monthly gain (change)"
  },
  {
    image: "/images/myfxbook-monthly-gain-2026.png",
    alt: "MyFXBook monthly gain chart for AURUM Gold EA in 2026 showing 3.75% to 5.91% monthly returns",
    title: "2026 monthly gains",
    caption: "Jan–Jun 2026 monthly gain (change)"
  }
];

export const featureChips = [
  "ATR-Based Grid Strategy",
  "Optimised for Gold (XAUUSD)",
  "Verified on MyFXBook",
  "MetaTrader 5 Compatible",
  "Runs 24/7",
  "Rule-Based Execution",
  "One-Time Payment · Lifetime Licence",
  "Funds Stay in Your Broker"
];

export const statsBar = [
  { id: "profit", label: "Results Achieved So Far", prefix: "$", base: 272812, incrementEvery: 30000, incrementBy: [40, 260] },
  { id: "traders", label: "Traders using AURUM right now", value: "X00+", icon: "trend" },
  { id: "years", label: "Years in the market", value: "X+", icon: "clock" },
  { id: "verified", label: "Verified By MyFXBook", cta: "View MyFXBook Report", icon: "shield" }
];

export const profitablePoints = [
  {
    title: "Reads real volatility not indicators",
    text: "ATR-based grid adapts to Gold's actual movement. Tight market = tight grid. Volatile market = wider spacing. Always in sync."
  },
  {
    title: "Enters faster than any human ever could",
    text: "Millisecond execution, 24 hours a day. It catches volatile market opens in the middle of the night while you're asleep. Every time. Even when it is 3 AM your time, AURUM is awake, capturing the moves you miss."
  },
  {
    title: "Protects capital before pursuing returns",
    text: "Stop loss is baked into every position. Not optional. Not movable in a panic. Hard-coded discipline."
  },
  {
    title: "Re-enters when the trend continues",
    text: "Smart re-entry captures the legs of moves emotional traders close too early. Let it run."
  }
];

export const aurumBenefits = [
  {
    title: "Rule-Based Execution",
    text: "Every trade is executed based on predefined rules not emotions."
  },
  {
    title: "24/7 Monitoring",
    text: "AURUM never misses an opportunity. Markets never sleep."
  },
  {
    title: "Built-in Risk Protection",
    text: "Capital protection is first. Growth follows with consistency."
  },
  {
    title: "Designed for Consistency",
    text: "Small, repeatable advantages build long-term results."
  }
];

export const profitableClosing = {
  lead: "AURUM removes emotions. It follows rules. So you don't have to.",
  body: "No guesswork. No emotional decisions. Just a system that works.",
  cta: "Trade with discipline. Trade with AURUM."
};

export const testimonials = [
  {
    name: "Gautam R.",
    joined: "Joined July 2025",
    profit: "+$1,200",
    rating: 5,
    text: "Set it up on a Friday evening and forgot about it. By the next month my account had grown without me touching a chart once."
  },
  {
    name: "Priya S.",
    joined: "Joined March 2025",
    profit: "+$3,480",
    rating: 5,
    text: "The MyFXBook link sold me ,I could see the real trade history before I ever funded an account. No hype, just numbers."
  },
  {
    name: "Daniel K.",
    joined: "Joined Nov 2025",
    profit: "+$960",
    rating: 4,
    text: "Drawdown stayed exactly where they said it would. Support answered every question I had during setup."
  },
  {
    name: "Meera V.",
    joined: "Joined Jan 2026",
    profit: "+$2,150",
    rating: 5,
    text: "I run it alongside my day job. It stops itself during big news events, which is exactly what I wanted."
  },
  {
    name: "Arjun P.",
    joined: "Joined Feb 2026",
    profit: "+$1,840",
    rating: 5,
    text: "I used to move my stop-loss the second a trade felt uncomfortable always the wrong call. AURUM won't budge on a rule once it's set, even on the trades I would have panicked out of. Fixed more of my P&L than any strategy tweak ever did."
  },
  {
    name: "Fatima H.",
    joined: "Joined Sep 2025",
    profit: "+$2,640",
    rating: 5,
    text: "I'm not staring at charts between meetings anymore. AURUM catches the setups while I'm at work, I check the dashboard at lunch and the trade's already done."
  },
  {
    name: "Wei L.",
    joined: "Joined May 2025",
    profit: "+$1,310",
    rating: 4,
    text: "What sold me was consistency, not the win rate. The same risk rule fires on every single trade, not just the days I felt disciplined enough to follow my own plan."
  },
  {
    name: "Sofia R.",
    joined: "Joined Dec 2025",
    profit: "+$3,920",
    rating: 5,
    text: "Six months in and the drawdown has stayed inside what they quoted me on day one. That kind of predictability is worth more to me than any single winning month."
  },
  {
    isCta: true,
    title: "Buy now start trading",
    buttonText: "Get Started",
    buttonLink: "/pricing#pricing"
  }
];

// Founder profile — swap `image` for a real photo (drop into client/public/images/
// and update the path below; recommended square image, 600x600 or larger).
export const founderProfile = {
  image: "/images/founder-nikhil-6.jfif",
  name: "Nikkhil Malhotra",
  role: "Co-Founder & CEO, AURUM EA",
  bio: [
    { type: "text", value: "With " },
    { type: "strong", value: "12+ years" },
    {
      type: "text",
      value:
        " in stocks, forex, and crypto, Nikhil founded the KHDA-approved Moneytize Trading Academy in Dubai. He has trained "
    },
    { type: "strong", value: "800+ traders" },
    {
      type: "text",
      value:
        " through structured education and real market experience. He built AURUM to help traders execute with discipline and follow a consistent, rule-based approach."
    }
  ]
};

export const founderAchievements = [
  "Founded KHDA-approved Moneytize Trading Academy",
  "Mentored 800+ traders through structured education",
  "Speaker at financial events & trading programs",
  "Built AURUM with MyFXBook-verified live performance"
];

export const founderOverlayStats = [
  { value: "800+", label: "Traders guided" },
  { value: "12+", label: "Years of experience" },
  { value: "KHDA", label: "Approved academy" }
];

export const founderStats = [
  { label: "Years in Markets", value: "12+" },
  { label: "Traders Mentored", value: "800+" },
  { label: "Personal Trades", value: "10k+" },
  { label: "Approved Institution", value: "KHDA" }
];

export const certifications = ["MyFXBook Verified", "MT5 Certified Vendor", "FX Risk Management Cert."];

export const onboardingEmailCta = {
  heading: "We'll set it up for you",
  body: "Our team will walk you through account setup no experience required."
};
