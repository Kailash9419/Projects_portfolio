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
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [website, setWebsite] = useState(""); // honeypot — real users never see it

  if (!isOpen) return null;

  const whatsappUrl = `${CONTACT.whatsapp.link}?text=${encodeURIComponent(
    `Hi ${BRAND.name}! 👋

Name: ${formData.name}
Phone: ${formData.phone}
Requirement: ${
      formData.projectType || "General Inquiry"
    }
Details: ${formData.message || "Looking to discuss project scope & pricing."}`
  )}`;

  const handleClose = () => {
    if (state === "sent") {
      setFormData({ name: "", phone: "", projectType: "", message: "" });
    }
    setState("idle");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, website, language: isHindi ? "hi" : "en" }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  };

  const inputClasses =
    "w-full bg-bg-primary border border-border-default rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-lime/60 focus:ring-1 focus:ring-accent-lime/20 transition-all";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={handleClose} />

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
            onClick={handleClose}
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

          {state === "sent" ? (
            <div className="text-center py-6" role="status">
              <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-accent-lime/15 border border-accent-lime/40 flex items-center justify-center text-2xl text-accent-lime">
                ✓
              </div>
              <h3 className="text-xl font-bold font-display text-text-primary">
                {t.inquiryModal.sentTitle}
              </h3>
              <p className="text-sm text-text-muted mt-2">{t.inquiryModal.sentDesc}</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 text-sm text-[#25D366] hover:underline"
              >
                {t.inquiryModal.whatsappAlt}
              </a>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Honeypot field for bots */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />

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

            {state === "error" && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs" role="alert">
                {t.inquiryModal.errorMsg}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={state === "sending"}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 px-6 rounded-xl bg-accent-lime text-bg-primary font-bold text-sm shadow-xl shadow-accent-lime/25 hover:bg-accent-lime/90 transition-all flex items-center justify-center gap-2 mt-6"
            >
              {state === "sending" ? t.inquiryModal.submitting : t.inquiryModal.submitBtn}
            </motion.button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-xs text-[#25D366] hover:underline"
            >
              {t.inquiryModal.whatsappAlt}
            </a>

            <p className="text-[11px] text-center text-text-muted pt-1">
              🔒 100% Free Consultation · No Spam
            </p>
          </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
