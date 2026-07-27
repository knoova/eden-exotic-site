export const dynamic = "force-dynamic";
import Link from "next/link";
import { getFacilities, getPeople } from "@/lib/content";
import { StatoBadge } from "../components/badges";
import { WorldMap } from "./WorldMap";

export const metadata = { title: "Rete globale" };

const TIPO_LABEL: Record<string, string> = {
  biobanca: "Biobanca",
  allevamento: "Allevamento",
  ricerca: "Ricerca",
  bioinformatica: "Bioinformatica",
  validazione: "Validazione",
  stazione: "Allevamento + campo",
  direzione: "Direzione",
  satellite: "Satellite",
  logistica: "Logistica & quarantena",
  ufficio: "Ufficio",
  bioproduzione: "Bioproduzione",
  storico: "Sito storico"
};

export default async function RetePage() {
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
          <span className="badge badge-plain">Alleva</span>
        ) : (
          <span className="badge badge-plain">Non alleva</span>
        )}
        {f.protocolliChiave.length > 0 && (
          <span className="badge badge-plain">Prot. {f.protocolliChiave.join(" · ")}</span>
        )}
        {teamCount(f.id) > 0 && (
          <Link href={`/organigramma#${f.id}`} className="badge badge-plain">
            {teamCount(f.id)} persone
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
            <span className="eyebrow">Rete globale</span>
            <h1>{rete.length} nodi, {facilities.length} strutture, {continenti} continenti.</h1>
            <p className="lead">
              Oltre ai nodi numerati N.x — alcuni operativi, altri in costruzione, pianificati o in
              dismissione — la rete comprende la direzione, gli uffici regionali, la logistica, un archivio
              ridondante e alcuni siti storici ormai dismessi. La numerazione è sparsa per scelta: alcuni nodi
              restano riservati.
            </p>
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
              <span className="eyebrow">Oltre i nodi numerati</span>
              <h2>Direzione, uffici e siti di supporto</h2>
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
