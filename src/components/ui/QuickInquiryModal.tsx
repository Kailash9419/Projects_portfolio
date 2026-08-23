"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { BRAND, CONTACT } from "@/data/brand";

interface QuickInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROJECT_TYPES = [
  "Online Dukan / E-commerce Store",
  "Business Website & Portfolio",
  "SaaS Platform & Admin Dashboard",
  "WhatsApp Lead Automation Bot",
  "Booking System (Doctor/Hotel/Service)",
  "Other / Custom Requirement",
];

export default function QuickInquiryModal({ isOpen, onClose }: QuickInquiryModalProps) {
  const { t, isHindi } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi ${BRAND.name}! 👋\n\nName: ${formData.name}\nPhone: ${formData.phone}\nRequirement: ${formData.projectType || "General Inquiry"}\nDetails: ${formData.message || "Looking to discuss project scope & pricing."}`;

    window.open(
      `${CONTACT.whatsapp.link}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1500);
  };

  const inputClasses =
    "w-full bg-bg-primary border border-border-default rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-lime/60 focus:ring-1 focus:ring-accent-lime/20 transition-all";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-bg-card border border-border-default rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
        >
          {/* Top glow line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-lime via-accent-cyan to-accent-violet" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full border border-border-default flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-primary transition-colors text-sm"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Header */}
          <div className="mb-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-lime/10 border border-accent-lime/30 text-accent-lime text-[11px] font-mono font-bold mb-2.5">
              <span>⚡ DEVLABS DIRECT CONNECT</span>
            </div>
            <h2 className="text-2xl font-bold font-display text-text-primary">
              {t.inquiryModal.title}
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
              {t.inquiryModal.subtitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
                {t.inquiryModal.nameLabel} *
              </label>
              <input
                type="text"
                required
                placeholder={isHindi ? "जैसे: राहुल शर्मा" : "e.g. Rahul Sharma"}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClasses}
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
                {t.inquiryModal.phoneLabel} *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={inputClasses}
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
                {t.inquiryModal.projectTypeLabel}
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className={`${inputClasses} ${!formData.projectType ? "text-text-muted" : ""}`}
              >
                <option value="" disabled>
                  {isHindi ? "सर्विस चुनें..." : "Select requirement..."}
                </option>
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-text-muted mb-1.5">
                {t.inquiryModal.detailsLabel}
              </label>
              <textarea
                rows={3}
                placeholder={
                  isHindi
                    ? "जैसे: मेरी हल्द्वानी में कपड़े की दुकान है, ऑनलाइन कैटलॉग और WhatsApp बुकिंग चाहिए..."
                    : "e.g. I run a local business in Haldwani, need website & WhatsApp order system..."
                }
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`${inputClasses} resize-none`}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 px-6 rounded-xl bg-accent-lime text-bg-primary font-bold text-sm shadow-xl shadow-accent-lime/25 hover:bg-accent-lime/90 transition-all flex items-center justify-center gap-2 mt-6"
            >
              {isSubmitted ? (
                <span>{t.inquiryModal.submitting}</span>
              ) : (
                <>
                  <span>💬</span>
                  <span>{t.inquiryModal.submitBtn}</span>
                </>
              )}
            </motion.button>

            <p className="text-[11px] text-center text-text-muted pt-2">
              🔒 100% Free Consultation · No Spam · Direct WhatsApp Reply
            </p>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
