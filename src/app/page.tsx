export const dynamic = "force-dynamic";
import Link from "next/link";
import { getCompany, getKpis, getFacilities } from "@/lib/content";
import { StatoBadge } from "./components/badges";
import { getLocale } from "@/i18n/getLocale";
import { makeT } from "@/i18n/ui";

export default async function Home() {
  const t = makeT(getLocale());
  const [company, kpis, facilities] = await Promise.all([getCompany(), getKpis(), getFacilities()]);
  const rete = facilities.filter((f) => f.numero > 0).sort((a, b) => a.numero - b.numero);
  const stats = kpis.slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-inner">
          <span className="eyebrow">{t("home.hero.eyebrow")} {company.fondazione}</span>
          <h1>
            {company.nome}. {company.payoff}
          </h1>
          <p className="lead">{company.claim}</p>
          <div className="hero-cta">
            <Link className="btn btn-primary" href="/rete">
              {t("home.hero.ctaRete")}
            </Link>
            <Link className="btn btn-ghost" href="/chat">
              {t("nav.chat")}
            </Link>
          </div>
        </div>
        <div className="wrap hero-meta">
          {stats.map((k) => (
            <div key={k.etichetta}>
              <div className="n">{k.valore}</div>
              <div className="l">{k.etichetta}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <span className="eyebrow">{t("home.chiSiamo.eyebrow")}</span>
            <h2 className="mt-1">
              {t("home.chiSiamo.title1")}
              <br />
              {t("home.chiSiamo.title2")}
            </h2>
          </div>
          <div className="prose">
            <p className="lead" style={{ fontSize: "1.1rem" }}>
              {company.descrizione}
            </p>
            <p className="muted mt-2">
              {t("common.settore")}: {company.settore}. · {t("common.sede")}: {company.sede}.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--paper2">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{t("home.principi.eyebrow")}</span>
            <h2>{t("home.principi.title")}</h2>
          </div>
          <div className="grid grid-2">
            {company.principi.map((p: string, i: number) => {
              const [h, ...rest] = p.split(":");
              return (
                <div className="value" key={i}>
                  <h3>{rest.length ? h : `${t("common.principio")} ${i + 1}`}</h3>
                  <p>{rest.length ? rest.join(":").trim() : p}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{t("home.rete.eyebrow")}</span>
            <h2>{t("home.rete.title")}</h2>
            <p>{t("home.rete.intro")}</p>
          </div>
          <div className="facility-grid">
            {rete.slice(0, 6).map((f) => (
              <Link
                key={f.id}
                href="/rete"
                className={`facility facility--hover${f.stato === "riservato" ? " riservato" : ""}`}
              >
                <div className="fnum">{f.id}</div>
                <div className="place">
                  {f.citta && f.citta !== "—" ? `${f.citta} · ` : ""}
                  {f.paese}
                </div>
                <h3>{f.tema.split("—")[0].trim()}</h3>
                <div className="sp">{f.specie}</div>
                <div className="foot">
                  <StatoBadge s={f.stato} />
                  {f.alleva ? (
                    <span className="badge badge-plain">{t("common.alleva")}</span>
                  ) : (
                    <span className="badge badge-plain">{t("common.ricerca")}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <div className="hero-cta mt-3">
            <Link className="btn btn-dark" href="/rete">
              {t("home.rete.ctaEsplora")}
            </Link>
            <Link className="btn btn-line" href="/esperimenti">
              {t("home.rete.ctaProgramma")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--paper2">
        <div className="wrap center" style={{ maxWidth: 760 }}>
          <span className="eyebrow center">{t("home.chat.eyebrow")}</span>
          <h2 className="mt-1">{t("home.chat.title")}</h2>
          <p className="lead center mt-2">{t("home.chat.lead")}</p>
          <div className="hero-cta" style={{ justifyContent: "center" }}>
            <Link className="btn btn-primary" href="/chat">
              {t("home.chat.cta")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
