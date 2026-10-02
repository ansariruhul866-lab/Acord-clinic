"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext({
  lang: "en",
  setLang: () => {},
  t: (en) => en,
  isHindi: false,
});

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("acord_lang");
    if (saved === "en" || saved === "hi") {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem("acord_lang", newLang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLang;
    }
  };

  const t = (en, hi) => {
    if (lang === "hi" && hi) {
      return hi;
    }
    return en;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isHindi: lang === "hi" }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
