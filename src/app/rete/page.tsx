export const dynamic = "force-dynamic";
import Link from "next/link";
import { getFacilities, getPeople } from "@/lib/content";
import { StatoBadge } from "../components/badges";
import { WorldMap } from "./WorldMap";
import { getLocale } from "@/i18n/getLocale";
import { makeT } from "@/i18n/ui";

export const metadata = { title: "Rete globale" };

export default async function RetePage() {
  const t = makeT(getLocale());
  const TIPO_LABEL: Record<string, string> = {
    biobanca: t("rete.tipo.biobanca"),
    allevamento: t("rete.tipo.allevamento"),
    ricerca: t("common.ricerca"),
    bioinformatica: t("rete.tipo.bioinformatica"),
    validazione: t("rete.tipo.validazione"),
    stazione: t("rete.tipo.stazione"),
    direzione: t("rete.tipo.direzione"),
    satellite: t("rete.tipo.satellite"),
    logistica: t("rete.tipo.logistica"),
    ufficio: t("rete.tipo.ufficio"),
    bioproduzione: t("rete.tipo.bioproduzione"),
    storico: t("rete.tipo.storico")
  };
  const [facilities, people] = await Promise.all([getFacilities(), getPeople()]);
  const rete = facilities.filter((f) => f.numero > 0).sort((a, b) => a.numero - b.numero);
  const core = facilities.filter((f) => f.numero === 0).sort((a, b) => (a.ordine ?? 0) - (b.ordine ?? 0));
  const teamCount = (id: string) => people.filter((p) => p.facilityId === id).length;
  const continenti = new Set(facilities.map((f) => f.continente).filter((c) => c && c !== "—")).size;

  const FacilityCard = ({ f }: { f: (typeof facilities)[number] }) => (
    <article id={f.id} className={`facility${f.stato === "riservato" ? " riservato" : ""}`}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <div className="fnum">{f.id}</div>
        <span className="badge badge-plain">{TIPO_LABEL[f.tipo] || f.tipo}</span>
      </div>
      <div className="place">
        {f.citta && f.citta !== "—" ? `${f.citta} · ` : ""}
        {f.paese}
      </div>
      <h3>{f.tema}</h3>
      <div className="sp">{f.specie}</div>
      <p>{f.descrizione}</p>
      <div className="foot">
        <StatoBadge s={f.stato} />
        {f.alleva ? (
          <span className="badge badge-plain">{t("common.alleva")}</span>
        ) : (
          <span className="badge badge-plain">{t("common.nonAlleva")}</span>
        )}
        {f.protocolliChiave.length > 0 && (
          <span className="badge badge-plain">{t("common.prot")} {f.protocolliChiave.join(" · ")}</span>
        )}
        {teamCount(f.id) > 0 && (
          <Link href={`/organigramma#${f.id}`} className="badge badge-plain">
            {teamCount(f.id)} {t("common.persone")}
          </Link>
        )}
      </div>
    </article>
  );

  return (
    <>
      <section className="section section--tight">
        <div className="wrap">
          <div className="section-head" style={{ maxWidth: 860 }}>
            <span className="eyebrow">{t("nav.rete")}</span>
            <h1>{rete.length} {t("rete.hero.nodi")}, {facilities.length} {t("rete.hero.strutture")}, {continenti} {t("rete.hero.continenti")}.</h1>
            <p className="lead">{t("rete.hero.intro")}</p>
          </div>
          <WorldMap facilities={rete} />
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap">
          <div className="facility-grid">
            {rete.map((f) => (
              <FacilityCard key={f.id} f={f} />
            ))}
          </div>
        </div>
      </section>

      {core.length > 0 && (
        <section className="section section--paper2">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">{t("rete.core.eyebrow")}</span>
              <h2>{t("rete.core.title")}</h2>
            </div>
            <div className="grid grid-2">
              {core.map((f) => (
                <div key={f.id} id={f.id} className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h3>{f.nome}</h3>
                    <span className="badge badge-plain">{TIPO_LABEL[f.tipo] || f.tipo}</span>
                  </div>
                  <div className="place mt-1">{f.citta && f.citta !== "—" ? `${f.citta} · ` : ""}{f.paese}</div>
                  <p className="mt-1">{f.descrizione}</p>
                  <div className="tag-row mt-2">
                    <StatoBadge s={f.stato} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
