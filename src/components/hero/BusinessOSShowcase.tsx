"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type ActiveTab = "store" | "owner" | "whatsapp";

export default function BusinessOSShowcase() {
  const { t, isHindi } = useLanguage();
  const [activeTab, setActiveTab] = useState<ActiveTab>("store");
  const [orderCount, setOrderCount] = useState(4);
  const [revenue, setRevenue] = useState(16800);
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleSimulateSale = () => {
    setOrderCount((prev) => prev + 1);
    setRevenue((prev) => prev + 2450);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="w-full max-w-lg lg:max-w-xl mx-auto">
      {/* Outer Glow Container */}
      <div className="relative rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-b from-border-default/80 via-border-default/40 to-transparent shadow-2xl backdrop-blur-xl">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-accent-lime/20 via-accent-cyan/15 to-accent-violet/20 blur-xl opacity-70 pointer-events-none" />

        {/* Main Glass Card */}
        <div className="relative bg-bg-card/95 border border-border-default rounded-[18px] sm:rounded-[22px] p-4 sm:p-5 overflow-hidden">
          {/* Top Status Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-border-default mb-3.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-lime opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-lime" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary">
                DevLabs Studio Engine
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent-lime/10 border border-accent-lime/30 text-[10px] sm:text-[11px] font-mono text-accent-lime font-semibold">
              {t.hero.livePreview}
            </div>
          </div>

          {/* Interactive Mode Switcher Tabs for Business Owners */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-bg-primary rounded-xl border border-border-default mb-4">
            <button
              onClick={() => setActiveTab("store")}
              className={`py-1.5 px-1.5 rounded-lg text-xs font-medium transition-all text-center flex items-center justify-center gap-1 ${
                activeTab === "store"
                  ? "bg-bg-card text-accent-lime font-bold shadow-md border border-border-default"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              <span>🛍️</span>
              <span className="truncate">{t.hero.tabStore}</span>
            </button>

            <button
              onClick={() => setActiveTab("owner")}
              className={`py-1.5 px-1.5 rounded-lg text-xs font-medium transition-all text-center flex items-center justify-center gap-1 ${
                activeTab === "owner"
                  ? "bg-bg-card text-accent-cyan font-bold shadow-md border border-border-default"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              <span>📱</span>
              <span className="truncate">{t.hero.tabOwner}</span>
            </button>

            <button
              onClick={() => setActiveTab("whatsapp")}
              className={`py-1.5 px-1.5 rounded-lg text-xs font-medium transition-all text-center flex items-center justify-center gap-1 ${
                activeTab === "whatsapp"
                  ? "bg-bg-card text-[#25D366] font-bold shadow-md border border-border-default"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              <span>💬</span>
              <span className="truncate">{t.hero.tabWhatsApp}</span>
            </button>
          </div>

          {/* Tab Content Panes */}
          <div className="min-h-[190px]">
            <AnimatePresence mode="wait">
              {/* TAB 1: ONLINE DUKAN & UPI ORDERS */}
              {activeTab === "store" && (
                <motion.div
                  key="store"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5"
                >
                  {/* Live Revenue & Order Counter */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 bg-bg-secondary rounded-xl border border-border-default">
                      <span className="text-[10px] uppercase font-mono text-text-muted block">
                        {t.hero.todaySales}
                      </span>
                      <span className="text-xl sm:text-2xl font-bold font-display text-accent-lime">
                        ₹{revenue.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-text-muted block mt-0.5">{t.hero.directBank}</span>
                    </div>
                    <div className="p-3 bg-bg-secondary rounded-xl border border-border-default">
                      <span className="text-[10px] uppercase font-mono text-text-muted block">
                        {t.hero.ordersProcessed}
                      </span>
                      <span className="text-xl sm:text-2xl font-bold font-display text-text-primary">
                        {orderCount} <span className="text-xs text-text-muted font-normal">orders</span>
                      </span>
                      <span className="text-[10px] text-accent-cyan block mt-0.5">{t.hero.autoReceipt}</span>
                    </div>
                  </div>

                  {/* Simulated Incoming Order Stream */}
                  <div className="p-2.5 bg-bg-primary rounded-xl border border-border-default space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-text-primary">
                      <span className="flex items-center gap-1.5 text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
                        {t.hero.livePaymentStream}
                      </span>
                      <span className="text-[10px] font-mono text-accent-lime">{t.hero.instantAlert}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs p-2 bg-bg-card rounded-lg border border-border-default/80">
                      <div className="flex items-center gap-2">
                        <span className="text-accent-lime font-mono font-bold">✓ ₹2,450 Paid</span>
                        <span className="text-text-secondary truncate max-w-[130px] sm:max-w-[180px]">
                          Customer Order #104{orderCount}
                        </span>
                      </div>
                      <span className="text-[10px] text-text-muted font-mono">Just now</span>
                    </div>
                  </div>

                  {/* Interactive Button */}
                  <button
                    onClick={handleSimulateSale}
                    className="w-full py-2 px-3 bg-accent-lime/15 hover:bg-accent-lime/25 border border-accent-lime/50 text-accent-lime rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
                  >
                    <span>{t.hero.testOrderBtn}</span>
                    {showNotification && <span className="font-extrabold text-white">{t.hero.orderReceived}</span>}
                  </button>
                </motion.div>
              )}

              {/* TAB 2: PHONE SE CONTROL (ZERO CODING) */}
              {activeTab === "owner" && (
                <motion.div
                  key="owner"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5"
                >
                  <div className="p-2.5 bg-accent-cyan/10 border border-accent-cyan/30 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-text-primary block">
                        {isHindi ? "ओनर मोबाइल पैनल (0% कोडिंग)" : "Owner Mobile Panel (0% Code)"}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        {isHindi ? "फोन से रेट बदलो, नए ऑफर्स लाइव करो" : "Update prices, timing & offers from phone"}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-accent-cyan bg-bg-primary px-2 py-0.5 rounded-md border border-border-default">
                      Easy
                    </span>
                  </div>

                  {/* Interactive Controls */}
                  <div className="p-2.5 bg-bg-primary rounded-xl border border-border-default space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 bg-bg-card rounded-lg border border-border-default">
                      <span className="text-text-primary font-medium">{isHindi ? "दुकान / स्टोर स्टेटस:" : "Store Live Status:"}</span>
                      <button
                        onClick={() => setIsStoreOpen(!isStoreOpen)}
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                          isStoreOpen
                            ? "bg-accent-lime/20 text-accent-lime border border-accent-lime/40"
                            : "bg-red-500/20 text-red-400 border border-red-500/40"
                        }`}
                      >
                        {isStoreOpen ? "🟢 Open & Online" : "🔴 Store Closed"}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-bg-card rounded-lg border border-border-default">
                      <span className="text-text-primary font-medium">{isHindi ? "त्यौहार / डिस्काउंट ऑफर:" : "Special Offer Banner:"}</span>
                      <button
                        onClick={() => setDiscountApplied(!discountApplied)}
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                          discountApplied
                            ? "bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40"
                            : "bg-bg-secondary text-text-muted border border-border-default"
                        }`}
                      >
                        {discountApplied ? "✓ '10% OFF' Live" : "➕ " + (isHindi ? "ऑफर ऑन करें" : "Turn On Offer")}
                      </button>
                    </div>
                  </div>

                  <div className="p-2 bg-bg-secondary rounded-lg border border-border-default text-center text-[11px] text-text-secondary">
                    💡 {isHindi ? "डेवलपर पर निर्भरता खत्म — सब आपके हाथ में!" : "No developer dependency — full control in your pocket!"}
                  </div>
                </motion.div>
              )}

              {/* TAB 3: WHATSAPP 24/7 LEAD BOT */}
              {activeTab === "whatsapp" && (
                <motion.div
                  key="whatsapp"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5"
                >
                  <div className="p-2.5 bg-[#075E54]/20 border border-[#25D366]/30 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                      <span className="text-xs font-bold text-text-primary">
                        {isHindi ? "ऑटोमैटिक व्हाट्सएप इन्क्वायरी बॉट" : "Automated WhatsApp Lead Bot"}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#25D366] font-mono font-bold">
                      24/7 Active
                    </span>
                  </div>

                  {/* Chat Preview */}
                  <div className="p-2.5 bg-bg-primary rounded-xl border border-border-default space-y-1.5 text-xs">
                    <div className="flex gap-2 items-start">
                      <div className="w-5 h-5 rounded-full bg-accent-cyan/20 text-accent-cyan flex items-center justify-center text-[9px] shrink-0">
                        👤
                      </div>
                      <div className="p-2 bg-bg-secondary rounded-xl rounded-tl-none border border-border-default text-text-secondary text-[11px] max-w-[85%]">
                        {isHindi
                          ? "“नमस्ते! मुझे आपकी सर्विस और प्राइस लिस्ट चाहिए।”"
                          : "“Hi! I want to check your services and booking catalogue.”"}
                      </div>
                    </div>

                    <div className="flex gap-2 items-start justify-end">
                      <div className="p-2 bg-accent-lime/10 border border-accent-lime/30 rounded-xl rounded-tr-none text-text-primary text-[11px] max-w-[85%]">
                        <span className="font-bold text-accent-lime block mb-0.5">DevLabs Automation:</span>
                        {isHindi
                          ? "कैटलॉग & बुकिंग लिंक भेजा गया! नोटिफिकेशन ओनर को मिल गई।"
                          : "Instant catalogue & link sent! Owner notified instantly."}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] px-2.5 py-1.5 bg-bg-secondary rounded-lg text-text-muted border border-border-default">
                    <span>⚡ {isHindi ? "0 मिस्ड इन्क्वायरी" : "0 Missed Inquiries"}</span>
                    <span className="text-[#25D366] font-semibold">{isHindi ? "सीधे व्हाट्सएप पर" : "Direct on WhatsApp"}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Trust Row */}
          <div className="pt-3 mt-2.5 border-t border-border-default flex items-center justify-between text-[10px] sm:text-[11px] text-text-muted">
            <span className="flex items-center gap-1">
              <span className="text-accent-lime font-bold">✓</span> {t.hero.bottomTrust1}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-accent-cyan font-bold">✓</span> {t.hero.bottomTrust2}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-accent-violet font-bold">✓</span> {t.hero.bottomTrust3}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
