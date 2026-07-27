import type { Facility } from "@/lib/canon";

// Mappa schematica equirettangolare: graticola + punti delle strutture.
export function WorldMap({ facilities }: { facilities: Facility[] }) {
  const W = 1000;
  const H = 500;
  const x = (lng: number) => ((lng + 180) / 360) * W;
  const y = (lat: number) => ((90 - lat) / 180) * H;
  const meridians = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150];
  const parallels = [-60, -30, 0, 30, 60];

  return (
    <div className="map-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Mappa della rete globale Eden Exotic">
        {/* graticola */}
        <rect x={0} y={0} width={W} height={H} fill="none" stroke="rgba(244,240,230,.12)" />
        {meridians.map((m) => (
          <line key={`m${m}`} x1={x(m)} y1={0} x2={x(m)} y2={H} stroke="rgba(244,240,230,.07)" />
        ))}
        {parallels.map((p) => (
          <line key={`p${p}`} x1={0} y1={y(p)} x2={W} y2={y(p)} stroke="rgba(244,240,230,.07)" />
        ))}
        <line x1={0} y1={y(0)} x2={W} y2={y(0)} stroke="rgba(199,168,98,.25)" strokeDasharray="4 6" />

        {/* punti */}
        {facilities.map((f) => {
          if (f.lat == null || f.lng == null) return null;
          const cx = x(f.lng);
          const cy = y(f.lat);
          const reserved = f.stato === "riservato";
          return (
            <a key={f.id} href={`#${f.id}`}>
              <circle className={`map-dot${reserved ? " reserved" : ""}`} cx={cx} cy={cy} r={5}>
                <title>
                  {f.id} · {f.paese} — {f.specie}
                </title>
              </circle>
              <text className="map-label" x={cx + 8} y={cy + 3}>
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
        <span style={{ marginLeft: "auto", opacity: 0.7 }}>Proiezione schematica · non in scala</span>
      </div>
    </div>
  );
}
