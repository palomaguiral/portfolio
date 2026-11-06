import es from "@/messages/es.json";
import en from "@/messages/en.json";

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export type Dictionary = typeof es;

// Type-check: the English dictionary must have the same shape as the Spanish one.
const dictionaries: Record<Locale, Dictionary> = { es, en };

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
