// =============================================================================
// Eden Exotic — CANON (fonte di verità dei contenuti)
// Derivato dal repo 47B-universe (canon/facts.yaml + bibbie). Il seed del DB
// e il RAG partono da qui. La rete N.1–N.11 e le knowledge del RAG arrivano da
// ./canon-network (generate dall'espansione del canon).
// =============================================================================

import {
  networkFacilities,
  networkPeople,
  knowledgeBase,
  networkSpecimens,
  experimentsData,
  experimentBiblio,
  peopleEnrichment,
  enrichmentKnowledge
} from "./canon-network";
import { extraFacilities } from "./canon-extra";

export type Department = { id: string; nome: string; colore: string };
export type Facility = {
  id: string; numero: number; nome: string; paese: string; citta: string; continente: string;
  lat?: number | null; lng?: number | null; specie: string; tipo: string; alleva: boolean;
  tema: string; sommario: string; descrizione: string; protocolliChiave: string[];
  branch: string; stato: string; ordine?: number;
};
export type Person = {
  id: string; nome: string; ruolo: string; bio: string; dip: string; branch: string;
  stato: string; reportsTo: string | null; facilityId: string | null; ordine?: number;
  competenze?: string[]; voce?: string | null; background?: string | null;
};
export type Specimen = {
  id: string; codiceEsteso: string; specie?: string | null; gen: number; protocollo: string;
  coscienza: boolean | null; nomeProprio: string | null; branch: string; stato: string;
  note: string; facilityId: string | null;
};
export type BiblioRef = { autori: string; anno: string; titolo: string; fonte: string; url?: string };
export type Experiment = {
  id: string; codice: string; titolo: string; facilityId: string | null; protocollo: string | null;
  obiettivo: string; metodo: string | null; risultato: string | null; stato: string;
  anno: string | null; branch: string; ordine?: number;
  abstract?: string | null; autori?: string[]; bibliografia?: BiblioRef[];
};
export type PersonEnrichment = { bio?: string; competenze?: string[]; voce?: string; background?: string };
export type Protocol = { codice: string; nome: string; tratto: string; note: string };
export type Generation = { gen: number; titolo: string; testo: string; branch: string };
export type Kpi = { etichetta: string; valore: string; nota: string };
export type Milestone = { anno: string; titolo: string; testo: string; tipo: string };
export type GlossaryTerm = { termine: string; definizione: string };
export type Doc = { id: string; categoria: string; titolo: string; testo: string };

// --- Azienda ----------------------------------------------------------------
export const company = {
  nome: "Eden Exotic",
  ragioneSociale: "Eden Exotic S.p.A.",
  payoff: "Un monumento alla scienza.",
  claim: "Tutto misurato, tutto sorvegliato, tutto sotto controllo.",
  fondazione: "2011",
  sede: "Italia — Direzione centrale",
  settore: "Biotecnologie · Ingegneria genetica · Sistemi biologici adattivi",
  descrizione:
    "Eden Exotic progetta e alleva organismi geneticamente potenziati attraverso una rete " +
    "di strutture specializzate nel mondo. Genomica di precisione, allevamento controllato e " +
    "studio del comportamento per esemplari più resistenti, più stabili e più rapidi a maturare. " +
    "Ogni caratteristica potenziata amplifica un tratto già presente in natura: non inventiamo, acceleriamo.",
  principi: [
    "Un solo standard, tre climi operativi: freddo, temperato, estremo.",
    "Scienza reale e verificata: nessuna scorciatoia non documentata.",
    "Amplificare, non inventare: ogni potenziamento estende un tratto naturale già esistente.",
    "Tracciabilità totale: conformità CITES documentata su ogni esemplare.",
    "Solo ciò che i dati sostengono: nessuna promessa oltre l'evidenza."
  ]
};

// --- Missione ---------------------------------------------------------------
export const mission = {
  statement:
    "Costruire sistemi biologici adattabili e resilienti — capaci di prosperare dove la vita " +
    "ordinaria fatica — attraverso un'ingegneria genetica rigorosa, misurabile e responsabile.",
  visione:
    "Un futuro in cui la resilienza biologica è progettabile: per la conservazione delle specie, " +
    "per gli ambienti ostili, per la ricerca e per la difesa civile.",
  valori: [
    { titolo: "Rigore", testo: "Ipotesi, protocollo, misura. Nessuna affermazione senza dato." },
    { titolo: "Ambizione misurata", testo: "Obiettivi grandi, passi verificabili. Le generazioni sono la nostra unità di progresso." },
    { titolo: "Responsabilità", testo: "Duplice uso trattato come tale: finalità legittime, controllo severo, tracciabilità totale." },
    { titolo: "Rispetto del vivente", testo: "Gli esemplari sono soggetti di studio, non semplici pratiche. Benessere e dignità documentati." },
    { titolo: "Riservatezza", testo: "Ciò che non è pronto non si annuncia. La discrezione protegge la ricerca e chi vi lavora." }
  ],
  dualUse:
    "Parte della nostra ricerca ha natura duale (civile e di difesa). La trattiamo con serietà: " +
    "finalità dichiarate, supervisione dedicata e la convinzione che una tecnologia non sia buona o " +
    "cattiva di per sé, ma per l'uso che se ne sceglie."
};

export const programmaSigma = {
  titolo: "Programma Sigma",
  classificazione: "Riservato · Duplice uso",
  descrizione:
    "Linea di ricerca per sistemi biologici adattabili e resilienti destinati ad ambienti ostili, " +
    "soccorso e difesa civile. Include la validazione sul campo degli esemplari e la loro " +
    "integrazione operativa. Finalità legittime, supervisione dedicata, accesso limitato.",
  supervisione: "Direzione Centrale · Responsabile Sicurezza & Conformità"
};

export const conformita = {
  titolo: "Sicurezza & Conformità",
  testo:
    "Ogni esemplare è tracciato secondo la Convenzione di Washington (CITES, 1973), il Reg. (CE) " +
    "n. 338/97 e la Legge 150/1992. La documentazione di tracciabilità accompagna l'esemplare in " +
    "ogni trasferimento. L'integrità dei registri è condizione di ogni operazione.",
  riferimenti: ["CITES — Convenzione di Washington (1973)", "Reg. (CE) n. 338/97", "Legge 7 febbraio 1992, n. 150"]
};

// --- Dipartimenti -----------------------------------------------------------
export const departments: Department[] = [
  { id: "direzione", nome: "Direzione Generale", colore: "#1f5138" },
  { id: "genetica", nome: "R&D — Genetica di Precisione", colore: "#2f6f4e" },
  { id: "comportamento", nome: "Comportamento & Cognizione", colore: "#3d7d63" },
  { id: "allevamento", nome: "Operazioni di Allevamento", colore: "#5b7d52" },
  { id: "conformita", nome: "Sicurezza & Conformità", colore: "#7a6b3a" },
  { id: "sigma", nome: "Programma Sigma", colore: "#6b3f3f" },
  { id: "dati", nome: "Dati, Bioinformatica & AI", colore: "#37607a" }
];

// --- Strutture di direzione / satellite (oltre alla rete N.1–N.11) ----------
const coreFacilities: Facility[] = [
  {
    id: "HQ", numero: 0, nome: "Direzione Centrale", paese: "Italia", citta: "—", continente: "Europa",
    lat: 44.75, lng: 10.3, specie: "—", tipo: "direzione", alleva: false, tema: "Il Centro — governo del programma",
    sommario: "Direzione, comitato scientifico e coordinamento della rete.",
    descrizione:
      "La Direzione Centrale coordina la rete globale, il comitato scientifico e i rapporti con i " +
      "finanziatori. Qui si decidono priorità, budget e la linea del Programma Sigma. Pretende risultati, " +
      "e li pretende presto.",
    protocolliChiave: [], branch: "core", stato: "operativo", ordine: 0
  },
  {
    id: "VILLA", numero: 0, nome: "Villa Monti", paese: "Italia", citta: "Rosignano Marittimo (LI)", continente: "Europa",
    lat: 43.4, lng: 10.43, specie: "Iguane (studio)", tipo: "satellite", alleva: false, tema: "Lo Studio — osservazione ravvicinata",
    sommario: "Sito privato e riservato per lo studio comportamentale ravvicinato.",
    descrizione:
      "Struttura satellite dell'Allevamento N.4: una villa con piani umanistici sopra e un laboratorio " +
      "moderno sotto. Sito privato e discreto, voluto dalla Direzione per studiare da vicino gli esemplari " +
      "più interessanti lontano dal laboratorio principale.",
    protocolliChiave: ["B", "C"], branch: "47b", stato: "operativo", ordine: 99
  }
];

export const facilities: Facility[] = [...coreFacilities, ...networkFacilities, ...extraFacilities].sort(
  (a, b) => (a.ordine ?? a.numero) - (b.ordine ?? b.numero)
);

// --- Persone canoniche (N.4, Villa, N.6, Direzione) -------------------------
const canonPeople: Person[] = [
  { id: "stern", nome: "Dr.ssa Maria Stern", ruolo: "Amministratore Delegato (CEO)", dip: "direzione", branch: "core", stato: "attivo", reportsTo: null, facilityId: "HQ",
    bio: "Guida Eden Exotic con la convinzione di servire qualcosa di importante: scienza, sicurezza, progresso. Rigorosa, non tenera. Protegge il programma perché crede che proteggerlo significhi proteggere il futuro." },

  // Allevamento N.4 — iguane
  { id: "conti", nome: "Dr. Marco Conti", ruolo: "Responsabile Protocollo B", dip: "genetica", branch: "47b", stato: "attivo", reportsTo: "stern", facilityId: "N4",
    bio: "Responsabile del Protocollo B all'Allevamento N.4. Coordina gli studi su sviluppo neurale e marcatori cognitivi degli esemplari, all'incrocio tra genetica e comportamento." },
  { id: "marini", nome: "Dr.ssa Elena Marini", ruolo: "Genetista · Programma Iguane", dip: "genetica", branch: "47b", stato: "attivo", reportsTo: "conti", facilityId: "N4",
    bio: "Genetista del Programma Iguane. Progetta e valida gli edit genetici e riporta il gruppo alla concretezza dei dati. Rigorosa nel controllo qualità dei replicati." },
  { id: "bianchi", nome: "Dr. Paolo Bianchi", ruolo: "Biologo Molecolare · Programma Iguane", dip: "genetica", branch: "47b", stato: "attivo", reportsTo: "conti", facilityId: "N4",
    bio: "Biologo molecolare del Programma Iguane. Caratterizza i costrutti genetici e monitora gli effetti fuori bersaglio; presidia la biosicurezza e la cautela metodologica del gruppo." },
  { id: "colombo", nome: "Alessandro Colombo", ruolo: "Dottorando · Programma Iguane", dip: "genetica", branch: "47b", stato: "attivo", reportsTo: "marini", facilityId: "N4",
    bio: "Dottorando e più giovane del gruppo di ricerca dell'Allevamento N.4. Segue preparazione dei campioni, analisi dati e registri sperimentali." },
  { id: "puddu", nome: "Marina Puddu", ruolo: "Tecnica di Laboratorio · Programma Iguane", dip: "allevamento", branch: "47b", stato: "attivo", reportsTo: "marini", facilityId: "N4",
    bio: "Tecnica di laboratorio del Programma Iguane. Cura quotidiana degli esemplari, monitoraggio dei parametri e osservazione comportamentale documentata." },
  { id: "dominika", nome: "Dr.ssa Dominika Gradowska", ruolo: "Comportamentalista · Programma Iguane", dip: "comportamento", branch: "47b", stato: "attivo", reportsTo: "stern", facilityId: "N4",
    bio: "Comportamentalista del Programma Iguane. Progetta protocolli di osservazione, codifica le sequenze comportamentali e costruisce modelli per individuare pattern e anomalie nei dati degli esemplari. Formazione polacca in etologia e scienze cognitive." },

  // Villa Monti
  { id: "monti", nome: "Prof. Alfredo Monti", ruolo: "Direttore Scientifico · Etologia (Villa Monti)", dip: "comportamento", branch: "47b", stato: "attivo", reportsTo: "stern", facilityId: "VILLA",
    bio: "Etologo e Direttore Scientifico di Villa Monti, sito di studio comportamentale ravvicinato. Coordina l'osservazione degli esemplari e cura il raccordo scientifico con gli altri programmi della rete." },
  { id: "adele", nome: "Adele Ricci", ruolo: "Responsabile Sicurezza & Conformità (Villa Monti)", dip: "conformita", branch: "47b", stato: "attivo", reportsTo: "stern", facilityId: "VILLA",
    bio: "Responsabile Sicurezza & Conformità di Villa Monti. Gestisce accessi, protocolli e riservatezza e fa da interfaccia con il Programma Sigma. Impostazione rigorosa e procedurale." },
  { id: "pietro", nome: "Pietro Visconti", ruolo: "Dottorando · Laboratorio Villa Monti", dip: "genetica", branch: "47b", stato: "in memoria", reportsTo: "monti", facilityId: "VILLA",
    bio: "Dottorando al Laboratorio di Villa Monti, brillante nella ricerca sperimentale. Scomparso in un incidente di laboratorio." },
  { id: "giancarlo", nome: "Giancarlo", ruolo: "Assistente di Direzione Scientifica", dip: "comportamento", branch: "47b", stato: "attivo", reportsTo: "monti", facilityId: "VILLA",
    bio: "Assistente storico del Prof. Monti. Presenza discreta e continua alla Villa." },

  // Laboratorio N.6 — varani
  { id: "zaremba", nome: "płk Stefan Zaremba", ruolo: "Comandante · Laboratorio N.6", dip: "sigma", branch: "varani", stato: "proposto", reportsTo: "stern", facilityId: "N6",
    bio: "Colonnello. Duro e d'onore, «un Rommel moderno»: soldato integro dentro una macchina complessa. Non giustizia gli arresi." },
  { id: "nowak", nome: "Dr. Wiktor Nowak", ruolo: "Veterinario di Unità · N.6", dip: "allevamento", branch: "varani", stato: "proposto", reportsTo: "zaremba", facilityId: "N6",
    bio: "Veterinario del programma Varani. Movente umano, zona grigia: la tentazione di una via d'uscita a scapito dell'integrità del progetto." },
  { id: "gorski", nome: "st. sierż. Tomasz «Tomek» Górski", ruolo: "Handler-Alpha · Unità Varani", dip: "allevamento", branch: "varani", stato: "proposto", reportsTo: "zaremba", facilityId: "N6",
    bio: "Ex-cinofilo. Conduttore originario del branco: caldo, rispettato dagli esemplari." },
  { id: "sokol", nome: "sierż. Rafał Sokół", ruolo: "Handler-Sostituto · Unità Varani", dip: "allevamento", branch: "varani", stato: "proposto", reportsTo: "gorski", facilityId: "N6",
    bio: "Ex-conduttore cinofilo che ha perso il proprio cane. Deve guadagnarsi il posto di Alpha del branco." }
];

// applica l'arricchimento (bio estese, competenze, voce, background) dove presente
function enrich(p: Person): Person {
  const e = peopleEnrichment[p.id];
  if (!e) return p;
  return { ...p, bio: e.bio || p.bio, competenze: e.competenze, voce: e.voce, background: e.background };
}
export const people: Person[] = [...canonPeople, ...networkPeople].map(enrich);

// --- Protocolli A–H ---------------------------------------------------------
export const protocols: Protocol[] = [
  { codice: "A", nome: "Vitalità e stabilità", tratto: "Efficienza metabolica, riduzione mortalità embrionale", note: "Piattaforma fondamentale su cui si innestano gli altri. Prima generazione." },
  { codice: "B", nome: "Adattamento termico-cromatico e rigenerativo", tratto: "Termoregolazione, cromatofori, rigenerazione tissutale", note: "Coinvolge i geni IGFBP2 / SOX2." },
  { codice: "C", nome: "Potenziamento sensoriale", tratto: "Vista UV estesa, olfatto vomeronasale, termocezione", note: "Protocollo dell'esemplare 41C." },
  { codice: "D", nome: "Resistenza ai patogeni", tratto: "Sistema immunitario, risposta antivirale/antibatterica/antifungina", note: "Il ramo 'pathogen resistance' del programma." },
  { codice: "E", nome: "Osmoregolazione e resistenza alla disidratazione", tratto: "Ghiandole del sale (ispirate all'iguana marina), ritenzione idrica", note: "Adattamento ad ambienti aridi e salini." },
  { codice: "F", nome: "Tolleranza ipossica e dormienza metabolica", tratto: "Sopravvivenza a bassi livelli di ossigeno, rallentamento metabolico controllato", note: "Ambienti estremi." },
  { codice: "G", nome: "Potenziamento muscoloscheletrico e rigenerazione degli arti", tratto: "Densità ossea, forza, rigenerazione oltre la coda", note: "Strutturale, distinto da B." },
  { codice: "H", nome: "Longevità e integrità genomica", tratto: "Senescenza cellulare rallentata, riparazione del DNA, telomeri", note: "Esemplari longevi." }
];

// --- Generazioni ------------------------------------------------------------
export const generations: Generation[] = [
  { gen: 1, titolo: "Proof-of-concept", testo: "Alta mortalità, edit grezzi. Qualche superstite robusto ma cognitivamente ordinario.", branch: "47b" },
  { gen: 2, titolo: "Primi B e C primitivi", testo: "Prime varianti dei Protocolli B e C. Un esemplare d'archivio con osservazioni comportamentali non concludenti e mai replicate; materiale conservato in biobanca.", branch: "47b" },
  { gen: 3, titolo: "Protocolli maturi", testo: "Migliori risultati pre-coorte attuale. Alcuni esemplari ancora attivi come baseline.", branch: "47b" },
  { gen: 4, titolo: "Coorte attuale (iguane)", testo: "La nidiata di riferimento del programma iguane. Studio di cognizione e comportamento in corso.", branch: "47b" },
  { gen: 5, titolo: "Esemplari successivi", testo: "Generazione contemporanea alla 4; include esemplari non idonei alla stabulazione standard e successivamente ceduti.", branch: "47b" },
  { gen: 8, titolo: "Varani — linea matura", testo: "Prima linea consolidata del Laboratorio N.6 (Polonia).", branch: "varani" },
  { gen: 9, titolo: "Varani — coorte attuale", testo: "Coorte di punta del programma Varani.", branch: "varani" }
];

// --- Esemplari --------------------------------------------------------------
const baseSpecimens: Specimen[] = [
  { id: "47B", codiceEsteso: "4-07-B-ATC", gen: 4, protocollo: "B", nomeProprio: null, coscienza: null, branch: "47b", facilityId: "VILLA", stato: "attivo",
    note: "Esemplare di riferimento del programma Cognizione & Comportamento (Protocollo B). In studio comportamentale prolungato a Villa Monti per alcune risposte atipiche, ancora in corso di caratterizzazione e non replicate in modo controllato." },
  { id: "41C", codiceEsteso: "4-01-C-GCA", gen: 4, protocollo: "C", nomeProprio: null, coscienza: false, branch: "47b", facilityId: "VILLA", stato: "attivo",
    note: "Controprova sensoriale del Protocollo C: potenziamento di vista UV e olfatto vomeronasale, profilo comportamentale tipico della specie." },
  { id: "49B", codiceEsteso: "4-09-B-ATC", gen: 4, protocollo: "B", nomeProprio: null, coscienza: false, branch: "47b", facilityId: "N4", stato: "attivo",
    note: "Stesso pacchetto di edit del Protocollo B (B-ATC) di 47B; profilo comportamentale nella norma per la specie. Serve da controllo del protocollo." },
  { id: "37B", codiceEsteso: "3-07-B", gen: 3, protocollo: "B", nomeProprio: null, coscienza: false, branch: "47b", facilityId: "N4", stato: "baseline",
    note: "Baseline storico di terza generazione, profilo tipico della specie. Riferimento pre-coorte per il Protocollo B." },
  { id: "26B", codiceEsteso: "2-06-B", gen: 2, protocollo: "B", nomeProprio: null, coscienza: null, branch: "47b", facilityId: "N1", stato: "archivio",
    note: "Esemplare di seconda generazione con osservazioni comportamentali non concludenti e mai replicate; deceduto prima della caratterizzazione. Materiale conservato in biobanca (N.1)." },
  { id: "53D", codiceEsteso: "5-03-D", gen: 5, protocollo: "D", nomeProprio: null, coscienza: false, branch: "47b", facilityId: "N4", stato: "ceduto",
    note: "Esemplare di quinta generazione (Protocollo D) ritenuto non idoneo alla stabulazione standard e ceduto; tracciabilità CITES incompleta per errore documentale." },
  { id: "94G", codiceEsteso: "9-04-G-GAT", gen: 9, protocollo: "G", nomeProprio: "Smok", coscienza: false, branch: "varani", facilityId: "N6", stato: "proposto",
    note: "Maschio dominante della coorte, corporatura possente ed elevata coordinazione nel gruppo. Riferimento del Protocollo G." },
  { id: "91F", codiceEsteso: "9-01-F-CTA", gen: 9, protocollo: "F", nomeProprio: "Cień", coscienza: false, branch: "varani", facilityId: "N6", stato: "proposto",
    note: "Esemplare schivo del Protocollo F (dormienza metabolica), con torpore controllato particolarmente stabile." },
  { id: "88G", codiceEsteso: "8-08-G-GGA", gen: 8, protocollo: "G", nomeProprio: "Żubr", coscienza: false, branch: "varani", facilityId: "N6", stato: "proposto",
    note: "Esemplare di taglia eccezionale, alta densità ossea e resistenza. Docile alla conduzione." },
  { id: "96G", codiceEsteso: "9-06-G-TGA", gen: 9, protocollo: "G", nomeProprio: "Iskra", coscienza: null, branch: "varani", facilityId: "N6", stato: "proposto",
    note: "Giovane femmina di taglia ridotta e molto veloce; comportamento esplorativo in corso di studio." },
  { id: "85F", codiceEsteso: "8-05-F-CGT", gen: 8, protocollo: "F", nomeProprio: "Mróz", coscienza: false, branch: "varani", facilityId: "N6", stato: "proposto",
    note: "Protocollo F (dormienza metabolica), tolleranza spiccata al freddo estremo." },
  { id: "89G", codiceEsteso: "8-09-G-AAT", gen: 8, protocollo: "G", nomeProprio: "Grom", coscienza: false, branch: "varani", facilityId: "N6", stato: "proposto",
    note: "Esemplare adulto veterano della coorte, parametri muscoloscheletrici di riferimento." }
];

// specie inferita per gli esemplari canonici (le altre arrivano già con `specie`)
const SPECIE_BASE: Record<string, string> = { "47b": "Iguana verde", varani: "Varano" };
const baseWithSpecie: Specimen[] = baseSpecimens.map((s) => ({ ...s, specie: s.specie || SPECIE_BASE[s.branch] || null }));

export const specimens: Specimen[] = [...baseWithSpecie, ...networkSpecimens];

// --- Esperimenti (uniti a bibliografia/abstract + autori dai personaggi) ----
function autoriPerFacility(facilityId: string | null): string[] {
  if (!facilityId) return [];
  const team = people.filter((p) => p.facilityId === facilityId && p.stato !== "in memoria");
  return team.slice(0, 3).map((p) => p.nome);
}
export const experiments: Experiment[] = experimentsData.map((e, i) => {
  const b = experimentBiblio[e.id] || {};
  return {
    ...e,
    ordine: i,
    autori: autoriPerFacility(e.facilityId),
    abstract: b.abstract ?? null,
    bibliografia: b.bibliografia ?? []
  };
});

// --- KPI --------------------------------------------------------------------
export const kpis: Kpi[] = [
  { etichetta: "Strutture nel mondo", valore: "25", nota: "11 nodi numerati + direzione, uffici, logistica e siti storici" },
  { etichetta: "Riduzione tempo di incubazione", valore: "−64%", nota: "32 gg 14 h 17 min vs ~90 gg naturali (Iguana iguana)" },
  { etichetta: "Deviazione std. di schiusa (Gen 4)", valore: "< 0,3", nota: "La migliore mai registrata" },
  { etichetta: "Attività motoria neonatale", valore: "+42%", nota: "vs media della generazione precedente" },
  { etichetta: "Temperatura di incubazione", valore: "30,2 °C", nota: "Ottimale, stabilita su 4 generazioni" },
  { etichetta: "Protocolli genetici operativi", valore: "8", nota: "Piattaforma A → longevità H" }
];

// --- Traguardi --------------------------------------------------------------
export const milestones: Milestone[] = [
  { anno: "2011", titolo: "Fondazione di Eden Exotic", testo: "Nasce il programma di genetica di precisione. Prime linee sperimentali su Iguana iguana.", tipo: "milestone" },
  { anno: "2013", titolo: "Protocollo A — Piattaforma di vitalità", testo: "Efficienza metabolica e riduzione della mortalità embrionale: la base di tutti gli altri protocolli.", tipo: "scienza" },
  { anno: "2015", titolo: "Sviluppo accelerato validato", testo: "Incubazione portata a ~32 giorni contro i ~90 naturali. Una caratteristica progettata, non un difetto.", tipo: "scienza" },
  { anno: "2017", titolo: "Protocolli B e C in produzione", testo: "Adattamento termico-cromatico e rigenerativo (B); potenziamento sensoriale (C).", tipo: "scienza" },
  { anno: "2019", titolo: "Suite completa dei Protocolli A–H", testo: "Otto piattaforme operative, dalla resistenza ai patogeni (D) alla longevità (H).", tipo: "scienza" },
  { anno: "2021", titolo: "Espansione della rete globale", testo: "Nuove strutture in quattro continenti; apertura del Laboratorio N.6 (Polonia, varani).", tipo: "milestone" },
  { anno: "2024", titolo: "Coorte Generazione 4 · Programma Iguane", testo: "La coorte attuale raggiunge la maturità e passa allo studio comportamentale a Villa Monti.", tipo: "milestone" },
  { anno: "2025", titolo: "Programma Comportamento & Cognizione", testo: "Studio sistematico del comportamento degli esemplari maturi.", tipo: "milestone" }
];

// --- Glossario --------------------------------------------------------------
export const glossary: GlossaryTerm[] = [
  { termine: "Ectotermia", definizione: "Regolazione della temperatura corporea tramite fonti esterne. Tratto base dei rettili, piattaforma del Protocollo B." },
  { termine: "Cromatofori", definizione: "Cellule pigmentate responsabili del cambio di colore; potenziate nel Protocollo B." },
  { termine: "Autotomia e rigenerazione caudale", definizione: "Capacità di perdere e rigenerare la coda; base dei Protocolli B e G." },
  { termine: "IGFBP2", definizione: "Gene coinvolto nello sviluppo neuronale e nella plasticità. Conservato nei vertebrati." },
  { termine: "SOX2", definizione: "Gene delle cellule staminali neurali; centrale nel potenziamento del Protocollo B." },
  { termine: "Organo vomeronasale (di Jacobson)", definizione: "Struttura olfattiva accessoria; potenziata nel Protocollo C." },
  { termine: "Visione ultravioletta", definizione: "Sensibilità alla radiazione UV, estesa nel Protocollo C." },
  { termine: "Nidiata sincronizzata", definizione: "Schiusa coordinata di una coorte; indice di stabilità del programma." },
  { termine: "Muta (ecdisi)", definizione: "Rinnovo periodico dello strato cutaneo esterno." },
  { termine: "Reazione esotermica / fuga termica", definizione: "Rilascio incontrollato di calore in una reazione: rischio da manipolazione dei reagenti concentrati." }
];

export const meta = { revisione: "2026-07-27", fonte: "47B-universe · canon/facts.yaml + bibbie" };

// --- Base di conoscenza per il RAG (chunk canonici + generati) --------------
const experimentDocs: Doc[] = experiments.map((e) => ({
  id: `esp-${e.id}`,
  categoria: "esperimento",
  titolo: `${e.codice} · ${e.titolo}`,
  testo:
    `Esperimento ${e.codice} presso la struttura ${e.facilityId} (${e.anno}, stato: ${e.stato}). ` +
    `Obiettivo: ${e.obiettivo} Metodo: ${e.metodo}. Risultato: ${e.risultato}` +
    (e.autori && e.autori.length ? ` Autori: ${e.autori.join(", ")}.` : "")
}));

const specimenDocs: Doc[] = specimens
  .filter((s) => s.nomeProprio && s.nomeProprio !== "—")
  .map((s) => ({
    id: `esemplare-${s.id}`,
    categoria: "specie",
    titolo: `Esemplare ${s.id}${s.nomeProprio ? ` «${s.nomeProprio}»` : ""}`,
    testo: `${s.id} (${s.specie}, gen ${s.gen}, protocollo ${s.protocollo}, struttura ${s.facilityId}). ${s.note}`
  }));

export const knowledge: Doc[] = [...knowledgeBase, ...enrichmentKnowledge, ...experimentDocs, ...specimenDocs];

// Oggetto unico comodo per il seed.
export const canon = {
  company, mission, programmaSigma, conformita, departments, facilities, people,
  protocols, generations, specimens, experiments, kpis, milestones, glossary, knowledge, meta
};
