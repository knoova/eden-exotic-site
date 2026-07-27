export const dynamic = "force-dynamic";
import Link from "next/link";
import { getCompany, getKpis, getFacilities } from "@/lib/content";
import { StatoBadge } from "./components/badges";

export default async function Home() {
  const [company, kpis, facilities] = await Promise.all([getCompany(), getKpis(), getFacilities()]);
  const rete = facilities.filter((f) => f.numero > 0).sort((a, b) => a.numero - b.numero);
  const stats = kpis.slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-inner">
          <span className="eyebrow">Sito ufficiale · dal {company.fondazione}</span>
          <h1>
            {company.nome}. {company.payoff}
          </h1>
          <p className="lead">{company.claim}</p>
          <div className="hero-cta">
            <Link className="btn btn-primary" href="/rete">
              La rete globale
            </Link>
            <Link className="btn btn-ghost" href="/chat">
              Parla coi personaggi
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
            <span className="eyebrow">Chi siamo</span>
            <h2 className="mt-1">
              Non inventiamo la natura.
              <br />
              La acceleriamo.
            </h2>
          </div>
          <div className="prose">
            <p className="lead" style={{ fontSize: "1.1rem" }}>
              {company.descrizione}
            </p>
            <p className="muted mt-2">
              Settore: {company.settore}. · Sede: {company.sede}.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--paper2">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Principi</span>
            <h2>Ciò che ci vincola</h2>
          </div>
          <div className="grid grid-2">
            {company.principi.map((p: string, i: number) => {
              const [h, ...rest] = p.split(":");
              return (
                <div className="value" key={i}>
                  <h3>{rest.length ? h : `Principio ${i + 1}`}</h3>
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
            <span className="eyebrow">La rete</span>
            <h2>Undici strutture, cinque continenti</h2>
            <p>
              Ogni struttura è dedicata a una specie o a un tema. Alcune allevano, altre fanno ricerca. I
              numeri sono sparsi per scelta: alcuni restano riservati.
            </p>
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
                    <span className="badge badge-plain">Alleva</span>
                  ) : (
                    <span className="badge badge-plain">Ricerca</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <div className="hero-cta mt-3">
            <Link className="btn btn-dark" href="/rete">
              Esplora tutte le strutture
            </Link>
            <Link className="btn btn-line" href="/esperimenti">
              Il programma scientifico
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--paper2">
        <div className="wrap center" style={{ maxWidth: 760 }}>
          <span className="eyebrow center">Una novità</span>
          <h2 className="mt-1">Parla con chi fa Eden Exotic.</h2>
          <p className="lead center mt-2">
            Un'intelligenza locale dà voce alle persone del programma. Fai una domanda a Maria Stern, ad
            Alfredo Monti, a Dominika Gradowska — o ai responsabili delle strutture nel mondo.
          </p>
          <div className="hero-cta" style={{ justifyContent: "center" }}>
            <Link className="btn btn-primary" href="/chat">
              Apri la conversazione
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
