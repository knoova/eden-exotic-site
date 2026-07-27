import { env } from "./env";

// --- Client minimale per Ollama (AI locale) --------------------------------

export type ChatMsg = { role: "system" | "user" | "assistant"; content: string };

/** Genera l'embedding di un testo con il modello di embedding di Ollama. */
export async function embed(text: string): Promise<number[]> {
  const res = await fetch(`${env.ollamaUrl}/api/embeddings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: env.embedModel, prompt: text })
  });
  if (!res.ok) throw new Error(`Ollama embeddings ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { embedding: number[] };
  return data.embedding;
}

/** Conversazione (non-streaming) con il modello chat di Ollama. */
export async function chat(messages: ChatMsg[], opts?: { temperature?: number }): Promise<string> {
  const res = await fetch(`${env.ollamaUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: env.chatModel,
      messages,
      stream: false,
      options: { temperature: opts?.temperature ?? 0.7 }
    })
  });
  if (!res.ok) throw new Error(`Ollama chat ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { message?: { content?: string } };
  return data.message?.content?.trim() || "";
}

/** Verifica veloce che Ollama risponda. */
export async function ollamaReady(): Promise<boolean> {
  try {
    const res = await fetch(`${env.ollamaUrl}/api/tags`, { cache: "no-store" });
    return res.ok;
  } catch {
    return false;
  }
}
