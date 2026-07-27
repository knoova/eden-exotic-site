import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { MODELS, coerce, delegate, parseId } from "@/lib/admin-models";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest, { params }: { params: { model: string; id: string } }) {
  if (!isAuthed()) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  const def = MODELS[params.model];
  if (!def) return NextResponse.json({ error: "Modello sconosciuto" }, { status: 404 });
  try {
    const body = await req.json();
    const data = coerce(params.model, body);
    delete data[def.idField]; // l'id non si modifica dall'update
    const id = parseId(params.model, params.id);
    const updated = await delegate(params.model).update({ where: { [def.idField]: id }, data });
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { model: string; id: string } }) {
  if (!isAuthed()) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  const def = MODELS[params.model];
  if (!def) return NextResponse.json({ error: "Modello sconosciuto" }, { status: 404 });
  try {
    const id = parseId(params.model, params.id);
    await delegate(params.model).delete({ where: { [def.idField]: id } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 400 });
  }
}
