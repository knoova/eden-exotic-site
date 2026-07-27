export const dynamic = "force-dynamic";
import { getKpis, getMilestones } from "@/lib/content";

export const metadata = { title: "Risultati" };

export default async function RisultatiPage() {
  const [kpis, milestones] = await Promise.all([getKpis(), getMilestones()]);
  const tl = milestones.slice().sort((a, b) => Number(a.anno) - Number(b.anno));

  return (
    <>
      <section className="section section--tight">
        <div className="wrap">
          <div className="section-head" style={{ maxWidth: 820 }}>
            <span className="eyebrow">Risultati</span>
            <h1>Ciò che i dati sostengono</h1>
            <p className="lead">
              Il nostro progresso si misura in generazioni. Ogni numero qui è verificabile e ripetibile.
            </p>
          </div>
          <div className="kpi-grid">
            {kpis.map((k) => (
              <div className="kpi" key={k.etichetta}>
                <div className="v">{k.valore}</div>
                <div className="k">{k.etichetta}</div>
                <div className="n">{k.nota}</div>
              </div>
            ))}
          </div>
          <p className="muted mt-2" style={{ fontSize: ".86rem" }}>
            I valori di programma riflettono la coorte di riferimento del Programma Iguane (Generazione 4).
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Cronologia</span>
            <h2>La storia del programma</h2>
          </div>
          <div className="timeline">
            {tl.map((t, i) => (
              <div className="tl-item" key={i}>
                <div className="yr">{t.anno}</div>
                <h3>{t.titolo}</h3>
                <p>{t.testo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
