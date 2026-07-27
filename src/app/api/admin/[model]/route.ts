import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { MODELS, coerce, delegate } from "@/lib/admin-models";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET: elenco di un modello (pubblico in lettura, usato anche dall'admin)
export async function GET(_req: NextRequest, { params }: { params: { model: string } }) {
  const def = MODELS[params.model];
  if (!def) return NextResponse.json({ error: "Modello sconosciuto" }, { status: 404 });
  try {
    const rows = await delegate(params.model).findMany({ orderBy: { [def.orderBy]: "asc" } });
    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}

// POST: crea una voce (protetto)
export async function POST(req: NextRequest, { params }: { params: { model: string } }) {
  if (!isAuthed()) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  const def = MODELS[params.model];
  if (!def) return NextResponse.json({ error: "Modello sconosciuto" }, { status: 404 });
  try {
    const body = await req.json();
    const data = coerce(params.model, body);
    if (def.autoId) delete data[def.idField];
    const created = await delegate(params.model).create({ data });
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 400 });
  }
}
