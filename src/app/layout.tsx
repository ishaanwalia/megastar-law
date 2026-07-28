import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import "./globals.css";

// Below-the-fold/overlay UI, not needed for first paint — load off the
// critical hydration path so it can't compete with the hero for LCP.
const FloatingWidgets = dynamic(() =>
  import("@/components/floating-widgets").then((m) => m.FloatingWidgets)
);

const CommandPalette = dynamic(() =>
  import("@/components/command-palette").then((m) => m.CommandPalette)
);

// Site-wide: it reads the page's own <h2>s and renders nothing when a page
// has fewer than three, so it needs no per-page wiring.
const ReadingRail = dynamic(() =>
  import("@/components/reading-rail").then((m) => m.ReadingRail)
);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const description =
  "Megastar Law Associates — Pradeep Sankhian & Nikhil Choudhary, Advocates. Criminal, civil, family, corporate & banking, arbitration and labour law practice in Chandigarh, with a 24/7 legal helpline.";

export const metadata: Metadata = {
  metadataBase: new URL("https://megastarlawassociates.com"),
  title: {
    default: "Megastar Law Associates | Advocates, Chandigarh",
    template: "%s | Megastar Law Associates",
  },
  description,
  keywords: [
    "advocate Chandigarh",
    "law firm Chandigarh",
    "criminal lawyer Chandigarh",
    "498A lawyer NRI",
    "cheque bounce lawyer Chandigarh",
    "RERA lawyer Punjab Haryana",
    "Punjab Haryana High Court advocate",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://megastarlawassociates.com",
    siteName: "Megastar Law Associates",
    title: "Megastar Law Associates | Advocates, Chandigarh",
    description,
  },
  twitter: {
    card: "summary",
    title: "Megastar Law Associates | Advocates, Chandigarh",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
    >
      {/* No height:100% on html/body — on iOS that pairing can hand scrolling
          to a nested context and the sticky header stops pinning. min-h-svh
          on the body alone gives the same full-height footer behaviour. */}
      <body className="flex min-h-svh flex-col">
        <JsonLd />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <ReadingRail />
        <SiteFooter />
        <FloatingWidgets />
        <CommandPalette />
        <Analytics />
      </body>
    </html>
  );
}
