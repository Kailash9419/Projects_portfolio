"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import UnderlineLink from "@/components/ui/UnderlineLink";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          isScrolled ? "bg-bg-primary/90 backdrop-blur-md border-b border-border-default" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-display font-bold tracking-tight text-xl text-text-primary z-50 relative">
            STUDIO
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href === "/work" && pathname?.startsWith("/work"));
              return (
                <UnderlineLink
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium",
                    isActive ? "text-text-primary" : "text-text-secondary"
                  )}
                >
                  {link.label}
                </UnderlineLink>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden z-50 relative text-text-primary p-2 -mr-2"
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
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-lg flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href === "/work" && pathname?.startsWith("/work"));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "font-display text-4xl font-bold transition-colors",
                      isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
