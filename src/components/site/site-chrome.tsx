"use client";

import { usePathname } from "next/navigation";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Cursor } from "@/components/motion/cursor";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { InquiryProvider } from "@/components/site/inquiry";
import { TooltipProvider } from "@/components/ui/tooltip";

/** Marketing chrome (header, footer, smooth scroll, cursor). The admin panel gets none of it. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <main className="min-h-svh bg-bg-primary text-text-primary">{children}</main>;
  }

  return (
    <TooltipProvider delayDuration={150}>
      <InquiryProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[80] focus:rounded-md focus:bg-raised focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Cursor />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </InquiryProvider>
    </TooltipProvider>
  );
}
