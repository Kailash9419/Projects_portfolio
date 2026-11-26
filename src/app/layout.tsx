import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SiteChrome } from "@/components/site/site-chrome";
import { BRAND, SEO, LOCATION, CONTACT } from "@/data/brand";

const display = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap" });
const sans = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050606",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SEO.siteUrl),
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
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
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
  image: `${SEO.siteUrl}/opengraph-image`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${devanagari.variable} dark`}
      suppressHydrationWarning
    >
      <body className="grain min-h-svh">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LanguageProvider>
          <SiteChrome>{children}</SiteChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
