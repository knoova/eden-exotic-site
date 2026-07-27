// Esperimenti della rete + bibliografia/abstract (biblio.json, verificabile).
import expData from "./data/experiments.json";
import biblio from "./data/biblio.json";
import type { Experiment, BiblioRef } from "./canon";

export const experimentsData = expData as unknown as Experiment[];

// mappa expId -> { abstract, bibliografia } (riferimenti reali)
export const experimentBiblio = biblio as unknown as Record<
  string,
  { abstract?: string; bibliografia?: BiblioRef[] }
>;
