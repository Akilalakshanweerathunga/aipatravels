export const defaultLocale = "en";

export const locales = ["en", "fr", "it", "kr"] as const;

export type Locale = (typeof locales)[number];
