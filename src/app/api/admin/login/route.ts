import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, checkPassword, createToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  if (!checkPassword(String(password || ""))) {
    return NextResponse.json({ ok: false, error: "Passphrase non corretta." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8
  });
  return res;
}
