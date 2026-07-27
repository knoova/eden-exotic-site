// Mappa geografica reale: coste da Natural Earth (world-atlas, 110m) proiettate
// con d3-geo (Equal Earth). Render lato server: nessuna API esterna, nessuna
// chiave, funziona offline. I nodi N.1–N.11 cadono nelle coordinate reali.
import { geoEqualEarth, geoPath, geoGraticule10 } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, Geometry } from "geojson";
import worldData from "world-atlas/countries-110m.json";
import type { Facility } from "@/lib/canon";

const W = 1000;
const H = 500;

// TopoJSON → GeoJSON (paesi) una sola volta a livello di modulo.
const topo = worldData as unknown as Parameters<typeof feature>[0];
const countries = feature(topo, (topo as any).objects.countries) as unknown as {
  features: Feature<Geometry>[];
};

const projection = geoEqualEarth().fitExtent(
  [
    [16, 16],
    [W - 16, H - 16]
  ],
  { type: "Sphere" } as any
);
const path = geoPath(projection);
const graticule = geoGraticule10();
const spherePath = path({ type: "Sphere" } as any) || "";
const gratPath = path(graticule) || "";

export function WorldMap({ facilities }: { facilities: Facility[] }) {
  const nodes = facilities
    .filter((f) => f.lat != null && f.lng != null)
    .map((f) => {
      const p = projection([f.lng as number, f.lat as number]);
      return p ? { f, x: p[0], y: p[1] } : null;
    })
    .filter(Boolean) as { f: Facility; x: number; y: number }[];

  return (
    <div className="map-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Mappa della rete globale Eden Exotic">
        <defs>
          <radialGradient id="mapNode" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--brass-2)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--brass-2)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* oceano / sfera */}
        <path d={spherePath} fill="rgba(255,255,255,.015)" stroke="rgba(244,240,230,.14)" strokeWidth={1} />
        {/* graticola */}
        <path d={gratPath} fill="none" stroke="rgba(244,240,230,.05)" strokeWidth={0.5} />
        {/* paesi */}
        <g>
          {countries.features.map((c, i) => (
            <path
              key={i}
              d={path(c) || undefined}
              fill="rgba(120,150,120,.13)"
              stroke="rgba(199,168,98,.28)"
              strokeWidth={0.5}
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* nodi della rete */}
        {nodes.map(({ f, x, y }) => {
          const reserved = f.stato === "riservato";
          return (
            <a key={f.id} href={`#${f.id}`}>
              <circle cx={x} cy={y} r={11} fill="url(#mapNode)" opacity={reserved ? 0 : 0.7} />
              <circle className={`map-dot${reserved ? " reserved" : ""}`} cx={x} cy={y} r={4.5}>
                <title>
                  {f.id} · {f.paese} — {f.specie}
                </title>
              </circle>
              <text className="map-label" x={x + 8} y={y + 3}>
                {f.id}
              </text>
            </a>
          );
        })}
      </svg>
      <div className="map-legend">
        <span>
          <i style={{ background: "var(--brass-2)" }} /> Struttura operativa / proposta
        </span>
        <span>
          <i style={{ background: "var(--danger)" }} /> Ubicazione riservata
        </span>
        <span style={{ marginLeft: "auto", opacity: 0.7 }}>Proiezione Equal Earth · coste Natural Earth</span>
      </div>
    </div>
  );
}
