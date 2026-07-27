// =============================================================================
// Eden Exotic — Rete globale N.1–N.11 + team locali + base di conoscenza (RAG)
// Espansione del canon (rev. 2026-07-27). Siti "new" in stato "proposto",
// in attesa di revisione umana. N.4 e N.6 hanno team già canonici (in canon.ts).
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
    tema: "La Rete — percezione distribuita e inganno", sommario: "Occhi minuscoli e menti diffuse: percezione, micro-sorveglianza e biomateriali di seta.",
    descrizione: "Immerso nella foresta attorno a Iquitos, potenzia la vista straordinaria e il problem-solving dei ragni saltatori, insieme alla robustezza delle tarantole. Studia la percezione distribuita — molti corpi, molti occhi, una sola rete d'informazioni — e i biomateriali derivati dalla seta. Ufficialmente un centro di biomateriali verdi; nei corridoi si evita la parola «sorveglianza», anche se ogni progetto sembra convergere lì.",
    protocolliChiave: ["C", "D"], branch: "new", stato: "proposto", ordine: 2 },

  { id: "N3", numero: 3, nome: "Allevamento N.3", paese: "Giappone", citta: "Hokkaidō", continente: "Asia", lat: 43.7711, lng: 142.365,
    specie: "Anfibi: axolotl, salamandre e tritoni", tipo: "allevamento", alleva: true,
    tema: "Il Ritorno — rigenerazione", sommario: "Ricostruire ciò che si perde: rigenerazione tissutale e degli arti.",
    descrizione: "Nel clima rigido di Hokkaidō alleva anfibi capaci di rigenerare arti e organi, con l'axolotl come specie-cardine. L'obiettivo dichiarato è tradurre questa capacità in medicina rigenerativa per l'uomo, un fine così luminoso da rendere facile non guardare oltre. Le colonie sono fragili e richiedono stabulazione impeccabile, motivo di orgoglio per il personale.",
    protocolliChiave: ["B", "G"], branch: "new", stato: "proposto", ordine: 3 },

  { id: "N4", numero: 4, nome: "Allevamento N.4", paese: "Italia", citta: "Nord Italia (periferia urbana)", continente: "Europa", lat: 44.795, lng: 10.325,
    specie: "Iguane (Iguana iguana ingegnerizzate)", tipo: "allevamento", alleva: true,
    tema: "La Mente — cognizione e comportamento", sommario: "Il sito del romanzo: cognizione e comportamento delle iguane, e la nascita di 47B.",
    descrizione: "Sterile, geometrico, cinto da mura alte anche per celarsi agli sguardi: è il complesso in cui nasce l'esemplare 47B (4-07-B-ATC), «Galileo». Studia cognizione e comportamento delle iguane, senza mai porsi l'intelligenza come obiettivo: la coscienza di 47B è un effetto collaterale non progettato del Protocollo B. Qui operano il team di Marco Conti e la comportamentalista Dominika Gradowska.",
    protocolliChiave: ["B", "C"], branch: "47b", stato: "operativo", ordine: 4 },

  { id: "N5", numero: 5, nome: "Allevamento N.5", paese: "India", citta: "Ghati Occidentali (Agumbe)", continente: "Asia", lat: 13.503, lng: 75.093,
    specie: "Serpenti (elapidi e viperidi dei Ghati Occidentali)", tipo: "allevamento", alleva: true,
    tema: "Il Rimedio — biochimica del veleno", sommario: "Veleno come farmaco e come arma: il dual-use scritto in una goccia.",
    descrizione: "Sulle piogge dei Ghati Occidentali alleva serpenti per frazionarne il veleno. La stessa molecola può diventare antidoto, analgesico o anticoagulante — oppure, se qualcun altro decide così, un'arma: è il dual-use nella sua forma più nuda. Si presenta come ricerca farmaceutica e antiveleni, in un paese dove i morsi uccidono migliaia di persone l'anno. I candidati terapeutici restano in India; i rapporti «di difesa» partono verso N.10.",
    protocolliChiave: ["D", "F"], branch: "new", stato: "proposto", ordine: 5 },

  { id: "N6", numero: 6, nome: "Allevamento N.6", paese: "Polonia", citta: "Polesia (paludi del Pripyat)", continente: "Europa", lat: 51.65, lng: 23.2,
    specie: "Varani (varanidi ingegnerizzati)", tipo: "allevamento", alleva: true,
    tema: "Il Corpo — forza, resilienza, ambienti estremi", sommario: "Il filone più cupo: l'intelligenza armata, forza e resilienza per la difesa.",
    descrizione: "Presso le paludi del Pripyat alleva varani potenziati — grossi, veloci, forti, coordinabili — nel ramo più cupo dell'universo. Qui l'intelligenza non osserva e non gioca: viene armata. Sotto il comando del col. Zaremba, il branco (94G «Smok», 91F «Cień», 88G «Żubr» e gli altri) diventa l'asset che Stern sogna e che il Programma Sigma vuole «validare sul campo», con la guerra in Ucraina come banco di prova.",
    protocolliChiave: ["G", "F"], branch: "varani", stato: "operativo", ordine: 6 },

  { id: "N7", numero: 7, nome: "Allevamento N.7", paese: "Indonesia", citta: "Sulawesi / Mare di Banda", continente: "Asia", lat: -4.525, lng: 129.897,
    specie: "Rettili marini e tartarughe", tipo: "allevamento", alleva: true,
    tema: "La Rotta — osmoregolazione, navigazione, longevità", sommario: "Sale, magnetismo e vita lunga: sopravvivere e orientarsi nell'oceano.",
    descrizione: "Tra Sulawesi e il Mare di Banda alleva rettili marini e tartarughe per studiarne l'osmoregolazione, la navigazione a lunga distanza e la longevità eccezionale. Ghiandole del sale, magnetoricezione e telomeri resistenti sono i tre fili di ricerca, giustificati come adattamento umano alla scarsità d'acqua e agli ambienti ostili. Lavora a stretto contatto con la Biobanca N.1 per le linee longeve.",
    protocolliChiave: ["E", "H"], branch: "new", stato: "proposto", ordine: 7 },

  { id: "N8", numero: 8, nome: "Allevamento N.8", paese: "Uganda", citta: "Lago Vittoria / Kampala", continente: "Africa", lat: 0.3136, lng: 32.5811,
    specie: "Camaleonti (con stazione di campo)", tipo: "stazione", alleva: true,
    tema: "Lo Specchio — mimetismo e adattamento cromatico", sommario: "Uno schermo vivente: cambiare colore in fretta, tra ricerca e conservazione.",
    descrizione: "Sulle rive del Lago Vittoria unisce allevamento e stazione di campo per studiare i camaleonti e il loro adattamento cromatico rapido, come segnale e come mimetismo. La facciata è un lodato programma di conservazione degli habitat che si restringono; sotto, la ricerca punta a rendere controllabile «uno schermo vivente». È l'unico sito della rete a coniugare stabulazione e lavoro sul campo.",
    protocolliChiave: ["B", "C"], branch: "new", stato: "proposto", ordine: 8 },

  { id: "N9", numero: 9, nome: "Centro N.9", paese: "Svezia", citta: "Kiruna (Lapponia)", continente: "Europa", lat: 67.8558, lng: 20.2253,
    specie: "Nessuna specie viva; dati genomici e modelli computazionali", tipo: "bioinformatica", alleva: false,
    tema: "Il Calcolo — modellazione e dati", sommario: "Il cervello di silicio della rete: modellazione genomica e programma freddo.",
    descrizione: "A Kiruna, oltre il Circolo Polare, è il cervello computazionale di Eden Exotic: un data center raffreddato dal clima artico che modella l'intera rete genomica. Predice gli effetti degli edit genici, cerca nelle sequenze le firme dei tratti emergenti e conduce il programma di adattamento al freddo. Non si alleva nulla: si lavora su numeri, e la distanza tra i dati e i corpi che li generano è ciò che permette di lavorare in pace.",
    protocolliChiave: ["F", "H"], branch: "core", stato: "operativo", ordine: 9 },

  { id: "N10", numero: 10, nome: "Centro N.10", paese: "Stati Uniti", citta: "[ubicazione riservata]", continente: "America del Nord", lat: 37.2431, lng: -115.8,
    specie: "Nessuna specie propria; integra e valida esemplari da altri siti", tipo: "validazione", alleva: false,
    tema: "La Prova — validazione e integrazione operativa", sommario: "Dove la ricerca diventa asset: validazione sul campo e Programma Sigma.",
    descrizione: "A ubicazione riservata negli Stati Uniti, è il cuore del Programma Sigma: qui gli esemplari smettono di essere «risultati di laboratorio» e diventano «asset validati». Si occupa di validazione sul campo, integrazione operativa e sicurezza. Sigma non è concepito per cattiveria: è ricerca a duplice uso con finalità legittime — difesa, ambienti estremi, soccorso — e una possibile applicazione dannosa. Chi lo porta avanti sono professionisti convinti, ed è proprio questo a renderlo inquietante.",
    protocolliChiave: ["F", "G"], branch: "varani", stato: "riservato", ordine: 10 },

  { id: "N11", numero: 11, nome: "Laboratorio N.11", paese: "Francia (Nuova Caledonia)", citta: "Nouméa", continente: "Oceania", lat: -22.2758, lng: 166.458,
    specie: "Uccelli: corvidi (corvi della Nuova Caledonia) e pappagalli", tipo: "allevamento", alleva: true,
    tema: "La Voce — comunicazione, identità, disinformazione", sommario: "Il contraltare di 47B: chi ha la voce, e di chi fidarsi quando chiunque può averla.",
    descrizione: "In Nuova Caledonia, patria dei corvi che usano attrezzi, è il ramo aviario proposto: pappagalli per la voce, la mimica e l'inganno; corvidi per la strategia, gli strumenti e la mente collettiva dello stormo. È l'esatto contraltare di 47B — lui, genio muto che sa e non può dirlo; loro, la voce, ambivalente e pericolosa. La domanda del ramo è: di chi ti puoi fidare quando chiunque può avere la voce di chiunque?",
    protocolliChiave: ["C", "H"], branch: "new", stato: "proposto", ordine: 11 }
];

// --- Team locali (ordine = direttore prima) --------------------------------
type RawPerson = { facilityId: string; nome: string; ruolo: string; bio: string; branch: string; stato: string };
const rawTeam: RawPerson[] = [
  { facilityId: "N1", nome: "Dr.ssa Ursula Brunner", ruolo: "Direttrice della Biobanca e responsabile dell'archivio genetico", branch: "core", stato: "attivo",
    bio: "Genetista basilese che ha passato vent'anni a costruire il catalogo delle linee germinali di Eden; è convinta che conservare tutto sia l'unico modo per impedire che un errore cancelli anni di lavoro, e ha smesso di chiedersi a cosa quel lavoro porterà." },
  { facilityId: "N1", nome: "Dr. Matthias Vogel", ruolo: "Crio-curatore capo", branch: "core", stato: "attivo",
    bio: "Fisico dei materiali prestato alla biologia, cura i serbatoi di azoto liquido con la meticolosità di chi ha visto una volta un intero lotto degradarsi per un allarme ignorato." },
  { facilityId: "N1", nome: "Dr.ssa Helena Roth", ruolo: "Genetista delle linee germinali", branch: "core", stato: "attivo",
    bio: "Ricostruisce e stabilizza le linee della Gen 1; si racconta di fare pura conservazione e non progettazione, per non dover pesare l'uso che altri faranno delle sue righe di DNA." },
  { facilityId: "N1", nome: "Dr. Lukas Ammann", ruolo: "Archivista genomico e responsabile della tracciabilità (CITES)", branch: "core", stato: "attivo",
    bio: "Tiene il registro che collega ogni esemplare al suo campione crioconservato; l'ossessione per la catena di custodia nasce da un vecchio caso di documentazione CITES andata perduta." },
  { facilityId: "N1", nome: "Dr.ssa Corinne Frei", ruolo: "Responsabile qualità e conformità", branch: "core", stato: "attivo",
    bio: "Ex ispettrice farmaceutica, applica alla biobanca standard che nessuna legge le impone; crede che il rigore procedurale sia l'unica etica praticabile." },

  { facilityId: "N2", nome: "Dr. Ricardo Vásquez Chávez", ruolo: "Direttore dell'Allevamento", branch: "new", stato: "proposto",
    bio: "Aracnologo peruviano tornato dall'estero per dirigere un sito nella propria Amazzonia; giustifica il progetto con il lavoro che porta a Iquitos, e preferisce non pensare a chi comprerà i biomateriali che produce." },
  { facilityId: "N2", nome: "Dr.ssa Ana María Ríos", ruolo: "Responsabile del comportamento dei salticidi", branch: "new", stato: "proposto",
    bio: "Studia la vista acuta e il problem-solving dei ragni saltatori; la descrive come «una rete che vede», senza soffermarsi sull'uso di sorveglianza che il termine evoca." },
  { facilityId: "N2", nome: "Ing. Julio Herrera", ruolo: "Responsabile biomateriali e produzione della seta", branch: "new", stato: "proposto",
    bio: "Ingegnere dei materiali che sogna una seta di ragno su scala industriale; per lui è chimica verde e brevetti, e la clausola dual-use è solo una firma in fondo a una pagina." },
  { facilityId: "N2", nome: "Dr.ssa Carla Tuesta", ruolo: "Genetista", branch: "new", stato: "proposto",
    bio: "Applica i Protocolli C e D ai salticidi con la cautela di chi teme di fissare tratti che poi non saprebbe richiamare; resta perché il laboratorio finanzia la clinica di sua sorella." },
  { facilityId: "N2", nome: "Téc. Manuel Shapiama", ruolo: "Tecnico di campo e allevatore", branch: "new", stato: "proposto",
    bio: "Conosce la foresta meglio di chiunque e procura gli esemplari selvatici da cui partono le linee; lo fa per un salario senza eguali nella regione, e tace su quanto gli pesi vederli tornare cambiati." },

  { facilityId: "N3", nome: "Dr. Haruki Tanaka", ruolo: "Direttore del laboratorio di rigenerazione", branch: "new", stato: "proposto",
    bio: "Erpetologo di Hokkaidō che ha dedicato la carriera all'axolotl; è convinto che replicare la rigenerazione degli arti salverà vite umane, e questa certezza gli permette di non guardare oltre l'obiettivo medico." },
  { facilityId: "N3", nome: "Dr.ssa Yumi Sato", ruolo: "Responsabile della biologia della rigenerazione tissutale", branch: "new", stato: "proposto",
    bio: "Studia come salamandre e tritoni ricostruiscono ciò che perdono; ha una ragione privata — un fratello reduce con una menomazione — che rende il suo lavoro una missione e insieme un punto cieco." },
  { facilityId: "N3", nome: "Dr. Kenji Nakamura", ruolo: "Genetista", branch: "new", stato: "proposto",
    bio: "Lavora sui geni della rigenerazione condivisi tra anfibi e mammiferi; scrupoloso fino alla lentezza, rallenta di proposito i protocolli quando teme che l'ambizione superi i dati." },
  { facilityId: "N3", nome: "Dr.ssa Aiko Ishikawa", ruolo: "Veterinaria degli anfibi", branch: "new", stato: "proposto",
    bio: "Garantisce il benessere di colonie fragilissime in un clima estremo; la rigidità con cui difende gli standard di stabulazione è il suo modo di restare in pace con ciò che il sito produce." },
  { facilityId: "N3", nome: "Tec. Sora Yoshida", ruolo: "Tecnico di allevamento", branch: "new", stato: "proposto",
    bio: "Gestisce le vasche e i cicli di muta con cura quasi maniacale; agli esemplari ha smesso di dare un nome, dopo che uno «promettente» è stato trasferito senza spiegazioni." },

  { facilityId: "N5", nome: "Dr. Arjun Nair", ruolo: "Direttore dell'Allevamento", branch: "new", stato: "proposto",
    bio: "Erpetologo del Kerala che ha voluto il sito sui Ghati per stare vicino ai serpenti che studia da sempre; difende il programma come ricerca di antidoti, e considera la parte «difesa» il male necessario che finanzia la parte «rimedio»." },
  { facilityId: "N5", nome: "Dr.ssa Priya Menon", ruolo: "Responsabile della biochimica del veleno", branch: "new", stato: "proposto",
    bio: "Frazionatrice di veleni di rara bravura; ogni tossina è per lei prima una molecola-farmaco e solo poi, se qualcun altro decide così, un'arma — una distinzione che si ripete come un mantra." },
  { facilityId: "N5", nome: "Dr. Vikram Deshpande", ruolo: "Farmacologo", branch: "new", stato: "proposto",
    bio: "Traduce le tossine in candidati terapeutici; crede al loro valore clinico, e proprio per questo evita di leggere i rapporti che partono verso N.10." },
  { facilityId: "N5", nome: "Dr.ssa Lakshmi Iyer", ruolo: "Erpetologa e responsabile del serpentario", branch: "new", stato: "proposto",
    bio: "Cura centinaia di serpenti con un rispetto quasi religioso; è entrata per la conservazione delle specie dei Ghati e resta convinta di proteggerle meglio dentro che fuori." },
  { facilityId: "N5", nome: "Téc. Suresh Gowda", ruolo: "Tecnico addetto all'estrazione del veleno", branch: "new", stato: "proposto",
    bio: "Estrae veleno con mani ferme da vent'anni; il rischio quotidiano lo ha reso fatalista, e non chiede mai dove finiscano le fiale che etichetta." },

  { facilityId: "N7", nome: "Dr. Bagus Wijaya", ruolo: "Direttore dell'Allevamento", branch: "new", stato: "proposto",
    bio: "Biologo marino di Sulawesi che vede nel sito una scuola di eccellenza per il proprio paese; parla di longevità e di oceani, e lascia che siano altri a parlare di «applicazioni»." },
  { facilityId: "N7", nome: "Dr.ssa Sri Wulandari", ruolo: "Responsabile della fisiologia e dell'osmoregolazione", branch: "new", stato: "proposto",
    bio: "Studia come rettili e tartarughe marine sopravvivono in acqua salata; convinta che i suoi dati aiuteranno l'adattamento umano alla scarsità d'acqua, un futuro che le sembra più urgente di ogni scrupolo." },
  { facilityId: "N7", nome: "Dr. Yusuf Maulana", ruolo: "Responsabile degli studi sulla navigazione", branch: "new", stato: "proposto",
    bio: "Indaga come le tartarughe ritrovano la rotta a migliaia di chilometri; affascinato dalla magnetoricezione, non si chiede perché il progetto sia classificato accanto alla difesa." },
  { facilityId: "N7", nome: "Dr.ssa Ni Made Ayu", ruolo: "Genetista della longevità", branch: "new", stato: "proposto",
    bio: "Lavora sul Protocollo H e sugli esemplari che invecchiano lentissimi; l'idea di allungare la vita la seduce al punto da metterla davanti a ogni altra domanda." },
  { facilityId: "N7", nome: "Téc. Hasan Lampe", ruolo: "Tecnico di campo marino", branch: "new", stato: "proposto",
    bio: "Ex pescatore del Mare di Banda, gestisce le vasche costiere e i recuperi in mare; resta per il salario e per un mare che, dice, era già stato svuotato da altri prima di Eden." },

  { facilityId: "N8", nome: "Dr. Joseph Okello", ruolo: "Direttore dell'Allevamento e della stazione di campo", branch: "new", stato: "proposto",
    bio: "Zoologo ugandese che ha ottenuto per il sito un programma di conservazione dei camaleonti; sa che la conservazione è anche la vetrina che rende accettabile il resto, e ha scelto di usarla piuttosto che rifiutarla." },
  { facilityId: "N8", nome: "Dr.ssa Grace Nakato", ruolo: "Responsabile degli studi sull'adattamento cromatico", branch: "new", stato: "proposto",
    bio: "Studia il cambiamento di colore rapido come segnale e mimetismo; descrive il camaleonte come «uno schermo vivente» e preferisce fermarsi lì." },
  { facilityId: "N8", nome: "Dr. Samuel Mugisha", ruolo: "Ecologo di campo e responsabile della conservazione", branch: "new", stato: "proposto",
    bio: "Divide il tempo tra la stazione e le foreste che si restringono; crede che collaborare con Eden sia l'unico modo per salvare habitat che nessun ente pubblico finanzia più." },
  { facilityId: "N8", nome: "Dr.ssa Aisha Namuli", ruolo: "Genetista", branch: "new", stato: "proposto",
    bio: "Applica i Protocolli B e C ai cromatofori; giovane e ambiziosa, vede nel sito l'unico laboratorio del continente in cui lavorare al proprio livello, e questo le basta per non fare domande." },
  { facilityId: "N8", nome: "Téc. Peter Ssemwanga", ruolo: "Tecnico della stazione di campo", branch: "new", stato: "proposto",
    bio: "Gestisce terrari e fototrappole sul campo; antropomorfizza i camaleonti e ne parla come di persone, cosa che a lui pare la sola reazione onesta." },

  { facilityId: "N9", nome: "Dr.ssa Astrid Lindqvist", ruolo: "Direttrice del Centro e responsabile della bioinformatica", branch: "core", stato: "attivo",
    bio: "Guida a Kiruna un data center che modella l'intera rete genomica; crede nella potenza esplicativa dei modelli e teme, più di ogni cosa, il giorno in cui un modello sarà usato per progettare invece che per capire." },
  { facilityId: "N9", nome: "Dr. Erik Johansson", ruolo: "Responsabile machine learning e data science", branch: "core", stato: "attivo",
    bio: "Costruisce le reti che predicono l'effetto di un edit genico; per lui sono pattern e metriche, e la distanza tra i dati e i corpi che li generano è ciò che gli permette di dormire." },
  { facilityId: "N9", nome: "Dr.ssa Maja Bergström", ruolo: "Responsabile della genomica computazionale", branch: "core", stato: "attivo",
    bio: "Cerca nei genomi la firma dei tratti emergenti — inclusa, si mormora, quella della cognizione; lo fa per curiosità scientifica pura, insistendo di non essere responsabile di ciò che troverà." },
  { facilityId: "N9", nome: "Dr. Nils Andersson", ruolo: "Responsabile dell'infrastruttura e del data center", branch: "core", stato: "attivo",
    bio: "Sfrutta il freddo della Lapponia per raffreddare i server; misura tutto in kilowatt e uptime e considera il contenuto dei dati «un problema di altri reparti»." },
  { facilityId: "N9", nome: "Dr.ssa Sofia Kallio", ruolo: "Responsabile del programma di adattamento al freddo", branch: "core", stato: "attivo",
    bio: "Modella come rendere gli organismi tolleranti agli ambienti gelidi; cresciuta tra Kiruna e la Lapponia finlandese, ama il freddo e non vede nulla di sinistro nel volerlo domare." },

  { facilityId: "N10", nome: "Col. (ris.) James Whitaker", ruolo: "Direttore del Centro e responsabile del Programma Sigma", branch: "varani", stato: "attivo",
    bio: "Ufficiale in congedo convinto che sistemi biologici resilienti salveranno soldati e civili dove nessuna macchina regge; non si considera un guerrafondaio ma un uomo che preferisce essere pronto, e questa lucidità lo rende più inquietante di un fanatico." },
  { facilityId: "N10", nome: "Dr. Daniel Cole", ruolo: "Responsabile della validazione sul campo", branch: "varani", stato: "attivo",
    bio: "Traduce gli esemplari da «risultati di laboratorio» a «asset validati»; si aggrappa al protocollo e ai numeri per non dover chiamare le cose col loro nome." },
  { facilityId: "N10", nome: "Rebecca Hayes", ruolo: "Responsabile della sicurezza operativa", branch: "varani", stato: "attivo",
    bio: "Protegge il programma da fughe, attivisti e curiosi; persuasa che la segretezza serva a evitare abusi peggiori — un ruolo che rispecchia da vicino quello di Adele Ricci a Villa Monti." },
  { facilityId: "N10", nome: "Marcus Bennett", ruolo: "Responsabile dell'integrazione operativa e collegamento con la difesa", branch: "varani", stato: "attivo",
    bio: "Fa da ponte tra Eden e i committenti militari; venditore prima ancora che analista, presenta il dual-use come opportunità e considera l'etica un capitolo del contratto, non della coscienza." },
  { facilityId: "N10", nome: "Dr.ssa Karen Foster", ruolo: "Responsabile etica e conformità dual-use", branch: "varani", stato: "attivo",
    bio: "Il suo compito è dire di no, e quasi sempre finisce per spiegare perché un sì è accettabile; convinta che restare dentro sia meglio che cedere il posto a chi non si farebbe scrupoli." },

  { facilityId: "N11", nome: "Dr. Étienne Lefèvre", ruolo: "Direttore designato del Laboratorio", branch: "new", stato: "proposto",
    bio: "Neuroetologo francese chiamato ad aprire il ramo aviario; ossessionato dalla comunicazione animale, presenta il progetto come studio del linguaggio non umano e minimizza la voce «disinformazione» del mandato." },
  { facilityId: "N11", nome: "Dr.ssa Marie Wamytan", ruolo: "Responsabile degli studi sui corvidi", branch: "new", stato: "proposto",
    bio: "Ornitologa kanak che studia i corvi della Nuova Caledonia e il loro uso di attrezzi; è entrata per proteggere una specie del proprio arcipelago, e sarebbe la prima ad andarsene se il ramo prendesse la piega sbagliata." },
  { facilityId: "N11", nome: "Dr. Julien Moreau", ruolo: "Responsabile bioacustica e mimica vocale", branch: "new", stato: "proposto",
    bio: "Analizza come i pappagalli riproducono qualunque voce; la chiama «il dono di parlare con la bocca di un altro» senza soffermarsi su cosa significhi in mani sbagliate." },
  { facilityId: "N11", nome: "Dr.ssa Léa Poadja", ruolo: "Responsabile del comportamento e dell'identità", branch: "new", stato: "proposto",
    bio: "Studia come gli uccelli riconoscono e imitano i singoli individui; il tema dell'identità la disturba solo quando qualcuno, in riunione, lo lega alla parola «frode»." },
  { facilityId: "N11", nome: "Téc. Paul Néchéro", ruolo: "Tecnico delle voliere", branch: "new", stato: "proposto",
    bio: "Costruisce e cura gli aviari; kanak del posto, tratta corvi e pappagalli con rispetto quasi cerimoniale e considera il sito, per ora, più una promessa di lavoro che una minaccia." }
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
    testo: "Eden Exotic è la società di biotecnologia al centro dell'universo di 47B. Potenzia caratteristiche naturali già presenti nei rettili (e in altri taxa) tramite editing genetico, presentando ogni programma come ricerca legittima: medicina, difesa, conservazione, materiali. Non è un covo di malvagi: i suoi ricercatori e dirigenti sono professionisti convinti di servire il bene — scienza, sicurezza, progresso — ed è proprio questo a renderla inquietante." },
  { id: "azienda-rete-numerata-iceberg", categoria: "azienda", titolo: "La rete degli allevamenti numerati e la regola dell'iceberg",
    testo: "Eden gestisce una rete di siti numerati (N.1–N.11 e oltre), ciascuno con una specie e un tema. La numerazione sparsa e alta è deliberata: ogni sito è una stanza dell'iceberg, e il romanzo principale ne mostra solo una finestra piccola e precoce (N.4, le iguane). I personaggi di N.4 credono 47B unico perché ignorano cosa hanno prodotto i complessi più vecchi. Alcuni siti girano da decenni." },
  { id: "azienda-tre-temperature", categoria: "azienda", titolo: "Un solo universo, tre temperature",
    testo: "L'universo condiviso ha tre registri narrativi, le «tre temperature»: 47B è freddo, filosofico, scientificamente rigoroso (le iguane, «La Mente»); Varani è cupo e tragico (N.6, l'intelligenza armata, «Il Corpo»); Archimede è caldo e meraviglioso (spin-off per bambini). In caso di conflitto, la bibbia di 47B è la fonte autorevole." },
  { id: "azienda-programma-sigma", categoria: "azienda", titolo: "Programma Sigma — il duplice uso",
    testo: "Sigma è il programma di validazione e difesa a duplice uso di Eden, con cuore operativo nel Centro N.10 (USA). Non è concepito per cattiveria: ha finalità legittime — sistemi biologici adattabili e resilienti per la difesa, ambienti ostili, soccorso — e una possibile applicazione dannosa. Il peso etico non è la villainy ma il dilemma dual-use e la strumentalizzazione degli esemplari coscienti." },
  { id: "azienda-cites-tracciabilita", categoria: "azienda", titolo: "CITES e tracciabilità",
    testo: "Gli esemplari e i campioni della rete sono soggetti a documentazione di tracciabilità in stile CITES, gestita a livello centrale dalla Biobanca N.1. La stessa burocrazia che dovrebbe garantire il controllo è anche il punto debole: l'esemplare di Gen 5 «Archimede» (53D) viene ceduto e perso per un errore di compilazione CITES. La negligenza documentale è tanto pericolosa quanto la malizia." },
  { id: "scienza-protocolli-a-h", categoria: "scienza", titolo: "I Protocolli A–H",
    testo: "Ogni protocollo amplia una caratteristica naturale; nessuno mira all'intelligenza. A = vitalità e stabilità (piattaforma, Gen 1). B = adattamento termico-cromatico e rigenerativo. C = potenziamento sensoriale. D = resistenza ai patogeni. E = osmoregolazione. F = tolleranza ipossica e dormienza metabolica. G = potenziamento muscoloscheletrico e rigenerazione degli arti. H = longevità e integrità genomica." },
  { id: "scienza-protocollo-b-cognizione", categoria: "scienza", titolo: "Protocollo B e la cognizione non progettata",
    testo: "Il Protocollo B coinvolge geni come IGFBP2 e SOX2. In 47B, e solo in lui, ha prodotto un potenziamento neurale imprevisto: la coscienza è un effetto collaterale non progettato. Le controprove lo confermano: 49B ha lo stesso identico protocollo e suffisso (B-ATC) ma è rettiliano, e 37B come tutti i B precedenti non è cosciente. Nessuno deve mai dare una spiegazione definitiva del perché 47B sia cosciente." },
  { id: "scienza-sistema-codici", categoria: "scienza", titolo: "Il sistema di codici degli esemplari",
    testo: "Il codice semplice (es. 47B): prima cifra = generazione; seconda cifra = posizione dell'embrione destinato al protocollo, assegnata alla selezione e indipendente dall'ordine di schiusa; lettera = variante di protocollo. Il codice esteso (4-07-B-ATC) aggiunge la sequenza per-protocollo a due cifre e un suffisso di tre lettere. Pattern: 4-\\d{2}-[A-Z]-[A-Z]{3}." },
  { id: "scienza-suffissi-triplette", categoria: "scienza", titolo: "I suffissi a tripletta",
    testo: "Il suffisso di tre lettere (es. ATC, GCA) richiama le basi azotate A/T/C/G e identifica il pacchetto specifico di edit genici entro un protocollo. B-ATC è il pacchetto standard del Protocollo B condiviso da 47B e 49B; C-GCA è quello di 41C." },
  { id: "scienza-sviluppo-accelerato", categoria: "scienza", titolo: "Sviluppo accelerato e scala delle generazioni",
    testo: "Gli esemplari Eden sono ingegnerizzati per uno sviluppo rapido: l'incubazione dura circa 32 giorni contro i circa 90 naturali dell'Iguana iguana. È una feature radicata nel Protocollo A per massimizzare la resa e accorciare il tempo di generazione. Una generazione vale circa 1–1,5 anni: così N.4 arriva a 47B (Gen 4) e ad Archimede (Gen 5) in pochi anni." },
  { id: "scienza-geni-chiave", categoria: "scienza", titolo: "Geni chiave: IGFBP2 e SOX2",
    testo: "Due geni cardine del Protocollo B: IGFBP2, legato allo sviluppo neuronale e alla plasticità, e SOX2, legato alle cellule staminali neurali, entrambi conservati nei vertebrati. Marco Conti spera siano una formula replicabile della coscienza; Dominika sostiene che si tratti di una singolarità, non di una formula." },
  { id: "scienza-biobanca-crioconservazione", categoria: "scienza", titolo: "Crioconservazione e linee germinali (N.1)",
    testo: "La Biobanca N.1 conserva linee germinali, embrioni e tessuti in azoto liquido, con ridondanza dei serbatoi e monitoraggio continuo. Nessun risultato deve andare perduto: qualunque generazione può ripartire dai suoi campioni. È qui che nacque la Gen 1 (Protocollo A) e si custodisce l'archivio genomico centrale." },
  { id: "scienza-rigenerazione-n3", categoria: "scienza", titolo: "Rigenerazione tissutale e degli arti (N.3)",
    testo: "L'Allevamento N.3 studia la rigenerazione degli anfibi — axolotl in testa — che ricostruiscono arti e organi. Combina il Protocollo B e il Protocollo G. L'obiettivo dichiarato è la medicina rigenerativa umana; i geni condivisi tra anfibi e mammiferi sono il ponte scientifico. La capacità rigenerativa dell'axolotl è reale e documentata." },
  { id: "scienza-veleno-dual-use", categoria: "scienza", titolo: "Biochimica del veleno e dual-use (N.5)",
    testo: "L'Allevamento N.5 fraziona i veleni dei serpenti dei Ghati Occidentali. Le tossine diventano candidati-farmaco oppure, con la stessa chimica, agenti offensivi: dual-use puro. Combina i Protocolli D e F. La giustificazione reale è l'alto numero di morti da morso di serpente in India." },
  { id: "scienza-osmoregolazione-navigazione", categoria: "scienza", titolo: "Osmoregolazione, navigazione e longevità (N.7)",
    testo: "L'Allevamento N.7 studia come rettili e tartarughe marine gestiscono il sale (ghiandole del sale), ritrovano la rotta (magnetoricezione) e vivono a lungo. Combina i Protocolli E e H. Le applicazioni dichiarate riguardano l'adattamento a scarsità d'acqua e ambienti ostili." },
  { id: "scienza-mimetismo-cromatico", categoria: "scienza", titolo: "Adattamento cromatico rapido (N.8)",
    testo: "L'Allevamento N.8 studia il cambiamento di colore dei camaleonti come segnale e mimetismo, potenziando i cromatofori tramite i Protocolli B e C. Punta a rendere controllabile «uno schermo vivente». La facciata di conservazione degli habitat del Lago Vittoria è reale e utile." },
  { id: "scienza-adattamento-freddo-calcolo", categoria: "scienza", titolo: "Bioinformatica e adattamento al freddo (N.9)",
    testo: "Il Centro N.9, a Kiruna, non alleva: modella. Sfrutta il clima artico per raffreddare i server e usa il machine learning per predire gli effetti degli edit genici e cercare le firme dei tratti emergenti. Conduce il programma di adattamento al freddo (Protocolli F e H). È il punto in cui il vivente diventa dato." },
  { id: "scienza-percezione-distribuita", categoria: "scienza", titolo: "Percezione distribuita e seta (N.2)",
    testo: "L'Allevamento N.2 potenzia la vista e il problem-solving dei salticidi (Protocolli C e D), studiando la percezione distribuita — molti corpi, molti occhi, una sola rete — e i biomateriali di seta. Il genere narrativo del ramo ragni è spionaggio/heist/trickster." },
  { id: "scienza-cognizione-uccelli", categoria: "scienza", titolo: "Cognizione aviaria: voce e mente collettiva (N.11)",
    testo: "Il Laboratorio N.11 poggia su scienza reale: Alex, il grigio africano di Irene Pepperberg, e i corvi della Nuova Caledonia che usano attrezzi. I pappagalli incarnano la voce, la mimica e l'inganno; i corvidi la strategia e lo stormo come mente distribuita. «Eredi dei dinosauri» è letterale." },
  { id: "scienza-cognizione-varani", categoria: "scienza", titolo: "Intelligenza armata: i varanidi (N.6)",
    testo: "I varanidi sono tra i rettili più intelligenti: foraggiamento attivo, problem-solving, capacità di conteggio, gioco. Un varano potenziato è il candidato naturale al sogno dual-use di Sigma. N.6 combina i Protocolli G e F. È il premise più pericoloso dell'universo: qui l'intelligenza viene armata." },
  { id: "specie-iguane", categoria: "specie", titolo: "Le iguane — La Mente (N.4)",
    testo: "Iguana iguana ingegnerizzate, specie del romanzo principale. Studiate per cognizione e comportamento: la coscienza di 47B è un'anomalia. Spettro: 47B cosciente, 41C sensoriale ma non cosciente, 49B rettiliano con lo stesso protocollo, 37B baseline gen 3, 26B «il fantasma» di gen 2." },
  { id: "specie-ragni", categoria: "specie", titolo: "I ragni — La Rete (N.2)",
    testo: "Salticidi (ragni saltatori), con vista acuta e problem-solving, e tarantole per la robustezza. Allevati a Iquitos per percezione distribuita, micro-sorveglianza e biomateriali di seta. Ramo narrativo: spionaggio, heist, trickster." },
  { id: "specie-anfibi", categoria: "specie", titolo: "Gli anfibi — Il Ritorno (N.3)",
    testo: "Axolotl, salamandre e tritoni, allevati a Hokkaidō per la capacità di rigenerare arti e tessuti. Colonie fragili, stabulazione impeccabile, obiettivo dichiarato: medicina rigenerativa umana." },
  { id: "specie-serpenti", categoria: "specie", titolo: "I serpenti — Il Rimedio (N.5)",
    testo: "Elapidi e viperidi dei Ghati Occidentali, allevati per frazionare il veleno. Un veleno che è al tempo stesso farmaco e arma: il dual-use scritto in una goccia. Il fine dichiarato — antidoti e farmaci — è reale e prezioso in India." },
  { id: "specie-varani", categoria: "specie", titolo: "I varani — Il Corpo (N.6)",
    testo: "Varanidi potenziati allevati in Polonia. Il branco include 94G «Smok» (il Beta), 91F «Cień» (la più cosciente), 88G «Żubr» (gigante fedele), 96G «Iskra» (la giovane), con 85F «Mróz» e 89G «Grom». Forza più intelligenza: il ramo più cupo, aggancio diretto a Sigma." },
  { id: "specie-rettili-marini", categoria: "specie", titolo: "Rettili marini e tartarughe — La Rotta (N.7)",
    testo: "Rettili marini e tartarughe allevati tra Sulawesi e il Mare di Banda per osmoregolazione, navigazione a lunga distanza e longevità eccezionale. La «Rotta» è insieme migrazione oceanica e direzione mai del tutto dichiarata del programma." },
  { id: "specie-camaleonti", categoria: "specie", titolo: "I camaleonti — Lo Specchio (N.8)",
    testo: "Camaleonti allevati sul Lago Vittoria, studiati per il cambiamento di colore rapido come segnale e mimetismo: «uno schermo vivente». Unico sito che unisce allevamento e stazione di campo, con la conservazione come vetrina." },
  { id: "specie-uccelli", categoria: "specie", titolo: "Gli uccelli — La Voce (N.11)",
    testo: "Corvidi (corvi della Nuova Caledonia) e pappagalli, il contraltare esatto di 47B: lui è il genio muto, loro la voce. I pappagalli per la mimica e l'inganno, i corvidi per la strategia e lo stormo. Domanda: di chi fidarsi quando chiunque può avere la voce di chiunque?" },
  { id: "specie-esemplari-nominati", categoria: "specie", titolo: "Gli esemplari nominati di N.4",
    testo: "47B (4-07-B-ATC, «Galileo»): gen 4, pienamente cosciente, narratore, freddo. 41C (4-01-C-GCA): sensoriale, non cosciente, va con Dominika. 49B (4-09-B-ATC): stesso protocollo di 47B ma rettiliano. 37B: baseline gen 3. 26B: «il fantasma» gen 2, irrisolto. 53D («Archimede»): gen 5, scartato perché «giocava», perso per errore CITES." },
  { id: "facility-biobanca-n1", categoria: "facility", titolo: "Biobanca N.1 — Basilea, Svizzera",
    testo: "Custodisce linee germinali, embrioni crioconservati e l'archivio genomico dell'intera rete. Non alleva. Qui nacque la Gen 1 (Protocollo A). Tema «La Radice»; protocolli A e H; branch core; diretta dalla Dr.ssa Ursula Brunner." },
  { id: "facility-allevamento-n2", categoria: "facility", titolo: "Allevamento N.2 — Iquitos, Perù",
    testo: "Allevamento di ragni (salticidi e tarantole) nell'Amazzonia peruviana. Percezione distribuita, micro-sorveglianza, biomateriali di seta. Tema «La Rete»; protocolli C e D; diretto dal Dr. Ricardo Vásquez Chávez. Stato proposto." },
  { id: "facility-allevamento-n3", categoria: "facility", titolo: "Allevamento N.3 — Hokkaidō, Giappone",
    testo: "Allevamento di anfibi (axolotl, salamandre, tritoni) per la rigenerazione tissutale e degli arti, con orizzonte medico umano. Tema «Il Ritorno»; protocolli B e G; diretto dal Dr. Haruki Tanaka. Stato proposto." },
  { id: "facility-allevamento-n4", categoria: "facility", titolo: "Allevamento N.4 — Italia",
    testo: "Il sito del romanzo: allevamento di iguane per cognizione e comportamento, dove nasce 47B «Galileo». Tema «La Mente»; protocolli B e C; team canonico (Conti, Marini, Gradowska, Bianchi, Colombo, Puddu). Operativo." },
  { id: "facility-allevamento-n5", categoria: "facility", titolo: "Allevamento N.5 — Ghati Occidentali, India",
    testo: "Allevamento di serpenti per la biochimica del veleno, tra farmaceutica e difesa (dual-use). Tema «Il Rimedio»; protocolli D e F; diretto dal Dr. Arjun Nair. Stato proposto." },
  { id: "facility-allevamento-n6", categoria: "facility", titolo: "Allevamento N.6 — Polonia",
    testo: "Allevamento di varani per forza, resilienza e ambienti estremi, nelle paludi del Pripyat; ramo più cupo e aggancio a Sigma. Tema «Il Corpo»; protocolli G e F; team canonico (col. Zaremba, Sokół, Nowak). Operativo." },
  { id: "facility-allevamento-n7", categoria: "facility", titolo: "Allevamento N.7 — Sulawesi, Indonesia",
    testo: "Allevamento di rettili marini e tartarughe per osmoregolazione, navigazione e longevità. Tema «La Rotta»; protocolli E e H; diretto dal Dr. Bagus Wijaya. Lavora con la Biobanca N.1. Stato proposto." },
  { id: "facility-allevamento-n8", categoria: "facility", titolo: "Allevamento N.8 — Lago Vittoria, Uganda",
    testo: "Allevamento più stazione di campo per camaleonti: mimetismo, adattamento cromatico, conservazione. Unico sito con lavoro sul campo. Tema «Lo Specchio»; protocolli B e C; diretto dal Dr. Joseph Okello. Stato proposto." },
  { id: "facility-centro-n9", categoria: "facility", titolo: "Centro N.9 — Kiruna, Svezia",
    testo: "Centro di bioinformatica, AI e dati genomici oltre il Circolo Polare; non alleva. Data center artico, modellazione, programma di adattamento al freddo. Tema «Il Calcolo»; protocolli F e H; diretto dalla Dr.ssa Astrid Lindqvist. Operativo." },
  { id: "facility-centro-n10", categoria: "facility", titolo: "Centro N.10 — Stati Uniti [riservato]",
    testo: "Centro di validazione e sicurezza, cuore del Programma Sigma; non alleva ma integra e valida esemplari. Validazione sul campo, integrazione operativa, dual-use. Tema «La Prova»; diretto dal col. (ris.) James Whitaker. Riservato." },
  { id: "facility-laboratorio-n11", categoria: "facility", titolo: "Laboratorio N.11 — Nuova Caledonia, Francia",
    testo: "Ramo aviario proposto: uccelli (corvidi e pappagalli) per comunicazione, identità e disinformazione — il contraltare di 47B. Tema «La Voce»; protocolli C e H; diretto dal Dr. Étienne Lefèvre. Stato proposto." },
  { id: "personaggio-maria-stern", categoria: "personaggio", titolo: "Dr.ssa Maria Stern — CEO di Eden Exotic",
    testo: "Ex-militare, CEO di Eden e volto del potere che vuole replicare e armare, non capire. Non è una cattiva di cartone: crede sinceramente che proteggere il progetto significhi proteggere qualcosa di importante. Nel filone Varani è «dalla parte giusta», rigida ma non villain." },
  { id: "personaggio-alfredo-monti", categoria: "personaggio", titolo: "Prof. Alfredo Monti — etologo",
    testo: "Etologo dell'Università di Parma, osservatore paziente ed empatico, tiene un diario personale. È l'unico umano che tratta 47B da interlocutore, ma lo ha portato nel proprio mondo anche per studiarlo, con un legame Eden/Sigma che non confessa del tutto. Nell'epilogo è preso da un progetto dalla Polonia, dal Laboratorio N.6." },
  { id: "personaggio-dominika-gradowska", categoria: "personaggio", titolo: "Dr.ssa Dominika Gradowska — comportamentalista",
    testo: "Comportamentalista polacca dentro il programma iguane di Eden; scacchista, metodica e intuitiva, percepisce i pattern che gli altri ignorano ed è così che «sente» 47B. È il ponte tra 47B e il mondo umano e co-protagonista dei seguiti; diventa la talpa involontaria che nasconde in casa la creatura che il suo datore di lavoro vuole." },
  { id: "personaggio-adele-ricci", categoria: "personaggio", titolo: "Adele Ricci — supervisore di sicurezza",
    testo: "Precisione quasi militare, riservata; a Villa Monti custodisce i documenti del Progetto Sigma. Non è la cattiva: protegge il progetto dagli abusi. Ha scelto l'ordine e la segretezza credendo servano a proteggere, e ne paga il prezzo di ambiguità — nel romanzo è la falsa colpevole." },
  { id: "personaggio-ursula-brunner", categoria: "personaggio", titolo: "Dr.ssa Ursula Brunner — direttrice della Biobanca N.1",
    testo: "Genetista basilese a capo dell'archivio genetico di Eden. Convinta che conservare tutto sia l'unico modo per proteggere anni di lavoro, ha smesso di interrogarsi sul fine ultimo. Tratta ogni campione come una promessa fatta al futuro; è la custode della «Radice»." },
  { id: "personaggio-astrid-lindqvist", categoria: "personaggio", titolo: "Dr.ssa Astrid Lindqvist — direttrice del Centro N.9",
    testo: "Guida a Kiruna il Centro N.9, cervello computazionale di Eden. Crede nella potenza esplicativa dei modelli e teme, più di ogni cosa, il giorno in cui un modello sarà usato per progettare invece che per capire." },
  { id: "personaggio-james-whitaker", categoria: "personaggio", titolo: "Col. James Whitaker — direttore di N.10 e responsabile Sigma",
    testo: "Ufficiale in congedo a capo del Centro N.10 e del Programma Sigma. Convinto che sistemi biologici resilienti salveranno soldati e civili, non si considera un guerrafondaio ma un uomo che preferisce essere pronto. La sua lucidità lo rende più inquietante di un fanatico." },
  { id: "personaggio-arjun-nair", categoria: "personaggio", titolo: "Dr. Arjun Nair — direttore di N.5",
    testo: "Erpetologo del Kerala a capo dell'Allevamento N.5. Difende il programma come ricerca di antidoti che salvano vite in India, e considera la parte «difesa» il male necessario che finanzia il «rimedio». Incarna la zona grigia del dual-use dal lato di chi ci crede." },
  { id: "personaggio-joseph-okello", categoria: "personaggio", titolo: "Dr. Joseph Okello — direttore di N.8",
    testo: "Zoologo ugandese a capo dell'Allevamento e stazione di campo N.8 sul Lago Vittoria. Ha ottenuto un programma di conservazione dei camaleonti sapendo che è anche la vetrina che rende accettabile il resto: ha scelto di usarla. Grigio consapevole, non ingenuo." }
];
