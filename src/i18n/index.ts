"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { defaultLocale } from "./settings";

import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import it from "@/locales/it.json";
import kr from "@/locales/kr.json";
import cn from "@/locales/cn.json";
import ru from "@/locales/ru.json";
import jp from "@/locales/jp.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: defaultLocale,
    debug: false,
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      it: { translation: it },
      kr: { translation: kr },
      cn: { translation: cn },
      ru: { translation: ru },
      jp: { translation: jp },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
