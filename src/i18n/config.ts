// Configurazione i18n. Lingue: le 4 principali + quelle dei paesi con una sede.
export const LOCALES = [
  { code: "it", label: "Italiano" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "pl", label: "Polski" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
  { code: "nl", label: "Nederlands" },
  { code: "sv", label: "Svenska" },
  { code: "no", label: "Norsk" },
  { code: "ja", label: "日本語" },
  { code: "hi", label: "हिन्दी" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "lg", label: "Luganda" }
] as const;

export type Locale = (typeof LOCALES)[number]["code"];
export const LOCALE_CODES = LOCALES.map((l) => l.code) as Locale[];
export const DEFAULT_LOCALE: Locale = "it";
export const LOCALE_COOKIE = "lang";

export function isLocale(x: unknown): x is Locale {
  return typeof x === "string" && (LOCALE_CODES as string[]).includes(x);
}
export function localeLabel(code: string): string {
  return LOCALES.find((l) => l.code === code)?.label ?? code;
}
