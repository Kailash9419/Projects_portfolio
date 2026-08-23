"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import UnderlineLink from "@/components/ui/UnderlineLink";
import QuickInquiryModal from "@/components/ui/QuickInquiryModal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { BRAND, CONTACT } from "@/data/brand";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const { language, setLanguage, toggleLanguage, t, isHindi } = useLanguage();

  const NAV_LINKS = [
    { label: t.nav.work, href: "/work" },
    { label: t.nav.services, href: "/#services" },
    { label: t.nav.whyUs, href: "/#why-us" },
    { label: t.nav.pricing, href: "/#pricing" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-bg-primary/95 backdrop-blur-md border-b border-border-default/80 py-2.5 shadow-xl"
            : "bg-transparent py-4 sm:py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* DevLabs Logo with Green Icon */}
          <Link href="/" className="flex items-center gap-2.5 z-50 group">
            <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 group-hover:scale-105 transition-transform">
              <rect width="40" height="40" rx="10" fill="#A3E635" fillOpacity="0.18"/>
              <path d="M12 10h8c5.523 0 10 4.477 10 10s-4.477 10-10 10h-8V10z" stroke="#A3E635" strokeWidth="2.5" fill="none"/>
              <path d="M22 16l4 4-4 4" stroke="#A3E635" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="flex flex-col">
              <span className="font-display font-black tracking-tight text-lg text-text-primary leading-tight">
                {BRAND.name.substring(0, 3)}<span className="text-accent-lime">{BRAND.name.substring(3)}</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-text-muted leading-none font-mono">
                {BRAND.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            <nav className="flex items-center gap-7">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href === "/work" && pathname?.startsWith("/work"));
                return (
                  <UnderlineLink
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "text-xs font-semibold tracking-wide uppercase font-mono",
                      isActive ? "text-accent-lime" : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {link.label}
                  </UnderlineLink>
                );
              })}
            </nav>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher (EN | हिन्दी) */}
            <div className="flex items-center p-1 rounded-full bg-bg-card border border-border-default text-xs font-mono">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  !isHindi
                    ? "bg-accent-lime text-bg-primary font-bold shadow-sm"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("hi")}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  isHindi
                    ? "bg-accent-lime text-bg-primary font-bold shadow-sm"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Quick Inquiry Button */}
            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full border border-accent-lime/40 bg-accent-lime/10 hover:bg-accent-lime/20 text-accent-lime text-xs font-bold transition-all"
            >
              ⚡ {t.nav.quickInquiry}
            </button>

            {/* Quick WhatsApp Chat Button */}
            <a
              href={CONTACT.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>💬</span> {t.nav.whatsAppUs}
            </a>

            {/* Admin Lock Icon Button */}
            <Link
              href="/admin"
              title="Studio Admin / Project CMS"
              className={cn(
                "p-2 rounded-xl border border-border-default bg-bg-card/50 text-text-muted hover:text-accent-lime hover:border-accent-lime/40 hover:bg-bg-card transition-all group",
                pathname === "/admin" && "border-accent-lime/60 text-accent-lime bg-accent-lime/10"
              )}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:scale-110 transition-transform"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2 z-50">
            {/* Language Switcher in Mobile */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-full bg-bg-card border border-border-default text-accent-lime text-xs font-bold font-mono"
            >
              {isHindi ? "EN" : "हिन्दी"}
            </button>

            {/* WhatsApp direct pill */}
            <a
              href={CONTACT.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] text-xs font-bold"
            >
              WA
            </a>

            {/* Admin Icon */}
            <Link
              href="/admin"
              title="Admin Login"
              className="p-1.5 rounded-lg border border-border-default bg-bg-card text-text-muted hover:text-accent-lime"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </Link>

            {/* Hamburger Button */}
            <button
              className="text-text-primary p-1.5 -mr-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { y: -20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-bg-primary/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-5 p-6"
          >
            {/* Language Switcher in Mobile Drawer */}
            <div className="flex items-center gap-3 p-1 rounded-full bg-bg-card border border-border-default mb-2">
              <button
                onClick={() => setLanguage("en")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                  !isHindi ? "bg-accent-lime text-bg-primary" : "text-text-muted"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("hi")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                  isHindi ? "bg-accent-lime text-bg-primary" : "text-text-muted"
                }`}
              >
                हिन्दी
              </button>
            </div>

            <nav className="flex flex-col items-center gap-5">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href === "/work" && pathname?.startsWith("/work"));
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "font-display text-2xl font-bold transition-colors",
                      isActive ? "text-accent-lime" : "text-text-primary hover:text-accent-lime"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsInquiryModalOpen(true);
                }}
                className="mt-2 px-6 py-2.5 rounded-full bg-accent-lime text-bg-primary font-bold text-sm shadow-md"
              >
                ⚡ {t.nav.quickInquiry}
              </button>

              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 px-6 py-2 rounded-full border border-border-default bg-bg-card text-text-muted text-xs flex items-center gap-2 hover:border-accent-lime"
              >
                <span>🔒</span> {t.nav.adminLogin}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Inquiry Modal */}
      <QuickInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />
    </>
  );
}
