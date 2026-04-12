export const defaultLocale = "en";

export const locales = ["en", "fr", "it", "kr", "cn", "ru", "jp"] as const;

export type Locale = (typeof locales)[number];
