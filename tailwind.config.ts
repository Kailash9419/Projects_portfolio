import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#08090B",
          secondary: "#0D0F12",
          tertiary: "#111318",
          card: "#161820",
          "card-hover": "#1C1E28",
        },
        text: {
          primary: "#F5F7FA",
          secondary: "#9CA3AF",
          muted: "#6B7280",
        },
        accent: {
          primary: "#A3E635",
          lime: "#A3E635",
          cyan: "#22D3EE",
          violet: "#8B5CF6",
          orange: "#FB923C",
          pink: "#F472B6",
        },
        border: {
          default: "#1F2937",
          hover: "#374151",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "var(--font-devanagari)", "sans-serif"],
        body: ["var(--font-inter)", "var(--font-devanagari)", "sans-serif"],
        devanagari: ["var(--font-devanagari)", "var(--font-inter)", "sans-serif"],
      },
      animation: {
        "gradient-shift": "gradient-shift 6s ease infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
