export const faqCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    items: [
      {
        q: "What exactly is AURUM GOLD EA?",
        a: "AURUM GOLD EA is an Expert Advisor a piece of software that plugs directly into MetaTrader 4 or MetaTrader 5 and trades on your behalf, automatically. It uses an ATR-based (Average True Range) intelligent grid strategy, primarily optimised for Gold (XAUUSD). Once installed and configured, it analyses the market, opens positions, manages risk, and closes trades without you needing to watch a chart or make decisions. It runs 24 hours a day, 7 days a week — including while you sleep."
      },
      {
        q: "Do I need any trading experience to use AURUM?",
        a: "Basic familiarity with MetaTrader helps knowing how to attach an EA to a chart, what lot sizes mean, and how to read your account balance. You don't need to understand the algorithm or be an advanced trader. Our step-by-step installation guide walks you through everything, and the Diamond and Institutional plans include a live setup call where our team configures it alongside you. If you've been trading manually for any period of time, you'll find AURUM straightforward."
      },
      {
        q: "Do I need to know how to code?",
        a: "No coding required, at any level. Installation is as simple as placing a file in a folder and attaching it to a chart in MetaTrader. If you can install an app on your phone, you can install AURUM. The entire process takes under 15 minutes for most traders."
      },
      {
        q: "Which plan should I start with?",
        a: "If you're new to automated trading or have a single live account, start with Silver. If you have multiple accounts, want to trade more than one symbol, or want the full live setup call and priority support, Diamond is the most popular choice for a reason. Not sure? Contact us before buying — we'll tell you honestly which plan fits your situation."
      },
      {
        q: "How quickly can I get AURUM running after purchase?",
        a: "EA file and licence are delivered instantly after payment. With our installation guide, most traders are live within 15–30 minutes of receiving their files. Diamond customers can schedule a live call with the team, which typically takes under an hour including full configuration and risk parameter setup."
      }
    ]
  },
  {
    id: "strategy",
    title: "The Strategy",
    items: [
      {
        q: "What is ATR-based grid trading and why does it matter?",
        a: "ATR stands for Average True Range — a measure of how much a market moves within a given period. Most grid EAs use fixed spacing between their grid levels, which means they behave the same in a slow, quiet session as they do during a volatile news event. That's how accounts get blown. AURUM reads ATR in real time and adjusts grid spacing accordingly — tighter when the market is calm, wider when Gold is moving aggressively. This is not a cosmetic feature. It's the architectural difference between an EA that survives and one that doesn't."
      },
      {
        q: "Is AURUM a martingale or grid system?",
        a: "AURUM uses an intelligent grid strategy — but it is not a pure martingale. Pure martingale doubles position size after every loss, which creates exponential risk and is widely considered dangerous. AURUM's grid spacing is driven by ATR, position sizes are controlled by preset risk parameters, and every trade has stop loss logic built in. The grid component means multiple positions can be open simultaneously across different price levels — but within the risk envelope you define, not outside it."
      },
      {
        q: "Why is AURUM primarily built for Gold (XAUUSD)?",
        a: "Gold is one of the most liquid, most volatile, and most technically consistent markets in the world. Its ATR characteristics make it particularly well-suited to grid strategies — it moves in meaningful ranges, trends clearly over time, and responds predictably to volatility expansion and contraction. The settings files included with AURUM are optimised for XAUUSD specifically — though the EA supports other pairs and indices too, Gold is where it was built to perform."
      },
      {
        q: "What other instruments can AURUM trade?",
        a: "Silver covers Gold (XAUUSD) and EUR/USD. Diamond adds additional currency pairs, Silver (XAGUSD), and other supported CFDs, unlocking multi-symbol trading. Settings files are provided for each supported instrument — these are pre-optimised parameters tailored to each market's behaviour, so you're not starting from scratch on configuration."
      },
      {
        q: "Does AURUM use news filters or stop trading during events?",
        a: "The ATR-based grid inherently responds to volatility expansion caused by news — wider spacing means less exposure during sharp moves. You have full control over how you want to trade — if you prefer to avoid trading during high-impact news, you can adjust the settings or simply pause the EA during those periods."
      }
    ]
  },
  {
    id: "technical",
    title: "Technical & Setup",
    items: [
      {
        q: "Does AURUM need to run on my personal computer 24/7?",
        a: "AURUM needs a live MetaTrader instance to trade. If your computer turns off, goes to sleep, or loses internet, AURUM stops. For this reason, we strongly recommend a VPS — a Virtual Private Server that stays online around the clock regardless of your local machine. VPS setup guidance is included with your purchase. Monthly VPS costs are typically $10–$30 and we can recommend providers that are already optimised for MetaTrader."
      },
      {
        q: "Which version of MetaTrader do I need?",
        a: "AURUM runs on MetaTrader 5. Our team will confirm the right setup for your account during onboarding, and if you're unsure whether your broker offers MT5, check your broker's platform download page or ask their support."
      },
      {
        q: "How do I install AURUM on MetaTrader?",
        a: "A full step-by-step guide is included with every purchase. The short version: download your EA file, place it in MetaTrader's Experts folder, restart MetaTrader, find AURUM in your Navigator panel, and drag it onto your XAUUSD chart. Enable automated trading in MetaTrader settings, then set your risk parameters from the provided settings file. The whole process takes under 15 minutes."
      },
      {
        q: "Can I run AURUM on multiple charts simultaneously?",
        a: "Yes — your account licence allows you to run AURUM on that account across multiple charts and instruments simultaneously. Diamond licences allow you to run it across multiple live accounts. Running multiple instances across different pairs is a valid diversification strategy, and we provide the settings files to do this properly."
      },
      {
        q: "What are the minimum system requirements?",
        a: "Any Windows PC or VPS capable of running MetaTrader 5. MetaTrader runs on Windows; if you use Mac, you'll need either a VPS or a Windows emulator. Minimum specs: Windows 7 or later, 2GB RAM, stable internet connection. For VPS, a basic 1-core, 1GB RAM VPS is sufficient."
      }
    ]
  },
  {
    id: "technical-doubts",
    title: "Technical Doubts",
    items: [
      {
        q: "Why is changing the Magic Number important when loading a new set file?",
        a: [
          "The Magic Number is a unique identifier that allows AURUM GOLD EA to recognize and manage its own trades.",
          "If you already have open trades on your account and load a previously saved set file without changing the Magic Number, the EA may mistakenly identify and manage existing trades, leading to unexpected behavior.",
          "Before loading a new set file: check whether there are any existing open trades, assign a unique Magic Number to the new chart, and ensure that each EA instance running on your account has a different Magic Number."
        ]
      },
      {
        q: "How can I identify the reason behind an error in MT5?",
        a: [
          "If you encounter an issue while using AURUM GOLD EA, the first place to check is the Journal tab in the MT5 terminal.",
          "The Journal displays detailed error messages that can help identify the root cause of the problem, such as technical errors, broker-related issues, internet or VPS connectivity problems, and trading permission or account-related issues.",
          "Reviewing the Journal before contacting support helps identify the issue more quickly and enables faster troubleshooting."
        ]
      },
      {
        q: "Why did AURUM GOLD EA stop trading on my VPS?",
        a: [
          "A common reason is that the MT5 terminal was accidentally closed. When using a VPS, the MT5 platform must remain running at all times for the EA to function continuously.",
          "Do not close or exit the MT5 terminal. Simply minimize the platform if you are finished using it. Closing MT5 will stop AURUM GOLD EA from monitoring the market and executing trades."
        ]
      },
      {
        q: "Which input parameters or strategy should I use? Can your team provide Buy/Sell signals?",
        a: [
          "The optimal input parameters depend on several factors, including your account balance, your risk appetite, and your trading objectives. There is no single parameter set that guarantees profits for every account.",
          "AURUM GOLD EA does not provide Buy or Sell signals. Our technical team does not recommend specific trading directions. Profit screenshots shared within the community are for informational purposes only and should not be considered trading advice.",
          "Successful trading requires appropriate risk management and a proper understanding of the EA's settings."
        ]
      },
      {
        q: "How can I confirm that I am logged into my MT5 trading account?",
        a: [
          "If your charts are not loading correctly or you suspect you are not logged in, you can verify your account status easily.",
          "Open the Trade tab at the bottom of the MT5 terminal and check whether your account balance is displayed. If your balance is visible, your trading account is successfully logged in. If no balance appears, you may need to log in again before using AURUM GOLD EA."
        ]
      },
      {
        q: "Why isn't AURUM GOLD EA taking trades after I attach it to a chart?",
        a: [
          "Some brokers provide dummy or inactive charts that cannot execute live trades. If AURUM GOLD EA is attached to one of these charts, it will not place any trades.",
          "Before completing the setup, ensure you have selected a real, tradable chart. If you're unsure, place a small manual trade to verify that the chart is active. If the manual trade executes successfully, you can safely attach AURUM GOLD EA to that chart.",
          "Using a valid trading chart ensures the EA can monitor the market and execute trades as intended."
        ]
      },
      {
        q: "How can I stop AURUM GOLD EA on only one chart without affecting the others?",
        a: [
          "If you are running AURUM GOLD EA on multiple charts and want to stop it on only one specific chart, you can disable algorithmic trading for that chart without affecting the EA on the remaining charts.",
          "Select the chart on which you want to stop the EA. Right-click on the chart and open the Expert Advisor Properties (or press F7). Go to the Common tab, disable Allow Algo Trading (or Allow Algorithmic Trading, depending on your MT5 version), and click OK to save the changes.",
          "The EA will stop operating only on the selected chart, while it will continue running normally on all other charts where algorithmic trading remains enabled."
        ]
      },
      {
        q: "Why is the Algo Trading button important, and how do I check if it is enabled?",
        a: [
          "For AURUM GOLD EA to execute trades, the Algo Trading button in the MT5 terminal must be turned ON. If this button is disabled, the EA will remain attached to the chart but will not place or manage any trades.",
          "Open the chart where AURUM GOLD EA is attached, look at the top toolbar of the MT5 terminal, and verify that the Algo Trading button is enabled (ON). If it is turned off, click it once to enable it.",
          "Always ensure the Algo Trading button is enabled whenever the EA is not taking trades. This is one of the first checks you should perform before troubleshooting any other issues."
        ]
      },
      {
        q: "Where can I find the AURUM GOLD EA (.EX5/.EX4) file, and how do I add it to MT5?",
        a: [
          "After purchasing AURUM GOLD EA, the EA file is sent to your registered email address. You can download it anytime from your email.",
          "Download the AURUM GOLD EA file from your email. Open your VPS or MT5 terminal, click File → Open Data Folder, open the MQL5 (or MQL4, depending on your platform) folder, then open the Experts folder and paste the downloaded EA file into this folder.",
          "Return to the MT5 terminal. In the Navigator panel, right-click on Expert Advisors and click Refresh. You will now see AURUM GOLD EA listed under Expert Advisors. Drag and drop the EA onto your desired chart to complete the setup.",
          "If the EA does not appear after refreshing, verify that the file has been copied into the correct Experts folder and restart the MT5 terminal if necessary."
        ]
      },
      {
        q: "What are the Upper Limit and Lower Limit parameters in AURUM GOLD EA?",
        a: [
          "The Upper Limit and Lower Limit parameters define the price range within which AURUM GOLD EA is allowed to open new grid orders.",
          "Since AURUM GOLD EA operates using a grid trading strategy, these limits help control where the EA can initiate additional positions. If the market price moves above the Upper Limit, the EA will stop placing new grid orders. If the market price moves below the Lower Limit, the EA will also stop placing new grid orders.",
          "However, any trades that are already open will continue to be managed by the EA according to its trading logic. This means the EA will still monitor and manage existing positions, but it will not open any new grid trades outside the specified price range.",
          "These parameters provide an additional layer of control over where the EA is permitted to expand its grid while ensuring that existing positions continue to be managed automatically."
        ]
      },
      {
        q: "What does the Stop Loss parameter do in AURUM GOLD EA?",
        a: [
          "The Stop Loss parameter allows you to define the maximum loss you are willing to accept for a running set of trades.",
          "When you set a predefined Stop Loss value, AURUM GOLD EA continuously monitors the combined drawdown of the active positions. If the drawdown reaches the specified Stop Loss limit, the EA will close (square off) all open positions associated with that trading cycle.",
          "This feature helps limit potential losses by automatically exiting all active trades once the predefined risk threshold is reached."
        ]
      },
      {
        q: "What does the \"Enable First Buy/Sell Trade as Pending Order\" parameter do?",
        a: [
          "The Enable First Buy/Sell Trade as Pending Order parameter determines how AURUM GOLD EA places the first trade of a trading cycle.",
          "If set to True: The EA will not place the first trade as a market order. Instead, it will place a pending order at the price level you have configured. The EA will wait until the market reaches that price. Once the pending order is triggered, the EA will continue executing the remaining grid trades according to its trading logic.",
          "If set to False: The EA will place the first trade immediately as a market order, provided all other trading conditions are met."
        ]
      },
      {
        q: "How do the ATR Timeframe settings for Grid Distance and Take Profit Distance work?",
        a: [
          "The ATR Timeframe determines the timeframe AURUM GOLD EA uses to calculate the Average True Range (ATR) for setting the Grid Distance and Take Profit Distance.",
          "If you select M15, the EA calculates the ATR based on the 15-minute timeframe. If you select H1 (1 Hour), the EA calculates the ATR using the 1-hour timeframe. The calculated ATR value is then used to determine the spacing between grid orders and the take-profit distance.",
          "In general, lower ATR timeframes (such as M5 or M15) use smaller market movements, resulting in closer grid spacing and quicker trade entries and exits. Higher ATR timeframes (such as H1 or H4) use larger average market movements, resulting in wider grid spacing and take-profit levels, which generally means trades take longer to complete.",
          "There is no single \"best\" ATR timeframe. The ideal setting depends on your trading style, market conditions, and risk preference."
        ]
      }
    ]
  },
  {
    id: "brokers",
    title: "Brokers & Accounts",
    items: [
      {
        q: "Does AURUM work with my broker?",
        a: "AURUM works with any broker that supports MetaTrader 5 with automated trading enabled. That covers the vast majority of retail forex brokers globally. The only brokers it won't work with are those that don't support MT5, or those that explicitly block Expert Advisors. If you're unsure, check your broker's terms or ask their support whether EAs are permitted — our team can also advise if you share your broker name."
      },
      {
        q: "What type of broker do you recommend?",
        a: "ECN (Electronic Communications Network) brokers with tight spreads on XAUUSD are the best fit. AURUM opens multiple positions as part of its grid — spread costs compound across these positions, so lower spreads directly improve performance. AURUM works with any MetaTrader 5 broker that allows Expert Advisors. When someone is still choosing, the two we personally use and recommend are AvaTrade and FXPro — those are the accounts we run ourselves. You'll find both in the Setup Guide Configuration section. You should still do your own due diligence."
      },
      {
        q: "What is the minimum account size recommended?",
        a: "Running a grid strategy on an account that is too small can create disproportionate risk. The EA needs sufficient room for positions to remain open across multiple levels before they collectively close. During onboarding, we’ll provide specific guidance based on your account size, and our recommended risk settings for different account sizes are available in the Setup Guide."
      },
      {
        q: "Can AURUM be used on prop firm accounts?",
        a: "Yes — the Diamond plan includes configuration support for prop firm accounts. Prop firms typically have daily drawdown limits, maximum position size restrictions, and rules around holding trades over the weekend. We help you configure AURUM's parameters to stay within those rules on a case-by-case basis."
      },
      // {
      //   q: "Can I use a demo account first before going live?",
      //   a: "Yes, and we encourage it. Once you have your licence, you can run AURUM on a demo account with realistic conditions to familiarise yourself with its behaviour, observe the grid structure, and test your risk parameters. Be aware that demo and live execution can differ — spreads on demo accounts are sometimes artificially tighter, and slippage is lower than in live conditions. Use demo as orientation, not as a final performance benchmark."
      // }
    ]
  },
  {
    id: "risk",
    title: "Risk & Performance",
    items: [
      {
        q: "Can AURUM guarantee returns?",
        a: "No — and any EA that claims otherwise is lying to you. AURUM is a disciplined, rule-based system that removes emotional decision-making from your trading. Like any strategy, it will have losing periods, drawdown phases, and months that underperform expectations. What it prevents is the self-sabotage that turns a small loss into a blown account. Past performance does not guarantee future results. Trading involves risk of loss."
      },
      {
        q: "What is the maximum drawdown I should expect?",
        a: "Drawdown is highly dependent on your risk settings, account size, and market conditions. AURUM's built-in risk controls cap exposure — but grid strategies by nature can hold multiple open positions during trending markets, which creates floating drawdown. We recommend treating any drawdown above 20% as a signal to review your settings. During onboarding, our team provides recommended risk parameters based on your account size and risk tolerance."
      },
      {
        q: "How does AURUM compare to cheap EAs on MQL5?",
        a: "Most marketplace EAs are backtested on cherry-picked historical data, over-optimised to look good on paper, and abandoned when they stop working in live conditions. AURUM is backed by a team with real institutional experience across banking, quantitative analysis, and hedge fund management, and it is actively traded by its developers on live accounts. It's supported by a KHDA-approved trading academy with 800+ mentored traders."
      },
      {
        q: "Can I see verified trading results before buying?",
        a: "Yes — our Results page shows trading performance data from live AURUM accounts, including community results from our 280+ active users. No trading system performs identically across all accounts due to differences in broker, account size, risk settings, and market timing — so treat published results as directional indicators, not guarantees of what you'll personally experience."
      }
    ]
  },
  {
    id: "payment",
    title: "Payment & Pricing",
    items: [
      {
        q: "Is this really a one-time payment?",
        a: "Yes. You pay once and AURUM is yours to use — no monthly fees, no annual renewals, no hidden charges."
      },
      {
        q: "Which plan should I choose?",
        a: "If you mainly trade Gold (XAUUSD), the Silver Plan is a great place to start. If you want to trade multiple markets like Forex, Gold, Silver, and Indices, we recommend our Diamond Plan — our most popular plan."
      },
      {
        q: "How quickly can I get AURUM running after purchase?",
        a: "You'll receive the AURUM files on the same day or by the next business day. Most users are ready to start trading within 1–2 days, and our team is here to help with setup."
      },
      {
        q: "Can I upgrade my plan later?",
        a: "Yes — contact our support team and we'll calculate the difference. You only pay the gap between your current plan and the new one."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept major cards and bank transfer. Reach out to our team via the contact page and we'll share the payment options available for your region."
      }
    ]
  },
  {
    id: "support",
    title: "Support & Updates",
    items: [
      {
        q: "What support do I get after purchase?",
        a: "Silver includes email support. Diamond includes priority support plus a live setup call with the team. All support covers technical questions, settings configuration guidance, and general AURUM operation. What it doesn't cover is generic trading advice unrelated to AURUM."
      },
      {
        q: "How do I receive updates to AURUM?",
        a: "Updates are delivered via email to your purchase address. When a new version is released, you'll receive the updated EA file and a changelog explaining what changed and whether you need to reconfigure anything. Installation of updates follows the same simple process as initial installation."
      },
      {
        q: "Can I transfer my licence to a different account or computer?",
        a: "Licences are tied to MetaTrader account numbers. If you change your trading account, switch brokers, or move to a new VPS, contact our support team and we'll transfer your licence — we don't charge for licence transfers resulting from legitimate changes."
      },
      {
        q: "What is the refund or satisfaction policy?",
        a: "All plans include a 7-day satisfaction guarantee. If within 7 days of purchase you believe AURUM is materially different from what was described, contact us and we'll make it right. The guarantee does not cover performance outcomes, since trading results depend on market conditions and personal risk settings."
      }
    ]
  }
];
