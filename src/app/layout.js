import "./globals.css";
import ClientLayout from "../components/ClientLayout";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://aurum-goldea.com"),
  title: "AURUM GOLD EA - Professional Gold Trading System | MyFXBook Verified",
  description:
    "AURUM GOLD EA automates disciplined XAUUSD execution. Verified on MyFXBook with +107.67% gain and $530k+ tracked profit. MetaTrader 5 compatible.",
  openGraph: {
    title: "AURUM GOLD EA - MyFXBook Verified Gold Trading System",
    description:
      "Live MyFXBook-verified AURUM GOLD EA performance: +107.67% gain, 5.48% monthly return, and transparent broker-synced results.",
    url: "https://aurum-goldea.com",
    siteName: "AURUM GOLD EA",
    type: "website",
    images: [
      {
        url: "/images/myfxbook-stats-profit-overview.png",
        width: 2184,
        height: 840,
        alt: "MyFXBook verified AURUM GOLD EA Tradewize stats showing +107.67% gain and $530,678 profit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AURUM GOLD EA - MyFXBook Verified Gold Trading System",
    description:
      "Live MyFXBook-verified AURUM GOLD EA performance: +107.67% gain and $530k+ tracked profit.",
    images: ["/images/myfxbook-stats-profit-overview.png"],
  },
  verification: {
    other: {
      "facebook-domain-verification": ["6jmss9h4bma99zovx6glkg1kgiq5q2"],
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1225268763097069');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1225268763097069&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <ClientLayout>{children}</ClientLayout>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
    </html>
  );
}
