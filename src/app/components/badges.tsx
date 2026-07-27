import React from "react";

// Profilo comportamentale pubblico: la compagnia non classifica la coscienza.
// null = risposte atipiche ancora in fase di studio (non replicate); altrimenti "nella norma".
export function ConsBadge({ c }: { c: boolean | null }) {
  if (c === null) return <span className="badge badge-null">In studio</span>;
  return <span className="badge badge-plain">Nella norma</span>;
}

// Stato di una struttura (ciclo di vita reale) o di un esperimento.
const STATO: Record<string, [string, string]> = {
  operativo: ["Operativa", "badge-yes"],
  costruzione: ["In costruzione", "badge-null"],
  pianificata: ["Pianificata", "badge-proposto"],
  dismissione: ["In dismissione", "badge-riservato"],
  dismessa: ["Dismessa", "badge-dismessa"],
  riservato: ["Riservata", "badge-riservato"],
  "in memoria": ["In memoria", "badge-riservato"],
  proposto: ["In valutazione", "badge-proposto"]
};

export function StatoBadge({ s }: { s: string }) {
  const m = STATO[s];
  if (m) return <span className={`badge ${m[1]} badge-plain`}>{m[0]}</span>;
  const cap = s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
  return <span className="badge badge-plain">{cap}</span>;
}
