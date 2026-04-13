/**
 * Root Layout Component
 * 
 * Main layout wrapper for all pages in the application.
 * - Sets up Google Fonts (Inter + IBM Plex Mono)
 * - Defines metadata (SEO, Open Graph)
 * - Configures viewport for mobile and theme color
 * - Provides sticky Header and Footer
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
import { Inter, Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Font configurations for the application - Premium brand fonts

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Display font: Bold, geometric, engineered - for hero headlines and UI
const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Body font: Warm, modern humanist - for UI and body text
const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-body",
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
  title: "Srijan Speaks | AI Innovation & Manufacturing",
  description:
    "AI Keynote Speaker & Educator. 5000+ engineers trained across 50+ institutions. Book Srijan for your next event.",
  keywords: "AI, Manufacturing, Machine Learning, NDE, Innovation, Srijan Tiwari",
  openGraph: {
    title: "Srijan Speaks",
    description: "Accelerating manufacturing transformation via AI",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${plusJakartaSans.variable}`}>
      <body style={{ fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)" }}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
