"use client";
import { useState } from "react";
import type { Specimen, Facility } from "@/lib/canon";
import { ConsBadge } from "../components/badges";

export function SpecimenTable({ specimens, facilities }: { specimens: Specimen[]; facilities: Facility[] }) {
  const [filter, setFilter] = useState<string>("all");
  const facName = (id: string | null) => facilities.find((f) => f.id === id)?.nome || "—";
  const branches = [
    { k: "all", l: "Tutti" },
    { k: "47b", l: "Iguane" },
    { k: "varani", l: "Varani (N.6)" }
  ];
  const rows = specimens.filter((s) => filter === "all" || s.branch === filter);

  return (
    <>
      <div className="filters">
        {branches.map((b) => (
          <button
            key={b.k}
            className={`filter-btn${filter === b.k ? " active" : ""}`}
            onClick={() => setFilter(b.k)}
          >
            {b.l}
          </button>
        ))}
      </div>
      <div className="table-wrap">
        <table className="reg">
          <thead>
            <tr>
              <th>Codice</th>
              <th>Esteso</th>
              <th>Nome</th>
              <th>Gen · Prot.</th>
              <th>Stato cognitivo</th>
              <th>Struttura</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id}>
                <td>
                  <span className="chip-code">{s.id}</span>
                </td>
                <td className="code muted">{s.codiceEsteso}</td>
                <td className="nm">
                  {s.nomeProprio && s.nomeProprio !== "—" ? s.nomeProprio : <span className="muted">—</span>}
                </td>
                <td>
                  Gen {s.gen} <span className="muted">· Prot. {s.protocollo}</span>
                </td>
                <td>
                  <ConsBadge c={s.coscienza} />
                </td>
                <td>{facName(s.facilityId)}</td>
                <td className="muted" style={{ minWidth: 230 }}>
                  {s.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
