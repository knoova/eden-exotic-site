// Overlay di traduzione dei contenuti: sovrappone le stringhe tradotte agli
// oggetti del canon (che restano la struttura sorgente), con fallback all'italiano.
import type { Locale } from "./config";

export type Overlay = Record<string, unknown>;
const cache: Partial<Record<Locale, Overlay>> = {};

export async function loadOverlay(locale: Locale): Promise<Overlay> {
  if (locale === "it") return {};
  if (cache[locale]) return cache[locale]!;
  try {
    const m = await import(`./content/${locale}.json`);
    cache[locale] = ((m as any).default ?? m) as Overlay;
  } catch {
    cache[locale] = {};
  }
  return cache[locale]!;
}

function has(ov: Overlay): boolean {
  return Object.keys(ov).length > 0;
}
function g<T>(ov: Overlay, key: string, fallback: T): T {
  const v = ov[key];
  return (v === undefined || v === null ? fallback : (v as T));
}

// Applica i campi tradotti a una lista di entità con `id`.
function mapList<T extends { id?: string | number }>(
  list: T[],
  ov: Overlay,
  type: string,
  fields: (keyof T)[]
): T[] {
  if (!has(ov)) return list;
  return list.map((item) => {
    const id = (item as any).id;
    const out: any = { ...item };
    for (const f of fields) {
      const k = `${type}.${id}.${String(f)}`;
      if (ov[k] !== undefined && ov[k] !== null) out[f] = ov[k];
    }
    return out as T;
  });
}

export async function locFacilities<T extends { id?: string }>(list: T[], locale: Locale) {
  const ov = await loadOverlay(locale);
  return mapList(list as any, ov, "facility", ["nome", "tema", "sommario", "descrizione", "specie", "paese", "citta"] as any) as unknown as T[];
}
export async function locPeople<T extends { id?: string }>(list: T[], locale: Locale) {
  const ov = await loadOverlay(locale);
  return mapList(list as any, ov, "person", ["ruolo", "bio", "voce", "background", "competenze"] as any) as unknown as T[];
}
export async function locSpecimens<T extends { id?: string }>(list: T[], locale: Locale) {
  const ov = await loadOverlay(locale);
  return mapList(list as any, ov, "specimen", ["specie", "note"] as any) as unknown as T[];
}
export async function locProtocols<T extends { codice?: string }>(list: T[], locale: Locale) {
  const ov = await loadOverlay(locale);
  if (!has(ov)) return list;
  return list.map((p: any) => {
    const k = `protocol.${p.codice}`;
    return { ...p, nome: g(ov, `${k}.nome`, p.nome), tratto: g(ov, `${k}.tratto`, p.tratto), note: g(ov, `${k}.note`, p.note) };
  });
}
export async function locGenerations<T extends { gen?: number }>(list: T[], locale: Locale) {
  const ov = await loadOverlay(locale);
  if (!has(ov)) return list;
  return list.map((x: any) => ({ ...x, titolo: g(ov, `generation.${x.gen}.titolo`, x.titolo), testo: g(ov, `generation.${x.gen}.testo`, x.testo) }));
}
export async function locDepartments<T extends { id?: string }>(list: T[], locale: Locale) {
  const ov = await loadOverlay(locale);
  return mapList(list as any, ov, "department", ["nome"] as any) as unknown as T[];
}
export async function locKpis<T>(list: T[], locale: Locale) {
  const ov = await loadOverlay(locale);
  if (!has(ov)) return list;
  return list.map((x: any, i: number) => ({ ...x, etichetta: g(ov, `kpi.${i}.etichetta`, x.etichetta), nota: g(ov, `kpi.${i}.nota`, x.nota) }));
}
export async function locMilestones<T>(list: T[], locale: Locale) {
  const ov = await loadOverlay(locale);
  if (!has(ov)) return list;
  return list.map((x: any, i: number) => ({ ...x, titolo: g(ov, `milestone.${i}.titolo`, x.titolo), testo: g(ov, `milestone.${i}.testo`, x.testo) }));
}
export async function locGlossary<T>(list: T[], locale: Locale) {
  const ov = await loadOverlay(locale);
  if (!has(ov)) return list;
  return list.map((x: any, i: number) => ({ ...x, termine: g(ov, `glossary.${i}.termine`, x.termine), definizione: g(ov, `glossary.${i}.definizione`, x.definizione) }));
}
export async function locExperiments<T extends { id?: string }>(list: T[], locale: Locale) {
  const ov = await loadOverlay(locale);
  return mapList(list as any, ov, "experiment", ["titolo", "obiettivo", "metodo", "risultato", "abstract"] as any) as unknown as T[];
}
export async function locExperiment<T extends { id?: string } | null>(item: T, locale: Locale): Promise<T> {
  if (!item) return item;
  const [x] = await locExperiments([item as any], locale);
  return x as T;
}

async function locObject<T extends Record<string, any>>(obj: T, locale: Locale, prefix: string, fields: string[]): Promise<T> {
  const ov = await loadOverlay(locale);
  if (!has(ov)) return obj;
  const out: any = { ...obj };
  for (const f of fields) {
    const k = `${prefix}.${f}`;
    if (ov[k] !== undefined && ov[k] !== null) out[f] = ov[k];
  }
  return out;
}
export const locCompany = <T extends Record<string, any>>(o: T, l: Locale) =>
  locObject(o, l, "company", ["payoff", "claim", "descrizione", "settore", "sede", "principi"]);
export const locMission = <T extends Record<string, any>>(o: T, l: Locale) =>
  locObject(o, l, "mission", ["statement", "visione", "dualUse", "valori"]);
export const locSigma = <T extends Record<string, any>>(o: T, l: Locale) =>
  locObject(o, l, "sigma", ["titolo", "classificazione", "descrizione", "supervisione"]);
export const locConformita = <T extends Record<string, any>>(o: T, l: Locale) =>
  locObject(o, l, "conformita", ["titolo", "testo", "riferimenti"]);
