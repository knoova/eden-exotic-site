// Popolamento del DB dal canon e (ri)costruzione dell'indice RAG su Qdrant.
import { prisma } from "./db";
import { canon } from "./canon";
import { embed } from "./ollama";
import { ensureCollection, upsertPoints, qdrant } from "./qdrant";
import { env } from "./env";

/** Popola/aggiorna il database relazionale a partire dal canon. */
export async function seedDatabase(): Promise<void> {
  // Singleton (azienda, missione, sigma, conformità)
  const settings: [string, any][] = [
    ["company", canon.company],
    ["mission", canon.mission],
    ["programmaSigma", canon.programmaSigma],
    ["conformita", canon.conformita]
  ];
  for (const [key, value] of settings) {
    await prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }

  // Dipartimenti
  for (let i = 0; i < canon.departments.length; i++) {
    const d = canon.departments[i];
    await prisma.department.upsert({ where: { id: d.id }, update: { ...d, ordine: i }, create: { ...d, ordine: i } });
  }

  // Strutture
  for (let i = 0; i < canon.facilities.length; i++) {
    const f = canon.facilities[i];
    const data = { ...f, ordine: f.ordine ?? f.numero };
    await prisma.facility.upsert({ where: { id: f.id }, update: data, create: data });
  }

  // Protocolli
  for (let i = 0; i < canon.protocols.length; i++) {
    const p = canon.protocols[i];
    await prisma.protocol.upsert({ where: { codice: p.codice }, update: { ...p, ordine: i }, create: { ...p, ordine: i } });
  }

  // Generazioni
  for (let i = 0; i < canon.generations.length; i++) {
    const g = canon.generations[i];
    await prisma.generation.upsert({ where: { gen: g.gen }, update: { ...g, ordine: i }, create: { ...g, ordine: i } });
  }

  // Persone
  for (let i = 0; i < canon.people.length; i++) {
    const p = canon.people[i];
    const data = { ...p, ordine: p.ordine ?? i };
    await prisma.person.upsert({ where: { id: p.id }, update: data, create: data });
  }

  // Esemplari
  for (let i = 0; i < canon.specimens.length; i++) {
    const s = canon.specimens[i];
    const data = { ...s, ordine: i };
    await prisma.specimen.upsert({ where: { id: s.id }, update: data, create: data });
  }

  // Esperimenti
  for (let i = 0; i < canon.experiments.length; i++) {
    const e = canon.experiments[i];
    const data = {
      id: e.id, codice: e.codice, titolo: e.titolo, facilityId: e.facilityId,
      protocollo: e.protocollo, obiettivo: e.obiettivo, metodo: e.metodo, risultato: e.risultato,
      stato: e.stato, anno: e.anno, branch: e.branch, abstract: e.abstract ?? null,
      autori: e.autori ?? [], bibliografia: (e.bibliografia ?? []) as any, ordine: i
    };
    await prisma.experiment.upsert({ where: { id: e.id }, update: data, create: data });
  }

  // KPI / Traguardi / Glossario (id autoincrement): reset e ricrea
  await prisma.kpi.deleteMany();
  await prisma.kpi.createMany({ data: canon.kpis.map((k, i) => ({ ...k, ordine: i })) });

  await prisma.milestone.deleteMany();
  await prisma.milestone.createMany({ data: canon.milestones.map((m, i) => ({ ...m, ordine: i })) });

  await prisma.glossaryTerm.deleteMany();
  await prisma.glossaryTerm.createMany({ data: canon.glossary.map((g, i) => ({ ...g, ordine: i })) });

  // Base di conoscenza (RAG)
  for (const d of canon.knowledge) {
    await prisma.doc.upsert({
      where: { id: d.id },
      update: { categoria: d.categoria, titolo: d.titolo, testo: d.testo, embedded: false },
      create: { ...d, embedded: false }
    });
  }
}

/** (Ri)costruisce l'indice vettoriale su Qdrant a partire dai Doc. */
export async function reindexRag(fresh = false): Promise<{ count: number }> {
  if (fresh) {
    try {
      await qdrant().deleteCollection(env.qdrantCollection);
    } catch {
      /* non esisteva */
    }
  }
  await ensureCollection();

  let docs: { id: string; categoria: string; titolo: string; testo: string }[] = [];
  try {
    docs = await prisma.doc.findMany();
  } catch {
    /* DB non pronto */
  }
  if (!docs.length) docs = canon.knowledge;

  const points = [];
  let idNum = 1;
  for (const d of docs) {
    const vector = await embed(`${d.titolo}. ${d.testo}`);
    points.push({ id: idNum++, vector, payload: { docId: d.id, categoria: d.categoria, titolo: d.titolo, testo: d.testo } });
  }
  await upsertPoints(points);

  try {
    await prisma.doc.updateMany({ data: { embedded: true } });
  } catch {
    /* ignora */
  }
  return { count: points.length };
}
