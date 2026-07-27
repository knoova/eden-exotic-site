// Estrae tutti i contenuti traducibili del canon nel formato-chiave dell'overlay
// (vedi src/i18n/localize.ts). Produce src/i18n/content/_source.json: la sorgente
// italiana da tradurre valore-per-valore in content/<locale>.json.
import * as C from "../src/lib/canon";
import fs from "node:fs";
import path from "node:path";

const out: Record<string, unknown> = {};
const set = (k: string, v: unknown) => {
  if (v === undefined || v === null || v === "" || v === "—") return;
  out[k] = v;
};

for (const f of C.facilities) {
  for (const fld of ["nome", "tema", "sommario", "descrizione", "specie", "paese", "citta"] as const)
    set(`facility.${f.id}.${fld}`, (f as any)[fld]);
}
for (const p of C.people) {
  for (const fld of ["ruolo", "bio", "voce", "background", "competenze"] as const)
    set(`person.${p.id}.${fld}`, (p as any)[fld]);
}
for (const s of C.specimens) {
  for (const fld of ["specie", "note"] as const) set(`specimen.${s.id}.${fld}`, (s as any)[fld]);
}
for (const p of C.protocols) {
  for (const fld of ["nome", "tratto", "note"] as const) set(`protocol.${p.codice}.${fld}`, (p as any)[fld]);
}
for (const g of C.generations) {
  for (const fld of ["titolo", "testo"] as const) set(`generation.${g.gen}.${fld}`, (g as any)[fld]);
}
for (const d of C.departments) set(`department.${d.id}.nome`, d.nome);
C.kpis.forEach((k, i) => {
  set(`kpi.${i}.etichetta`, k.etichetta);
  set(`kpi.${i}.nota`, k.nota);
});
C.milestones.forEach((m, i) => {
  set(`milestone.${i}.titolo`, m.titolo);
  set(`milestone.${i}.testo`, m.testo);
});
C.glossary.forEach((g, i) => {
  set(`glossary.${i}.termine`, g.termine);
  set(`glossary.${i}.definizione`, g.definizione);
});
for (const e of C.experiments) {
  for (const fld of ["titolo", "obiettivo", "metodo", "risultato", "abstract"] as const)
    set(`experiment.${e.id}.${fld}`, (e as any)[fld]);
}
for (const fld of ["payoff", "claim", "descrizione", "settore", "sede", "principi"] as const)
  set(`company.${fld}`, (C.company as any)[fld]);
for (const fld of ["statement", "visione", "dualUse", "valori"] as const)
  set(`mission.${fld}`, (C.mission as any)[fld]);
for (const fld of ["titolo", "classificazione", "descrizione", "supervisione"] as const)
  set(`sigma.${fld}`, (C.programmaSigma as any)[fld]);
for (const fld of ["titolo", "testo", "riferimenti"] as const)
  set(`conformita.${fld}`, (C.conformita as any)[fld]);

const dest = path.join(process.cwd(), "src/i18n/content/_source.json");
fs.writeFileSync(dest, JSON.stringify(out, null, 2));
const keys = Object.keys(out);
const chars = JSON.stringify(out).length;
console.log(`Scritte ${keys.length} chiavi (${chars} caratteri) in ${dest}`);
