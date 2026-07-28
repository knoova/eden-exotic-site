export const dynamic = "force-dynamic";
import Link from "next/link";
import {
  getProtocols,
  getGenerations,
  getSpecimens,
  getGlossary,
  getFacilities,
  getSigma,
  getConformita,
  getExperiments
} from "@/lib/content";
import { SpecimenTable } from "./SpecimenTable";
import { StatoBadge } from "../components/badges";
import { getLocale } from "@/i18n/getLocale";
import { makeT } from "@/i18n/ui";

export const metadata = { title: "Esperimenti" };

export default async function EsperimentiPage() {
  const t = makeT(getLocale());
  const [protocols, generations, specimens, glossary, facilities, sigma, conformita, experiments] = await Promise.all([
    getProtocols(),
    getGenerations(),
    getSpecimens(),
    getGlossary(),
    getFacilities(),
    getSigma(),
    getConformita(),
    getExperiments()
  ]);
  const facName = (id: string | null) => facilities.find((f) => f.id === id)?.nome || id || "—";

  return (
    <>
      <section className="section section--tight">
        <div className="wrap">
          <div className="section-head" style={{ maxWidth: 820 }}>
            <span className="eyebrow">{t("esp.hero.eyebrow")}</span>
            <h1>{t("esp.hero.title")}</h1>
            <p className="lead">{t("esp.hero.intro")}</p>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{t("esp.proto.eyebrow")}</span>
            <h2>{t("esp.proto.title")}</h2>
            <p>{t("esp.proto.intro")}</p>
          </div>
          <div className="grid grid-2">
            {protocols.map((p) => (
              <div className="card proto" key={p.codice}>
                <div className="glyph">{p.codice}</div>
                <div>
                  <h3>{p.nome}</h3>
                  <div className="trait">{p.tratto}</div>
                  <p>{p.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper2">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{t("esp.gen.eyebrow")}</span>
            <h2>{t("esp.gen.title")}</h2>
          </div>
          <div className="grid grid-3">
            {generations.map((g) => (
              <div className="card" key={g.gen}>
                <span className="chip-code">GEN {g.gen}</span>
                <h3 className="mt-1">{g.titolo}</h3>
                <p>{g.testo}</p>
                <div className="mt-1">
                  <span className="badge badge-plain">{g.branch === "varani" ? t("esp.gen.varani") : t("esp.gen.iguane")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{t("esp.reg.eyebrow")}</span>
            <h2>{t("esp.reg.title")}</h2>
            <p>{t("esp.reg.intro")}</p>
          </div>
          <SpecimenTable specimens={specimens} facilities={facilities} />
          <p className="muted mt-2" style={{ fontSize: ".84rem" }}>
            {t("esp.reg.nota")}
          </p>
        </div>
      </section>

      <section className="section section--paper2">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{t("esp.arch.eyebrow")}</span>
            <h2>{experiments.length} {t("esp.arch.studi")}, {facilities.filter((f) => f.numero > 0).length} {t("rete.hero.strutture")}</h2>
            <p>{t("esp.arch.intro")}</p>
          </div>
          <div className="table-wrap">
            <table className="reg">
              <thead>
                <tr>
                  <th>{t("esp.arch.thCodice")}</th>
                  <th>{t("esp.arch.thStudio")}</th>
                  <th>{t("esp.arch.thStruttura")}</th>
                  <th>{t("esp.arch.thAutori")}</th>
                  <th>{t("esp.arch.thStato")}</th>
                  <th>{t("common.pdf")}</th>
                </tr>
              </thead>
              <tbody>
                {experiments.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <span className="chip-code">{e.codice}</span>
                    </td>
                    <td className="nm">
                      <Link href={`/esperimenti/${e.id}`} style={{ color: "var(--forest-2)" }}>
                        {e.titolo}
                      </Link>
                      <div className="muted" style={{ fontSize: ".82rem", fontWeight: 400 }}>
                        {e.anno} · Prot. {e.protocollo || "—"}
                      </div>
                    </td>
                    <td>{facName(e.facilityId)}</td>
                    <td className="muted" style={{ fontSize: ".84rem", minWidth: 160 }}>
                      {(e.autori || []).slice(0, 2).join(", ")}
                      {(e.autori || []).length > 2 ? " et al." : ""}
                    </td>
                    <td>
                      <StatoBadge s={e.stato} />
                    </td>
                    <td>
                      <a className="badge badge-plain" href={`/api/experiments/${e.id}/pdf`} target="_blank" rel="noreferrer">
                        ⬇ {t("common.pdf")}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section--paper2">
        <div className="wrap grid grid-2">
          <div className="callout classified">
            <h3>
              <span className="badge badge-riservato badge-plain">{sigma.classificazione}</span>
            </h3>
            <h3 className="mt-1">{sigma.titolo}</h3>
            <p>{sigma.descrizione}</p>
            <p className="mt-1" style={{ fontSize: ".84rem" }}>
              <strong>{t("esp.sigma.supervisione")}:</strong> {sigma.supervisione}
            </p>
          </div>
          <div className="callout">
            <h3>{conformita.titolo}</h3>
            <p>{conformita.testo}</p>
            <div className="tag-row mt-2">
              {conformita.riferimenti.map((r: string) => (
                <span className="badge badge-plain" key={r}>
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{t("esp.gloss.eyebrow")}</span>
            <h2>{t("esp.gloss.title")}</h2>
          </div>
          <dl className="gloss grid grid-2">
            {glossary.map((g) => (
              <div key={g.termine}>
                <dt>{g.termine}</dt>
                <dd>{g.definizione}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
