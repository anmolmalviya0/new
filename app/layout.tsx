import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
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
    "Building the future of manufacturing through AI. 5000+ engineers trained, 50+ enterprise deployments, $200M+ impact.",
  keywords: "AI, Manufacturing, Machine Learning, NDE, Innovation, Srijan Tiwari",
  openGraph: {
    title: "Srijan Speaks",
    description: "Accelerating manufacturing transformation via AI",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body style={{ fontFamily: "var(--font-inter, 'Inter', sans-serif)" }}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
