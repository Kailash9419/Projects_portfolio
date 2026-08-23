// Shared brand & contact data — single source of truth from official brochure
export const BRAND = {
  name: "DevLabs",
  tagline: "Software Studio",
  fullName: "DevLabs Software Studio",
  description:
    "DevLabs is a product studio for small businesses. We design and build SaaS platforms, modern websites and automation tools — owner-managed from simple admin panels, so running them never requires a developer.",
  motto: "Building software that works as hard as you do.",
  foundedYear: 2023,
} as const;

export const LOCATION = {
  city: "Haldwani",
  district: "Nainital",
  state: "Uttarakhand",
  country: "India",
  shortLabel: "Haldwani, Uttarakhand",
  fullLabel: "Haldwani, Nainital, Uttarakhand, India",
  workingScope: "India · Working worldwide",
} as const;

export const CONTACT = {
  email: "devbrostudio12@gmail.com",
  phones: ["+91 81685 46173", "+91 70176 28078", "+91 72174 37277"],
  whatsapp: {
    number: "918168546173",
    link: "https://wa.me/918168546173",
    displayNumber: "+91 81685 46173",
  },
} as const;

export const SOCIAL = {
  instagram: {
    url: "https://instagram.com/devlabs.studio",
    handle: "@devlabs.studio",
  },
  github: { url: "#", handle: "" },
  twitter: { url: "#", handle: "" },
  linkedin: { url: "#", handle: "" },
} as const;

export const STATS = [
  { value: "10+", label: "Products Shipped" },
  { value: "4", label: "Live in the Wild" },
  { value: "100%", label: "Small-Business Focus" },
  { value: "24h", label: "Response Time" },
] as const;

export const SERVICE_TAGS = [
  "SaaS Products",
  "Websites & Web Apps",
  "Business Automation",
  "Admin Dashboards",
  "E-commerce & Booking",
] as const;

export const WHY_DEVLABS = [
  {
    num: "01",
    title: "You stay in control",
    desc: "Every product ships with a simple admin panel — the software is yours, the content is yours, no developer needed day-to-day.",
    icon: "shield",
  },
  {
    num: "02",
    title: "No surprises",
    desc: "Fixed scopes, clear pricing and weekly demos. You always know exactly where your project stands at every milestone.",
    icon: "check",
  },
  {
    num: "03",
    title: "Built to last",
    desc: "Stable, widely-adopted technology — fast today, maintainable for years, and we stay on for support and growth.",
    icon: "rocket",
  },
] as const;

export const SEO = {
  siteUrl: "https://devlabs.studio",
  defaultTitle: "DevLabs — Software Studio | Haldwani, Uttarakhand",
  defaultDescription:
    "DevLabs is a product studio for small businesses. We design and build SaaS platforms, websites, and automation tools — owner-managed, no developer needed.",
  keywords: [
    "DevLabs",
    "software studio",
    "Haldwani",
    "Uttarakhand",
    "Nainital",
    "web developer Haldwani",
    "website design Uttarakhand",
    "SaaS",
    "web development",
    "business automation",
    "small business",
    "e-commerce",
  ],
} as const;
