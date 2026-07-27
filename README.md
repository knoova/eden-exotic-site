# Eden Exotic — Sito ufficiale (in-world)

Sito ufficiale della società di finzione **Eden Exotic**, dall'universo narrativo **47B**.
Web app **Next.js** con database relazionale, database vettoriale e un'**AI locale (Ollama)**
che dà voce ai personaggi. I contenuti derivano dal canon del repo `47B-universe`
(bibbie + `facts.yaml`), non lo duplicano come autorità.

## Cosa contiene

- **Home** — presentazione dell'azienda e della rete.
- **Missione** — missione, visione, valori, nota sul duplice uso (Programma Sigma).
- **Rete globale** — mappa schematica del mondo + le 11 strutture **N.1–N.11** (Perù, Giappone,
  India, Indonesia, Uganda, Svezia, USA, Nuova Caledonia, Svizzera, Italia, Polonia). Alcune
  allevano, altre fanno ricerca (biobanca, bioinformatica, validazione).
- **Organigramma** — le persone, raggruppate per struttura, sotto un'unica direzione.
- **Risultati** — KPI e cronologia del programma.
- **Esperimenti** — Protocolli A–H, generazioni, registro esemplari, glossario, conformità CITES.
- **Parla coi personaggi** — chat con qualsiasi membro del programma; l'AI risponde **restando nel
  personaggio**, usando i fatti del canon recuperati per similarità (RAG).
- **Area Admin** (`/admin`) — CRUD completo su strutture, persone, esemplari, protocolli,
  generazioni, KPI, traguardi, glossario, dipartimenti, e sui testi di azienda/missione/Sigma/
  conformità; più azioni di sistema (sincronizza dal canon, ricostruisci indice RAG).

## Architettura

| Servizio | Immagine | Ruolo |
|---|---|---|
| `web` | build locale (`Dockerfile`) | app Next.js (App Router, TypeScript) |
| `db` | `postgres:16` | database relazionale (contenuti + log chat) via Prisma |
| `vector` | `qdrant/qdrant` | database vettoriale (embedding del canon per il RAG) |
| `ollama` | `ollama/ollama` | AI locale: modello chat + modello di embedding |

**Fonte di verità dei contenuti:** `src/lib/canon.ts` (+ `canon-network.ts`), derivato dal canon.
Il seed li copia nel database; le pagine leggono dal DB con **fallback automatico al canon** se il
DB non è ancora popolato/raggiungibile. Il RAG usa gli stessi testi (`knowledge`) su Qdrant.

## Deploy su Coolify (consigliato)

1. Crea una risorsa **Docker Compose** puntando a questo repository.
2. Imposta le variabili d'ambiente (vedi `.env.example`): almeno `POSTGRES_PASSWORD`,
   `ADMIN_PASSWORD`, `ADMIN_SECRET`. Le altre hanno default sensati.
3. Deploy. All'avvio il container `web`:
   - applica lo schema al database (`prisma db push`),
   - popola i dati dal canon (`db:seed`),
   - prova a costruire l'indice RAG (`rag:embed`) — richiede che i modelli Ollama siano scaricati.
4. Il servizio `ollama-init` scarica i modelli una volta sola. Se al primo avvio l'indice RAG non è
   pronto, aprilo dopo dal pannello **Admin → Sistema → Ricostruisci indice RAG**.

> **Nota risorse:** Ollama con `llama3.2:3b` gira anche su CPU; per risposte più rapide usa una GPU
> (vedi la sezione commentata in `docker-compose.yml`) o un modello più piccolo via `OLLAMA_CHAT_MODEL`.

### Oppure: `docker compose`

```bash
cp .env.example .env       # e modifica le password
docker compose up -d --build
# apri http://localhost:3000
```

## Sviluppo locale (senza Docker)

```bash
npm install
cp .env.example .env       # imposta DATABASE_URL su un Postgres locale, QDRANT_URL, OLLAMA_URL
npm run db:push            # crea lo schema
npm run db:seed            # popola dal canon
npm run rag:embed          # (opzionale) costruisce l'indice RAG (richiede Ollama + Qdrant)
npm run dev                # http://localhost:3000
```

Le pagine funzionano anche **senza database** (fallback al canon); il database serve per l'area
admin e per rendere i contenuti modificabili, il vettoriale + Ollama per la chat.

## Variabili d'ambiente

Vedi `.env.example`. Le principali:

- `DATABASE_URL` — connessione Postgres (Prisma).
- `QDRANT_URL`, `QDRANT_COLLECTION` — database vettoriale.
- `OLLAMA_URL`, `OLLAMA_CHAT_MODEL`, `OLLAMA_EMBED_MODEL`, `EMBED_DIM` — AI locale.
- `ADMIN_PASSWORD` — passphrase dell'area admin. `ADMIN_SECRET` — firma del cookie di sessione.

## Comandi

| Comando | Azione |
|---|---|
| `npm run dev` | sviluppo |
| `npm run build` / `npm start` | build e avvio di produzione |
| `npm run db:push` | applica lo schema Prisma |
| `npm run db:seed` | popola il DB dal canon |
| `npm run rag:embed` | (ri)costruisce l'indice RAG su Qdrant |

## Nota

Opera di finzione. Personaggi e organizzazioni sono inventati; le risposte dell'AI possono contenere
imprecisioni e non rappresentano persone reali. Contenuti derivati dal canon 47B — tutti i diritti riservati.
