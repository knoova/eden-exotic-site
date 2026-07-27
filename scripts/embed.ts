import { reindexRag } from "../src/lib/seed";

reindexRag(true)
  .then((r) => {
    console.log(`✔ Indice RAG costruito: ${r.count} chunk su pgvector.`);
    process.exit(0);
  })
  .catch((e) => {
    console.error("✘ Embedding fallito (Ollama e DB raggiungibili?):", e?.message || e);
    process.exit(1);
  });
