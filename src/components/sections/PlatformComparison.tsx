"use client";

import React from "react";
import SectionReveal from "@/components/ui/SectionReveal";
import GradientText from "@/components/ui/GradientText";
import { useLanguage } from "@/context/LanguageContext";

export default function PlatformComparison() {
  const { isHindi } = useLanguage();

  const ROWS = [
    {
      feature: isHindi ? "मंथली सब्सक्रिप्शन चार्ज" : "Monthly Recurring Fees",
      others: isHindi ? "₹2,500 से ₹6,000 / महीना (लगातार)" : "₹2,500 – ₹6,000/mo (Ongoing lock-in)",
      devlabs: isHindi ? "₹0 मंथली चार्ज (100% आपकी वेबसाइट)" : "₹0 Monthly Fee (100% Yours)",
    },
    {
      feature: isHindi ? "वेबसाइट लोडिंग स्पीड" : "Website Page Speed",
      others: isHindi ? "धीमी (3-6 सेकंड लोडिंग टाइम)" : "Slow & Bloated (3-6s load time)",
      devlabs: isHindi ? "सुपरफास्ट (0.5 सेकंड में तुरंत लोड)" : "Ultra-Fast (0.5s instant load)",
    },
    {
      feature: isHindi ? "फोन से सामान व रेट बदलना" : "Mobile Phone Content Control",
      others: isHindi ? "मुश्किल कंप्यूटर डैशबोर्ड व प्लगइन्स" : "Complicated desktop dashboard",
      devlabs: isHindi ? "आसान मोबाइल पैनल (0% कोडिंग)" : "Simple 1-click mobile phone panel",
    },
    {
      feature: isHindi ? "डायरेक्ट UPI व बैंक पेमेंट" : "Direct UPI & Bank Settlement",
      others: isHindi ? "अलग से महंगा गेटवे व हर ऑर्डर पर कमीशन" : "Extra paid plugins & transaction cuts",
      devlabs: isHindi ? "सीधे आपके बैंक में 0% कमीशन के साथ" : "Direct in your bank, 0% commission",
    },
    {
      feature: isHindi ? "व्हाट्सएप ऑटोमेशन बॉट" : "24/7 WhatsApp Order Bot",
      others: isHindi ? "उपलब्ध नहीं या अलग से महंगा सॉफ्टवेयर" : "Not included or expensive 3rd party",
      devlabs: isHindi ? "बिल्ट-इन 24/7 ऑटोमैटिक कस्टमर बॉट" : "Built-in automated lead bot",
    },
    {
      feature: isHindi ? "सोर्स कोड व डेटा ओनरशिप" : "Code & Database Ownership",
      others: isHindi ? "कंपनी के सर्वर पर लॉक (आप छोड़ नहीं सकते)" : "Rented platform lock-in",
      devlabs: isHindi ? "100% कोड और डेटा का मालिकाना हक आपका" : "100% Your Code & Your Data",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 py-14 md:py-18 scroll-mt-20">
      <SectionReveal>
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-default bg-bg-card text-xs font-mono text-accent-lime mb-2.5">
            ⚖️ HONEST COMPARISON
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-3 leading-[1.2] py-0.5">
            {isHindi ? "रेडीमेड टूल्स vs " : "Rented Templates vs "}
            <GradientText from="from-[#A3E635]" to="to-[#22D3EE]">
              {isHindi ? "DevLabs कस्टम स्टूडियो" : "DevLabs Custom Studio"}
            </GradientText>
          </h2>
          <p className="text-text-secondary text-sm sm:text-base">
            {isHindi
              ? "देखिए क्यों छोटे दुकानदारों और स्टार्टअप्स के लिए हमारा कस्टम सॉफ्टवेयर सालों-साल सस्ता और असरदार साबित होता है:"
              : "Why business owners choose custom owner-managed software over recurring rented templates:"}
          </p>
        </div>
      </SectionReveal>

      {/* Comparison Table Card */}
      <SectionReveal delay={0.1}>
        <div className="rounded-3xl border border-border-default bg-bg-card overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-bg-secondary p-4 sm:p-5 border-b border-border-default text-xs font-mono uppercase tracking-wider font-bold">
            <div className="col-span-5 sm:col-span-4 text-text-muted">
              {isHindi ? "सुविधा / फीचर" : "Core Capability"}
            </div>
            <div className="col-span-3 sm:col-span-4 text-red-400 text-center sm:text-left">
              {isHindi ? "❌ रेडीमेड / Shopify" : "❌ Generic Templates"}
            </div>
            <div className="col-span-4 sm:col-span-4 text-accent-lime text-right sm:text-left flex items-center gap-1.5 justify-end sm:justify-start">
              <span>✨</span>
              <span>DevLabs Studio</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-border-default/60 text-xs sm:text-sm">
            {ROWS.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-bg-primary/50 transition-colors"
              >
                {/* Feature Name */}
                <div className="col-span-5 sm:col-span-4 font-semibold text-text-primary">
                  {row.feature}
                </div>

                {/* Others */}
                <div className="col-span-3 sm:col-span-4 text-text-muted text-center sm:text-left text-[11px] sm:text-xs">
                  {row.others}
                </div>

                {/* DevLabs */}
                <div className="col-span-4 sm:col-span-4 font-bold text-accent-lime text-right sm:text-left flex items-center gap-1.5 justify-end sm:justify-start text-xs sm:text-sm">
                  <span className="hidden sm:inline">✓</span>
                  <span>{row.devlabs}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
