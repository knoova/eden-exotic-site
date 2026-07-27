// Database vettoriale via pgvector (stesso Postgres del resto dell'app).
// Nessun servizio esterno: gli embedding del RAG vivono nella tabella
// doc_embedding, gestita in SQL grezzo (Prisma non ha un tipo `vector` nativo).
import { prisma } from "./db";
import { env } from "./env";

const TABLE = "doc_embedding";

/** Crea l'estensione, la tabella e l'indice se non esistono. */
export async function ensureVectorSchema(): Promise<void> {
  await prisma.$executeRawUnsafe(`CREATE EXTENSION IF NOT EXISTS vector`);
  await prisma.$executeRawUnsafe(
    `CREATE TABLE IF NOT EXISTS ${TABLE} (
       doc_id    text PRIMARY KEY,
       categoria text,
       titolo    text,
       testo     text,
       embedding vector(${env.embedDim})
     )`
  );
  // indice ANN (facoltativo: se la versione di pgvector non supporta hnsw, si ignora)
  await prisma
    .$executeRawUnsafe(
      `CREATE INDEX IF NOT EXISTS ${TABLE}_emb_idx ON ${TABLE} USING hnsw (embedding vector_cosine_ops)`
    )
    .catch(() => {
      /* nessun indice ANN: la ricerca esatta funziona comunque */
    });
}

export async function dropVectorTable(): Promise<void> {
  await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS ${TABLE}`);
}

function toVector(v: number[]): string {
  return "[" + v.join(",") + "]";
}

export async function upsertEmbedding(
  docId: string,
  categoria: string,
  titolo: string,
  testo: string,
  vector: number[]
): Promise<void> {
  const lit = toVector(vector);
  await prisma.$executeRaw`
    INSERT INTO doc_embedding (doc_id, categoria, titolo, testo, embedding)
    VALUES (${docId}, ${categoria}, ${titolo}, ${testo}, ${lit}::vector)
    ON CONFLICT (doc_id) DO UPDATE
      SET categoria = EXCLUDED.categoria, titolo = EXCLUDED.titolo,
          testo = EXCLUDED.testo, embedding = EXCLUDED.embedding
  `;
}

/** Ricerca semantica (distanza coseno pgvector, operatore <=>). */
export async function searchCanon(
  vector: number[],
  limit = 6
): Promise<{ titolo: string; testo: string; categoria: string; score: number }[]> {
  const lit = toVector(vector);
  const rows = await prisma.$queryRaw<
    { titolo: string; testo: string; categoria: string; score: number }[]
  >`
    SELECT titolo, testo, categoria, 1 - (embedding <=> ${lit}::vector) AS score
    FROM doc_embedding
    ORDER BY embedding <=> ${lit}::vector
    LIMIT ${limit}
  `;
  return rows.map((r) => ({ ...r, score: Number(r.score) }));
}

export async function vectorReady(): Promise<boolean> {
  try {
    await prisma.$queryRawUnsafe(`SELECT 1 FROM ${TABLE} LIMIT 1`);
    return true;
  } catch {
    return false;
  }
}
