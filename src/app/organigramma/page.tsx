export const dynamic = "force-dynamic";
import { getPeople, getFacilities } from "@/lib/content";

export const metadata = { title: "Organigramma" };

const BRANCH_COLOR: Record<string, string> = {
  core: "#1f5138",
  "47b": "#2f6f4e",
  varani: "#6b3f3f",
  new: "#5b7d52"
};
const BRANCH_LABEL: Record<string, string> = {
  core: "Direzione / trasversale",
  "47b": "Programma Iguane (47B)",
  varani: "Programma Varani / Sigma",
  new: "Nuovi programmi (proposti)"
};

export default async function OrganigrammaPage() {
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
            <span className="eyebrow">Organigramma</span>
            <h1>Le persone dietro il programma</h1>
            <p className="lead">
              Genetisti, comportamentalisti, tecnici, veterinari, data scientist e responsabili della
              sicurezza in strutture distinte nel mondo, sotto un&apos;unica direzione.
            </p>
          </div>
          {ceo && (
            <>
              <div className="org-ceo">
                <div className="ceo-card">
                  <span className="eyebrow" style={{ justifyContent: "center" }}>
                    Direzione Generale
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
                ▲ OGNI STRUTTURA RIPORTA ALLA DIREZIONE
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
                              <span className="badge badge-proposto badge-plain">In definizione</span>
                            )}
                            {p.stato === "in memoria" && (
                              <span className="badge badge-riservato badge-plain">In memoria</span>
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
