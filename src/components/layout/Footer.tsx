import React from "react";
import Link from "next/link";
import { BRAND, LOCATION, SOCIAL, CONTACT } from "@/data/brand";

export default function Footer() {
  return (
    <footer className="w-full bg-bg-secondary/90 border-t border-border-default/80 py-10 mt-10 relative overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent-lime/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-border-default/60">
          {/* Col 1: Brand & Motto */}
          <div className="md:col-span-2 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-lg text-text-primary">
                {BRAND.name.substring(0, 3)}<span className="text-accent-lime">{BRAND.name.substring(3)}</span>
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-bg-card border border-border-default text-text-muted">
                {BRAND.tagline}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-text-secondary max-w-md leading-relaxed">
              We design and build custom websites, e-commerce stores, SaaS platforms, and business automation tools for small businesses — owner-managed with zero developer dependency.
            </p>

            <p className="text-xs text-text-muted italic">
              &ldquo;{BRAND.motto}&rdquo;
            </p>

            <div className="pt-1 text-xs font-mono text-text-muted flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              <span>{LOCATION.fullLabel}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-text-muted block mb-3">
              Explore
            </span>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/work" className="text-text-secondary hover:text-accent-lime transition-colors">
                  Selected Work & Projects
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-text-secondary hover:text-accent-lime transition-colors">
                  What We Build
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-text-secondary hover:text-accent-lime transition-colors">
                  Transparent Pricing
                </Link>
              </li>
              <li>
                <Link href="/#why-us" className="text-text-secondary hover:text-accent-lime transition-colors">
                  Why DevLabs
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-text-secondary hover:text-accent-lime transition-colors">
                  Book Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-text-muted block mb-3">
              Connect Directly
            </span>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <a
                href={CONTACT.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] font-bold text-xs hover:bg-[#25D366]/25 transition-all"
              >
                <span>💬</span> WhatsApp: {CONTACT.whatsapp.displayNumber}
              </a>

              <div>
                <span className="text-[10px] font-mono uppercase text-text-muted block">Direct Email</span>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-text-secondary hover:text-accent-lime text-xs transition-colors font-medium"
                >
                  {CONTACT.email}
                </a>
              </div>

              <div className="pt-1 flex items-center gap-3">
                {/* Instagram */}
                <a
                  href={SOCIAL.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-bg-card border border-border-default text-text-secondary hover:text-[#E1306C] hover:border-[#E1306C]/40 transition-colors"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* Admin CMS Access */}
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-bg-card border border-border-default text-text-muted hover:text-accent-lime hover:border-accent-lime/40 text-xs transition-colors"
                  title="Studio Admin CMS"
                >
                  <span>🔒</span> Admin
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <div>
            © {new Date().getFullYear()} {BRAND.fullName}. Handcrafted in {LOCATION.shortLabel}.
          </div>
          <div className="text-text-muted">
            India · Working Worldwide
          </div>
        </div>
      </div>
    </footer>
  );
}
