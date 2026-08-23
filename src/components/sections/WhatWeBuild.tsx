"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import CursorGlow from "@/components/ui/CursorGlow";
import GradientText from "@/components/ui/GradientText";
import { useLanguage } from "@/context/LanguageContext";

export default function WhatWeBuild() {
  const { t, isHindi } = useLanguage();

  const MAIN_SERVICES = [
    {
      num: "01",
      title: t.services.saasTitle,
      desc: t.services.saasDesc,
      tag: isHindi ? "मल्टी-टेनेंट & क्लाउड" : "Multi-tenant & Cloud",
      glowColor: "rgba(163, 230, 53, 1)",
      features: isHindi
        ? ["पेमेंट्स & बिलिंग सिस्टम", "रोल-बेस्ड डैशबोर्ड्स", "क्लाउड स्केलिंग", "यूजर मैनेजमेंट"]
        : ["Payments & Billing", "Role-based Dashboards", "Cloud Scalability", "User Management"],
    },
    {
      num: "02",
      title: t.services.webTitle,
      desc: t.services.webDesc,
      tag: isHindi ? "सुपरफास्ट & मोबाइल-फर्स्ट" : "Fast & Mobile-First",
      glowColor: "rgba(34, 211, 238, 1)",
      features: isHindi
        ? ["ई-कॉमर्स & चेकआउट", "अपॉइंटमेंट बुकिंग", "100/100 Google SEO", "कस्टम प्रीमियम डिज़ाइन"]
        : ["E-commerce & Checkout", "Booking Engines", "100/100 SEO & Speed", "Custom Design"],
    },
    {
      num: "03",
      title: t.services.autoTitle,
      desc: t.services.autoDesc,
      tag: isHindi ? "ऑटोमैटिक वर्कफ्लो" : "Zero-Touch Workflows",
      glowColor: "rgba(139, 92, 246, 1)",
      features: isHindi
        ? ["व्हाट्सएप & ईमेल बॉट्स", "ऑटोमैटिक इनवॉइसिंग", "इन्वेंटरी सिंक", "CRM इंटीग्रेशन"]
        : ["WhatsApp & Email Bots", "Automated Invoicing", "Inventory Sync", "CRM Integration"],
    },
  ];

  return (
    <section id="services" className="max-w-7xl mx-auto px-5 sm:px-6 py-14 md:py-16 scroll-mt-20">
      <SectionReveal>
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-default bg-bg-card text-xs font-mono text-accent-lime mb-2.5">
            {t.services.badge}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-text-primary leading-[1.2] py-0.5">
            {t.services.title}{" "}
            <GradientText from="from-[#A3E635]" to="to-[#22D3EE]">
              {t.services.titleAccent}
            </GradientText>
          </h2>
          <p className="text-text-secondary text-sm sm:text-base max-w-2xl">
            {t.services.subtitle}
          </p>
        </div>
      </SectionReveal>

      {/* 3 Main Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MAIN_SERVICES.map((service, index) => (
          <SectionReveal key={service.title} delay={index * 0.08}>
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative bg-bg-card border border-border-default rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:border-border-hover group h-full flex flex-col justify-between overflow-hidden shadow-xl"
            >
              <CursorGlow
                color={service.glowColor}
                size={220}
                opacity={0.12}
              />

              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-bold text-accent-lime px-2.5 py-1 rounded-md bg-accent-lime/10 border border-accent-lime/20">
                    {service.num}
                  </span>
                  <span className="text-[11px] font-mono text-text-muted bg-bg-secondary px-2.5 py-1 rounded-full border border-border-default">
                    {service.tag}
                  </span>
                </div>

                <h3
                  className="font-display text-xl sm:text-2xl font-bold mb-2.5 transition-colors duration-300 text-text-primary group-hover:text-accent-lime"
                >
                  {service.title}
                </h3>

                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-5">
                  {service.desc}
                </p>
              </div>

              {/* Feature pills */}
              <div className="pt-4 border-t border-border-default/60 space-y-1.5">
                {service.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="text-accent-lime">✦</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
