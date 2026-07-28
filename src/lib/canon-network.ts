// =============================================================================
// Eden Exotic — Rete globale N.1–N.11 + team locali + base di conoscenza (RAG)
// Espansione del canon (rev. 2026-07-27). N.4 e N.6 hanno team già canonici
// (in canon.ts). Le strutture aggiuntive (in costruzione, pianificate, dismesse,
// sedi di supporto) vivono in canon-extra.ts.
// =============================================================================
import type { Facility, Person, Doc, Specimen, Experiment, PersonEnrichment } from "./canon";
import { networkSpecimens } from "./canon-specimens";
import { experimentsData, experimentBiblio } from "./canon-experiments";
import { peopleEnrichment, enrichmentKnowledge } from "./canon-enrichment";
export { networkSpecimens, experimentsData, experimentBiblio, peopleEnrichment, enrichmentKnowledge };

export const networkFacilities: Facility[] = [
  { id: "N1", numero: 1, nome: "Biobanca N.1", paese: "Svizzera", citta: "Basilea", continente: "Europa", lat: 47.5596, lng: 7.5886,
    specie: "Linee germinali, embrioni e tessuti crioconservati di tutte le specie", tipo: "biobanca", alleva: false,
    tema: "La Radice — memoria genetica del programma", sommario: "Il cryobank e l'archivio genomico da cui discende l'intera rete.",
    descrizione: "Primo nodo storico di Eden Exotic, custodisce le linee germinali, gli embrioni crioconservati e l'archivio genomico di ogni generazione. Qui nacque, come proof-of-concept, la Gen 1 del Protocollo A. Non si alleva nulla di vivo: ciò che si conserva è la possibilità di rifare tutto da capo. Il personale la chiama «la radice» perché nessun sito potrebbe esistere senza ciò che qui è archiviato.",
    protocolliChiave: ["A", "H"], branch: "core", stato: "operativo", ordine: 1 },

  { id: "N2", numero: 2, nome: "Allevamento N.2", paese: "Perù", citta: "Iquitos (Amazzonia)", continente: "America del Sud", lat: -3.7491, lng: -73.2538,
    specie: "Ragni: salticidi (ragni saltatori) e tarantole", tipo: "allevamento", alleva: true,
    tema: "La Rete — percezione distribuita e biomateriali", sommario: "Percezione visiva distribuita e biomateriali di seta ad alte prestazioni.",
    descrizione: "Immerso nella foresta attorno a Iquitos, il sito studia la vista straordinaria e le capacità di problem-solving dei ragni saltatori, insieme alla robustezza delle tarantole. Le linee di ricerca principali sono due: la percezione visiva distribuita — molti sensori ottici indipendenti che concorrono a una singola rappresentazione dell'ambiente — e i biomateriali derivati dalla seta, con applicazioni in tessuti tecnici e dispositivi biomedicali. È un centro di biomateriali a basso impatto ambientale che opera in collaborazione con le comunità locali.",
    protocolliChiave: ["C", "D"], branch: "new", stato: "operativo", ordine: 2 },

  { id: "N3", numero: 3, nome: "Allevamento N.3", paese: "Giappone", citta: "Hokkaidō", continente: "Asia", lat: 43.7711, lng: 142.365,
    specie: "Anfibi: axolotl, salamandre e tritoni", tipo: "allevamento", alleva: true,
    tema: "Il Ritorno — rigenerazione", sommario: "Ricostruire ciò che si perde: rigenerazione tissutale e degli arti.",
    descrizione: "Nel clima rigido di Hokkaidō alleva anfibi capaci di rigenerare arti e organi, con l'axolotl come specie-cardine. L'obiettivo del sito è tradurre questa capacità in medicina rigenerativa per l'uomo, sfruttando i geni della rigenerazione conservati tra anfibi e mammiferi. Le colonie sono fragili e richiedono una stabulazione impeccabile, che il personale garantisce con standard di benessere animale tra i più elevati della rete.",
    protocolliChiave: ["B", "G"], branch: "new", stato: "operativo", ordine: 3 },

  { id: "N4", numero: 4, nome: "Allevamento N.4", paese: "Italia", citta: "Nord Italia (periferia urbana)", continente: "Europa", lat: 44.795, lng: 10.325,
    specie: "Iguane (Iguana iguana ingegnerizzate)", tipo: "allevamento", alleva: true,
    tema: "La Mente — cognizione e comportamento", sommario: "Programma di cognizione comparata e comportamento delle iguane.",
    descrizione: "Complesso sterile e geometrico, progettato per il massimo controllo delle condizioni sperimentali. Conduce il programma di cognizione e comportamento delle iguane, con test standardizzati su apprendimento, memoria e capacità di problem-solving. Tra gli esemplari seguiti dagli studi comportamentali figura 47B (4-07-B-ATC), inserito nel Protocollo B. Qui operano il team di Marco Conti e la comportamentalista Dominika Gradowska.",
    protocolliChiave: ["B", "C"], branch: "47b", stato: "operativo", ordine: 4 },

  { id: "N5", numero: 5, nome: "Allevamento N.5", paese: "India", citta: "Ghati Occidentali (Agumbe)", continente: "Asia", lat: 13.503, lng: 75.093,
    specie: "Serpenti (elapidi e viperidi dei Ghati Occidentali)", tipo: "allevamento", alleva: true,
    tema: "Il Rimedio — biochimica del veleno", sommario: "Biochimica del veleno per antiveleni e terapie, con componente dual-use supervisionata.",
    descrizione: "Sulle piogge dei Ghati Occidentali alleva serpenti per frazionarne il veleno e caratterizzarne le tossine. Le molecole isolate diventano candidati per antidoti, analgesici e anticoagulanti: è ricerca farmaceutica e sugli antiveleni, condotta in un paese dove i morsi di serpente causano migliaia di vittime l'anno. Una componente della ricerca ha natura a duplice uso e viene gestita sotto supervisione dedicata, con i candidati terapeutici sviluppati in India e le attività a rilevanza di difesa coordinate con il Centro N.10.",
    protocolliChiave: ["D", "F"], branch: "new", stato: "operativo", ordine: 5 },

  { id: "N6", numero: 6, nome: "Allevamento N.6", paese: "Polonia", citta: "Polesia (paludi del Pripyat)", continente: "Europa", lat: 51.65, lng: 23.2,
    specie: "Varani (varanidi ingegnerizzati)", tipo: "allevamento", alleva: true,
    tema: "Il Corpo — forza, resilienza, ambienti estremi", sommario: "Varani ingegnerizzati per forza, resilienza e operatività in ambienti estremi.",
    descrizione: "Presso le paludi del Pripyat alleva varani potenziati — grossi, veloci, forti e addestrabili a compiti coordinati — nell'ambito del programma dedicato a forza fisica, resilienza e operatività in ambienti estremi. Sotto il coordinamento del col. Zaremba, il gruppo di esemplari (94G «Smok», 91F «Cień», 88G «Żubr» e gli altri) è oggetto di studio applicativo per il Programma Sigma, la linea di ricerca a orientamento difensivo di Eden Exotic, nel quadro delle procedure di validazione previste.",
    protocolliChiave: ["G", "F"], branch: "varani", stato: "operativo", ordine: 6 },

  { id: "N7", numero: 7, nome: "Allevamento N.7", paese: "Indonesia", citta: "Sulawesi / Mare di Banda", continente: "Asia", lat: -4.525, lng: 129.897,
    specie: "Rettili marini e tartarughe", tipo: "allevamento", alleva: true,
    tema: "La Rotta — osmoregolazione, navigazione, longevità", sommario: "Sale, magnetismo e vita lunga: sopravvivere e orientarsi nell'oceano.",
    descrizione: "Tra Sulawesi e il Mare di Banda alleva rettili marini e tartarughe per studiarne l'osmoregolazione, la navigazione a lunga distanza e la longevità eccezionale. Ghiandole del sale, magnetoricezione e telomeri resistenti sono i tre fili di ricerca, con applicazioni nell'adattamento umano alla scarsità d'acqua e agli ambienti ostili. Lavora a stretto contatto con la Biobanca N.1 per le linee longeve.",
    protocolliChiave: ["E", "H"], branch: "new", stato: "operativo", ordine: 7 },

  { id: "N8", numero: 8, nome: "Allevamento N.8", paese: "Uganda", citta: "Lago Vittoria / Kampala", continente: "Africa", lat: 0.3136, lng: 32.5811,
    specie: "Camaleonti (con stazione di campo)", tipo: "stazione", alleva: true,
    tema: "Lo Specchio — mimetismo e adattamento cromatico", sommario: "Uno schermo vivente: cambiare colore in fretta, tra ricerca e conservazione.",
    descrizione: "Sulle rive del Lago Vittoria unisce allevamento e stazione di campo per studiare i camaleonti e il loro adattamento cromatico rapido, come segnale e come mimetismo. Il sito porta avanti due programmi complementari: un riconosciuto progetto di conservazione degli habitat in contrazione, con reintroduzione e monitoraggio delle popolazioni locali, e la ricerca applicata sui cromatofori per lo sviluppo di superfici a colorazione dinamica. È l'unico sito della rete a coniugare stabulazione e lavoro sul campo.",
    protocolliChiave: ["B", "C"], branch: "new", stato: "operativo", ordine: 8 },

  { id: "N9", numero: 9, nome: "Centro N.9", paese: "Svezia", citta: "Kiruna (Lapponia)", continente: "Europa", lat: 67.8558, lng: 20.2253,
    specie: "Nessuna specie viva; dati genomici e modelli computazionali", tipo: "bioinformatica", alleva: false,
    tema: "Il Calcolo — modellazione e dati", sommario: "Il centro computazionale della rete: modellazione genomica e programma di adattamento al freddo.",
    descrizione: "A Kiruna, oltre il Circolo Polare, è il centro computazionale di Eden Exotic: un data center raffreddato dal clima artico che modella l'intera rete genomica. Predice gli effetti degli edit genici, cerca nelle sequenze le firme dei tratti emergenti e conduce il programma di adattamento al freddo. Non ospita esemplari vivi: elabora esclusivamente dati genomici e modelli computazionali a supporto degli altri siti.",
    protocolliChiave: ["F", "H"], branch: "core", stato: "operativo", ordine: 9 },

  { id: "N10", numero: 10, nome: "Centro N.10", paese: "Stati Uniti", citta: "[ubicazione riservata]", continente: "America del Nord", lat: 37.2431, lng: -115.8,
    specie: "Nessuna specie propria; integra e valida esemplari da altri siti", tipo: "validazione", alleva: false,
    tema: "La Prova — validazione e integrazione operativa", sommario: "Centro di validazione, integrazione e sicurezza del Programma Sigma.",
    descrizione: "A ubicazione riservata negli Stati Uniti, è il centro di validazione, integrazione operativa e sicurezza del Programma Sigma. Qui gli esemplari e le tecnologie sviluppati negli altri siti vengono sottoposti a validazione applicativa nel rispetto dei protocolli di sicurezza. Il Programma Sigma è la linea di ricerca a duplice uso di Eden Exotic, con finalità dichiarate di difesa, operatività in ambienti estremi e soccorso, condotta secondo il quadro di governance responsabile adottato dall'azienda.",
    protocolliChiave: ["F", "G"], branch: "varani", stato: "riservato", ordine: 10 },

  { id: "N11", numero: 11, nome: "Laboratorio N.11", paese: "Francia (Nuova Caledonia)", citta: "Nouméa", continente: "Oceania", lat: -22.2758, lng: 166.458,
    specie: "Uccelli: corvidi (corvi della Nuova Caledonia) e pappagalli", tipo: "allevamento", alleva: true,
    tema: "La Voce — comunicazione e cognizione aviaria", sommario: "Programma di cognizione aviaria e bioacustica: mimica vocale e uso di strumenti.",
    descrizione: "In Nuova Caledonia, patria dei corvi che usano attrezzi, è il ramo aviario in costruzione: pappagalli per lo studio della mimica vocale e della produzione del suono; corvidi per l'uso di strumenti, il problem-solving e i comportamenti collettivi dello stormo. Il programma integra bioacustica e cognizione comparata, con l'obiettivo di caratterizzare i meccanismi della comunicazione vocale e dell'intelligenza sociale negli uccelli.",
    protocolliChiave: ["C", "H"], branch: "new", stato: "costruzione", ordine: 11 }
];

// --- Team locali (ordine = direttore prima) --------------------------------
type RawPerson = { facilityId: string; nome: string; ruolo: string; bio: string; branch: string; stato: string };
const rawTeam: RawPerson[] = [
  { facilityId: "N1", nome: "Dr.ssa Ursula Brunner", ruolo: "Direttrice della Biobanca e responsabile dell'archivio genetico", branch: "core", stato: "attivo",
    bio: "Genetista basilese, ha dedicato vent'anni alla costruzione del catalogo delle linee germinali di Eden Exotic. È convinta che una conservazione completa e ridondante sia l'unico modo per impedire che un errore cancelli anni di lavoro, e ha fatto della continuità dell'archivio la propria missione professionale." },
  { facilityId: "N1", nome: "Dr. Matthias Vogel", ruolo: "Crio-curatore capo", branch: "core", stato: "attivo",
    bio: "Fisico dei materiali prestato alla biologia, cura i serbatoi di azoto liquido con la meticolosità di chi ha visto una volta un intero lotto degradarsi per un allarme ignorato." },
  { facilityId: "N1", nome: "Dr.ssa Helena Roth", ruolo: "Genetista delle linee germinali", branch: "core", stato: "attivo",
    bio: "Ricostruisce e stabilizza le linee della Gen 1; specialista in conservazione e caratterizzazione delle linee germinali, cura la fedeltà e la riproducibilità dei campioni di riferimento della biobanca." },
  { facilityId: "N1", nome: "Dr. Lukas Ammann", ruolo: "Archivista genomico e responsabile della tracciabilità (CITES)", branch: "core", stato: "attivo",
    bio: "Tiene il registro che collega ogni esemplare al suo campione crioconservato; l'ossessione per la catena di custodia nasce da un vecchio caso di documentazione CITES andata perduta." },
  { facilityId: "N1", nome: "Dr.ssa Corinne Frei", ruolo: "Responsabile qualità e conformità", branch: "core", stato: "attivo",
    bio: "Ex ispettrice farmaceutica, applica alla biobanca standard che nessuna legge le impone; crede che il rigore procedurale sia l'unica etica praticabile." },

  { facilityId: "N2", nome: "Dr. Ricardo Vásquez Chávez", ruolo: "Direttore dell'Allevamento", branch: "new", stato: "attivo",
    bio: "Aracnologo peruviano tornato dall'estero per dirigere un sito nella propria Amazzonia; valorizza il progetto per l'occupazione e le competenze che porta a Iquitos, e ne cura lo sviluppo scientifico e i rapporti con le comunità locali." },
  { facilityId: "N2", nome: "Dr.ssa Ana María Ríos", ruolo: "Responsabile del comportamento dei salticidi", branch: "new", stato: "attivo",
    bio: "Studia la vista acuta e il problem-solving dei ragni saltatori; la descrive come «una rete che vede» ed è un riferimento nel campo della percezione visiva distribuita." },
  { facilityId: "N2", nome: "Ing. Julio Herrera", ruolo: "Responsabile biomateriali e produzione della seta", branch: "new", stato: "attivo",
    bio: "Ingegnere dei materiali con l'obiettivo di portare la seta di ragno su scala industriale; specialista di chimica verde e proprietà intellettuale, guida lo sviluppo dei biomateriali del sito." },
  { facilityId: "N2", nome: "Dr.ssa Carla Tuesta", ruolo: "Genetista", branch: "new", stato: "attivo",
    bio: "Applica i Protocolli C e D ai salticidi con particolare attenzione alla reversibilità e alla stabilità dei tratti introdotti; è nota per il rigore metodologico nella validazione degli edit." },
  { facilityId: "N2", nome: "Téc. Manuel Shapiama", ruolo: "Tecnico di campo e allevatore", branch: "new", stato: "attivo",
    bio: "Conosce la foresta meglio di chiunque e cura la raccolta responsabile degli esemplari selvatici da cui partono le linee; la sua esperienza di campo è determinante per l'allevamento e per il rapporto con il territorio." },

  { facilityId: "N3", nome: "Dr. Haruki Tanaka", ruolo: "Direttore del laboratorio di rigenerazione", branch: "new", stato: "attivo",
    bio: "Erpetologo di Hokkaidō che ha dedicato la carriera all'axolotl; è convinto che replicare la rigenerazione degli arti possa salvare vite umane e guida il sito con un chiaro orientamento alla medicina rigenerativa." },
  { facilityId: "N3", nome: "Dr.ssa Yumi Sato", ruolo: "Responsabile della biologia della rigenerazione tissutale", branch: "new", stato: "attivo",
    bio: "Studia come salamandre e tritoni ricostruiscono i tessuti perduti; una vicenda familiare legata alla disabilità rende il suo lavoro sulla rigenerazione una vera e propria missione professionale." },
  { facilityId: "N3", nome: "Dr. Kenji Nakamura", ruolo: "Genetista", branch: "new", stato: "attivo",
    bio: "Lavora sui geni della rigenerazione condivisi tra anfibi e mammiferi; scrupoloso fino alla lentezza, rallenta di proposito i protocolli quando teme che l'ambizione superi i dati." },
  { facilityId: "N3", nome: "Dr.ssa Aiko Ishikawa", ruolo: "Veterinaria degli anfibi", branch: "new", stato: "attivo",
    bio: "Garantisce il benessere di colonie fragilissime in un clima estremo; è rigorosa nel difendere gli standard di stabulazione, che considera la base indispensabile di ogni risultato scientifico affidabile." },
  { facilityId: "N3", nome: "Tec. Sora Yoshida", ruolo: "Tecnico di allevamento", branch: "new", stato: "attivo",
    bio: "Gestisce le vasche e i cicli di muta con cura meticolosa; la sua costanza nella routine quotidiana di allevamento è essenziale alla sopravvivenza delle colonie più delicate." },

  { facilityId: "N5", nome: "Dr. Arjun Nair", ruolo: "Direttore dell'Allevamento", branch: "new", stato: "attivo",
    bio: "Erpetologo del Kerala che ha voluto il sito sui Ghati per stare vicino ai serpenti che studia da sempre; guida il programma come ricerca di antidoti e terapie, coordinando anche la componente a duplice uso nel quadro di supervisione previsto." },
  { facilityId: "N5", nome: "Dr.ssa Priya Menon", ruolo: "Responsabile della biochimica del veleno", branch: "new", stato: "attivo",
    bio: "Frazionatrice di veleni di rara bravura; affronta ogni tossina anzitutto come potenziale molecola-farmaco ed è un riferimento nella caratterizzazione biochimica dei veleni dei Ghati." },
  { facilityId: "N5", nome: "Dr. Vikram Deshpande", ruolo: "Farmacologo", branch: "new", stato: "attivo",
    bio: "Traduce le tossine in candidati terapeutici; concentrato sul loro valore clinico, segue lo sviluppo preclinico dei farmaci derivati dai veleni del serpentario." },
  { facilityId: "N5", nome: "Dr.ssa Lakshmi Iyer", ruolo: "Erpetologa e responsabile del serpentario", branch: "new", stato: "attivo",
    bio: "Cura centinaia di serpenti con un rispetto quasi religioso; è entrata per la conservazione delle specie dei Ghati e resta convinta di proteggerle meglio dentro che fuori." },
  { facilityId: "N5", nome: "Téc. Suresh Gowda", ruolo: "Tecnico addetto all'estrazione del veleno", branch: "new", stato: "attivo",
    bio: "Estrae veleno con mani ferme da vent'anni; l'esperienza e la disciplina nelle procedure di sicurezza fanno di lui uno dei tecnici più affidabili del sito." },

  { facilityId: "N7", nome: "Dr. Bagus Wijaya", ruolo: "Direttore dell'Allevamento", branch: "new", stato: "attivo",
    bio: "Biologo marino di Sulawesi che vede nel sito una scuola di eccellenza per il proprio paese; guida gli studi su longevità e adattamenti oceanici formando una nuova generazione di ricercatori indonesiani." },
  { facilityId: "N7", nome: "Dr.ssa Sri Wulandari", ruolo: "Responsabile della fisiologia e dell'osmoregolazione", branch: "new", stato: "attivo",
    bio: "Studia come rettili e tartarughe marine sopravvivono in acqua salata; è convinta che i suoi dati sull'osmoregolazione possano contribuire all'adattamento umano alla scarsità d'acqua." },
  { facilityId: "N7", nome: "Dr. Yusuf Maulana", ruolo: "Responsabile degli studi sulla navigazione", branch: "new", stato: "attivo",
    bio: "Indaga come le tartarughe ritrovano la rotta a migliaia di chilometri; specialista di magnetoricezione, è tra i massimi esperti dei meccanismi di navigazione a lunga distanza." },
  { facilityId: "N7", nome: "Dr.ssa Ni Made Ayu", ruolo: "Genetista della longevità", branch: "new", stato: "attivo",
    bio: "Lavora sul Protocollo H e sugli esemplari a invecchiamento molto lento; la ricerca sulla longevità e sull'integrità genomica è il cuore della sua attività scientifica." },
  { facilityId: "N7", nome: "Téc. Hasan Lampe", ruolo: "Tecnico di campo marino", branch: "new", stato: "attivo",
    bio: "Ex pescatore del Mare di Banda, gestisce le vasche costiere e i recuperi in mare; la sua conoscenza delle acque locali è preziosa per le operazioni di campo del sito." },

  { facilityId: "N8", nome: "Dr. Joseph Okello", ruolo: "Direttore dell'Allevamento e della stazione di campo", branch: "new", stato: "attivo",
    bio: "Zoologo ugandese che ha ottenuto per il sito un programma di conservazione dei camaleonti; coordina con pari impegno la tutela degli habitat locali e la ricerca sull'adattamento cromatico." },
  { facilityId: "N8", nome: "Dr.ssa Grace Nakato", ruolo: "Responsabile degli studi sull'adattamento cromatico", branch: "new", stato: "attivo",
    bio: "Studia il cambiamento di colore rapido come segnale e mimetismo; descrive il camaleonte come «uno schermo vivente» ed è un riferimento nella biologia dei cromatofori." },
  { facilityId: "N8", nome: "Dr. Samuel Mugisha", ruolo: "Ecologo di campo e responsabile della conservazione", branch: "new", stato: "attivo",
    bio: "Divide il tempo tra la stazione e le foreste che si restringono; crede che collaborare con Eden sia l'unico modo per salvare habitat che nessun ente pubblico finanzia più." },
  { facilityId: "N8", nome: "Dr.ssa Aisha Namuli", ruolo: "Genetista", branch: "new", stato: "attivo",
    bio: "Applica i Protocolli B e C ai cromatofori; giovane e ambiziosa, considera il sito uno dei pochi laboratori del continente in cui lavorare al proprio livello e vi costruisce la propria carriera scientifica." },
  { facilityId: "N8", nome: "Téc. Peter Ssemwanga", ruolo: "Tecnico della stazione di campo", branch: "new", stato: "attivo",
    bio: "Gestisce terrari e fototrappole sul campo; antropomorfizza i camaleonti e ne parla come di persone, cosa che a lui pare la sola reazione onesta." },

  { facilityId: "N9", nome: "Dr.ssa Astrid Lindqvist", ruolo: "Direttrice del Centro e responsabile della bioinformatica", branch: "core", stato: "attivo",
    bio: "Guida a Kiruna un data center che modella l'intera rete genomica; crede nella potenza esplicativa dei modelli e promuove un uso rigoroso e trasparente della modellazione predittiva." },
  { facilityId: "N9", nome: "Dr. Erik Johansson", ruolo: "Responsabile machine learning e data science", branch: "core", stato: "attivo",
    bio: "Costruisce le reti neurali che predicono l'effetto di un edit genico; specialista di machine learning applicato alla genomica, lavora su pattern e metriche di validazione dei modelli." },
  { facilityId: "N9", nome: "Dr.ssa Maja Bergström", ruolo: "Responsabile della genomica computazionale", branch: "core", stato: "attivo",
    bio: "Cerca nei genomi la firma dei tratti emergenti, dalla resistenza ai patogeni agli adattamenti fisiologici; è animata da una curiosità scientifica rigorosa e attenta al metodo." },
  { facilityId: "N9", nome: "Dr. Nils Andersson", ruolo: "Responsabile dell'infrastruttura e del data center", branch: "core", stato: "attivo",
    bio: "Sfrutta il freddo della Lapponia per raffreddare i server; misura tutto in kilowatt e uptime e garantisce l'affidabilità e l'efficienza energetica dell'infrastruttura." },
  { facilityId: "N9", nome: "Dr.ssa Sofia Kallio", ruolo: "Responsabile del programma di adattamento al freddo", branch: "core", stato: "attivo",
    bio: "Modella come rendere gli organismi tolleranti agli ambienti gelidi; cresciuta tra Kiruna e la Lapponia finlandese, è una specialista dell'adattamento al freddo con una profonda conoscenza degli ambienti artici." },

  { facilityId: "N10", nome: "Col. (ris.) James Whitaker", ruolo: "Direttore del Centro e responsabile del Programma Sigma", branch: "varani", stato: "attivo",
    bio: "Ufficiale in congedo convinto che sistemi biologici resilienti possano proteggere soldati e civili dove nessuna macchina regge; dirige il Programma Sigma con attenzione alle procedure di sicurezza e alla governance del duplice uso." },
  { facilityId: "N10", nome: "Dr. Daniel Cole", ruolo: "Responsabile della validazione sul campo", branch: "varani", stato: "attivo",
    bio: "Responsabile del passaggio degli esemplari dalla fase di laboratorio a quella di validazione applicativa; conduce i test secondo protocolli rigorosi e metriche oggettive." },
  { facilityId: "N10", nome: "Rebecca Hayes", ruolo: "Responsabile della sicurezza operativa", branch: "varani", stato: "attivo",
    bio: "Responsabile della sicurezza operativa del centro; gestisce il controllo degli accessi e la protezione delle informazioni riservate, convinta che una sicurezza solida sia parte integrante di una ricerca responsabile." },
  { facilityId: "N10", nome: "Marcus Bennett", ruolo: "Responsabile dell'integrazione operativa e collegamento con la difesa", branch: "varani", stato: "attivo",
    bio: "Fa da ponte tra Eden e i committenti istituzionali della difesa; cura le relazioni con i partner e l'integrazione operativa dei programmi a duplice uso nel rispetto degli accordi vigenti." },
  { facilityId: "N10", nome: "Dr.ssa Karen Foster", ruolo: "Responsabile etica e conformità dual-use", branch: "varani", stato: "attivo",
    bio: "Responsabile dell'etica e della conformità del duplice uso; valuta i progetti Sigma rispetto ai quadri normativi e alle policy interne, garantendo la supervisione indipendente delle attività." },

  { facilityId: "N11", nome: "Dr. Étienne Lefèvre", ruolo: "Direttore designato del Laboratorio", branch: "new", stato: "attivo",
    bio: "Neuroetologo francese chiamato ad aprire il ramo aviario; appassionato di comunicazione animale, imposta il progetto come studio del linguaggio non umano e della cognizione vocale degli uccelli." },
  { facilityId: "N11", nome: "Dr.ssa Marie Wamytan", ruolo: "Responsabile degli studi sui corvidi", branch: "new", stato: "attivo",
    bio: "Ornitologa kanak che studia i corvi della Nuova Caledonia e il loro uso di attrezzi; è entrata nel progetto per contribuire alla tutela di una specie del proprio arcipelago e ne è una delle massime esperte." },
  { facilityId: "N11", nome: "Dr. Julien Moreau", ruolo: "Responsabile bioacustica e mimica vocale", branch: "new", stato: "attivo",
    bio: "Specialista di bioacustica e mimica vocale dei pappagalli. Analizza spettrogrammi e controllo neurale del canto per caratterizzare la capacità di riproduzione vocale della specie." },
  { facilityId: "N11", nome: "Dr.ssa Léa Poadja", ruolo: "Responsabile del comportamento e dell'identità", branch: "new", stato: "attivo",
    bio: "Studia come gli uccelli riconoscono e imitano i singoli individui; è un riferimento nella ricerca sul riconoscimento vocale e sull'identità individuale negli uccelli." },
  { facilityId: "N11", nome: "Téc. Paul Néchéro", ruolo: "Tecnico delle voliere", branch: "new", stato: "attivo",
    bio: "Costruisce e cura gli aviari; kanak del posto, tratta corvi e pappagalli con rispetto quasi cerimoniale e apporta al sito una preziosa conoscenza del territorio e delle specie locali." }
];

function slug(s: string): string {
  return s
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\b(dr\.ssa|dr\.|prof\.|ing\.|tec\.|tec|col\.|ris\.|ms\.|mr\.|st\.|sierz\.|plk)\b/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function depFor(facilityId: string, ruolo: string): string {
  const r = ruolo.toLowerCase();
  if (facilityId === "N9") return "dati";
  if (facilityId === "N10") return facilityId === "N10" && /etica|conformit|sicurezza/.test(r) ? "conformita" : "sigma";
  if (/conformit|qualità|qualita|cites|sicurezza/.test(r)) return "conformita";
  if (/genetist|genetica|genomic|biochimic|fisiolog|biologia|rigenerazione|farmacolog|linee germinali|crio/.test(r)) return "genetica";
  if (/comportament|cognizion|etolog|navigazione|bioacustic|identità|identita/.test(r)) return "comportamento";
  if (facilityId === "N1") return "genetica";
  return "allevamento";
}

export const networkPeople: Person[] = (() => {
  const out: Person[] = [];
  const dirByFac: Record<string, string> = {};
  const byFac: Record<string, RawPerson[]> = {};
  for (const r of rawTeam) (byFac[r.facilityId] ||= []).push(r);
  let ordine = 100;
  for (const list of Object.values(byFac)) {
    list.forEach((r, i) => {
      const id = slug(r.nome);
      if (i === 0) dirByFac[r.facilityId] = id;
      out.push({
        id, nome: r.nome, ruolo: r.ruolo, bio: r.bio,
        dip: depFor(r.facilityId, r.ruolo), branch: r.branch, stato: r.stato,
        reportsTo: i === 0 ? "stern" : dirByFac[r.facilityId],
        facilityId: r.facilityId, ordine: ordine++
      });
    });
  }
  return out;
})();

// --- Base di conoscenza per il RAG -----------------------------------------
export const knowledgeBase: Doc[] = [
  { id: "azienda-eden-exotic-missione", categoria: "azienda", titolo: "Eden Exotic — la missione dichiarata",
    testo: "Eden Exotic è una società di biotecnologia specializzata nel potenziamento di caratteristiche naturali già presenti nei rettili — e in altri taxa — tramite editing genetico. Ogni programma è indirizzato a un ambito applicativo definito: medicina, difesa, conservazione e nuovi materiali. La missione dichiarata dell'azienda è mettere le capacità straordinarie degli animali al servizio del progresso scientifico, della sicurezza e della salute umana, entro un quadro di ricerca responsabile." },
  { id: "azienda-rete-numerata-iceberg", categoria: "azienda", titolo: "La rete degli allevamenti numerati",
    testo: "Eden Exotic gestisce una rete di siti numerati (N.1–N.11 e oltre), ciascuno dedicato a una specie e a una linea tematica di ricerca. La numerazione non è sequenziale rispetto all'ordine di fondazione: alcuni complessi operano da decenni, altri sono di recente istituzione o ancora in fase di proposta. Ogni sito lavora in modo relativamente autonomo, condividendo con la rete solo dati e linee cellulari attraverso la Biobanca N.1 e il Centro N.9." },
  { id: "azienda-tre-temperature", categoria: "azienda", titolo: "Le linee tematiche della ricerca",
    testo: "I programmi di Eden Exotic sono organizzati per linee tematiche che ne riassumono l'obiettivo scientifico: «La Mente» (cognizione e comportamento, N.4, iguane); «Il Corpo» (forza, resilienza e ambienti estremi, N.6, varani); «Il Ritorno» (rigenerazione, N.3, anfibi) e le altre. Ogni tema orienta protocolli, competenze e infrastrutture del sito corrispondente e ne definisce le priorità di ricerca." },
  { id: "azienda-programma-sigma", categoria: "azienda", titolo: "Programma Sigma — il duplice uso",
    testo: "Sigma è il programma di validazione e difesa a duplice uso di Eden Exotic, con cuore operativo nel Centro N.10 (USA). Le sue finalità dichiarate sono lo sviluppo di sistemi biologici adattabili e resilienti per la difesa, gli ambienti ostili e le operazioni di soccorso. Trattandosi di ricerca a duplice uso, il programma è soggetto a un quadro di governance dedicato, con supervisione etica e di conformità e procedure di sicurezza rafforzate." },
  { id: "azienda-cites-tracciabilita", categoria: "azienda", titolo: "CITES e tracciabilità",
    testo: "Gli esemplari e i campioni della rete sono soggetti a documentazione di tracciabilità in stile CITES, gestita a livello centrale dalla Biobanca N.1. La catena di custodia collega ogni esemplare al relativo campione crioconservato e alla documentazione di provenienza. L'azienda considera l'accuratezza documentale un requisito critico: un errore di compilazione può compromettere la tracciabilità di un esemplare tanto quanto una violazione intenzionale, ed è per questo oggetto di controlli dedicati." },
  { id: "scienza-protocolli-a-h", categoria: "scienza", titolo: "I Protocolli A–H",
    testo: "Ogni protocollo amplia una caratteristica naturale; nessuno mira all'intelligenza. A = vitalità e stabilità (piattaforma, Gen 1). B = adattamento termico-cromatico e rigenerativo. C = potenziamento sensoriale. D = resistenza ai patogeni. E = osmoregolazione. F = tolleranza ipossica e dormienza metabolica. G = potenziamento muscoloscheletrico e rigenerazione degli arti. H = longevità e integrità genomica." },
  { id: "scienza-protocollo-b-cognizione", categoria: "scienza", titolo: "Protocollo B e le anomalie comportamentali",
    testo: "Il Protocollo B coinvolge geni come IGFBP2 e SOX2, legati allo sviluppo neurale. In un numero ristretto di esemplari, tra cui 47B, gli studi comportamentali hanno registrato anomalie non previste e a oggi non replicate: performance atipiche nei test cognitivi che restano oggetto di indagine. Le controprove mostrano che il tratto non è sistematico: 49B condivide lo stesso protocollo e suffisso (B-ATC) senza presentare le stesse anomalie, come 37B e gli altri esemplari B precedenti. Non esiste ancora una spiegazione consolidata del fenomeno." },
  { id: "scienza-sistema-codici", categoria: "scienza", titolo: "Il sistema di codici degli esemplari",
    testo: "Il codice semplice (es. 47B): prima cifra = generazione; seconda cifra = posizione dell'embrione destinato al protocollo, assegnata alla selezione e indipendente dall'ordine di schiusa; lettera = variante di protocollo. Il codice esteso (4-07-B-ATC) aggiunge la sequenza per-protocollo a due cifre e un suffisso di tre lettere. Pattern: 4-\\d{2}-[A-Z]-[A-Z]{3}." },
  { id: "scienza-suffissi-triplette", categoria: "scienza", titolo: "I suffissi a tripletta",
    testo: "Il suffisso di tre lettere (es. ATC, GCA) richiama le basi azotate A/T/C/G e identifica il pacchetto specifico di edit genici entro un protocollo. B-ATC è il pacchetto standard del Protocollo B condiviso da 47B e 49B; C-GCA è quello di 41C." },
  { id: "scienza-sviluppo-accelerato", categoria: "scienza", titolo: "Sviluppo accelerato e scala delle generazioni",
    testo: "Gli esemplari Eden sono ingegnerizzati per uno sviluppo rapido: l'incubazione dura circa 32 giorni contro i circa 90 naturali dell'Iguana iguana. È una feature radicata nel Protocollo A per massimizzare la resa e accorciare il tempo di generazione. Una generazione vale circa 1–1,5 anni: così N.4 arriva a 47B (Gen 4) e ad Archimede (Gen 5) in pochi anni." },
  { id: "scienza-geni-chiave", categoria: "scienza", titolo: "Geni chiave: IGFBP2 e SOX2",
    testo: "Due geni cardine del Protocollo B: IGFBP2, legato allo sviluppo neuronale e alla plasticità, e SOX2, legato alle cellule staminali neurali, entrambi conservati nei vertebrati. Il team di Marco Conti indaga se il loro potenziamento congiunto costituisca una via replicabile per accrescere le capacità cognitive; la comportamentalista Dominika Gradowska ritiene invece che le anomalie osservate finora siano casi isolati e non un effetto sistematico del protocollo." },
  { id: "scienza-biobanca-crioconservazione", categoria: "scienza", titolo: "Crioconservazione e linee germinali (N.1)",
    testo: "La Biobanca N.1 conserva linee germinali, embrioni e tessuti in azoto liquido, con ridondanza dei serbatoi e monitoraggio continuo. Nessun risultato deve andare perduto: qualunque generazione può ripartire dai suoi campioni. È qui che nacque la Gen 1 (Protocollo A) e si custodisce l'archivio genomico centrale." },
  { id: "scienza-rigenerazione-n3", categoria: "scienza", titolo: "Rigenerazione tissutale e degli arti (N.3)",
    testo: "L'Allevamento N.3 studia la rigenerazione degli anfibi — axolotl in testa — che ricostruiscono arti e organi. Combina il Protocollo B e il Protocollo G. L'obiettivo dichiarato è la medicina rigenerativa umana; i geni condivisi tra anfibi e mammiferi sono il ponte scientifico. La capacità rigenerativa dell'axolotl è reale e documentata." },
  { id: "scienza-veleno-dual-use", categoria: "scienza", titolo: "Biochimica del veleno e dual-use (N.5)",
    testo: "L'Allevamento N.5 fraziona i veleni dei serpenti dei Ghati Occidentali. Le tossine diventano candidati-farmaco oppure, con la stessa chimica, agenti offensivi: dual-use puro. Combina i Protocolli D e F. La giustificazione reale è l'alto numero di morti da morso di serpente in India." },
  { id: "scienza-osmoregolazione-navigazione", categoria: "scienza", titolo: "Osmoregolazione, navigazione e longevità (N.7)",
    testo: "L'Allevamento N.7 studia come rettili e tartarughe marine gestiscono il sale (ghiandole del sale), ritrovano la rotta (magnetoricezione) e vivono a lungo. Combina i Protocolli E e H. Le applicazioni dichiarate riguardano l'adattamento a scarsità d'acqua e ambienti ostili." },
  { id: "scienza-mimetismo-cromatico", categoria: "scienza", titolo: "Adattamento cromatico rapido (N.8)",
    testo: "L'Allevamento N.8 studia il cambiamento di colore dei camaleonti come segnale e mimetismo, potenziando i cromatofori tramite i Protocolli B e C. Punta a rendere controllabile «uno schermo vivente» per applicazioni in superfici a colorazione dinamica. Il sito porta avanti anche un programma di conservazione degli habitat del Lago Vittoria, concreto e attivo sul territorio." },
  { id: "scienza-adattamento-freddo-calcolo", categoria: "scienza", titolo: "Bioinformatica e adattamento al freddo (N.9)",
    testo: "Il Centro N.9, a Kiruna, non alleva: modella. Sfrutta il clima artico per raffreddare i server e usa il machine learning per predire gli effetti degli edit genici e cercare le firme dei tratti emergenti. Conduce il programma di adattamento al freddo (Protocolli F e H). È il nodo in cui i dati biologici della rete vengono elaborati e trasformati in modelli predittivi." },
  { id: "scienza-percezione-distribuita", categoria: "scienza", titolo: "Percezione distribuita e seta (N.2)",
    testo: "L'Allevamento N.2 potenzia la vista e il problem-solving dei salticidi (Protocolli C e D), studiando la percezione visiva distribuita — molti sensori ottici indipendenti che concorrono a una singola rappresentazione dell'ambiente — e i biomateriali di seta ad alte prestazioni. Le applicazioni riguardano sistemi di visione artificiale e tessuti tecnici avanzati." },
  { id: "scienza-cognizione-uccelli", categoria: "scienza", titolo: "Cognizione aviaria: voce e mente collettiva (N.11)",
    testo: "Il Laboratorio N.11 poggia su scienza consolidata: gli studi di Irene Pepperberg sul grigio africano Alex e i corvi della Nuova Caledonia che costruiscono e usano attrezzi. I pappagalli sono studiati per la mimica vocale e la produzione del suono; i corvidi per l'uso di strumenti, il problem-solving e i comportamenti sociali dello stormo. Il programma integra bioacustica e cognizione comparata degli uccelli." },
  { id: "scienza-cognizione-varani", categoria: "scienza", titolo: "I varanidi e il potenziamento fisico (N.6)",
    testo: "I varanidi sono tra i rettili più capaci sul piano comportamentale: foraggiamento attivo, problem-solving, capacità di conteggio e gioco. Un varano potenziato per forza e resilienza è un candidato naturale per le applicazioni a duplice uso del Programma Sigma, orientate a difesa, ambienti estremi e soccorso. N.6 combina i Protocolli G e F ed è tra i siti più direttamente collegati a Sigma." },
  { id: "specie-iguane", categoria: "specie", titolo: "Le iguane — La Mente (N.4)",
    testo: "Iguana iguana ingegnerizzate, specie-cardine del sito N.4. Studiate per cognizione e comportamento tramite test standardizzati. Alcuni esemplari presentano anomalie comportamentali ancora in studio e non replicate, tra cui 47B. Riferimenti del cohort: 47B (in osservazione comportamentale), 41C (potenziamento sensoriale), 49B (stesso protocollo di 47B, profilo tipico), 37B (baseline gen 3), 26B (gen 2, caso irrisolto)." },
  { id: "specie-ragni", categoria: "specie", titolo: "I ragni — La Rete (N.2)",
    testo: "Salticidi (ragni saltatori), con vista acuta e problem-solving, e tarantole per la robustezza. Allevati a Iquitos per lo studio della percezione visiva distribuita e per i biomateriali di seta ad alte prestazioni. Applicazioni in sistemi di visione e tessuti tecnici avanzati." },
  { id: "specie-anfibi", categoria: "specie", titolo: "Gli anfibi — Il Ritorno (N.3)",
    testo: "Axolotl, salamandre e tritoni, allevati a Hokkaidō per la capacità di rigenerare arti e tessuti. Colonie fragili, stabulazione impeccabile, obiettivo dichiarato: medicina rigenerativa umana." },
  { id: "specie-serpenti", categoria: "specie", titolo: "I serpenti — Il Rimedio (N.5)",
    testo: "Elapidi e viperidi dei Ghati Occidentali, allevati per frazionare il veleno. Un veleno che è al tempo stesso farmaco e arma: il dual-use scritto in una goccia. Il fine dichiarato — antidoti e farmaci — è reale e prezioso in India." },
  { id: "specie-varani", categoria: "specie", titolo: "I varani — Il Corpo (N.6)",
    testo: "Varanidi potenziati allevati in Polonia. Il gruppo include 94G «Smok» (esemplare dominante di grande taglia), 91F «Cień» (femmina agile e reattiva), 88G «Żubr» (esemplare gigante e resistente), 96G «Iskra» (giovane femmina), con 85F «Mróz» e 89G «Grom». Il programma unisce potenziamento fisico e capacità comportamentali ed è collegato direttamente a Sigma." },
  { id: "specie-rettili-marini", categoria: "specie", titolo: "Rettili marini e tartarughe — La Rotta (N.7)",
    testo: "Rettili marini e tartarughe allevati tra Sulawesi e il Mare di Banda per osmoregolazione, navigazione a lunga distanza e longevità eccezionale. La linea «La Rotta» richiama la migrazione oceanica e i meccanismi di orientamento che il programma studia, con applicazioni nell'adattamento a scarsità d'acqua e ambienti ostili." },
  { id: "specie-camaleonti", categoria: "specie", titolo: "I camaleonti — Lo Specchio (N.8)",
    testo: "Camaleonti allevati sul Lago Vittoria, studiati per il cambiamento di colore rapido come segnale e mimetismo: «uno schermo vivente». Unico sito che unisce allevamento e stazione di campo, con un programma di conservazione degli habitat attivo sul territorio." },
  { id: "specie-uccelli", categoria: "specie", titolo: "Gli uccelli — La Voce (N.11)",
    testo: "Corvidi (corvi della Nuova Caledonia) e pappagalli, allevati per lo studio della cognizione aviaria. I pappagalli sono studiati per la mimica vocale e la produzione del suono, i corvidi per l'uso di strumenti, il problem-solving e i comportamenti sociali dello stormo. Il programma integra bioacustica e cognizione comparata." },
  { id: "specie-esemplari-nominati", categoria: "specie", titolo: "Gli esemplari nominati di N.4",
    testo: "47B (4-07-B-ATC): gen 4, esemplare seguito dagli studi comportamentali per anomalie non replicate. 41C (4-01-C-GCA): potenziamento sensoriale, seguito da Dominika Gradowska. 49B (4-09-B-ATC): stesso protocollo di 47B, profilo comportamentale tipico. 37B: baseline gen 3. 26B: gen 2, caso irrisolto. 53D («Archimede»): gen 5, scartato dalla linea principale per comportamenti atipici e perso in seguito a un errore di documentazione CITES." },
  { id: "facility-biobanca-n1", categoria: "facility", titolo: "Biobanca N.1 — Basilea, Svizzera",
    testo: "Custodisce linee germinali, embrioni crioconservati e l'archivio genomico dell'intera rete. Non alleva. Qui nacque la Gen 1 (Protocollo A). Tema «La Radice»; protocolli A e H; branch core; diretta dalla Dr.ssa Ursula Brunner." },
  { id: "facility-allevamento-n2", categoria: "facility", titolo: "Allevamento N.2 — Iquitos, Perù",
    testo: "Allevamento di ragni (salticidi e tarantole) nell'Amazzonia peruviana. Percezione visiva distribuita e biomateriali di seta ad alte prestazioni. Tema «La Rete»; protocolli C e D; diretto dal Dr. Ricardo Vásquez Chávez. Operativo." },
  { id: "facility-allevamento-n3", categoria: "facility", titolo: "Allevamento N.3 — Hokkaidō, Giappone",
    testo: "Allevamento di anfibi (axolotl, salamandre, tritoni) per la rigenerazione tissutale e degli arti, con orizzonte medico umano. Tema «Il Ritorno»; protocolli B e G; diretto dal Dr. Haruki Tanaka. Operativo." },
  { id: "facility-allevamento-n4", categoria: "facility", titolo: "Allevamento N.4 — Italia",
    testo: "Allevamento di iguane per lo studio della cognizione e del comportamento; tra gli esemplari seguiti figura 47B. Tema «La Mente»; protocolli B e C; team di sito (Conti, Marini, Gradowska, Bianchi, Colombo, Puddu). Operativo." },
  { id: "facility-allevamento-n5", categoria: "facility", titolo: "Allevamento N.5 — Ghati Occidentali, India",
    testo: "Allevamento di serpenti per la biochimica del veleno, tra farmaceutica e difesa (dual-use). Tema «Il Rimedio»; protocolli D e F; diretto dal Dr. Arjun Nair. Operativo." },
  { id: "facility-allevamento-n6", categoria: "facility", titolo: "Allevamento N.6 — Polonia",
    testo: "Allevamento di varani per forza, resilienza e ambienti estremi, nelle paludi del Pripyat; sito direttamente collegato al Programma Sigma. Tema «Il Corpo»; protocolli G e F; team di sito (col. Zaremba, Sokół, Nowak). Operativo." },
  { id: "facility-allevamento-n7", categoria: "facility", titolo: "Allevamento N.7 — Sulawesi, Indonesia",
    testo: "Allevamento di rettili marini e tartarughe per osmoregolazione, navigazione e longevità. Tema «La Rotta»; protocolli E e H; diretto dal Dr. Bagus Wijaya. Lavora con la Biobanca N.1. Operativo." },
  { id: "facility-allevamento-n8", categoria: "facility", titolo: "Allevamento N.8 — Lago Vittoria, Uganda",
    testo: "Allevamento più stazione di campo per camaleonti: mimetismo, adattamento cromatico, conservazione. Unico sito con lavoro sul campo. Tema «Lo Specchio»; protocolli B e C; diretto dal Dr. Joseph Okello. Operativo." },
  { id: "facility-centro-n9", categoria: "facility", titolo: "Centro N.9 — Kiruna, Svezia",
    testo: "Centro di bioinformatica, AI e dati genomici oltre il Circolo Polare; non alleva. Data center artico, modellazione, programma di adattamento al freddo. Tema «Il Calcolo»; protocolli F e H; diretto dalla Dr.ssa Astrid Lindqvist. Operativo." },
  { id: "facility-centro-n10", categoria: "facility", titolo: "Centro N.10 — Stati Uniti [riservato]",
    testo: "Centro di validazione e sicurezza, cuore del Programma Sigma; non alleva ma integra e valida esemplari. Validazione sul campo, integrazione operativa, dual-use. Tema «La Prova»; diretto dal col. (ris.) James Whitaker. Riservato." },
  { id: "facility-laboratorio-n11", categoria: "facility", titolo: "Laboratorio N.11 — Nuova Caledonia, Francia",
    testo: "Ramo aviario in costruzione: uccelli (corvidi e pappagalli) per lo studio della comunicazione vocale, della mimica e della cognizione sociale. Tema «La Voce»; protocolli C e H; diretto dal Dr. Étienne Lefèvre. In costruzione." },
  { id: "personaggio-maria-stern", categoria: "personaggio", titolo: "Dr.ssa Maria Stern — CEO di Eden Exotic",
    testo: "Ex-militare, CEO di Eden Exotic. Guida l'azienda con un approccio deciso e orientato ai risultati, convinta che la protezione e lo sviluppo dei programmi di ricerca siano una priorità strategica. Sostiene con particolare determinazione le linee applicative legate alla difesa, tra cui il Programma Sigma." },
  { id: "personaggio-alfredo-monti", categoria: "personaggio", titolo: "Prof. Alfredo Monti — etologo",
    testo: "Etologo dell'Università di Parma, osservatore paziente e rigoroso, collabora con Eden Exotic come consulente esterno sugli studi comportamentali. Metodico nella raccolta dati sul campo, è tra gli specialisti che seguono più da vicino gli esemplari con comportamenti atipici. Tra le sue collaborazioni recenti figura un progetto con il sito N.6 in Polonia." },
  { id: "personaggio-dominika-gradowska", categoria: "personaggio", titolo: "Dr.ssa Dominika Gradowska — comportamentalista",
    testo: "Comportamentalista polacca del programma iguane di Eden Exotic; scacchista, metodica e intuitiva, è particolarmente abile nel riconoscere pattern comportamentali che sfuggono ad altri. È tra i ricercatori che seguono più da vicino l'esemplare 47B e le sue anomalie comportamentali in studio, e cura il rapporto quotidiano con gli animali del sito." },
  { id: "personaggio-adele-ricci", categoria: "personaggio", titolo: "Adele Ricci — supervisore di sicurezza",
    testo: "Precisione quasi militare, riservata; responsabile della custodia e della sicurezza della documentazione del Programma Sigma. Ha fatto dell'ordine e della riservatezza i cardini del proprio lavoro, convinta che una gestione rigorosa delle informazioni sia essenziale a prevenire abusi e usi impropri." },
  { id: "personaggio-ursula-brunner", categoria: "personaggio", titolo: "Dr.ssa Ursula Brunner — direttrice della Biobanca N.1",
    testo: "Genetista basilese a capo dell'archivio genetico di Eden Exotic. Convinta che una conservazione completa sia l'unico modo per proteggere anni di lavoro, tratta ogni campione come una promessa fatta al futuro della ricerca. È la custode della «Radice», la biobanca da cui discende l'intera rete." },
  { id: "personaggio-astrid-lindqvist", categoria: "personaggio", titolo: "Dr.ssa Astrid Lindqvist — direttrice del Centro N.9",
    testo: "Guida a Kiruna il Centro N.9, il centro computazionale di Eden Exotic. Crede nella potenza esplicativa dei modelli e promuove un uso rigoroso e trasparente della modellazione predittiva a supporto dell'intera rete." },
  { id: "personaggio-james-whitaker", categoria: "personaggio", titolo: "Col. James Whitaker — direttore di N.10 e responsabile Sigma",
    testo: "Ufficiale in congedo a capo del Centro N.10 e del Programma Sigma. Convinto che sistemi biologici resilienti possano proteggere soldati e civili in scenari estremi, dirige il programma con attenzione alle procedure di sicurezza e alla governance del duplice uso." },
  { id: "personaggio-arjun-nair", categoria: "personaggio", titolo: "Dr. Arjun Nair — direttore di N.5",
    testo: "Erpetologo del Kerala a capo dell'Allevamento N.5. Guida il programma come ricerca di antidoti e terapie che salvano vite in India, coordinando anche la componente a duplice uso nel quadro di supervisione previsto dall'azienda." },
  { id: "personaggio-joseph-okello", categoria: "personaggio", titolo: "Dr. Joseph Okello — direttore di N.8",
    testo: "Zoologo ugandese a capo dell'Allevamento e stazione di campo N.8 sul Lago Vittoria. Ha ottenuto per il sito un programma di conservazione dei camaleonti che coordina con pari impegno rispetto alla ricerca sull'adattamento cromatico, unendo tutela degli habitat e scienza applicata." }
];
