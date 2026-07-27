import React from "react";

export function ConsBadge({ c }: { c: boolean | null }) {
  if (c === true) return <span className="badge badge-yes">Cosciente</span>;
  if (c === false) return <span className="badge badge-no">Rettiliano</span>;
  return <span className="badge badge-null">Ignoto / in emersione</span>;
}

export function StatoBadge({ s }: { s: string }) {
  if (s === "proposto") return <span className="badge badge-proposto badge-plain">Proposto</span>;
  if (s === "in memoria") return <span className="badge badge-riservato badge-plain">In memoria</span>;
  if (s === "riservato") return <span className="badge badge-riservato badge-plain">Riservato</span>;
  if (s === "operativo") return <span className="badge badge-yes badge-plain">Operativo</span>;
  const cap = s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
  return <span className="badge badge-plain">{cap}</span>;
}
