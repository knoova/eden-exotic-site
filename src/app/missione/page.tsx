export const dynamic = "force-dynamic";
import { getMission, getCompany, getSigma } from "@/lib/content";

export const metadata = { title: "Missione" };

export default async function MissionePage() {
  const [mission, company, sigma] = await Promise.all([getMission(), getCompany(), getSigma()]);
  return (
    <>
      <section className="section section--tight">
        <div className="wrap">
          <div className="section-head" style={{ maxWidth: 820 }}>
            <span className="eyebrow">Missione &amp; Valori</span>
            <h1>La resilienza, progettata.</h1>
            <p className="lead">{mission.statement}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <span className="eyebrow">Visione</span>
            <p className="pull mt-2">{mission.visione}</p>
          </div>
          <div className="callout classified">
            <h3>{sigma.titolo} — nota sul duplice uso</h3>
            <p>{mission.dualUse}</p>
            <div className="mt-2">
              <span className="badge badge-riservato">{sigma.classificazione}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--paper2">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Valori</span>
            <h2>Cinque impegni</h2>
          </div>
          <div className="grid grid-2">
            {mission.valori.map((v: { titolo: string; testo: string }) => (
              <div className="value" key={v.titolo}>
                <h3>{v.titolo}</h3>
                <p>{v.testo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Principi operativi</span>
            <h2>Le regole d&apos;oro</h2>
          </div>
          <div className="grid grid-2">
            {company.principi.map((p: string, i: number) => (
              <div className="card" key={i}>
                <span className="chip-code">R{i + 1}</span>
                <p className="mt-1" style={{ color: "var(--ink)", fontSize: "1.02rem" }}>
                  {p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
