"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import GradientText from "@/components/ui/GradientText";
import { useLanguage } from "@/context/LanguageContext";

interface FAQItem {
  q: string;
  qHi: string;
  a: string;
  aHi: string;
}

const FAQS: FAQItem[] = [
  {
    q: "Do I or my staff need any technical coding knowledge to run the website?",
    qHi: "क्या इसे चलाने के लिए मुझे या मेरी दुकान के स्टाफ को कोडिंग/कंप्यूटर आना चाहिए?",
    a: "Not at all! Every system we build is designed for smartphones. Adding products, changing prices, activating festive discount offers, or viewing today's orders is as simple as sending a message on WhatsApp. We provide a full walkthrough video and 1-on-1 phone training.",
    aHi: "बिल्कुल नहीं! हमारा हर सॉफ्टवेयर स्मार्टफोन के लिए बना होता है। फोटो डालना, रेट बदलना, नए ऑफर्स ऑन करना या आज के ऑर्डर्स देखना WhatsApp चलाने जितना आसान है। हम आपको और आपके स्टाफ को फोन पर पूरा चलाना सिखाते हैं।",
  },
  {
    q: "Are there any hidden monthly subscription charges or ongoing developer fees?",
    qHi: "क्या हर महीने कोई हिडन चार्ज या डेवलपर मेंटेनेंस फीस देनी पड़ेगी?",
    a: "Zero hidden charges. Unlike platforms that trap you with monthly rent (₹2,500-₹5,000/mo), DevLabs builds custom software that is 100% yours. You only pay for standard affordable domain/hosting (which costs just a few hundred rupees per year) and keep full control of your revenue.",
    aHi: "जीरो हिडन चार्ज! Shopify या Wix जैसे टूल्स की तरह कोई हर महीने का ₹3,000-₹5,000 का किराया नहीं लगता। यह सॉफ्टवेयर 100% आपका है। आपको सिर्फ साल का डोमेन/होस्टिंग का नाममात्र चार्ज आता है और सारा मुनाफा सीधे आपके बैंक में रहता है।",
  },
  {
    q: "How many days will it take for my business website to go live?",
    qHi: "मेरी दुकान या बिज़नेस की वेबसाइट कितने दिन में लाइव होकर तैयार हो जाएगी?",
    a: "Most local business websites, digital QR menus, and online stores go live within 2 to 3 weeks. Custom SaaS platforms or large portals take 3 to 5 weeks. Throughout the build, you get weekly demo links to test real progress before final launch.",
    aHi: "ज्यादातर रिटेल शॉप्स, रेस्टोरेंट QR मेनू और ऑनलाइन स्टोर्स 2 से 3 हफ्ते के अंदर पूरी तरह लाइव हो जाते हैं। बड़े कस्टम प्लेटफॉर्म्स में 3 से 5 हफ्ते लगते हैं। हर हफ्ते हम आपको लाइव डेमो लिंक भेजते हैं ताकि आप काम की प्रोग्रेस देख सकें।",
  },
  {
    q: "How does the project payment work?",
    qHi: "पेमेंट का क्या प्रोसेस रहता है?",
    a: "We work on transparent milestone payments: 40% initial deposit after scope confirmation, 30% upon approval of the live test demo, and the final 30% upon deployment and handover of your owner admin panel. No surprises, no sudden price changes.",
    aHi: "पेमेंट पूरी तरह काम के माइलस्टोन्स पर निर्भर होती है: काम शुरू होने पर 40% एडवांस, जब आप लाइव टेस्ट डेमो देखकर संतुष्ट हों तब 30%, और फाइनल लॉन्च व ओनर पैनल की ट्रेनिंग के बाद बाकी 30%। कोई अचानक रेट में बदलाव नहीं होता।",
  },
  {
    q: "Can we meet in person to discuss our business requirements in Uttarakhand / Haldwani?",
    qHi: "क्या हम हल्द्वानी या उत्तराखंड में आमने-सामने मिलकर बातचीत कर सकते हैं?",
    a: "Yes, absolutely! We are proudly based in Haldwani, Nainital (Uttarakhand). If you are in Haldwani, Nainital, Almora, Bhimtal, or nearby regions, we'd love to meet for a cup of tea to understand your business model. For clients across India and globally, we connect over seamless Google Meet or WhatsApp calls.",
    aHi: "जी हाँ, बिल्कुल! हम हल्द्वानी, नैनीताल (उत्तराखंड) में बेस्ड हैं। अगर आप हल्द्वानी, नैनीताल, अल्मोड़ा, भीमताल या आसपास हैं तो हम चाय पर आमने-सामने मिलकर आपके बिज़नेस को समझ सकते हैं। बाकी पूरे भारत और विदेश के क्लाइंट्स के लिए हम WhatsApp या Google Meet कॉल पर कनेक्ट होते हैं।",
  },
];

export default function ShopkeeperFAQ() {
  const { isHindi } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="max-w-4xl mx-auto px-5 sm:px-6 py-14 md:py-18 scroll-mt-20">
      <SectionReveal>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-default bg-bg-card text-xs font-mono text-accent-lime mb-2.5">
            ❓ COMMON QUESTIONS & ANSWERS
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-3 leading-[1.2] py-0.5">
            {isHindi ? "अक्सर पूछे जाने वाले " : "Answers to your "}
            <GradientText from="from-[#A3E635]" to="to-[#22D3EE]">
              {isHindi ? "ज़रूरी सवाल" : "common questions."}
            </GradientText>
          </h2>
          <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
            {isHindi
              ? "छोटे व्यापारियों और दुकानदारों के मन में उठने वाले मुख्य सवालों के स्पष्ट और ईमानदार जवाब:"
              : "Clear, honest answers about our development process, ownership, and pricing:"}
          </p>
        </div>
      </SectionReveal>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          const qText = isHindi ? faq.qHi : faq.q;
          const aText = isHindi ? faq.aHi : faq.a;

          return (
            <SectionReveal key={i} delay={i * 0.05}>
              <div className="rounded-2xl border border-border-default bg-bg-card/90 overflow-hidden transition-colors hover:border-accent-lime/40">
                <button
                  onClick={() => toggle(i)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-text-primary"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-accent-lime font-mono text-xs">0{i + 1}</span>
                    <span>{qText}</span>
                  </span>
                  <span
                    className={`w-6 h-6 rounded-full bg-bg-secondary flex items-center justify-center text-xs text-text-muted transition-transform shrink-0 ${
                      isOpen ? "rotate-180 text-accent-lime" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-border-default/50">
                        {aText}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SectionReveal>
          );
        })}
      </div>
    </section>
  );
}
