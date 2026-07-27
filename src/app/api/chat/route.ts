import { NextRequest, NextResponse } from "next/server";
import { getPeople } from "@/lib/content";
import { answerAsPerson, type Turn } from "@/lib/rag";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const personId: string = body.personId;
    const message: string = (body.message || "").toString().slice(0, 2000);
    const history: Turn[] = Array.isArray(body.history) ? body.history : [];
    const conversationId: string = body.conversationId || "anon";

    if (!personId || !message.trim()) {
      return NextResponse.json({ error: "personId e message sono obbligatori" }, { status: 400 });
    }

    const people = await getPeople();
    const person = people.find((p) => p.id === personId);
    if (!person) return NextResponse.json({ error: "Personaggio non trovato" }, { status: 404 });

    const { reply, sources } = await answerAsPerson(person, message, history);

    // log best-effort (non blocca la risposta)
    try {
      await prisma.chatMessage.createMany({
        data: [
          { conversationId, personId, role: "user", content: message },
          { conversationId, personId, role: "assistant", content: reply }
        ]
      });
    } catch {
      /* DB non disponibile: ignora il log */
    }

    return NextResponse.json({ reply, sources });
  } catch (err: any) {
    const msg = String(err?.message || err);
    const hint = /fetch failed|ECONNREFUSED|11434/.test(msg)
      ? "L'AI locale (Ollama) non è raggiungibile. Avvia il servizio 'ollama' e scarica il modello."
      : msg;
    return NextResponse.json({ error: hint }, { status: 502 });
  }
}
