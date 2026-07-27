// Loader delle stringhe UI. Ogni lingua fa fallback sull'italiano per le chiavi mancanti.
import type { Locale } from "./config";
import it from "./ui/it";
import en from "./ui/en";
import fr from "./ui/fr";
import pl from "./ui/pl";
import de from "./ui/de";
import es from "./ui/es";
import pt from "./ui/pt";
import nl from "./ui/nl";
import sv from "./ui/sv";
import no from "./ui/no";
import ja from "./ui/ja";
import hi from "./ui/hi";
import id from "./ui/id";
import lg from "./ui/lg";

export type UIDict = Record<string, string>;
const DICTS: Record<Locale, UIDict> = { it, en, fr, pl, de, es, pt, nl, sv, no, ja, hi, id, lg };

export function getUI(locale: Locale): UIDict {
  return { ...it, ...(DICTS[locale] || {}) };
}
export function makeT(locale: Locale) {
  const d = getUI(locale);
  return (key: string) => d[key] ?? key;
}
export type T = ReturnType<typeof makeT>;
