// Arricchimento dei personaggi (bio estese, competenze, voce, background) e
// chunk di conoscenza per il RAG, caricati dai file dati.
import e1 from "./data/enrichment1.json";
import e2 from "./data/enrichment2.json";
import type { PersonEnrichment, Doc } from "./canon";

type Raw = {
  id: string;
  bio?: string;
  competenze?: string[];
  voce?: string;
  background?: string;
  knowledge?: { titolo: string; testo: string };
};

const all = [...(e1 as Raw[]), ...(e2 as Raw[])];

export const peopleEnrichment: Record<string, PersonEnrichment> = Object.fromEntries(
  all.map((r) => [r.id, { bio: r.bio, competenze: r.competenze, voce: r.voce, background: r.background }])
);

export const enrichmentKnowledge: Doc[] = all
  .filter((r) => r.knowledge)
  .map((r) => ({
    id: `persona-${r.id}`,
    categoria: "personaggio",
    titolo: r.knowledge!.titolo,
    testo: r.knowledge!.testo
  }));
