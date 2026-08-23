"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT, SOCIAL } from "@/data/brand";

export default function FloatingSocialCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    // Make visible shortly after page load
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsTooltipVisible(true);
    }, 1200);

    // Auto-hide tooltip after 7 seconds
    const hideTimer = setTimeout(() => {
      setIsTooltipVisible(false);
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-5 sm:right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
          {/* Helpful Tooltip for Local Business Owners */}
          <AnimatePresence>
            {isTooltipVisible && (
              <motion.div
                initial={{ opacity: 0, x: 15, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 15, scale: 0.9 }}
                className="relative bg-bg-card/95 border border-border-default rounded-2xl px-4 py-3 shadow-2xl backdrop-blur-xl max-w-[240px] text-left mb-1"
              >
                <button
                  onClick={() => setIsTooltipVisible(false)}
                  className="absolute top-2 right-2 text-text-muted hover:text-text-primary text-xs"
                >
                  ✕
                </button>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
                  <span className="text-[11px] font-bold font-mono text-accent-lime uppercase">
                    Free Consultation
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-snug">
                  Apne business ke liye website ya app banwani hai? Direct WhatsApp ya Insta pe baat karo!
                </p>
                {/* Arrow */}
                <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-bg-card border-r border-b border-border-default rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social Floating Action Buttons Container */}
          <div className="flex flex-col gap-2.5 items-center">
            {/* Instagram Floating Button */}
            <motion.a
              href={SOCIAL.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram DevLabs Studio"
              className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-lg shadow-[#DD2A7B]/25 hover:shadow-[#DD2A7B]/45 transition-all duration-300 group"
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.95 }}
              title="Instagram @devlabs.studio"
            >
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </motion.a>

            {/* WhatsApp Floating Button */}
            <motion.a
              href={`${CONTACT.whatsapp.link}?text=${encodeURIComponent("Hi DevLabs! Mujhe apne business ke liye website/app discuss karni hai.")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with DevLabs on WhatsApp"
              className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all duration-300 group"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setIsTooltipVisible(true)}
              title="WhatsApp: +91 81685 46173"
            >
              {/* Pulsing Radar Ring */}
              <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />

              <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="currentColor"
                className="relative z-10"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </motion.a>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
