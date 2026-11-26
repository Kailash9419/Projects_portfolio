"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { Language, TRANSLATIONS } from "@/data/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof TRANSLATIONS.en;
  isHindi: boolean;
}

const STORAGE_KEY = "devlabs_lang";
const listeners = new Set<() => void>();
let memoryLanguage: Language | null = null;

function readLanguage(): Language {
  if (memoryLanguage) return memoryLanguage;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "hi") return saved;
  } catch {
    // ignore
  }
  return "en";
}

function subscribeLanguage(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribeLanguage, readLanguage, () => "en" as Language);

  const setLanguage = (lang: Language) => {
    memoryLanguage = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // storage unavailable (private mode) — keep in memory only
    }
    listeners.forEach((l) => l());
  };

  // Keep <html lang> in sync so screen readers and :lang(hi) styles follow the toggle.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    const next = language === "en" ? "hi" : "en";
    setLanguage(next);
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const isHindi = language === "hi";

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isHindi,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
