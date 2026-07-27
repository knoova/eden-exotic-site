import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { seedDatabase, reindexRag } from "@/lib/seed";
import { dbReady } from "@/lib/db";
import { qdrantReady } from "@/lib/qdrant";
import { ollamaReady } from "@/lib/ollama";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET: stato dei servizi (per il pannello Sistema dell'admin)
export async function GET() {
  const [db, vector, ai] = await Promise.all([dbReady(), qdrantReady(), ollamaReady()]);
  return NextResponse.json({ db, vector, ai });
}

// POST: azioni di sistema { action: "seed" | "reindex" }
export async function POST(req: NextRequest) {
  if (!isAuthed()) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  const { action } = await req.json().catch(() => ({ action: "" }));
  try {
    if (action === "seed") {
      await seedDatabase();
      return NextResponse.json({ ok: true, message: "Database sincronizzato dal canon." });
    }
    if (action === "reindex") {
      const r = await reindexRag(true);
      return NextResponse.json({ ok: true, message: `Indice RAG ricostruito: ${r.count} chunk.` });
    }
    return NextResponse.json({ error: "Azione sconosciuta" }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
