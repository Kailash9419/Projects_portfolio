export type Language = "en" | "hi";

/**
 * All UI copy. Deliberately minimal: the site itself is the portfolio piece,
 * so words only appear where an interaction can't say it.
 */
type Copy = {
  nav: { work: string; services: string; process: string; contact: string; cta: string; available: string; menu: string };
  hero: { kicker: string; line1: string; line2: string; ctaPrimary: string; ctaSecondary: string; hint: string };
  services: { index: string; label: string; items: { word: string; line: string }[] };
  manifesto: { base: string[]; reveal: string[]; hint: string };
  work: { index: string; label: string; title: string; all: string; visit: string };
  numbers: { value: string; label: string }[];
  process: { index: string; label: string; steps: { title: string; when: string }[] };
  contact: { index: string; label: string; title: string; titleAccent: string; lede: string; orReach: string };
  form: {
    name: string;
    namePlaceholder: string;
    phone: string;
    type: string;
    typePlaceholder: string;
    types: string[];
    details: string;
    detailsPlaceholder: string;
    submit: string;
    sending: string;
    sentTitle: string;
    sentDesc: string;
    error: string;
    whatsapp: string;
  };
  playground: { hint: string; tapHint: string; tags: string[] };
  footer: { rights: string; built: string };
  workPage: { title: string; titleAccent: string; search: string; all: string; empty: string; sort: { featured: string; newest: string; oldest: string } };
  caseStudy: {
    back: string;
    challenge: string;
    solution: string;
    delivered: string;
    stack: string;
    live: string;
    similar: string;
    next: string;
    prev: string;
  };
};

const en: Copy = {
  nav: { work: "Work", services: "Services", process: "Process", contact: "Contact", cta: "Start a project", available: "Booking new builds", menu: "Menu" },
  hero: {
    kicker: "Software studio · Haldwani, India",
    line1: "We build software",
    line2: "that sells.",
    ctaPrimary: "Start a project",
    ctaSecondary: "See the work",
    hint: "Move your cursor through it",
  },
  services: {
    index: "01",
    label: "What we build",
    items: [
      { word: "Stores", line: "Sell online. UPI straight to your bank." },
      { word: "Bookings", line: "Rooms, tables, slots. Zero commission." },
      { word: "SaaS", line: "Dashboards, billing, teams." },
      { word: "Automation", line: "WhatsApp does the follow-up." },
    ],
  },
  manifesto: {
    base: ["Templates are", "someone else's", "business."],
    reveal: ["Your code.", "Your data.", "₹0 a month."],
    hint: "Look closer",
  },
  work: { index: "02", label: "Selected work", title: "Work", all: "All projects", visit: "Live" },
  numbers: [
    { value: "2–4", label: "Weeks to launch" },
    { value: "₹0", label: "Monthly fees" },
    { value: "100%", label: "Yours to own" },
    { value: "24h", label: "Reply time" },
  ],
  process: {
    index: "03",
    label: "Process",
    steps: [
      { title: "Discover", when: "Day 1" },
      { title: "Design", when: "Week 1" },
      { title: "Build", when: "Weeks 1–4" },
      { title: "Launch", when: "Then we stay" },
    ],
  },
  contact: {
    index: "04",
    label: "Contact",
    title: "Let's",
    titleAccent: "talk.",
    lede: "Free consultation. Reply within 24 hours.",
    orReach: "Or directly",
  },
  form: {
    name: "Name",
    namePlaceholder: "Rahul Sharma",
    phone: "Phone / WhatsApp",
    type: "Need",
    typePlaceholder: "Choose one",
    types: ["Online store", "Website", "Booking system", "SaaS / dashboard", "WhatsApp automation", "Something else"],
    details: "Anything else?",
    detailsPlaceholder: "A line or two about your business",
    submit: "Send",
    sending: "Sending…",
    sentTitle: "Got it.",
    sentDesc: "We'll call or WhatsApp you within 24 hours.",
    error: "Couldn't send. Try WhatsApp instead.",
    whatsapp: "WhatsApp instead",
  },
  playground: {
    hint: "Go on, throw them",
    tapHint: "Tap to shake them",
    tags: ["Stores", "Bookings", "SaaS", "Automation", "UPI", "WhatsApp", "Next.js", "Admin panels", "SEO", "₹0/mo", "Haldwani", "Dashboards"],
  },
  footer: { rights: "All rights reserved.", built: "Designed & built in Haldwani" },
  workPage: {
    title: "All",
    titleAccent: "work.",
    search: "Search",
    all: "All",
    empty: "Nothing matches.",
    sort: { featured: "Featured", newest: "Newest", oldest: "Oldest" },
  },
  caseStudy: {
    back: "All work",
    challenge: "Problem",
    solution: "Build",
    delivered: "Delivered",
    stack: "Stack",
    live: "Visit live site",
    similar: "Want one?",
    next: "Next",
    prev: "Previous",
  },
};

const hi: Copy = {
  nav: { work: "काम", services: "सर्विसेज", process: "प्रोसेस", contact: "संपर्क", cta: "प्रोजेक्ट शुरू करें", available: "नए प्रोजेक्ट्स ले रहे हैं", menu: "मेनू" },
  hero: {
    kicker: "सॉफ्टवेयर स्टूडियो · हल्द्वानी",
    line1: "हम ऐसा सॉफ्टवेयर बनाते हैं",
    line2: "जो बिक्री बढ़ाए।",
    ctaPrimary: "प्रोजेक्ट शुरू करें",
    ctaSecondary: "हमारा काम",
    hint: "कर्सर घुमाकर देखिए",
  },
  services: {
    index: "01",
    label: "हम क्या बनाते हैं",
    items: [
      { word: "दुकान", line: "ऑनलाइन बेचें। UPI सीधे बैंक में।" },
      { word: "बुकिंग", line: "रूम, टेबल, स्लॉट। 0% कमीशन।" },
      { word: "SaaS", line: "डैशबोर्ड, बिलिंग, टीम।" },
      { word: "ऑटोमेशन", line: "फॉलो-अप व्हाट्सएप करेगा।" },
    ],
  },
  manifesto: {
    base: ["टेम्पलेट", "किसी और का", "बिज़नेस है।"],
    reveal: ["आपका कोड।", "आपका डेटा।", "₹0 महीना।"],
    hint: "करीब से देखिए",
  },
  work: { index: "02", label: "चुनिंदा काम", title: "काम", all: "सभी प्रोजेक्ट्स", visit: "लाइव" },
  numbers: [
    { value: "2–4", label: "हफ्ते में लॉन्च" },
    { value: "₹0", label: "मंथली फीस" },
    { value: "100%", label: "मालिकाना हक" },
    { value: "24h", label: "में जवाब" },
  ],
  process: {
    index: "03",
    label: "प्रोसेस",
    steps: [
      { title: "बातचीत", when: "पहला दिन" },
      { title: "डिज़ाइन", when: "पहला हफ्ता" },
      { title: "बिल्ड", when: "हफ्ते 1–4" },
      { title: "लॉन्च", when: "फिर भी साथ" },
    ],
  },
  contact: {
    index: "04",
    label: "संपर्क",
    title: "बात",
    titleAccent: "करें।",
    lede: "फ्री सलाह। 24 घंटे में जवाब।",
    orReach: "या सीधे",
  },
  form: {
    name: "नाम",
    namePlaceholder: "राहुल शर्मा",
    phone: "फोन / व्हाट्सएप",
    type: "ज़रूरत",
    typePlaceholder: "एक चुनें",
    types: ["ऑनलाइन दुकान", "वेबसाइट", "बुकिंग सिस्टम", "SaaS / डैशबोर्ड", "व्हाट्सएप ऑटोमेशन", "कुछ और"],
    details: "और कुछ?",
    detailsPlaceholder: "अपने बिज़नेस के बारे में एक-दो लाइन",
    submit: "भेजें",
    sending: "भेजा जा रहा है…",
    sentTitle: "मिल गया।",
    sentDesc: "हम 24 घंटे में कॉल या व्हाट्सएप करेंगे।",
    error: "भेजा नहीं जा सका। व्हाट्सएप करें।",
    whatsapp: "व्हाट्सएप करें",
  },
  playground: {
    hint: "चलिए, उछालिए",
    tapHint: "टैप करके हिलाइए",
    tags: ["दुकान", "बुकिंग", "SaaS", "ऑटोमेशन", "UPI", "WhatsApp", "Next.js", "एडमिन पैनल", "SEO", "₹0/महीना", "हल्द्वानी", "डैशबोर्ड"],
  },
  footer: { rights: "सर्वाधिकार सुरक्षित।", built: "हल्द्वानी में बना" },
  workPage: {
    title: "सारा",
    titleAccent: "काम।",
    search: "खोजें",
    all: "सभी",
    empty: "कुछ नहीं मिला।",
    sort: { featured: "फीचर्ड", newest: "नए", oldest: "पुराने" },
  },
  caseStudy: {
    back: "सारा काम",
    challenge: "समस्या",
    solution: "समाधान",
    delivered: "डिलीवर किया",
    stack: "टेक",
    live: "लाइव साइट देखें",
    similar: "आपको भी चाहिए?",
    next: "अगला",
    prev: "पिछला",
  },
};

export const TRANSLATIONS: Record<Language, Copy> = { en, hi };
