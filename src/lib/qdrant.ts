import { QdrantClient } from "@qdrant/js-client-rest";
import { env } from "./env";

// --- Client per il database vettoriale (Qdrant) ----------------------------

let client: QdrantClient | null = null;
export function qdrant(): QdrantClient {
  if (!client) {
    client = new QdrantClient({ url: env.qdrantUrl, apiKey: env.qdrantApiKey });
  }
  return client;
}

/** Crea la collezione se non esiste (dimensione = modello di embedding). */
export async function ensureCollection(): Promise<void> {
  const c = qdrant();
  const existing = await c.getCollections();
  const has = existing.collections.some((x) => x.name === env.qdrantCollection);
  if (!has) {
    await c.createCollection(env.qdrantCollection, {
      vectors: { size: env.embedDim, distance: "Cosine" }
    });
  }
}

export type CanonPoint = {
  id: number;
  vector: number[];
  payload: { docId: string; categoria: string; titolo: string; testo: string };
};

/** Inserisce/aggiorna punti nella collezione. */
export async function upsertPoints(points: CanonPoint[]): Promise<void> {
  if (points.length === 0) return;
  await qdrant().upsert(env.qdrantCollection, { wait: true, points });
}

/** Ricerca semantica: restituisce i chunk più simili al vettore query. */
export async function searchCanon(
  vector: number[],
  limit = 6
): Promise<{ titolo: string; testo: string; categoria: string; score: number }[]> {
  const res = await qdrant().search(env.qdrantCollection, { vector, limit, with_payload: true });
  return res.map((r) => ({
    titolo: (r.payload as any)?.titolo ?? "",
    testo: (r.payload as any)?.testo ?? "",
    categoria: (r.payload as any)?.categoria ?? "",
    score: r.score ?? 0
  }));
}

export async function qdrantReady(): Promise<boolean> {
  try {
    await qdrant().getCollections();
    return true;
  } catch {
    return false;
  }
}
