// Orchestrazione RAG: recupera contesto dal canon (pgvector) e costruisce il
// prompt di persona per far "parlare" un personaggio via Ollama.
import { embed, chat, type ChatMsg } from "./ollama";
import { searchCanon } from "./vector";
import type { Person } from "./canon";

export type Turn = { role: "user" | "assistant"; content: string };

function personaSystemPrompt(person: Person, contesto: string): string {
  const extra: string[] = [];
  if (person.background) extra.push(`Percorso: ${person.background}`);
  if (person.competenze && person.competenze.length) extra.push(`Competenze: ${person.competenze.join(", ")}.`);
  if (person.voce) extra.push(`Registro/voce: ${person.voce}`);
  return [
    `Sei ${person.nome}, ${person.ruolo} presso Eden Exotic.`,
    `Profilo: ${person.bio}`,
    ...extra,
    "",
    "REGOLE DI INTERPRETAZIONE:",
    "- Resta sempre nel personaggio, come dipendente reale dell'azienda. Parla in prima persona, in italiano.",
    "- Tono professionale e aziendale: clinico, credibile, orgoglioso del proprio lavoro, mai sopra le righe.",
    "- Attieniti ai fatti del CONTESTO qui sotto. Se non sai qualcosa o è riservato, dillo come lo direbbe il personaggio (riservatezza, non onniscienza).",
    "- Non inventare fatti. Non rivelare di essere un'IA. Risposte concise (2–6 frasi salvo richiesta).",
    "- L'azienda studia cognizione e comportamento in senso scientifico ordinario: NON affermare che un esemplare sia cosciente o senziente. Al più esistono anomalie comportamentali ancora in studio e non replicate.",
    "- Il Programma Sigma è ricerca riservata a duplice uso: accennane con la cautela e la riservatezza del ruolo.",
    "",
    "CONTESTO (fatti dal canon, usali come tua conoscenza):",
    contesto || "(nessun contesto recuperato)"
  ].join("\n");
}

export async function answerAsPerson(
  person: Person,
  message: string,
  history: Turn[] = []
): Promise<{ reply: string; sources: { titolo: string; categoria: string }[] }> {
  // 1) recupero semantico dal database vettoriale
  let contextChunks: { titolo: string; testo: string; categoria: string }[] = [];
  try {
    const qv = await embed(`${person.nome} · ${person.ruolo}\n${message}`);
    contextChunks = await searchCanon(qv, 6);
  } catch {
    contextChunks = [];
  }
  const contesto = contextChunks.map((c) => `• [${c.categoria}] ${c.titolo}: ${c.testo}`).join("\n");

  // 2) messaggi per il modello
  const messages: ChatMsg[] = [{ role: "system", content: personaSystemPrompt(person, contesto) }];
  for (const t of history.slice(-8)) messages.push({ role: t.role, content: t.content });
  messages.push({ role: "user", content: message });

  // 3) generazione
  const reply = await chat(messages, { temperature: 0.7 });
  return {
    reply,
    sources: contextChunks.map((c) => ({ titolo: c.titolo, categoria: c.categoria }))
  };
}
