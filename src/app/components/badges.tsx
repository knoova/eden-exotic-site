import React from "react";

// Profilo comportamentale pubblico: la compagnia non classifica la coscienza.
// null = risposte atipiche ancora in fase di studio (non replicate); altrimenti "nella norma".
export function ConsBadge({ c }: { c: boolean | null }) {
  if (c === null) return <span className="badge badge-null">In studio</span>;
  return <span className="badge badge-plain">Nella norma</span>;
}

export function StatoBadge({ s }: { s: string }) {
  if (s === "proposto") return <span className="badge badge-proposto badge-plain">Proposto</span>;
  if (s === "in memoria") return <span className="badge badge-riservato badge-plain">In memoria</span>;
  if (s === "riservato") return <span className="badge badge-riservato badge-plain">Riservato</span>;
  if (s === "operativo") return <span className="badge badge-yes badge-plain">Operativo</span>;
  const cap = s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
  return <span className="badge badge-plain">{cap}</span>;
}
