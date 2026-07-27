import { reindexRag } from "../src/lib/seed";

reindexRag(true)
  .then((r) => {
    console.log(`✔ Indice RAG costruito: ${r.count} chunk su Qdrant.`);
    process.exit(0);
  })
  .catch((e) => {
    console.error("✘ Embedding fallito (Ollama/Qdrant raggiungibili?):", e?.message || e);
    process.exit(1);
  });
