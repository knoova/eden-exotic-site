#!/bin/sh
# =============================================================================
# Avvio dell'app: schema DB -> seed dal canon -> indice RAG -> server Next.
# =============================================================================
set -e

echo "▸ Applico lo schema al database (attendo che Postgres sia pronto)..."
until npx prisma db push --skip-generate --accept-data-loss; do
  echo "  … database non ancora pronto, riprovo tra 3s"
  sleep 3
done

echo "▸ Popolo il database dal canon..."
npm run db:seed || echo "  ! seed non riuscito (continuo comunque)"

echo "▸ Costruisco l'indice RAG su Qdrant (richiede Ollama + modelli)..."
npm run rag:embed || echo "  ! embedding non riuscito ora (Ollama/modelli non pronti). Usa il pannello Admin > Sistema > Ricostruisci indice RAG."

echo "▸ Avvio Next.js su :3000"
exec node_modules/.bin/next start -p 3000 -H 0.0.0.0
