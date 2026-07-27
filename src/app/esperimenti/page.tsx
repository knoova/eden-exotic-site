export const dynamic = "force-dynamic";
import {
  getProtocols,
  getGenerations,
  getSpecimens,
  getGlossary,
  getFacilities,
  getSigma,
  getConformita
} from "@/lib/content";
import { SpecimenTable } from "./SpecimenTable";

export const metadata = { title: "Esperimenti" };

export default async function EsperimentiPage() {
  const [protocols, generations, specimens, glossary, facilities, sigma, conformita] = await Promise.all([
    getProtocols(),
    getGenerations(),
    getSpecimens(),
    getGlossary(),
    getFacilities(),
    getSigma(),
    getConformita()
  ]);

  return (
    <>
      <section className="section section--tight">
        <div className="wrap">
          <div className="section-head" style={{ maxWidth: 820 }}>
            <span className="eyebrow">Esperimenti &amp; Programma</span>
            <h1>La scienza, per intero.</h1>
            <p className="lead">
              Protocolli, generazioni ed esemplari. Ogni potenziamento amplifica un tratto naturale già
              presente negli animali: nessuno mira all&apos;intelligenza.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Protocolli A–H</span>
            <h2>Otto piattaforme</h2>
            <p>Ogni protocollo amplia una caratteristica naturale. Si innestano tutti sulla piattaforma di vitalità (A).</p>
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
            <span className="eyebrow">Generazioni</span>
            <h2>La linea del programma</h2>
          </div>
          <div className="grid grid-3">
            {generations.map((g) => (
              <div className="card" key={g.gen}>
                <span className="chip-code">GEN {g.gen}</span>
                <h3 className="mt-1">{g.titolo}</h3>
                <p>{g.testo}</p>
                <div className="mt-1">
                  <span className="badge badge-plain">{g.branch === "varani" ? "Varani · N.6" : "Iguane"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Registro esemplari</span>
            <h2>Il catalogo</h2>
            <p>Identificativo, codice esteso, generazione, protocollo e stato di ogni esemplare registrato.</p>
          </div>
          <SpecimenTable specimens={specimens} facilities={facilities} />
          <p className="muted mt-2" style={{ fontSize: ".84rem" }}>
            Lo stato cognitivo è una classificazione interna. La singolarità degli esemplari coscienti resta
            materia riservata.
          </p>
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
              <strong>Supervisione:</strong> {sigma.supervisione}
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
            <span className="eyebrow">Glossario</span>
            <h2>Terminologia verificata</h2>
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
