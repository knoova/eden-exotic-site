import { PrismaClient } from "@prisma/client";

// Singleton di Prisma (evita connessioni multiple in dev / hot-reload).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/** True se il database è raggiungibile e ha dati (almeno una struttura). */
export async function dbReady(): Promise<boolean> {
  try {
    const n = await prisma.facility.count();
    return n > 0;
  } catch {
    return false;
  }
}
