export const dynamic = "force-dynamic";
import { getKpis, getMilestones } from "@/lib/content";
import { getLocale } from "@/i18n/getLocale";
import { makeT } from "@/i18n/ui";

export const metadata = { title: "Risultati" };

export default async function RisultatiPage() {
  const t = makeT(getLocale());
  const [kpis, milestones] = await Promise.all([getKpis(), getMilestones()]);
  const tl = milestones.slice().sort((a, b) => Number(a.anno) - Number(b.anno));

  return (
    <>
      <section className="section section--tight">
        <div className="wrap">
          <div className="section-head" style={{ maxWidth: 820 }}>
            <span className="eyebrow">{t("nav.risultati")}</span>
            <h1>{t("ris.hero.title")}</h1>
            <p className="lead">{t("ris.hero.intro")}</p>
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
            {t("ris.hero.nota")}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{t("ris.tl.eyebrow")}</span>
            <h2>{t("ris.tl.title")}</h2>
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
