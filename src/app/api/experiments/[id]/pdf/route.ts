import { NextRequest } from "next/server";
import { getExperiment, getFacilities } from "@/lib/content";
import { experimentPdf } from "@/lib/pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const exp = await getExperiment(params.id);
  if (!exp) return new Response("Esperimento non trovato", { status: 404 });
  const facs = await getFacilities();
  const fac = facs.find((f) => f.id === exp.facilityId) || null;
  const bytes = await experimentPdf(exp, fac);
  return new Response(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${exp.codice}.pdf"`,
      "Cache-Control": "no-store"
    }
  });
}
