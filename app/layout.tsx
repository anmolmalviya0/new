/**
 * Root Layout Component
 *
 * Main layout wrapper for all pages in the application.
 * - Sets up Google Fonts (Space Grotesk display + Inter body)
 * - Defines metadata (SEO, Open Graph, Twitter Card)
 * - Configures viewport for mobile and theme color
 * - Provides sticky Header, Footer, and ScrollToTop
 *
 * Features:
 * - SSR-ready with Next.js 15 App Router
 * - Responsive meta viewport configuration
 * - Theme color support for light/dark modes
 * - Proper font variable injection for CSS
 * - Semantic HTML structure
 *
 * @component
 */

import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#080e1f" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Srijan Speaks | AI Keynote Speaker & Educator",
    template: "%s | Srijan Speaks",
  },
  description:
    "AI Keynote Speaker, IIT Madras Researcher & Educator. 5000+ engineers trained across 50+ institutions. Book Srijan Tiwari for your next event, workshop, or consulting engagement.",
  keywords: [
    "AI Keynote Speaker",
    "Machine Learning",
    "NDT",
    "NDE",
    "IIT Madras",
    "Manufacturing AI",
    "Srijan Tiwari",
    "Technical Speaker India",
    "AI Education",
    "TIQ World",
  ],
  authors: [{ name: "Srijan Tiwari", url: "https://srijanspeaks.com" }],
  creator: "Srijan Tiwari",
  openGraph: {
    title: "Srijan Speaks | AI Keynote Speaker & Educator",
    description:
      "Accelerating manufacturing transformation via AI. IIT Madras researcher, co-founder TIQ World, and educator to 5000+ engineers.",
    type: "website",
    locale: "en_IN",
    siteName: "Srijan Speaks",
  },
  twitter: {
    card: "summary_large_image",
    title: "Srijan Speaks | AI Keynote Speaker",
    description: "Accelerating manufacturing transformation via AI.",
    creator: "@srijanspeaks",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body style={{ fontFamily: "var(--font-body, 'Inter', sans-serif)" }}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
