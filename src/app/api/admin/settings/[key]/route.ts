import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = new Set(["company", "mission", "programmaSigma", "conformita"]);

export async function GET(_req: NextRequest, { params }: { params: { key: string } }) {
  if (!ALLOWED.has(params.key)) return NextResponse.json({ error: "Chiave non valida" }, { status: 404 });
  try {
    const row = await prisma.setting.findUnique({ where: { key: params.key } });
    return NextResponse.json(row?.value ?? null);
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { key: string } }) {
  if (!isAuthed()) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  if (!ALLOWED.has(params.key)) return NextResponse.json({ error: "Chiave non valida" }, { status: 404 });
  try {
    const value = await req.json();
    const saved = await prisma.setting.upsert({
      where: { key: params.key },
      update: { value },
      create: { key: params.key, value }
    });
    return NextResponse.json(saved.value);
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 400 });
  }
}
