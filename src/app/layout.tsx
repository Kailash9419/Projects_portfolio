import type { Metadata } from "next";
import { Inter, Syne, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InteractiveBackground from "@/components/ui/InteractiveBackground";
import ScrollProgress from "@/components/ui/ScrollProgress";
import FloatingSocialCTA from "@/components/ui/FloatingSocialCTA";
import { LanguageProvider } from "@/context/LanguageContext";
import { BRAND, SEO, LOCATION, CONTACT } from "@/data/brand";

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

const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SEO.defaultTitle,
  description: SEO.defaultDescription,
  keywords: [...SEO.keywords],
  authors: [{ name: BRAND.fullName }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SEO.siteUrl,
    siteName: BRAND.fullName,
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [
      {
        url: `${SEO.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${BRAND.fullName} — ${LOCATION.shortLabel}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [`${SEO.siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// LocalBusiness structured data for local SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: BRAND.fullName,
  description: SEO.defaultDescription,
  url: SEO.siteUrl,
  telephone: CONTACT.phones[0],
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: LOCATION.city,
    addressRegion: LOCATION.state,
    addressCountry: LOCATION.country,
  },
  areaServed: [
    { "@type": "City", name: LOCATION.city },
    { "@type": "State", name: LOCATION.state },
    { "@type": "Country", name: LOCATION.country },
  ],
  serviceType: [
    "Web Development",
    "SaaS Development",
    "E-commerce Development",
    "Business Automation",
    "Web Design",
  ],
  priceRange: "₹₹",
  image: `${SEO.siteUrl}/og-image.png`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${devanagari.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen bg-bg-primary text-text-primary antialiased flex flex-col"
        style={{ fontFamily: "var(--font-inter), var(--font-devanagari), system-ui, sans-serif" }}
      >
        <LanguageProvider>
          <ScrollProgress />
          <InteractiveBackground />
          <div className="noise-overlay" />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingSocialCTA />
        </LanguageProvider>
      </body>
    </html>
  );
}
