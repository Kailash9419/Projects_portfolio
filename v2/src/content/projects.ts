import type { Project } from './types';

import l40Desktop from '../assets/projects/level-40-wellness-desktop.png';
import l40Mobile from '../assets/projects/level-40-wellness-mobile.png';
import mudDesktop from '../assets/projects/mudkraft-desktop.png';
import mudMobile from '../assets/projects/mudkraft-mobile.png';
import vobDesktop from '../assets/projects/valley-of-birds-desktop.png';
import vobMobile from '../assets/projects/valley-of-birds-mobile.png';
import blDesktop from '../assets/projects/bharat-laundry-desktop.png';
import blMobile from '../assets/projects/bharat-laundry-mobile.png';
import l40Detail from '../assets/projects/level-40-wellness-detail.png';
import mudDetail from '../assets/projects/mudkraft-detail.png';
import blDetail from '../assets/projects/bharat-laundry-detail.png';

// Source: v1 build output (Projects_portfolio/.next). Hindi written for v2 — needs native review.
// Metrics carried over from v1 and flagged verified:false until the owner confirms them.
export const projects: Project[] = [
  {
    id: 'p01',
    slug: 'level-40-wellness',
    order: 1,
    year: 2024,
    name: 'Level 40 Wellness',
    kind: { en: 'Café · Store · Bookings', hi: 'कैफ़े · स्टोर · बुकिंग' },
    tagline: { en: 'A wellness café, fully online.', hi: 'एक वेलनेस कैफ़े, पूरी तरह ऑनलाइन।' },
    summary: {
      en: 'Dining, nutritionist-guided meal plans, a retail store and workshops — one brand, one checkout.',
      hi: 'खाना, न्यूट्रिशनिस्ट के मील प्लान, रिटेल स्टोर और वर्कशॉप — एक ब्रांड, एक चेकआउट।',
    },
    problem: {
      en: 'Bookings on WhatsApp, stock on spreadsheets, no way to find the menu online.',
      hi: 'बुकिंग WhatsApp पर, स्टॉक स्प्रेडशीट में, और मेन्यू ऑनलाइन कहीं नहीं।',
    },
    build: {
      en: 'A mobile-first platform with ordering, session booking, a product store and an owner-run dashboard.',
      hi: 'मोबाइल-फ़र्स्ट प्लेटफ़ॉर्म — ऑर्डर, सेशन बुकिंग, प्रोडक्ट स्टोर और मालिक का अपना डैशबोर्ड।',
    },
    delivered: [
      { en: 'Online menu & ordering', hi: 'ऑनलाइन मेन्यू और ऑर्डर' },
      { en: 'Session booking', hi: 'सेशन बुकिंग' },
      { en: 'Product store & cart', hi: 'प्रोडक्ट स्टोर और कार्ट' },
      { en: 'Loyalty program', hi: 'लॉयल्टी प्रोग्राम' },
      { en: 'Owner dashboard', hi: 'मालिक का डैशबोर्ड' },
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Vercel'],
    metrics: [
      { value: '3×', label: { en: 'online orders', hi: 'ऑनलाइन ऑर्डर' }, verified: false },
      { value: '+65%', label: { en: 'booking rate', hi: 'बुकिंग दर' }, verified: false },
      { value: '6 wk', label: { en: 'to launch', hi: 'में लॉन्च' }, verified: false },
    ],
    liveUrl: 'https://level40wellness.com',
    status: 'live',
    cover: l40Desktop,
    coverMobile: l40Mobile,
    detail: l40Detail,
    detailAlt: {
      en: 'Level 40 Wellness about section: a turmeric latte beside the café story.',
      hi: 'Level 40 Wellness का परिचय: कैफ़े की कहानी के साथ हल्दी वाला लाटे।',
    },
    coverAlt: {
      en: 'Level 40 Wellness home page: “First wellness integrated café” beside photos of coffee, yoga and meal boxes.',
      hi: 'Level 40 Wellness का होम पेज: कॉफ़ी, योग और मील बॉक्स की तस्वीरों के साथ “First wellness integrated café”।',
    },
    coverIsArtwork: false,
    accent: '#c9a45c',
  },
  {
    id: 'p02',
    slug: 'mudkraft',
    order: 2,
    year: 2024,
    name: 'Mudkraft',
    kind: { en: 'Online store', hi: 'ऑनलाइन स्टोर' },
    tagline: { en: 'A pottery studio, taken online.', hi: 'मिट्टी के बर्तनों का स्टूडियो, अब ऑनलाइन।' },
    summary: {
      en: 'The owner runs the whole catalogue from an admin panel; customers buy online or enquire on WhatsApp.',
      hi: 'मालिक पूरा कैटलॉग एडमिन पैनल से चलाते हैं; ग्राहक ऑनलाइन ख़रीदते हैं या WhatsApp पर पूछते हैं।',
    },
    problem: {
      en: 'Selling only through Instagram DMs and local markets. No catalogue, no online payments, no order tracking.',
      hi: 'बिक्री सिर्फ़ Instagram DM और लोकल बाज़ार से। न कैटलॉग, न ऑनलाइन पेमेंट, न ऑर्डर ट्रैकिंग।',
    },
    build: {
      en: 'A storefront that feels like the craft, with an admin panel for stock, orders and customers.',
      hi: 'कारीगरी जैसा दिखने वाला स्टोरफ़्रंट, और स्टॉक, ऑर्डर व ग्राहकों के लिए एडमिन पैनल।',
    },
    delivered: [
      { en: 'Artisan product pages', hi: 'कारीगरी वाले प्रोडक्ट पेज' },
      { en: 'Razorpay payments', hi: 'Razorpay पेमेंट' },
      { en: 'Order tracking', hi: 'ऑर्डर ट्रैकिंग' },
      { en: 'Inventory admin', hi: 'इन्वेंटरी एडमिन' },
      { en: 'Image CDN gallery', hi: 'इमेज CDN गैलरी' },
    ],
    stack: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Razorpay', 'Cloudinary'],
    metrics: [
      { value: '2.5×', label: { en: 'revenue', hi: 'कमाई' }, verified: false },
      { value: '120+', label: { en: 'products online', hi: 'प्रोडक्ट ऑनलाइन' }, verified: false },
    ],
    liveUrl: 'https://mudkraft.com',
    status: 'live',
    cover: mudDesktop,
    coverMobile: mudMobile,
    detail: mudDetail,
    detailAlt: {
      en: 'Mudkraft shop: clay cookware cards with filters and prices from ₹430 to ₹1,500.',
      hi: 'Mudkraft की दुकान: फ़िल्टर और ₹430 से ₹1,500 तक के दाम वाले मिट्टी के बर्तन।',
    },
    coverAlt: {
      en: 'Mudkraft home page: “10 pieces. One wheel.” next to a clay cooking pot on a cream disc.',
      hi: 'Mudkraft का होम पेज: क्रीम रंग की डिस्क पर मिट्टी की हांडी के साथ “10 pieces. One wheel.”।',
    },
    coverIsArtwork: false,
    accent: '#c2643a',
  },
  {
    id: 'p03',
    slug: 'valley-of-birds',
    order: 3,
    year: 2023,
    name: 'Valley of Birds',
    kind: { en: 'Travel · Leads', hi: 'ट्रैवल · लीड्स' },
    tagline: { en: 'Bird expeditions in Kumaon.', hi: 'कुमाऊँ में पक्षी यात्राएँ।' },
    summary: {
      en: 'Treks, gallery and socials in one place, with every enquiry landing in a single view.',
      hi: 'ट्रेक, गैलरी और सोशल एक जगह, और हर पूछताछ एक ही स्क्रीन पर।',
    },
    problem: {
      en: 'Word of mouth only. No way to capture leads, show upcoming trips or manage bookings.',
      hi: 'सिर्फ़ मुँह-ज़बानी प्रचार। न लीड पकड़ने का तरीक़ा, न आने वाली यात्राएँ दिखाने का, न बुकिंग संभालने का।',
    },
    build: {
      en: 'An image-led site with smart enquiry forms and a dashboard to edit treks and follow up leads.',
      hi: 'तस्वीरों से भरी साइट, स्मार्ट पूछताछ फ़ॉर्म, और ट्रेक बदलने व लीड फ़ॉलो-अप का डैशबोर्ड।',
    },
    delivered: [
      { en: 'Expedition showcase', hi: 'यात्राओं का शोकेस' },
      { en: 'Lead capture forms', hi: 'लीड कैप्चर फ़ॉर्म' },
      { en: 'Trip schedules', hi: 'यात्रा शेड्यूल' },
      { en: 'Photo gallery', hi: 'फ़ोटो गैलरी' },
      { en: 'Editable treks', hi: 'बदलने लायक ट्रेक' },
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS S3'],
    metrics: [
      { value: '+40%', label: { en: 'lead conversion', hi: 'लीड कन्वर्ज़न' }, verified: false },
      { value: '2×', label: { en: 'bookings', hi: 'बुकिंग' }, verified: false },
    ],
    liveUrl: 'https://valleyofbird.vercel.app',
    // Checked 2026-11-27: the URL returns 404 DEPLOYMENT_NOT_FOUND.
    status: 'offline',
    cover: vobDesktop,
    coverMobile: vobMobile,
    detail: vobDesktop,
    detailAlt: {
      en: 'Illustration: layered Kumaon hills at sunset with birds in flight.',
      hi: 'चित्र: सूर्यास्त में कुमाऊँ की पहाड़ियाँ और उड़ते पक्षी।',
    },
    coverAlt: {
      en: 'Illustration: layered Kumaon hills at sunset with birds in flight.',
      hi: 'चित्र: सूर्यास्त में कुमाऊँ की पहाड़ियाँ और उड़ते पक्षी।',
    },
    coverIsArtwork: true,
    accent: '#e9b77c',
  },
  {
    id: 'p04',
    slug: 'bharat-laundry',
    order: 4,
    year: 2024,
    name: 'Bharat Laundry',
    kind: { en: 'SaaS · Operations', hi: 'SaaS · ऑपरेशंस' },
    tagline: { en: 'Doorstep laundry, run from a phone.', hi: 'घर-घर लॉन्ड्री, फ़ोन से चलती है।' },
    summary: {
      en: 'Customers book pickups online; the owner runs orders from an admin portal; auto-printed cloth tags keep garments apart.',
      hi: 'ग्राहक ऑनलाइन पिकअप बुक करते हैं; मालिक एडमिन पोर्टल से ऑर्डर चलाते हैं; अपने-आप बने टैग कपड़े मिलने नहीं देते।',
    },
    problem: {
      en: 'Pickups by phone call and WhatsApp. No tracking, manual pricing, missed orders.',
      hi: 'पिकअप फ़ोन और WhatsApp से। न ट्रैकिंग, हाथ से दाम, और छूटते ऑर्डर।',
    },
    build: {
      en: 'Two sides: a customer app for pickups and tracking, and an admin portal for orders, drivers and pricing rules.',
      hi: 'दो हिस्से: पिकअप और ट्रैकिंग के लिए ग्राहक ऐप, और ऑर्डर, ड्राइवर व दाम तय करने के लिए एडमिन पोर्टल।',
    },
    delivered: [
      { en: 'Pickup scheduling', hi: 'पिकअप शेड्यूलिंग' },
      { en: 'Live order tracking', hi: 'लाइव ऑर्डर ट्रैकिंग' },
      { en: 'Driver assignment', hi: 'ड्राइवर असाइनमेंट' },
      { en: 'Automatic pricing', hi: 'ऑटोमैटिक प्राइसिंग' },
      { en: 'Razorpay payments', hi: 'Razorpay पेमेंट' },
    ],
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Google Maps', 'Razorpay'],
    metrics: [
      { value: '4×', label: { en: 'order volume', hi: 'ऑर्डर' }, verified: false },
      { value: '−90%', label: { en: 'missed orders', hi: 'छूटे ऑर्डर' }, verified: false },
      { value: '8 wk', label: { en: 'to launch', hi: 'में लॉन्च' }, verified: false },
    ],
    liveUrl: 'https://bharat-laundary.vercel.app',
    status: 'live',
    cover: blDesktop,
    coverMobile: blMobile,
    detail: blDetail,
    detailAlt: {
      en: 'Bharat Laundry “How it works”: a pickup partner collecting a laundry bag, beside four steps.',
      hi: 'Bharat Laundry “कैसे काम करता है”: लॉन्ड्री बैग लेती पिकअप पार्टनर, साथ में चार स्टेप।',
    },
    coverAlt: {
      en: 'Bharat Laundry home page: “Laundry day, handled for you.” with a photo of folded clothes and shirts on hangers.',
      hi: 'Bharat Laundry का होम पेज: तह किए कपड़ों और हैंगर पर शर्ट की फ़ोटो के साथ “Laundry day, handled for you.”।',
    },
    coverIsArtwork: false,
    accent: '#1aa3a8',
  },
];

export const projectsInOrder = [...projects].sort((a, b) => a.order - b.order);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Previous / next project, wrapping around. */
export function neighbours(slug: string): { prev: Project; next: Project } {
  const list = projectsInOrder;
  const i = list.findIndex((p) => p.slug === slug);
  if (i < 0) throw new Error(`Unknown project: ${slug}`);
  return {
    prev: list[(i - 1 + list.length) % list.length]!,
    next: list[(i + 1) % list.length]!,
  };
}
