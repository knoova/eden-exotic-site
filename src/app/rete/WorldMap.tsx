import type { Facility } from "@/lib/canon";

// Sagome dei continenti (coordinate lng/lat semplificate, proiezione equirettangolare).
// Volutamente schematiche: non in scala, solo per orientare la rete sulle terre emerse.
const LANDMASSES: [number, number][][] = [
  // Nord America
  [[-168, 66], [-158, 71], [-130, 70], [-105, 69], [-92, 71], [-82, 68], [-78, 62], [-64, 60], [-56, 52], [-66, 45], [-70, 41], [-75, 35], [-81, 25], [-97, 18], [-105, 20], [-114, 30], [-121, 35], [-124, 40], [-124, 48], [-132, 54], [-142, 60], [-152, 59], [-162, 62]],
  // Groenlandia
  [[-45, 60], [-28, 62], [-19, 70], [-24, 78], [-42, 82], [-58, 80], [-56, 70], [-50, 62]],
  // Sud America
  [[-80, 8], [-70, 11], [-60, 10], [-50, 2], [-42, -3], [-35, -6], [-38, -13], [-48, -25], [-58, -34], [-65, -42], [-71, -50], [-74, -53], [-73, -44], [-71, -33], [-70, -20], [-76, -14], [-81, -5], [-80, 2]],
  // Africa
  [[-16, 14], [-8, 12], [0, 6], [9, 4], [9, -2], [13, -8], [13, -16], [18, -28], [20, -34], [26, -34], [32, -26], [38, -16], [41, -8], [43, 2], [48, 8], [51, 11], [44, 11], [40, 15], [37, 20], [33, 27], [32, 31], [22, 32], [12, 34], [0, 36], [-8, 34], [-14, 26], [-17, 20]],
  // Europa (con la penisola scandinava)
  [[-10, 36], [-9, 44], [-2, 48], [2, 51], [-2, 55], [-6, 58], [5, 58], [8, 63], [13, 66], [19, 70], [25, 71], [29, 69], [30, 62], [28, 56], [31, 51], [26, 46], [18, 45], [20, 40], [24, 40], [18, 38], [8, 44], [0, 43], [-8, 43]],
  // Asia
  [[26, 41], [40, 46], [40, 55], [52, 51], [49, 43], [58, 44], [70, 44], [68, 30], [66, 25], [77, 8], [80, 13], [90, 22], [92, 21], [99, 9], [104, 1], [106, 10], [110, 20], [118, 24], [122, 30], [121, 38], [128, 42], [135, 46], [143, 50], [156, 58], [166, 62], [179, 66], [172, 71], [140, 74], [110, 74], [80, 73], [58, 69], [45, 65], [43, 55], [37, 46], [30, 44]],
  // Australia
  [[114, -22], [122, -18], [130, -12], [138, -12], [143, -11], [147, -18], [151, -25], [153, -28], [149, -38], [141, -39], [133, -34], [126, -33], [118, -35], [113, -26]],
  // Nuova Zelanda (schematica)
  [[167, -44], [171, -41], [174, -37], [176, -39], [173, -43], [169, -46]]
];

// Mappa schematica equirettangolare: terre emerse + graticola + punti delle strutture.
export function WorldMap({ facilities }: { facilities: Facility[] }) {
  const W = 1000;
  const H = 500;
  const x = (lng: number) => ((lng + 180) / 360) * W;
  const y = (lat: number) => ((90 - lat) / 180) * H;
  const meridians = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150];
  const parallels = [-60, -30, 0, 30, 60];
  const toPoints = (poly: [number, number][]) => poly.map(([lng, lat]) => `${x(lng).toFixed(1)},${y(lat).toFixed(1)}`).join(" ");

  return (
    <div className="map-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Mappa della rete globale Eden Exotic">
        <rect x={0} y={0} width={W} height={H} fill="none" stroke="rgba(244,240,230,.12)" />

        {/* terre emerse */}
        <g>
          {LANDMASSES.map((poly, i) => (
            <polygon
              key={`land${i}`}
              points={toPoints(poly)}
              fill="rgba(120,150,120,.10)"
              stroke="rgba(199,168,98,.28)"
              strokeWidth={1}
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* graticola */}
        {meridians.map((m) => (
          <line key={`m${m}`} x1={x(m)} y1={0} x2={x(m)} y2={H} stroke="rgba(244,240,230,.06)" />
        ))}
        {parallels.map((p) => (
          <line key={`p${p}`} x1={0} y1={y(p)} x2={W} y2={y(p)} stroke="rgba(244,240,230,.06)" />
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
