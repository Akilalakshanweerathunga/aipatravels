"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enMessages from "@/locales/en.json";
import frMessages from "@/locales/fr.json";
import liMessages from "@/locales/it.json";
import krMessage from "@/locales/kr.json";
import cnMessagee from "@/locales/cn.json";
import ruMessage from "@/locales/ru.json";
import jpMessage from "@/locales/jp.json";


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
      cn: { translation: cnMessagee },
      ru: { translation: ruMessage },
      jp: { translation: jpMessage },
    },
  });

export default i18n;
