"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import GradientText from "@/components/ui/GradientText";
import MagneticButton from "@/components/ui/MagneticButton";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT } from "@/data/brand";

type BusinessCategory = "retail" | "restaurant" | "hotel" | "clinic" | "agency";

interface SolutionData {
  id: BusinessCategory;
  emoji: string;
  name: string;
  nameHi: string;
  problem: string;
  problemHi: string;
  solutionTitle: string;
  solutionTitleHi: string;
  features: string[];
  featuresHi: string[];
  deliveryTime: string;
  deliveryTimeHi: string;
  whatsappPrefill: string;
}

const SOLUTIONS: Record<BusinessCategory, SolutionData> = {
  retail: {
    id: "retail",
    emoji: "🛍️",
    name: "Retail Shop & Dukan",
    nameHi: "दुकान / रिटेल स्टोर",
    problem: "Customers browse in shop but buy online; inventory & manual WhatsApp orders are messy.",
    problemHi: "दुकान पर भीड़ होती है लेकिन ऑनलाइन बिक्री नहीं हो पाती; रजिस्टर में हिसाब रखना पड़ता है।",
    solutionTitle: "Online Dukan + Direct UPI Checkout + Phone Admin",
    solutionTitleHi: "ऑनलाइन दुकान + सीधे बैंक में UPI पेमेंट + फोन से कंट्रोल",
    features: [
      "100% Mobile Storefront with ₹ Price Tags",
      "Direct UPI / QR Payment into your bank account",
      "Add/edit new products from phone in 10 seconds",
      "Automatic customer invoices on WhatsApp",
    ],
    featuresHi: [
      "फोन पर चलने वाली सुंदर ऑनलाइन दुकान",
      "सीधे आपके बैंक खाते में UPI / QR पेमेंट (0% कमीशन)",
      "फोन से 10 सेकंड में नए सामान और रेट जोड़ें",
      "कस्टमर को तुरंत व्हाट्सएप पर डिजिटल रसीद",
    ],
    deliveryTime: "2 Weeks to Live",
    deliveryTimeHi: "2 हफ्ते में लाइव",
    whatsappPrefill: "Hi DevLabs! I run a retail shop/dukan and want to discuss setting up an online store with UPI.",
  },
  restaurant: {
    id: "restaurant",
    emoji: "🍽️",
    name: "Café, Restaurant & Bakery",
    nameHi: "कैफ़े / रेस्टोरेंट / बेकरी",
    problem: "Zomato/Swiggy charge 25-30% high commissions; printed menus get outdated quickly.",
    problemHi: "Zomato/Swiggy 25-30% कमीशन काटते हैं; हर बार रेट बदलने पर नया मेनू प्रिंट कराना पड़ता है।",
    solutionTitle: "Digital QR Menu + Zero-Commission Orders + Table Booking",
    solutionTitleHi: "डिजिटल QR मेनू + 0% कमीशन ऑर्डर्स + टेबल बुकिंग",
    features: [
      "Scan QR Code for Interactive Photo Menu",
      "Zero-commission direct takeout/delivery orders",
      "Online table reservation with instant WhatsApp alert",
      "Google Maps local SEO optimization",
    ],
    featuresHi: [
      "टेबल पर QR स्कैन करके फोटो वाला मेनू",
      "बिना किसी थर्ड-पार्टी कमीशन के डायरेक्ट डिलीवरी ऑर्डर्स",
      "व्हाट्सएप पर तुरंत टेबल बुकिंग कन्फर्मेशन",
      "Google Maps पर टॉप रैंकिंग ताकि पर्यटक आसानी से खोजें",
    ],
    deliveryTime: "2-3 Weeks to Live",
    deliveryTimeHi: "2-3 हफ्ते में लाइव",
    whatsappPrefill: "Hi DevLabs! I own a café/restaurant and want a digital QR menu & direct ordering system.",
  },
  hotel: {
    id: "hotel",
    emoji: "🏨",
    name: "Hotel, Resort & Homestay",
    nameHi: "होटल / रिसॉर्ट / होमस्टे",
    problem: "MakeMyTrip/Booking.com take 18-22% cut; direct customer inquiries get delayed.",
    problemHi: "MakeMyTrip/Goibibo 18-22% कमीशन ले लेते हैं; फोन पर रूम बुकिंग मैनेज करना मुश्किल होता है।",
    solutionTitle: "Direct Booking Engine + Room Photo Showcase + WhatsApp Bot",
    solutionTitleHi: "डायरेक्ट रूम बुकिंग पोर्टल + फोटो गैलरी + 24/7 व्हाट्सएप बॉट",
    features: [
      "Direct room reservation with advance payment integration",
      "Fast, high-res photo gallery of property & valley views",
      "24/7 automated WhatsApp inquiry bot for room rates",
      "Local sightseeing & tour packages add-on",
    ],
    featuresHi: [
      "कस्टमर से सीधे एडवांस पेमेंट लेकर रूम बुकिंग",
      "होटल और व्यू की खूबसूरत हाई-स्पीड फोटो गैलरी",
      "रात में भी ऑटोमैटिक रेट्स और रूम अवेलेबिलिटी बताने वाला बॉट",
      "टूरिस्ट पैकेज और टैक्सी सर्विस बुकिंग",
    ],
    deliveryTime: "3 Weeks to Live",
    deliveryTimeHi: "3 हफ्ते में लाइव",
    whatsappPrefill: "Hi DevLabs! I have a hotel/resort/homestay and want a direct room booking website.",
  },
  clinic: {
    id: "clinic",
    emoji: "🩺",
    name: "Doctor Clinic & Salon",
    nameHi: "डॉक्टर क्लिनिक / सैलून / थेरेपी",
    problem: "Patients/clients wait in long queues; receptionist is flooded with appointment phone calls.",
    problemHi: "मरीजों/ग्राहकों को लंबी लाइन में लगना पड़ता है; फोन पर टाइम स्लॉट मैनेज करना सिरदर्द बन जाता है।",
    solutionTitle: "Appointment Slot Booking + WhatsApp Reminders + Patient Records",
    solutionTitleHi: "टाइम स्लॉट बुकिंग + ऑटोमैटिक व्हाट्सएप रिमाइंडर + ओनर पैनल",
    features: [
      "Patients pick available date & time slot online",
      "Automated WhatsApp reminder 2 hours before appointment",
      "Simple doctor/reception dashboard on tablet/phone",
      "Google Review booster integration",
    ],
    featuresHi: [
      "मरीज खुद ऑनलाइन खाली समय देखकर स्लॉट चुन सकते हैं",
      "अपॉइंटमेंट से 2 घंटे पहले व्हाट्सएप पर ऑटोमैटिक याद दिलाना",
      "फोन/टैबलेट पर आसान टोकन और बुकिंग डैशबोर्ड",
      "कस्टमर से Google 5-Star रिव्यूज पाने का सिस्टम",
    ],
    deliveryTime: "2-3 Weeks to Live",
    deliveryTimeHi: "2-3 हफ्ते में लाइव",
    whatsappPrefill: "Hi DevLabs! I want an appointment booking & WhatsApp reminder system for my clinic/salon.",
  },
  agency: {
    id: "agency",
    emoji: "📦",
    name: "Custom Startup / Service",
    nameHi: "कस्टम स्टार्टअप / सर्विस एजेंसी",
    problem: "Standard ready-made tools don't fit your unique workflow or billing model.",
    problemHi: "मार्केट के रेडीमेड टूल्स आपके बिज़नेस के हिसाब से फिट नहीं बैठते।",
    solutionTitle: "Tailored SaaS Platform + Role Dashboards + Cloud Automation",
    solutionTitleHi: "कस्टम सॉफ्टवेयर + टीम डैशबोर्ड + ऑटोमेशन",
    features: [
      "Custom business workflow engineered from scratch",
      "Multi-user roles with permissions and billing",
      "Secure cloud database with automatic daily backups",
      "Full source code ownership & lifetime support",
    ],
    featuresHi: [
      "आपकी जरूरत के हिसाब से खास तैयार किया गया सॉफ्टवेयर",
      "टीम के लिए अलग-अलग लॉगिन और बिलिंग मैनेजमेंट",
      "सुरक्षित क्लाउड स्टोरेज और डेली बैकअप",
      "100% कोड ओनरशिप और परमानेंट सपोर्ट",
    ],
    deliveryTime: "3-5 Weeks to Live",
    deliveryTimeHi: "3-5 हफ्ते में लाइव",
    whatsappPrefill: "Hi DevLabs! I have a custom SaaS / software requirement and would like to discuss it.",
  },
};

export default function BusinessSolutionFinder() {
  const { isHindi } = useLanguage();
  const [selected, setSelected] = useState<BusinessCategory>("retail");

  const current = SOLUTIONS[selected];

  return (
    <section id="solution-finder" className="max-w-7xl mx-auto px-5 sm:px-6 py-14 md:py-18 scroll-mt-20">
      <SectionReveal>
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-default bg-bg-card text-xs font-mono text-accent-lime mb-2.5">
            ⚡ INTERACTIVE SOLUTION FINDER
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-3 leading-[1.2] py-0.5">
            {isHindi ? "अपने बिज़नेस के लिए " : "Find the exact software for "}
            <GradientText from="from-[#A3E635]" to="to-[#22D3EE]">
              {isHindi ? "परफेक्ट सॉफ्टवेयर चुनें" : "your business model."}
            </GradientText>
          </h2>
          <p className="text-text-secondary text-sm sm:text-base">
            {isHindi
              ? "नीचे अपने बिज़नेस का प्रकार चुनें और देखें कि हम आपके काम को कैसे आसान और ऑटोमैटिक बना सकते हैं:"
              : "Select your business type below to see recommended features, delivery timeline, and direct estimate:"}
          </p>
        </div>
      </SectionReveal>

      {/* Category Pills Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
        {(Object.keys(SOLUTIONS) as BusinessCategory[]).map((cat) => {
          const item = SOLUTIONS[cat];
          const isActive = selected === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                isActive
                  ? "bg-accent-lime text-bg-primary font-bold shadow-lg shadow-accent-lime/20 scale-[1.02]"
                  : "bg-bg-card border border-border-default text-text-secondary hover:text-text-primary hover:border-accent-lime/40"
              }`}
            >
              <span>{item.emoji}</span>
              <span>{isHindi ? item.nameHi : item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Selected Solution Showcase Card */}
      <div className="relative rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-b from-bg-card via-bg-card/90 to-bg-secondary border border-border-default shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent-lime/[0.04] rounded-full blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left: Problem & Solution Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl p-2.5 rounded-2xl bg-bg-primary border border-border-default">
                  {current.emoji}
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase text-accent-lime tracking-wider font-bold block">
                    {isHindi ? "सुझाया गया डिजिटल सिस्टम:" : "Recommended Digital System:"}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-text-primary">
                    {isHindi ? current.solutionTitleHi : current.solutionTitle}
                  </h3>
                </div>
              </div>

              {/* The Challenge Card */}
              <div className="p-3.5 rounded-xl bg-red-500/[0.07] border border-red-500/20 text-xs sm:text-sm text-text-secondary">
                <span className="font-bold text-red-400 block mb-1">
                  {isHindi ? "⚠️ आम समस्या:" : "⚠️ Common Pain Point:"}
                </span>
                {isHindi ? current.problemHi : current.problem}
              </div>

              {/* Features Grid */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-text-muted font-bold block">
                  {isHindi ? "शामिल मुख्य फीचर्स:" : "Key Features Delivered:"}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(isHindi ? current.featuresHi : current.features).map((feat, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-bg-primary border border-border-default/80 flex items-start gap-2 text-xs text-text-primary"
                    >
                      <span className="text-accent-lime font-bold mt-0.5">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Timeline & WhatsApp Action Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-bg-primary/90 border border-border-default space-y-4 text-center">
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block">
                {isHindi ? "डिलीवरी व लॉन्च समय" : "Estimated Launch Time"}
              </span>

              <div className="py-2">
                <span className="text-3xl sm:text-4xl font-black font-display text-accent-lime block mb-1">
                  {isHindi ? current.deliveryTimeHi : current.deliveryTime}
                </span>
                <span className="text-xs text-text-secondary">
                  {isHindi ? "100% रेडी टू यूज़ + ओनर ट्रेनिंग" : "Complete setup with 0 developer dependency"}
                </span>
              </div>

              <div className="pt-2">
                <MagneticButton
                  href={`${CONTACT.whatsapp.link}?text=${encodeURIComponent(current.whatsappPrefill)}`}
                  className="w-full bg-accent-lime text-bg-primary font-bold px-6 py-3.5 rounded-xl hover:bg-accent-lime/90 transition-all text-xs sm:text-sm shadow-xl shadow-accent-lime/20 flex items-center justify-center gap-2"
                >
                  <span>💬</span>
                  <span>{isHindi ? "व्हाट्सएप पर फ्री कोटेशन लें →" : "Get Free WhatsApp Quote →"}</span>
                </MagneticButton>
              </div>

              <p className="text-[10px] text-text-muted font-mono">
                🔒 No Obligation · Free 15-min Scope Discussion
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
