import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteName = "Crypto Market Dashboard";
const siteDescription =
  "Track live cryptocurrency prices, market cap, and 24h changes. Real-time crypto market data powered by CoinGecko API. Monitor Bitcoin, Ethereum, and 100+ cryptocurrencies.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Crypto Market Dashboard | Live Cryptocurrency Prices & Market Data",
    template: "%s | Crypto Market Dashboard",
  },
  description: siteDescription,
  keywords: [
    "cryptocurrency",
    "crypto prices",
    "bitcoin",
    "ethereum",
    "crypto market",
    "live crypto prices",
    "cryptocurrency tracker",
    "crypto dashboard",
    "market cap",
    "crypto portfolio",
    "digital currency",
    "crypto coins",
    "cryptocurrency news",
    "blockchain",
    "crypto trading",
  ],
  authors: [{ name: "Crypto Market Dashboard" }],
  creator: "Crypto Market Dashboard",
  publisher: "Crypto Market Dashboard",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Crypto Market Dashboard | Live Cryptocurrency Prices",
    description: siteDescription,
    siteName: siteName,
    images: [
      {
        url: `${siteUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: "Crypto Market Dashboard - Live Cryptocurrency Prices",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crypto Market Dashboard | Live Cryptocurrency Prices",
    description: siteDescription,
    images: [`${siteUrl}/api/og`],
    creator: "@cryptomarket",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
    author: {
      "@type": "Organization",
      name: "Crypto Market Dashboard",
    },
    inLanguage: "en",
    keywords: "cryptocurrency, bitcoin, ethereum, crypto prices, market data",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
