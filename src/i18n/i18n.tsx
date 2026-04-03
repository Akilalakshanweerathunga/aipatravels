"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enMessages from "@/locales/en.json";
import frMessages from "@/locales/fr.json";
import liMessages from "@/locales/it.json";
import krMessage from "@/locales/kr.json"

import Cookies from "js-cookie";
import { defaultLocale } from "./settings";

let savedLocale = defaultLocale;

if (typeof window !== "undefined") {
  savedLocale = Cookies.get("NEXT_LOCALE") || defaultLocale;
}

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: defaultLocale,
    lng: savedLocale,
    debug: false,
    interpolation: { escapeValue: false },
    resources: {
      en: { translation: enMessages },
      fr: { translation: frMessages },
      it: { translation: liMessages },
      kr: { translation: krMessage },
    },
  });

export default i18n;
