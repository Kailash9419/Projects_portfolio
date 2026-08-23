"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import GradientText from "@/components/ui/GradientText";
import MagneticButton from "@/components/ui/MagneticButton";
import HeroVisualCollage from "@/components/hero/HeroVisualCollage";
import QuickInquiryModal from "@/components/ui/QuickInquiryModal";
import { useLanguage } from "@/context/LanguageContext";
import { BRAND, LOCATION, CONTACT } from "@/data/brand";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export default function Hero() {
  const { t, isHindi } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const KEY_OFFERINGS = isHindi
    ? ["ऑनलाइन दुकान & UPI", "कस्टम वेबसाइट्स", "व्हाट्सएप ऑटोमेशन", "फोन से कंट्रोल"]
    : ["Online Dukan & UPI", "Custom Websites", "WhatsApp Automation", "Owner Mobile Panel"];

  return (
    <section className="relative w-full min-h-screen lg:h-screen lg:max-h-[920px] flex flex-col justify-between bg-bg-primary pt-20 sm:pt-22 lg:pt-20 pb-0 overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-lime/40 to-transparent" />

      {/* Ambient background glow */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-accent-lime/[0.05] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-72 h-72 bg-accent-cyan/[0.05] rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 max-w-7xl mx-auto px-5 sm:px-6 w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 py-3 lg:py-0 my-auto"
      >
        {/* Left Column — Clean, Focused Headline & CTAs */}
        <div className="flex-1 max-w-2xl text-left w-full">
          {/* Subtle Studio Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-default bg-bg-card/70 text-[11px] font-mono text-text-muted backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
              <span className="text-text-primary font-semibold">{BRAND.name}</span>
              <span>·</span>
              <span>{t.hero.tag}</span>
            </div>
          </motion.div>

          {/* Clean Headline with Native Font Stacks (Zero Overlap in Hindi & English) */}
          <motion.div variants={itemVariants} className="mb-4">
            {isHindi ? (
              <h1 className="font-devanagari font-black text-text-primary text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[2.9rem] leading-[1.42] sm:leading-[1.38] tracking-normal">
                <span>सॉफ्टवेयर जो </span>
                <span className="text-accent-lime font-black">छोटे बिज़नेस</span>
                <span> को बनाए </span>
                <GradientText from="from-[#A3E635]" to="to-[#22D3EE]">
                  मार्केट लीडर।
                </GradientText>
              </h1>
            ) : (
              <h1 className="font-display font-black text-text-primary text-3xl sm:text-4xl md:text-5xl lg:text-[3.15rem] xl:text-[3.35rem] leading-[1.22] tracking-tight">
                {t.hero.headlineLine1}{" "}
                <span className="text-stroke font-black block my-0.5 sm:my-1">
                  {t.hero.headlineStroke}
                </span>
                {t.hero.headlineLine2}{" "}
                <GradientText from="from-[#A3E635]" to="to-[#22D3EE]">
                  {t.hero.headlineAccent}
                </GradientText>
              </h1>
            )}
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className={`text-text-secondary leading-relaxed mb-5 max-w-lg ${isHindi
              ? "font-devanagari text-xs sm:text-sm md:text-base leading-[1.65]"
              : "text-sm sm:text-base leading-relaxed"
              }`}
          >
            {t.hero.description}
          </motion.p>

          {/* Clean Key Highlights */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-6">
            {KEY_OFFERINGS.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium text-text-secondary bg-bg-card/70 border border-border-default/80 rounded-full hover:text-text-primary transition-colors cursor-default"
              >
                ✦ {tag}
              </span>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <MagneticButton
              href={CONTACT.whatsapp.link}
              className="bg-accent-lime text-bg-primary font-bold px-6 py-3 rounded-full hover:bg-accent-lime/90 transition-all text-xs sm:text-sm flex items-center gap-2 glow-lime"
            >
              <span>{t.hero.ctaWhatsApp}</span>
            </MagneticButton>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-3 rounded-full border border-border-default bg-bg-card hover:bg-bg-card-hover hover:border-accent-lime/40 text-text-primary text-xs sm:text-sm font-semibold transition-all"
            >
              {t.hero.ctaInquiry}
            </button>
          </motion.div>
        </div>

        {/* Right Column — Relatable Business Solutions Visual Showcase */}
        <motion.div
          variants={itemVariants}
          className="w-full lg:w-[460px] xl:w-[490px] shrink-0 my-auto"
        >
          <HeroVisualCollage />

          {/* Subtle Stats Row */}
          <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-border-default/60 text-center sm:text-left">
            <div>
              <span className="text-base sm:text-lg font-bold font-display text-text-primary block">
                10+
              </span>
              <span className="text-[10px] text-text-muted whitespace-nowrap">
                {t.hero.stats.products}
              </span>
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold font-display text-accent-lime block">
                4
              </span>
              <span className="text-[10px] text-text-muted whitespace-nowrap">
                {t.hero.stats.live}
              </span>
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold font-display text-accent-cyan block">
                100%
              </span>
              <span className="text-[10px] text-text-muted whitespace-nowrap">
                {t.hero.stats.focus}
              </span>
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold font-display text-accent-violet block">
                24h
              </span>
              <span className="text-[10px] text-text-muted whitespace-nowrap">
                {t.hero.stats.response}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Contact Ticker */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        className="relative z-20 w-full border-t border-border-default/70 bg-bg-primary/95 backdrop-blur-md shrink-0"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-xs">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-mono text-text-muted">Email:</span>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-text-secondary hover:text-accent-lime transition-colors"
              >
                {CONTACT.email}
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-mono text-text-muted">WhatsApp:</span>
              <a
                href={CONTACT.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-lime transition-colors"
              >
                {CONTACT.whatsapp.displayNumber}
              </a>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-text-muted">
              <span>{LOCATION.workingScope}</span>
            </div>
          </div>

          <a
            href="#pricing"
            className="text-[11px] font-mono text-accent-lime hover:underline"
          >
            {isHindi ? "प्राइसिंग कैसे तय होती है? देखें ↓" : "How our pricing works ↓"}
          </a>
        </div>
      </motion.div>

      {/* Global Quick Inquiry Modal */}
      <QuickInquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
