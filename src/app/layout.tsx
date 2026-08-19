import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InteractiveBackground from "@/components/ui/InteractiveBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio — Digital Product Studio",
  description:
    "We design and build premium digital products that solve real problems. Explore our portfolio of web apps, AI tools, SaaS platforms, and more.",
  keywords: [
    "digital studio",
    "web development",
    "product design",
    "AI",
    "SaaS",
    "portfolio",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body
        className="min-h-screen bg-bg-primary text-text-primary antialiased"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <InteractiveBackground />
        <div className="noise-overlay" />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
