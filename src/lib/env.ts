// Accesso centralizzato alle variabili d'ambiente, con default sensati.
export const env = {
  qdrantUrl: process.env.QDRANT_URL || "http://localhost:6333",
  qdrantApiKey: process.env.QDRANT_API_KEY || undefined,
  qdrantCollection: process.env.QDRANT_COLLECTION || "eden_canon",

  ollamaUrl: process.env.OLLAMA_URL || "http://localhost:11434",
  chatModel: process.env.OLLAMA_CHAT_MODEL || "llama3.2:3b",
  embedModel: process.env.OLLAMA_EMBED_MODEL || "nomic-embed-text",
  embedDim: parseInt(process.env.EMBED_DIM || "768", 10),

  adminPassword: process.env.ADMIN_PASSWORD || "eden47",
  adminSecret: process.env.ADMIN_SECRET || "eden-dev-secret-change-me"
};
