import type { L10n } from './types';

// All site copy. Keep it short: a few words per section (see V2_BRIEF.md).
// Hindi written for v2 — needs native-speaker review before launch.

export const contact = {
  phoneDisplay: '+91 81685 46173',
  phoneE164: '918168546173',
  email: 'devbrostudio12@gmail.com',
  instagram: 'https://instagram.com/devlabs.studio',
  city: { en: 'Haldwani, Uttarakhand', hi: 'हल्द्वानी, उत्तराखंड' } satisfies L10n,
};

export const site = {
  name: 'DevLabs',
  meta: {
    title: { en: 'DevLabs — Your business, online', hi: 'DevLabs — आपका बिज़नेस, अब ऑनलाइन' },
    description: {
      en: 'Software studio in Haldwani. Websites, online stores, bookings, SaaS and WhatsApp automation — run from your phone, owned by you.',
      hi: 'हल्द्वानी का सॉफ़्टवेयर स्टूडियो। वेबसाइट, ऑनलाइन स्टोर, बुकिंग, SaaS और WhatsApp ऑटोमेशन — फ़ोन से चलाइए, पूरी तरह आपका।',
    },
  },
  skip: { en: 'Skip to content', hi: 'सीधे कंटेंट पर जाएँ' },
  nav: {
    label: { en: 'Primary', hi: 'मुख्य' },
    work: { en: 'Work', hi: 'काम' },
    contact: { en: 'Contact', hi: 'संपर्क' },
    talk: { en: 'WhatsApp us', hi: 'WhatsApp करें' },
    switchTo: { en: 'हिन्दी', hi: 'English' },
    switchLabel: { en: 'हिन्दी में पढ़ें', hi: 'Read in English' },
  },
  hero: {
    eyebrow: { en: 'Software studio · Haldwani, India', hi: 'सॉफ़्टवेयर स्टूडियो · हल्द्वानी' },
    // Written natively per language — never translate one from the other word-for-word.
    line1: { en: 'Your business,', hi: 'आपका बिज़नेस,' },
    line2: { en: 'online.', hi: 'अब ऑनलाइन।' },
    sub: {
      en: 'Websites, online stores and booking systems for small businesses. You run everything from your phone.',
      hi: 'छोटे कारोबार के लिए वेबसाइट, ऑनलाइन स्टोर और बुकिंग सिस्टम। सब कुछ आप अपने फ़ोन से चलाते हैं।',
    },
    showcase: { en: 'Live projects', hi: 'लाइव प्रोजेक्ट' },
    showing: { en: 'Now showing', hi: 'अभी दिख रहा है' },
    show: { en: 'Show', hi: 'दिखाएँ' },
    pause: { en: 'Pause slideshow', hi: 'स्लाइडशो रोकें' },
    play: { en: 'Play slideshow', hi: 'स्लाइडशो चलाएँ' },
    ctaPrimary: { en: 'Start on WhatsApp', hi: 'WhatsApp पर शुरू करें' },
    ctaSecondary: { en: 'See the work', hi: 'काम देखिए' },
  },
  services: {
    eyebrow: { en: 'Services', hi: 'सेवाएँ' },
    title: { en: 'Five things, done properly.', hi: 'हम क्या बनाते हैं' },
    seenIn: { en: 'Seen in', hi: 'यहाँ देखें' },
    items: [
      // `projects`: slugs of case studies that show this service (first one is the hover preview).
      { name: { en: 'Websites', hi: 'वेबसाइट' }, line: { en: 'Fast, yours, findable.', hi: 'तेज़, आपकी, खोजने लायक।' }, projects: ['level-40-wellness', 'valley-of-birds'] },
      { name: { en: 'Online stores', hi: 'ऑनलाइन स्टोर' }, line: { en: 'UPI straight to your bank.', hi: 'UPI सीधे आपके बैंक में।' }, projects: ['mudkraft', 'level-40-wellness'] },
      { name: { en: 'Bookings', hi: 'बुकिंग' }, line: { en: 'Slots, reminders, no double-booking.', hi: 'स्लॉट, रिमाइंडर, डबल-बुकिंग नहीं।' }, projects: ['bharat-laundry', 'level-40-wellness'] },
      { name: { en: 'SaaS dashboards', hi: 'SaaS डैशबोर्ड' }, line: { en: 'Your operations on one screen.', hi: 'पूरा काम एक स्क्रीन पर।' }, projects: ['bharat-laundry'] },
      { name: { en: 'WhatsApp automation', hi: 'WhatsApp ऑटोमेशन' }, line: { en: 'Orders and replies, on autopilot.', hi: 'ऑर्डर और जवाब, अपने-आप।' }, projects: ['mudkraft'] },
    ],
  },
  work: {
    eyebrow: { en: 'Selected work', hi: 'हमारा काम' },
    title: { en: 'Four businesses we put online.', hi: 'चार कारोबार, जिन्हें हमने ऑनलाइन किया' },
    hint: { en: 'Scroll to browse', hi: 'देखने के लिए स्क्रॉल करें' },
    switcher: { en: 'Choose a project', hi: 'प्रोजेक्ट चुनें' },
    open: { en: 'View project', hi: 'प्रोजेक्ट देखें' },
    offline: { en: 'Site offline', hi: 'साइट अभी बंद है' },
  },
  phone: {
    eyebrow: { en: 'Owner-managed', hi: 'आपके हाथ में' },
    title: { en: 'Run it from your phone.', hi: 'सब कुछ, आपके फ़ोन से।' },
    lede: { en: 'No developer needed for day-to-day changes.', hi: 'रोज़ के बदलावों के लिए डेवलपर की ज़रूरत नहीं।' },
    steps: [
      { title: { en: 'A new order arrives.', hi: 'नया ऑर्डर आया।' }, line: { en: 'You get it instantly, with the customer’s number.', hi: 'तुरंत, ग्राहक के नंबर के साथ।' } },
      { title: { en: 'Change a price.', hi: 'दाम बदलिए।' }, line: { en: 'Two taps. Live on the site.', hi: 'दो टैप। साइट पर तुरंत।' } },
      { title: { en: 'Mark it delivered.', hi: 'डिलीवर मार्क कीजिए।' }, line: { en: 'The customer is told on WhatsApp.', hi: 'ग्राहक को WhatsApp पर ख़बर।' } },
      { title: { en: 'Money lands in your bank.', hi: 'पैसा आपके बैंक में।' }, line: { en: 'UPI, direct. No middleman.', hi: 'सीधा UPI। कोई बिचौलिया नहीं।' } },
    ],
    // Strings shown inside the illustrated phone UI.
    ui: {
      store: { en: 'Your Store', hi: 'आपकी दुकान' },
      greeting: { en: 'Good morning', hi: 'सुप्रभात' },
      today: { en: 'Today', hi: 'आज' },
      orders: { en: 'Orders', hi: 'ऑर्डर' },
      revenue: { en: 'Revenue', hi: 'कमाई' },
      recent: { en: 'Recent orders', hi: 'हाल के ऑर्डर' },
      handi: { en: '2 × Clay handi', hi: '2 × मिट्टी की हांडी' },
      mugs: { en: '6 × Coffee mug', hi: '6 × कॉफ़ी मग' },
      kadhai: { en: '1 × Kadhai', hi: '1 × कड़ाही' },
      statusNew: { en: 'New', hi: 'नया' },
      statusPacked: { en: 'Packed', hi: 'पैक' },
      statusDelivered: { en: 'Delivered', hi: 'डिलीवर' },
      banner: { en: 'New order · ₹1,240', hi: 'नया ऑर्डर · ₹1,240' },
      bannerFrom: { en: 'Asha, Haldwani · 2 × Clay handi', hi: 'आशा, हल्द्वानी · 2 × मिट्टी की हांडी' },
      editPrice: { en: 'Edit price', hi: 'दाम बदलें' },
      product: { en: 'Clay handi', hi: 'मिट्टी की हांडी' },
      save: { en: 'Save', hi: 'सेव करें' },
      waSent: { en: 'WhatsApp sent to Asha', hi: 'आशा को WhatsApp भेजा' },
      upi: { en: '₹1,240 received via UPI', hi: '₹1,240 UPI से मिले' },
      upiTo: { en: 'Credited to your bank', hi: 'आपके बैंक खाते में' },
      tabHome: { en: 'Home', hi: 'होम' },
      tabProducts: { en: 'Products', hi: 'प्रोडक्ट' },
      tabCustomers: { en: 'Customers', hi: 'ग्राहक' },
    },
  },
  proof: {
    eyebrow: { en: 'The deal', hi: 'हमारी शर्तें' },
    title: { en: 'Simple terms.', hi: 'सीधी-सादी शर्तें।' },
    items: [
      { value: { en: '2–4', hi: '2–4' }, label: { en: 'weeks to launch', hi: 'हफ़्ते में लॉन्च' } },
      { value: { en: '₹0', hi: '₹0' }, label: { en: 'monthly fees', hi: 'मासिक फ़ीस' } },
      { value: { en: '100%', hi: '100%' }, label: { en: 'your code, your data', hi: 'आपका कोड, आपका डेटा' } },
      { value: { en: '24h', hi: '24 घं.' }, label: { en: 'reply time', hi: 'में जवाब' } },
    ],
  },
  process: {
    eyebrow: { en: 'Process', hi: 'तरीका' },
    steps: [
      { when: { en: 'Day 1', hi: 'पहला दिन' }, what: { en: 'Discover', hi: 'समझना' }, line: { en: 'One call. Your goals, a fixed quote.', hi: 'एक कॉल। आपके लक्ष्य, तय कीमत।' } },
      { when: { en: 'Week 1', hi: 'पहला हफ़्ता' }, what: { en: 'Design', hi: 'डिज़ाइन' }, line: { en: 'See your site before we build it.', hi: 'बनने से पहले अपनी साइट देखिए।' } },
      { when: { en: 'Weeks 1–4', hi: '1–4 हफ़्ते' }, what: { en: 'Build', hi: 'बनाना' }, line: { en: 'Weekly previews on your phone.', hi: 'हर हफ़्ते फ़ोन पर झलक।' } },
      { when: { en: 'After launch', hi: 'लॉन्च के बाद' }, what: { en: 'Support', hi: 'साथ बने रहना' }, line: { en: 'Changes and fixes, one message away.', hi: 'बदलाव और सुधार, बस एक मैसेज दूर।' } },
    ],
  },
  contact: {
    eyebrow: { en: 'Contact', hi: 'संपर्क' },
    title: { en: 'Let’s talk.', hi: 'आइए, बात करें।' },
    lede: { en: 'Free consultation. Reply within 24 hours.', hi: 'मुफ़्त सलाह। 24 घंटे में जवाब।' },
    needLegend: { en: 'What do you need?', hi: 'आपको क्या चाहिए?' },
    nameLabel: { en: 'Your name (optional)', hi: 'आपका नाम (ज़रूरी नहीं)' },
    whatsapp: { en: 'Send on WhatsApp', hi: 'WhatsApp पर भेजें' },
    email: { en: 'Or email us', hi: 'या ईमेल करें' },
    privacy: {
      en: 'Nothing is stored here. Your message opens in WhatsApp or your email app.',
      hi: 'यहाँ कुछ सेव नहीं होता। मैसेज WhatsApp या ईमेल ऐप में खुलता है।',
    },
    needs: [
      { id: 'website', label: { en: 'Website', hi: 'वेबसाइट' } },
      { id: 'store', label: { en: 'Online store', hi: 'ऑनलाइन स्टोर' } },
      { id: 'bookings', label: { en: 'Bookings', hi: 'बुकिंग' } },
      { id: 'saas', label: { en: 'Dashboard / SaaS', hi: 'डैशबोर्ड / SaaS' } },
      { id: 'whatsapp', label: { en: 'WhatsApp automation', hi: 'WhatsApp ऑटोमेशन' } },
    ],
    messageIntro: { en: 'Hi DevLabs!', hi: 'नमस्ते DevLabs!' },
    messageName: { en: 'I’m {name}.', hi: 'मैं {name} हूँ।' },
    messageNeed: { en: 'I’m interested in: {need}.', hi: 'मुझे इसमें रुचि है: {need}।' },
    messageDefault: { en: 'I’d like to talk about a project.', hi: 'मैं एक प्रोजेक्ट के बारे में बात करना चाहता/चाहती हूँ।' },
  },
  project: {
    back: { en: 'All work', hi: 'सारा काम' },
    visit: { en: 'Visit live site', hi: 'लाइव साइट देखें' },
    offlineNote: {
      en: 'The live site is offline right now. The cover is illustration, not a screenshot.',
      hi: 'लाइव साइट अभी बंद है। कवर एक चित्र है, स्क्रीनशॉट नहीं।',
    },
    problem: { en: 'Before', hi: 'पहले' },
    build: { en: 'What we built', hi: 'हमने क्या बनाया' },
    delivered: { en: 'Delivered', hi: 'डिलीवर किया' },
    stack: { en: 'Stack', hi: 'टेक स्टैक' },
    results: { en: 'Results', hi: 'नतीजे' },
    resultsNote: { en: 'As reported by the client.', hi: 'क्लाइंट के अनुसार।' },
    want: { en: 'Want one like this?', hi: 'ऐसा ही चाहिए?' },
    prev: { en: 'Previous', hi: 'पिछला' },
    next: { en: 'Next', hi: 'अगला' },
    mobileView: { en: 'On a phone', hi: 'फ़ोन पर' },
  },
  footer: {
    rights: { en: 'DevLabs Software Studio', hi: 'DevLabs सॉफ़्टवेयर स्टूडियो' },
    made: { en: 'Made in the hills.', hi: 'पहाड़ों में बना।' },
  },
  notFound: {
    title: { en: 'This page wandered off.', hi: 'यह पेज कहीं भटक गया।' },
    home: { en: 'Back home', hi: 'होम पर लौटें' },
  },
};
