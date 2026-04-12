export const defaultLocale = "en";

export const locales = ["en", "fr", "it", "kr", "cn", "ru"] as const;

export type Locale = (typeof locales)[number];
