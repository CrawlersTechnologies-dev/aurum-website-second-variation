import ResultsPage from "../../pages_old/ResultsPage";

export const metadata = {
  title: "Verified Results | AURUM GOLD EA MyFXBook Performance",
  description:
    "See AURUM GOLD EA live MyFXBook results: +107.67% verified gain, $530k+ profit, 5.48% monthly return, and advanced monthly analytics.",
  openGraph: {
    title: "AURUM GOLD EA Verified MyFXBook Results",
    description:
      "Independent MyFXBook tracking for AURUM GOLD EA — growth, profit, advanced stats, and monthly gains from the live Tradewize account.",
    url: "https://aurum-goldea.com/results",
    type: "website",
    images: [
      {
        url: "/images/myfxbook-growth-chart.png",
        width: 1604,
        height: 800,
        alt: "MyFXBook growth chart for AURUM GOLD EA showing over 100% equity growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AURUM GOLD EA Verified MyFXBook Results",
    description:
      "Live MyFXBook results for AURUM GOLD EA: +107.67% gain, $530k+ profit, and transparent monthly performance.",
    images: ["/images/myfxbook-growth-chart.png"],
  },
};

export default function Page() {
  return <ResultsPage />;
}
