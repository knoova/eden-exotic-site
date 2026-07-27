// Accesso centralizzato alle variabili d'ambiente, con default sensati.
// Il database vettoriale è pgvector nello stesso Postgres (DATABASE_URL): niente Qdrant.
export const env = {
  ollamaUrl: process.env.OLLAMA_URL || "http://localhost:11434",
  chatModel: process.env.OLLAMA_CHAT_MODEL || "llama3.2:3b",
  embedModel: process.env.OLLAMA_EMBED_MODEL || "nomic-embed-text",
  embedDim: parseInt(process.env.EMBED_DIM || "768", 10),

  adminPassword: process.env.ADMIN_PASSWORD || "eden47",
  adminSecret: process.env.ADMIN_SECRET || "eden-dev-secret-change-me"
};
