export const dynamic = "force-dynamic";
import { getPeople, getFacilities } from "@/lib/content";
import { getLocale } from "@/i18n/getLocale";
import { makeT } from "@/i18n/ui";

export const metadata = { title: "Organigramma" };

const BRANCH_COLOR: Record<string, string> = {
  core: "#1f5138",
  "47b": "#2f6f4e",
  varani: "#6b3f3f",
  new: "#5b7d52"
};

export default async function OrganigrammaPage() {
  const t = makeT(getLocale());
  const BRANCH_LABEL: Record<string, string> = {
    core: t("org.branch.core"),
    "47b": t("org.branch.47b"),
    varani: t("org.branch.varani"),
    new: t("org.branch.new")
  };
  const [people, facilities] = await Promise.all([getPeople(), getFacilities()]);
  const ceo = people.find((p) => p.reportsTo === null);

  // ordina le strutture come nella rete; raggruppa le persone (CEO escluso)
  const orderedFac = facilities
    .slice()
    .sort((a, b) => (a.ordine ?? a.numero) - (b.ordine ?? b.numero))
    .filter((f) => people.some((p) => p.facilityId === f.id && p.id !== ceo?.id));

  const legendBranches = Array.from(new Set(facilities.map((f) => f.branch)));

  return (
    <>
      <section className="section section--tight">
        <div className="wrap">
          <div className="section-head" style={{ maxWidth: 820 }}>
            <span className="eyebrow">{t("nav.organigramma")}</span>
            <h1>{t("org.hero.title")}</h1>
            <p className="lead">{t("org.hero.intro")}</p>
          </div>
          {ceo && (
            <>
              <div className="org-ceo">
                <div className="ceo-card">
                  <span className="eyebrow" style={{ justifyContent: "center" }}>
                    {t("org.ceo.eyebrow")}
                  </span>
                  <div className="person-name mt-1">{ceo.nome}</div>
                  <div className="person-role">{ceo.ruolo}</div>
                  <p className="person-bio mt-1">{ceo.bio}</p>
                </div>
              </div>
              <p
                className="center muted mt-2"
                style={{ fontFamily: "var(--mono)", fontSize: ".78rem", letterSpacing: ".1em" }}
              >
                ▲ {t("org.ceo.nota")}
              </p>
            </>
          )}
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap">
          <div className="org-legend">
            {legendBranches.map((b) => (
              <span key={b}>
                <i style={{ background: BRANCH_COLOR[b] || "#5c6b62" }} />
                {BRANCH_LABEL[b] || b}
              </span>
            ))}
          </div>

          <div className="dept-grid">
            {orderedFac.map((f) => {
              const team = people.filter((p) => p.facilityId === f.id && p.id !== ceo?.id);
              return (
                <div className="dept" id={f.id} key={f.id}>
                  <div className="dept-head" style={{ background: BRANCH_COLOR[f.branch] || "#1f5138" }}>
                    <h3>
                      {f.nome}
                      {f.citta && f.citta !== "—" ? ` · ${f.paese}` : f.paese ? ` · ${f.paese}` : ""}
                    </h3>
                    <span className="count">{team.length} ·</span>
                  </div>
                  <div className="dept-body">
                    {team.map((p) => (
                      <div className="person" key={p.id}>
                        <div className="person-top">
                          <span className="person-name">{p.nome}</span>
                          <span className="person-role">{p.ruolo}</span>
                        </div>
                        <p className="person-bio">{p.bio}</p>
                        {(p.stato === "proposto" || p.stato === "in memoria") && (
                          <div className="person-meta">
                            {p.stato === "proposto" && (
                              <span className="badge badge-proposto badge-plain">{t("org.badge.pianificato")}</span>
                            )}
                            {p.stato === "in memoria" && (
                              <span className="badge badge-riservato badge-plain">{t("common.inMemoria")}</span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
