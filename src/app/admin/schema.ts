// Schema dei pannelli admin (lato client). Pilota form e tabelle.
export type Opt = { value: string; label: string };
export type Refs = { facilities: any[]; departments: any[]; protocols: any[]; people: any[] };
export type Field = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "bool" | "bool3" | "lines" | "json";
  help?: string;
  full?: boolean;
  rows?: number;
  options?: Opt[] | ((r: Refs) => Opt[]);
};
export type Panel = {
  group: string;
  key: string;
  label: string;
  kind: "object" | "list" | "system";
  settingKey?: string; // per object
  model?: string; // per list (endpoint /api/admin/<model>)
  title?: (i: any) => string;
  cols?: { k: string; h: string }[];
  fields?: Field[];
};

const BRANCHES: Opt[] = [
  { value: "core", label: "Core / Direzione" },
  { value: "47b", label: "Iguane (47B)" },
  { value: "varani", label: "Varani / Sigma" },
  { value: "new", label: "Nuovi programmi" }
];
const TIPI: Opt[] = ["biobanca", "allevamento", "ricerca", "bioinformatica", "validazione", "stazione", "direzione", "satellite"].map((v) => ({ value: v, label: v }));
const STATI: Opt[] = ["operativo", "proposto", "riservato"].map((v) => ({ value: v, label: v }));

const facOpts = (r: Refs) => r.facilities.map((f) => ({ value: f.id, label: `${f.id} · ${f.nome}` }));
const depOpts = (r: Refs) => r.departments.map((d) => ({ value: d.id, label: d.nome }));
const protoOpts = (r: Refs) => r.protocols.map((p) => ({ value: p.codice, label: `${p.codice} — ${p.nome}` }));
const peopleOpts = (r: Refs): Opt[] => [{ value: "", label: "— Vertice (nessuno) —" }, ...r.people.map((p) => ({ value: p.id, label: p.nome }))];

export const PANELS: Panel[] = [
  { group: "Identità", key: "company", label: "Azienda", kind: "object", settingKey: "company", fields: [
    { name: "nome", label: "Nome", type: "text" },
    { name: "ragioneSociale", label: "Ragione sociale", type: "text" },
    { name: "payoff", label: "Payoff", type: "text" },
    { name: "claim", label: "Claim", type: "text" },
    { name: "fondazione", label: "Fondazione", type: "text" },
    { name: "sede", label: "Sede", type: "text" },
    { name: "settore", label: "Settore", type: "text", full: true },
    { name: "descrizione", label: "Descrizione", type: "textarea", rows: 4, full: true },
    { name: "principi", label: "Principi", help: "uno per riga", type: "lines", rows: 6, full: true }
  ] },
  { group: "Identità", key: "mission", label: "Missione", kind: "object", settingKey: "mission", fields: [
    { name: "statement", label: "Statement", type: "textarea", rows: 3, full: true },
    { name: "visione", label: "Visione", type: "textarea", rows: 3, full: true },
    { name: "dualUse", label: "Nota duplice uso", type: "textarea", rows: 3, full: true },
    { name: "valori", label: "Valori", help: 'JSON: [{"titolo","testo"}]', type: "json", rows: 8, full: true }
  ] },
  { group: "Identità", key: "sigma", label: "Programma Sigma", kind: "object", settingKey: "programmaSigma", fields: [
    { name: "titolo", label: "Titolo", type: "text" },
    { name: "classificazione", label: "Classificazione", type: "text" },
    { name: "descrizione", label: "Descrizione", type: "textarea", rows: 3, full: true },
    { name: "supervisione", label: "Supervisione", type: "text", full: true }
  ] },
  { group: "Identità", key: "conformita", label: "Conformità", kind: "object", settingKey: "conformita", fields: [
    { name: "titolo", label: "Titolo", type: "text" },
    { name: "testo", label: "Testo", type: "textarea", rows: 3, full: true },
    { name: "riferimenti", label: "Riferimenti", help: "uno per riga", type: "lines", rows: 4, full: true }
  ] },

  { group: "Rete", key: "facilities", label: "Strutture", kind: "list", model: "facilities",
    title: (i) => `${i.id} · ${i.nome}`, cols: [{ k: "id", h: "ID" }, { k: "paese", h: "Paese" }, { k: "specie", h: "Specie" }],
    fields: [
      { name: "id", label: "ID", help: "es. N7", type: "text" },
      { name: "numero", label: "Numero", type: "number" },
      { name: "nome", label: "Nome", type: "text" },
      { name: "paese", label: "Paese", type: "text" },
      { name: "citta", label: "Città", type: "text" },
      { name: "continente", label: "Continente", type: "text" },
      { name: "lat", label: "Latitudine", type: "number" },
      { name: "lng", label: "Longitudine", type: "number" },
      { name: "specie", label: "Specie", type: "text", full: true },
      { name: "tipo", label: "Tipo", type: "select", options: TIPI },
      { name: "alleva", label: "Alleva animali", type: "bool" },
      { name: "tema", label: "Tema", type: "text", full: true },
      { name: "sommario", label: "Sommario", type: "text", full: true },
      { name: "descrizione", label: "Descrizione", type: "textarea", rows: 4, full: true },
      { name: "protocolliChiave", label: "Protocolli chiave", help: "uno per riga (es. A)", type: "lines", rows: 3 },
      { name: "branch", label: "Ramo", type: "select", options: BRANCHES },
      { name: "stato", label: "Stato", type: "select", options: STATI },
      { name: "ordine", label: "Ordine", type: "number" }
    ] },

  { group: "Organizzazione", key: "people", label: "Persone", kind: "list", model: "people",
    title: (i) => i.nome, cols: [{ k: "nome", h: "Nome" }, { k: "ruolo", h: "Ruolo" }, { k: "facilityId", h: "Struttura" }],
    fields: [
      { name: "id", label: "ID", help: "slug univoco", type: "text" },
      { name: "nome", label: "Nome", type: "text" },
      { name: "ruolo", label: "Ruolo", type: "text", full: true },
      { name: "bio", label: "Biografia", type: "textarea", rows: 3, full: true },
      { name: "facilityId", label: "Struttura", type: "select", options: facOpts },
      { name: "dip", label: "Dipartimento", type: "select", options: depOpts },
      { name: "reportsTo", label: "Riporta a", type: "select", options: peopleOpts },
      { name: "branch", label: "Ramo", type: "select", options: BRANCHES },
      { name: "stato", label: "Stato", type: "text" },
      { name: "ordine", label: "Ordine", type: "number" }
    ] },
  { group: "Organizzazione", key: "departments", label: "Dipartimenti", kind: "list", model: "departments",
    title: (i) => i.nome, cols: [{ k: "id", h: "ID" }, { k: "nome", h: "Nome" }, { k: "colore", h: "Colore" }],
    fields: [
      { name: "id", label: "ID", type: "text" },
      { name: "nome", label: "Nome", type: "text" },
      { name: "colore", label: "Colore", help: "esadecimale", type: "text" },
      { name: "ordine", label: "Ordine", type: "number" }
    ] },

  { group: "Programma", key: "protocols", label: "Protocolli", kind: "list", model: "protocols",
    title: (i) => `Protocollo ${i.codice}`, cols: [{ k: "codice", h: "Cod." }, { k: "nome", h: "Nome" }],
    fields: [
      { name: "codice", label: "Codice", help: "A–H", type: "text" },
      { name: "nome", label: "Nome", type: "text", full: true },
      { name: "tratto", label: "Tratto amplificato", type: "textarea", rows: 2, full: true },
      { name: "note", label: "Note", type: "textarea", rows: 2, full: true },
      { name: "ordine", label: "Ordine", type: "number" }
    ] },
  { group: "Programma", key: "generations", label: "Generazioni", kind: "list", model: "generations",
    title: (i) => `Gen ${i.gen} · ${i.titolo}`, cols: [{ k: "gen", h: "Gen" }, { k: "titolo", h: "Titolo" }],
    fields: [
      { name: "gen", label: "Generazione", type: "number" },
      { name: "titolo", label: "Titolo", type: "text" },
      { name: "branch", label: "Ramo", type: "select", options: BRANCHES },
      { name: "testo", label: "Descrizione", type: "textarea", rows: 2, full: true },
      { name: "ordine", label: "Ordine", type: "number" }
    ] },
  { group: "Programma", key: "specimens", label: "Esemplari", kind: "list", model: "specimens",
    title: (i) => `${i.id}${i.nomeProprio && i.nomeProprio !== "—" ? " · " + i.nomeProprio : ""}`,
    cols: [{ k: "id", h: "Codice" }, { k: "nomeProprio", h: "Nome" }, { k: "gen", h: "Gen" }],
    fields: [
      { name: "id", label: "Codice breve", type: "text" },
      { name: "codiceEsteso", label: "Codice esteso", type: "text" },
      { name: "nomeProprio", label: "Nome proprio", help: "— se assente", type: "text" },
      { name: "gen", label: "Generazione", type: "number" },
      { name: "protocollo", label: "Protocollo", type: "select", options: protoOpts },
      { name: "coscienza", label: "Stato cognitivo", type: "bool3" },
      { name: "branch", label: "Ramo", type: "select", options: BRANCHES },
      { name: "facilityId", label: "Struttura", type: "select", options: facOpts },
      { name: "stato", label: "Stato", type: "text" },
      { name: "note", label: "Note", type: "textarea", rows: 3, full: true },
      { name: "ordine", label: "Ordine", type: "number" }
    ] },

  { group: "Risultati", key: "kpis", label: "KPI", kind: "list", model: "kpis",
    title: (i) => i.etichetta, cols: [{ k: "valore", h: "Valore" }, { k: "etichetta", h: "Etichetta" }],
    fields: [
      { name: "valore", label: "Valore", type: "text" },
      { name: "etichetta", label: "Etichetta", type: "text" },
      { name: "nota", label: "Nota", type: "text", full: true },
      { name: "ordine", label: "Ordine", type: "number" }
    ] },
  { group: "Risultati", key: "milestones", label: "Traguardi", kind: "list", model: "milestones",
    title: (i) => `${i.anno} · ${i.titolo}`, cols: [{ k: "anno", h: "Anno" }, { k: "titolo", h: "Titolo" }],
    fields: [
      { name: "anno", label: "Anno", type: "text" },
      { name: "titolo", label: "Titolo", type: "text" },
      { name: "tipo", label: "Tipo", type: "select", options: [{ value: "milestone", label: "Milestone" }, { value: "scienza", label: "Scienza" }] },
      { name: "testo", label: "Descrizione", type: "textarea", rows: 3, full: true },
      { name: "ordine", label: "Ordine", type: "number" }
    ] },

  { group: "Approfondimenti", key: "glossary", label: "Glossario", kind: "list", model: "glossary",
    title: (i) => i.termine, cols: [{ k: "termine", h: "Termine" }],
    fields: [
      { name: "termine", label: "Termine", type: "text" },
      { name: "definizione", label: "Definizione", type: "textarea", rows: 3, full: true },
      { name: "ordine", label: "Ordine", type: "number" }
    ] },

  { group: "Sistema", key: "system", label: "Sistema", kind: "system" }
];
