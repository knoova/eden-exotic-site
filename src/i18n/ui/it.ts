// Stringhe UI (chrome) — sorgente italiana.
const it = {
  "brand.tagline": "Biotecnologie",
  "lang.label": "Lingua",

  "nav.home": "Home",
  "nav.missione": "Missione",
  "nav.rete": "Rete globale",
  "nav.organigramma": "Organigramma",
  "nav.risultati": "Risultati",
  "nav.esperimenti": "Esperimenti",
  "nav.chat": "Parla coi personaggi",
  "nav.admin": "Admin",

  "footer.site": "Sito",
  "footer.network": "La rete",
  "footer.admin": "Area Admin",
  "footer.rights": "Tutti i diritti riservati.",
  "footer.note": "Sito ufficiale · Next.js + AI locale"
};
export default it;
export type UIDict = Record<keyof typeof it, string> & Record<string, string>;
