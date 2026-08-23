"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroVisualCollage() {
  const { isHindi } = useLanguage();
  const [activeTab, setActiveTab] = useState<"store" | "booking" | "whatsapp">("store");
  const [liked, setLiked] = useState(false);
  const [cartCount, setCartCount] = useState(1);

  return (
    <div className="w-full max-w-lg lg:max-w-xl mx-auto">
      {/* Outer Container with Glow */}
      <div className="relative rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-b from-border-default/80 via-border-default/30 to-transparent shadow-2xl backdrop-blur-xl">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-accent-lime/15 via-accent-cyan/15 to-accent-violet/15 blur-xl opacity-60 pointer-events-none" />

        {/* Main Clean Showcase Container */}
        <div className="relative bg-bg-card/95 border border-border-default rounded-[18px] sm:rounded-[22px] p-4 sm:p-5 overflow-hidden">
          
          {/* Top Relatable Category Selector Pills */}
          <div className="flex items-center justify-between gap-2 pb-3 mb-3.5 border-b border-border-default/70">
            <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider font-bold">
              {isHindi ? "✨ हम क्या बनाते हैं:" : "✨ What We Build For You:"}
            </span>
            <span className="text-[10px] font-mono text-accent-lime px-2 py-0.5 rounded-full bg-accent-lime/10 border border-accent-lime/20 font-semibold">
              {isHindi ? "लाइव सैंपल्स" : "Live Samples"}
            </span>
          </div>

          {/* Interactive 3-Way Solutions Switcher */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-bg-primary rounded-xl border border-border-default mb-4">
            <button
              onClick={() => setActiveTab("store")}
              className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all text-center flex items-center justify-center gap-1.5 ${
                activeTab === "store"
                  ? "bg-bg-card text-accent-lime shadow-md border border-border-default"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              <span>🛍️</span>
              <span className="truncate">{isHindi ? "ऑनलाइन दुकान" : "Online Dukan"}</span>
            </button>

            <button
              onClick={() => setActiveTab("booking")}
              className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all text-center flex items-center justify-center gap-1.5 ${
                activeTab === "booking"
                  ? "bg-bg-card text-accent-cyan shadow-md border border-border-default"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              <span>🏨</span>
              <span className="truncate">{isHindi ? "होटल / बुकिंग" : "Café & Booking"}</span>
            </button>

            <button
              onClick={() => setActiveTab("whatsapp")}
              className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all text-center flex items-center justify-center gap-1.5 ${
                activeTab === "whatsapp"
                  ? "bg-bg-card text-[#25D366] shadow-md border border-border-default"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              <span>💬</span>
              <span className="truncate">{isHindi ? "व्हाट्सएप बॉट" : "WhatsApp Bot"}</span>
            </button>
          </div>

          {/* Dynamic Visual Showcase Box */}
          <div className="min-h-[220px]">
            <AnimatePresence mode="wait">
              
              {/* SOLUTION 1: ONLINE DUKAN & E-COMMERCE */}
              {activeTab === "store" && (
                <motion.div
                  key="store"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {/* Shop Banner Card */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-bg-secondary via-bg-card to-bg-secondary border border-border-default flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent-lime/15 border border-accent-lime/30 flex items-center justify-center text-lg">
                        🪴
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-text-primary">
                          {isHindi ? "पहाड़ी ऑर्गेनिक & क्राफ्ट स्टोर" : "Pahari Organics & Craft Store"}
                        </h4>
                        <span className="text-[10px] text-text-muted flex items-center gap-1.5 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                          <span>{isHindi ? "UPI से सीधे बैंक खाते में पेमेंट" : "Direct UPI & Fast Checkout"}</span>
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold text-accent-lime bg-accent-lime/10 px-2.5 py-1 rounded-full border border-accent-lime/20">
                      ₹18,450 {isHindi ? "आज की बिक्री" : "Today"}
                    </span>
                  </div>

                  {/* Sample Product Showcase Card */}
                  <div className="p-3 bg-bg-primary rounded-xl border border-border-default flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-bg-secondary border border-border-default flex items-center justify-center text-2xl">
                        🏺
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-accent-lime block">
                          {isHindi ? "प्रीमियम हैंडक्राफ्ट" : "Best Seller"}
                        </span>
                        <h5 className="text-xs font-bold text-text-primary">
                          {isHindi ? "हस्तनिर्मित क्ले टी-सेट" : "Handcrafted Clay Tea Set"}
                        </h5>
                        <span className="text-xs font-bold text-text-primary mt-0.5 block">
                          ₹1,450 <span className="text-[10px] text-text-muted line-through">₹1,999</span>
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setCartCount(c => c + 1)}
                      className="px-3.5 py-2 rounded-lg bg-accent-lime text-bg-primary font-bold text-xs hover:bg-accent-lime/90 transition-all flex items-center gap-1 shrink-0 active:scale-95 shadow-sm"
                    >
                      <span>🛒</span>
                      <span>{isHindi ? "ऑर्डर" : "Order"} ({cartCount})</span>
                    </button>
                  </div>

                  {/* Trust highlight */}
                  <div className="flex items-center justify-between text-[11px] px-3 py-1.5 bg-bg-secondary rounded-lg text-text-muted border border-border-default/70">
                    <span className="flex items-center gap-1 text-accent-lime font-medium">
                      ✓ {isHindi ? "फोन से 1 मिनट में नए प्रोडक्ट्स जोड़ें" : "Add new products from your phone in 1 min"}
                    </span>
                    <span className="text-text-muted font-mono">{isHindi ? "0% कमीशन" : "0% Commission"}</span>
                  </div>
                </motion.div>
              )}

              {/* SOLUTION 2: CAFÉ, RESTAURANT & RESORT BOOKING */}
              {activeTab === "booking" && (
                <motion.div
                  key="booking"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {/* Hotel / Café Banner */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-bg-secondary via-bg-card to-bg-secondary border border-border-default flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent-cyan/15 border border-accent-cyan/30 flex items-center justify-center text-lg">
                        ☕
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-text-primary">
                          {isHindi ? "द वैली कैफ़े & स्टे" : "The Valley Café & Stays"}
                        </h4>
                        <span className="text-[10px] text-text-muted flex items-center gap-1 mt-0.5">
                          <span>⭐ 4.9 (140+ Reviews) · नैनीताल / हल्द्वानी</span>
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setLiked(!liked)}
                      className="p-2 rounded-lg bg-bg-primary border border-border-default text-xs"
                    >
                      {liked ? "❤️" : "🤍"}
                    </button>
                  </div>

                  {/* Booking Simulation Card */}
                  <div className="p-3 bg-bg-primary rounded-xl border border-border-default space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-secondary">
                        {isHindi ? "📅 टेबल / रूम बुकिंग:" : "📅 Table & Room Reservation:"}
                      </span>
                      <span className="text-accent-cyan font-bold font-mono">
                        {isHindi ? "✓ तुरंत कन्फर्मेशन" : "Instant Confirmation"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-bg-secondary border border-border-default text-center">
                        <span className="text-[10px] text-text-muted block">{isHindi ? "समय / तारीख" : "Date & Slot"}</span>
                        <span className="font-bold text-text-primary text-[11px]">Today, 7:30 PM</span>
                      </div>
                      <div className="p-2 rounded-lg bg-bg-secondary border border-border-default text-center">
                        <span className="text-[10px] text-text-muted block">{isHindi ? "मेहमान / गेस्ट्स" : "Guests"}</span>
                        <span className="font-bold text-text-primary text-[11px]">4 Persons (Reserved)</span>
                      </div>
                    </div>
                  </div>

                  {/* Trust highlight */}
                  <div className="flex items-center justify-between text-[11px] px-3 py-1.5 bg-bg-secondary rounded-lg text-text-muted border border-border-default/70">
                    <span className="flex items-center gap-1 text-accent-cyan font-medium">
                      ✓ {isHindi ? "कस्टमर को डिजिटल मेनू & WhatsApp अलर्ट" : "Digital QR Menu & WhatsApp SMS alert"}
                    </span>
                    <span className="font-mono">Google SEO</span>
                  </div>
                </motion.div>
              )}

              {/* SOLUTION 3: 24/7 WHATSAPP LEAD BOT */}
              {activeTab === "whatsapp" && (
                <motion.div
                  key="whatsapp"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {/* WhatsApp Simulation Banner */}
                  <div className="p-3.5 rounded-xl bg-[#075E54]/20 border border-[#25D366]/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-sm">
                        💬
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-text-primary">
                          {isHindi ? "ऑटोमैटिक व्हाट्सएप इंक्वायरी बॉट" : "24/7 WhatsApp Lead & Booking"}
                        </h4>
                        <span className="text-[10px] text-[#25D366] font-mono font-medium">
                          {isHindi ? "🟢 24 घंटे एक्टिव — कोई ग्राहक न छूटे" : "🟢 0 Missed Customer Inquiries"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Chat Bubbles */}
                  <div className="p-3 bg-bg-primary rounded-xl border border-border-default space-y-2 text-xs">
                    {/* Incoming customer message */}
                    <div className="flex gap-2 items-start">
                      <span className="text-xs">👤</span>
                      <div className="p-2 bg-bg-secondary rounded-xl rounded-tl-none border border-border-default text-text-secondary text-[11px] max-w-[85%]">
                        {isHindi
                          ? "“नमस्ते! मुझे आपकी सर्विस के रेट्स और बुकिंग डिटेल्स चाहिए।”"
                          : "“Hi! I want to check prices & book an appointment for tomorrow.”"}
                      </div>
                    </div>

                    {/* Automated instant reply */}
                    <div className="flex gap-2 items-start justify-end">
                      <div className="p-2 bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl rounded-tr-none text-text-primary text-[11px] max-w-[85%]">
                        <span className="font-bold text-[#25D366] block mb-0.5">
                          {isHindi ? "ऑटोमैटिक रिप्लाई:" : "Instant DevLabs Bot:"}
                        </span>
                        {isHindi
                          ? "कैटलॉग और बुकिंग लिंक भेज दिया गया है! ओनर को तुरंत अलर्ट मिल गया।"
                          : "Price catalogue & booking link sent! Owner notified instantly."}
                      </div>
                    </div>
                  </div>

                  {/* Trust highlight */}
                  <div className="flex items-center justify-between text-[11px] px-3 py-1.5 bg-bg-secondary rounded-lg text-text-muted border border-border-default/70">
                    <span className="flex items-center gap-1 text-[#25D366] font-medium">
                      ✓ {isHindi ? "दिन-रात ऑटोमैटिक लीड्स कैप्चर" : "Captures customer leads 24/7 automatically"}
                    </span>
                    <span className="font-mono">{isHindi ? "100% सिक्योर" : "Verified"}</span>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Bottom Friendly Trust Badges */}
          <div className="pt-3 mt-3 border-t border-border-default/60 grid grid-cols-3 gap-2 text-center text-[10px] sm:text-[11px] text-text-muted">
            <span className="flex items-center justify-center gap-1">
              <span className="text-accent-lime font-bold">✓</span>
              <span>{isHindi ? "100% ओनर कंट्रोल" : "Owner Managed"}</span>
            </span>
            <span className="flex items-center justify-center gap-1">
              <span className="text-accent-cyan font-bold">✓</span>
              <span>{isHindi ? "2-4 हफ्ते में लाइव" : "Fast Delivery"}</span>
            </span>
            <span className="flex items-center justify-center gap-1">
              <span className="text-accent-violet font-bold">✓</span>
              <span>{isHindi ? "लोकल सपोर्ट" : "Direct Support"}</span>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
