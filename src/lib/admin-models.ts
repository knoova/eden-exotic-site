// Registro dei modelli gestibili dall'admin + coercizione sicura dei tipi.
// La API CRUD generica usa questo registro; nessun campo fuori elenco viene scritto.
import { prisma } from "./db";

type FieldType = "string" | "int" | "float" | "bool" | "bool3" | "string[]";

export type ModelDef = {
  delegate: string; // nome della delega Prisma
  idField: string;
  idType: "string" | "int";
  autoId: boolean; // id generato dal DB (non nel body)
  orderBy: string; // campo di ordinamento
  fields: Record<string, FieldType>;
};

export const MODELS: Record<string, ModelDef> = {
  facilities: {
    delegate: "facility", idField: "id", idType: "string", autoId: false, orderBy: "ordine",
    fields: { id: "string", numero: "int", nome: "string", paese: "string", citta: "string", continente: "string",
      lat: "float", lng: "float", specie: "string", tipo: "string", alleva: "bool", tema: "string",
      sommario: "string", descrizione: "string", protocolliChiave: "string[]", branch: "string", stato: "string", ordine: "int" }
  },
  people: {
    delegate: "person", idField: "id", idType: "string", autoId: false, orderBy: "ordine",
    fields: { id: "string", nome: "string", ruolo: "string", bio: "string", competenze: "string[]",
      voce: "string", background: "string", dip: "string", branch: "string",
      stato: "string", reportsTo: "string", facilityId: "string", ordine: "int" }
  },
  specimens: {
    delegate: "specimen", idField: "id", idType: "string", autoId: false, orderBy: "ordine",
    fields: { id: "string", codiceEsteso: "string", specie: "string", gen: "int", protocollo: "string", coscienza: "bool3",
      nomeProprio: "string", branch: "string", stato: "string", note: "string", facilityId: "string", ordine: "int" }
  },
  experiments: {
    delegate: "experiment", idField: "id", idType: "string", autoId: false, orderBy: "ordine",
    fields: { id: "string", codice: "string", titolo: "string", facilityId: "string", protocollo: "string",
      obiettivo: "string", metodo: "string", risultato: "string", stato: "string", anno: "string",
      branch: "string", abstract: "string", autori: "string[]", ordine: "int" }
  },
  protocols: {
    delegate: "protocol", idField: "codice", idType: "string", autoId: false, orderBy: "codice",
    fields: { codice: "string", nome: "string", tratto: "string", note: "string", ordine: "int" }
  },
  generations: {
    delegate: "generation", idField: "gen", idType: "int", autoId: false, orderBy: "gen",
    fields: { gen: "int", titolo: "string", testo: "string", branch: "string", ordine: "int" }
  },
  departments: {
    delegate: "department", idField: "id", idType: "string", autoId: false, orderBy: "ordine",
    fields: { id: "string", nome: "string", colore: "string", ordine: "int" }
  },
  kpis: {
    delegate: "kpi", idField: "id", idType: "int", autoId: true, orderBy: "ordine",
    fields: { etichetta: "string", valore: "string", nota: "string", ordine: "int" }
  },
  milestones: {
    delegate: "milestone", idField: "id", idType: "int", autoId: true, orderBy: "ordine",
    fields: { anno: "string", titolo: "string", testo: "string", tipo: "string", ordine: "int" }
  },
  glossary: {
    delegate: "glossaryTerm", idField: "id", idType: "int", autoId: true, orderBy: "ordine",
    fields: { termine: "string", definizione: "string", ordine: "int" }
  }
};

const NULLABLE = new Set(["lat", "lng", "reportsTo", "facilityId", "nomeProprio", "coscienza"]);

export function coerce(modelKey: string, body: any): Record<string, any> {
  const def = MODELS[modelKey];
  const out: Record<string, any> = {};
  for (const [name, type] of Object.entries(def.fields)) {
    if (!(name in body)) continue;
    let v = body[name];
    if (v === "" && NULLABLE.has(name)) v = null;
    if (v === null) { out[name] = null; continue; }
    switch (type) {
      case "int": out[name] = v === "" || v == null ? null : parseInt(v, 10); break;
      case "float": out[name] = v === "" || v == null ? null : parseFloat(v); break;
      case "bool": out[name] = v === true || v === "true" || v === "on"; break;
      case "bool3": out[name] = v === true || v === "true" ? true : v === false || v === "false" ? false : null; break;
      case "string[]":
        out[name] = Array.isArray(v)
          ? v.map((s) => String(s).trim()).filter(Boolean)
          : String(v).split(",").map((s) => s.trim()).filter(Boolean);
        break;
      default: out[name] = String(v);
    }
  }
  return out;
}

export function delegate(modelKey: string): any {
  return (prisma as any)[MODELS[modelKey].delegate];
}

export function parseId(modelKey: string, raw: string): string | number {
  return MODELS[modelKey].idType === "int" ? parseInt(raw, 10) : raw;
}
