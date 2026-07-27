import crypto from "node:crypto";
import { cookies } from "next/headers";
import { env } from "./env";

// Cancello amministrativo lato-server: passphrase -> cookie firmato (HMAC).
// Semplice per definizione: protegge da accessi casuali, non è un IAM completo.

export const ADMIN_COOKIE = "eden_admin";
const TTL_MS = 1000 * 60 * 60 * 8; // 8 ore

function sign(payload: string): string {
  return crypto.createHmac("sha256", env.adminSecret).update(payload).digest("base64url");
}

export function createToken(): string {
  const exp = Date.now() + TTL_MS;
  const payload = `admin.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token?: string | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const payload = `${parts[0]}.${parts[1]}`;
  if (sign(payload) !== parts[2]) return false;
  const exp = Number(parts[1]);
  return Number.isFinite(exp) && exp > Date.now();
}

export function checkPassword(pw: string): boolean {
  const a = Buffer.from(pw || "");
  const b = Buffer.from(env.adminPassword);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Da usare nei Server Component / route handler. */
export function isAuthed(): boolean {
  return verifyToken(cookies().get(ADMIN_COOKIE)?.value);
}
