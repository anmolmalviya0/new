import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const ibmPlexMono = IBM_Plex_Mono({ 
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"] 
});

export const metadata: Metadata = {
  title: "Srijan Tiwari | AI Innovation & Manufacturing",
  description: "Building the future of manufacturing through AI. 50+ enterprise deployments, $200M+ impact.",
  keywords: "AI, Manufacturing, Machine Learning, NDE, Innovation",
  openGraph: {
    title: "Srijan Tiwari",
    description: "Accelerating manufacturing transformation via AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ibmPlexMono.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
