export const dynamic = "force-dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getExperiment, getFacilities } from "@/lib/content";
import { StatoBadge } from "../../components/badges";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const e = await getExperiment(params.id);
  return { title: e ? `${e.codice} — ${e.titolo}` : "Esperimento" };
}

export default async function ExperimentPage({ params }: { params: { id: string } }) {
  const exp = await getExperiment(params.id);
  if (!exp) notFound();
  const facs = await getFacilities();
  const fac = facs.find((f) => f.id === exp.facilityId) || null;
  const refs = exp.bibliografia || [];

  return (
    <section className="section section--tight">
      <div className="wrap" style={{ maxWidth: 820 }}>
        <Link href="/esperimenti" className="badge badge-plain" style={{ marginBottom: "1.4rem", display: "inline-flex" }}>
          ← Archivio esperimenti
        </Link>

        <div className="code muted" style={{ marginBottom: ".6rem" }}>
          {exp.codice} · Struttura {exp.facilityId}
          {fac ? ` (${fac.paese})` : ""} · {exp.anno} · Prot. {exp.protocollo || "—"}
        </div>
        <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.7rem)" }}>{exp.titolo}</h1>

        {exp.autori && exp.autori.length > 0 && (
          <p className="mt-2" style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", color: "var(--forest-2)" }}>
            {exp.autori.join(",  ")}
          </p>
        )}
        <p className="muted" style={{ fontSize: ".9rem" }}>
          {fac ? `${fac.nome} — ${fac.citta}, ${fac.paese}` : "Eden Exotic"}
        </p>

        <div className="tag-row mt-2" style={{ alignItems: "center" }}>
          <StatoBadge s={exp.stato} />
          <a className="btn btn-primary btn-sm" href={`/api/experiments/${exp.id}/pdf`} target="_blank" rel="noreferrer">
            ⬇ Scarica il PDF firmato
          </a>
        </div>

        <hr className="hr" />

        {exp.abstract && (
          <>
            <span className="eyebrow">Abstract</span>
            <p className="mt-1" style={{ fontSize: "1.05rem", lineHeight: 1.65 }}>
              {exp.abstract}
            </p>
          </>
        )}

        <div className="grid grid-2 mt-3">
          <div className="callout">
            <h3>Obiettivo</h3>
            <p>{exp.obiettivo}</p>
          </div>
          {exp.metodo && (
            <div className="callout">
              <h3>Metodo</h3>
              <p>{exp.metodo}</p>
            </div>
          )}
        </div>
        {exp.risultato && (
          <div className="callout mt-2">
            <h3>Risultati e conclusioni</h3>
            <p>{exp.risultato}</p>
          </div>
        )}

        <div className="mt-4">
          <span className="eyebrow">Bibliografia</span>
          {refs.length === 0 ? (
            <p className="muted mt-1">Bibliografia in fase di verifica.</p>
          ) : (
            <ol className="mt-2" style={{ paddingLeft: "1.2rem", display: "grid", gap: ".7rem" }}>
              {refs.map((r, i) => (
                <li key={i} style={{ fontSize: ".95rem", lineHeight: 1.5 }}>
                  {r.autori} ({r.anno}). <em>{r.titolo}</em>. {r.fonte}.
                  {r.url && (
                    <>
                      {" "}
                      <a href={r.url} target="_blank" rel="noreferrer" style={{ color: "var(--forest-2)", wordBreak: "break-all" }}>
                        {r.url}
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ol>
          )}
          <p className="muted mt-2" style={{ fontSize: ".8rem" }}>
            La bibliografia elenca opere reali a scopo di contesto scientifico. Autori e risultati dello studio
            sono di finzione (universo 47B).
          </p>
        </div>
      </div>
    </section>
  );
}
