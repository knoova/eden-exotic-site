// =============================================================================
// Eden Exotic — Persone delle strutture di nuova generazione e dei siti di
// supporto (allevamenti in costruzione, centri di ricerca, logistica, affari
// regolatori, bioproduzione, archivio e stazioni di campo).
// Estende ./canon (people) con i team delle facility N12, N13, N15, N16, LOG,
// REGAMER, REGAPAC, BIOPROD, ARCH e FIELD.
// =============================================================================

import type { Person } from "./canon";

export const extraPeople: Person[] = [
  // --- N.12 · Namibia (deserto del Namib) — allevamento gechi e rettili del deserto ---
  {
    id: "lena-amupolo", nome: "Dr.ssa Lena Amupolo",
    ruolo: "Direttrice dell'Allevamento · N.12",
    dip: "allevamento", branch: "new", stato: "designato",
    reportsTo: "stern", facilityId: "N12", ordine: 300,
    bio: "Guida la progettazione e l'avvio dell'Allevamento N.12 nel deserto del Namib, dedicato a gechi e rettili aridofili. Coordina la definizione dei protocolli di stabulazione, la pianificazione del cantiere e la messa a regime delle prime linee. Ha maturato esperienza nella gestione di strutture di allevamento in ambienti aridi.",
    competenze: ["Gestione allevamenti in clima arido", "Protocolli di stabulazione rettili", "Pianificazione di struttura", "Coordinamento di cantiere", "Benessere animale documentato"],
    voce: "Parla in modo asciutto e organizzato, per obiettivi e scadenze.",
    background: "Zoologa con lunga esperienza in strutture di allevamento dell'Africa australe."
  },
  {
    id: "jonas-tjivikua", nome: "Dr. Jonas Tjivikua",
    ruolo: "Genetista dell'adattamento agli ambienti aridi · N.12",
    dip: "genetica", branch: "new", stato: "designato",
    reportsTo: "lena-amupolo", facilityId: "N12", ordine: 301,
    bio: "Responsabile del programma genetico per l'adattamento agli ambienti aridi e salini presso N.12. Progetta e valida gli edit legati alla ritenzione idrica e alla tolleranza allo stress termico. Presidia il controllo qualità dei replicati e la documentazione delle linee.",
    competenze: ["Genomica dell'adattamento arido", "Editing genetico di precisione", "Analisi di espressione genica", "Controllo qualità dei replicati", "Documentazione delle linee"],
    voce: "Espone i dati con cautela metodologica, distinguendo l'ipotesi dal risultato.",
    background: "Genetista formato tra Namibia e Sudafrica, specializzato in fisiologia degli stress ambientali."
  },
  {
    id: "selma-nghikembua", nome: "Dr.ssa Selma Nghikembua",
    ruolo: "Fisiologa dell'osmoregolazione · N.12",
    dip: "genetica", branch: "new", stato: "designato",
    reportsTo: "lena-amupolo", facilityId: "N12", ordine: 302,
    bio: "Studia i meccanismi di osmoregolazione e di bilancio idrico dei rettili del deserto in vista dell'avvio di N.12. Definisce i protocolli di misura per ghiandole del sale e ritenzione idrica e ne cura la standardizzazione. Coordina il raccordo tra dati fisiologici e programma genetico.",
    competenze: ["Fisiologia dell'osmoregolazione", "Bilancio idrico ed elettrolitico", "Protocolli di misura standardizzati", "Fisiologia comparata dei rettili", "Analisi dei dati sperimentali"],
    voce: "Precisa e metodica, si affida alle misure prima che alle interpretazioni.",
    background: "Fisiologa comparata con dottorato sugli adattamenti idrici dei vertebrati aridofili."
  },
  {
    id: "petrus-haufiku", nome: "Petrus Haufiku",
    ruolo: "Tecnico di allevamento e di cantiere · N.12",
    dip: "allevamento", branch: "new", stato: "designato",
    reportsTo: "lena-amupolo", facilityId: "N12", ordine: 303,
    bio: "Supporta l'allestimento dei terrari e degli impianti di N.12 durante la fase di costruzione. Cura la manutenzione delle strutture e la preparazione dei moduli di stabulazione secondo protocollo. Fa da raccordo tra le esigenze operative dell'allevamento e le maestranze di cantiere.",
    competenze: ["Allestimento di terrari", "Manutenzione degli impianti", "Controllo dei parametri ambientali", "Logistica di cantiere", "Registrazione delle attività"],
    voce: "Concreto e diretto, riferisce lo stato dei lavori senza giri di parole.",
    background: "Tecnico di allevamento con esperienza di manutenzione impiantistica in strutture desertiche."
  },

  // --- N.13 · Cile (Atacama) — centro di ricerca su ambienti estremi, UV, alta quota ---
  {
    id: "rodrigo-fuentes", nome: "Dr. Rodrigo Fuentes",
    ruolo: "Direttore del Centro · N.13",
    dip: "dati", branch: "new", stato: "designato",
    reportsTo: "stern", facilityId: "N13", ordine: 304,
    bio: "Dirige la pianificazione del Centro di ricerca N.13 nell'Atacama, dedicato agli ambienti estremi, alla radiazione UV e all'alta quota. Definisce le linee di ricerca, l'infrastruttura dati e i rapporti con le istituzioni scientifiche locali. Ha esperienza nel coordinamento di programmi di ricerca in ambienti ostili.",
    competenze: ["Direzione di programmi di ricerca", "Ambienti estremi e alta quota", "Progettazione di infrastrutture dati", "Coordinamento scientifico", "Relazioni istituzionali"],
    voce: "Ordinato e strategico, ragiona per priorità di ricerca e vincoli di risorse.",
    background: "Ricercatore in ecologia degli ambienti estremi con esperienza in gestione di centri di ricerca."
  },
  {
    id: "camila-rojas", nome: "Dr.ssa Camila Rojas",
    ruolo: "Ricercatrice su radiazione UV ed estremofili · N.13",
    dip: "genetica", branch: "new", stato: "designato",
    reportsTo: "rodrigo-fuentes", facilityId: "N13", ordine: 305,
    bio: "Studia i meccanismi di resistenza alla radiazione UV e i tratti degli organismi estremofili in vista dell'avvio di N.13. Progetta i protocolli sperimentali su fotoprotezione e riparazione del DNA e ne cura la validazione. Coordina il raccordo con i programmi genetici della rete.",
    competenze: ["Radiobiologia e fotoprotezione", "Riparazione del DNA", "Microbiologia degli estremofili", "Disegno sperimentale", "Validazione dei protocolli"],
    voce: "Rigorosa e cauta, tiene separati risultati preliminari e conclusioni.",
    background: "Biologa molecolare specializzata negli adattamenti alla radiazione ultravioletta."
  },
  {
    id: "matias-herrera", nome: "Ing. Matías Herrera",
    ruolo: "Responsabile dati e modellazione di campo · N.13",
    dip: "dati", branch: "new", stato: "designato",
    reportsTo: "rodrigo-fuentes", facilityId: "N13", ordine: 306,
    bio: "Responsabile dell'infrastruttura dati e della modellazione di campo per N.13. Progetta le pipeline di raccolta e analisi dei parametri ambientali e sviluppa i modelli previsionali. Cura l'integrità e la tracciabilità dei dataset di ricerca.",
    competenze: ["Modellazione statistica", "Pipeline di dati", "Sensoristica di campo", "Analisi geospaziale", "Gestione della qualità dei dati"],
    voce: "Quantitativo e sintetico, comunica con grafici e intervalli di confidenza.",
    background: "Ingegnere dei dati con esperienza in monitoraggio ambientale e modellistica di campo."
  },

  // --- N.15 · Giappone (Okinawa) — sito costiero storico su rettili marini, in dismissione ---
  {
    id: "haruki-nakamura", nome: "Dr. Haruki Nakamura",
    ruolo: "Responsabile della chiusura e del trasferimento · N.15",
    dip: "allevamento", branch: "new", stato: "attivo",
    reportsTo: "stern", facilityId: "N15", ordine: 307,
    bio: "Coordina la chiusura del sito costiero storico N.15 di Okinawa e il consolidamento delle attività verso N.7. Pianifica il trasferimento degli esemplari e la messa in sicurezza delle strutture nel rispetto dei protocolli. Cura la continuità documentale e la tracciabilità CITES lungo tutto il processo.",
    competenze: ["Gestione della dismissione di siti", "Pianificazione dei trasferimenti", "Protocolli di stabulazione marina", "Tracciabilità CITES", "Coordinamento operativo"],
    voce: "Metodico e prudente, procede per liste di controllo e verifiche successive.",
    background: "Responsabile di allevamento con esperienza in strutture costiere per rettili marini."
  },
  {
    id: "yuki-tanaka", nome: "Dr.ssa Yuki Tanaka",
    ruolo: "Veterinaria dei rettili marini · N.15",
    dip: "allevamento", branch: "new", stato: "attivo",
    reportsTo: "haruki-nakamura", facilityId: "N15", ordine: 308,
    bio: "Veterinaria di N.15, responsabile della salute dei rettili marini durante la fase di consolidamento. Definisce i piani sanitari per il trasferimento e ne verifica l'idoneità clinica secondo protocollo. Documenta i controlli veterinari e i parametri di benessere.",
    competenze: ["Medicina dei rettili marini", "Idoneità clinica al trasporto", "Piani sanitari", "Anestesia e contenimento", "Documentazione veterinaria"],
    voce: "Attenta e misurata, motiva ogni decisione clinica con i dati dell'esame.",
    background: "Veterinaria specializzata in fauna marina e in medicina degli animali da acquario."
  },
  {
    id: "kenji-shimabukuro", nome: "Kenji Shimabukuro",
    ruolo: "Tecnico di stabulario marino · N.15",
    dip: "allevamento", branch: "new", stato: "attivo",
    reportsTo: "haruki-nakamura", facilityId: "N15", ordine: 309,
    bio: "Tecnico dello stabulario marino di N.15, cura la gestione delle vasche e il controllo dei parametri dell'acqua. Segue la preparazione degli esemplari alle operazioni di trasferimento secondo procedura. Registra quotidianamente i dati ambientali e di manutenzione.",
    competenze: ["Gestione di stabulari marini", "Controllo dei parametri dell'acqua", "Manutenzione degli impianti", "Preparazione ai trasferimenti", "Registrazione dei dati"],
    voce: "Pratico e affidabile, riferisce con precisione lo stato delle vasche.",
    background: "Tecnico acquaristico con esperienza pluriennale in impianti costieri."
  },

  // --- N.16 · Ubicazione riservata — Programma Sigma (validazione e prove operative) ---
  {
    id: "andrea-ferrari", nome: "Dr. Andrea Ferrari",
    ruolo: "Direttore del Centro · N.16",
    dip: "sigma", branch: "varani", stato: "attivo",
    reportsTo: "stern", facilityId: "N16", ordine: 310,
    bio: "Dirige il Centro N.16 nell'ambito del Programma Sigma, dedicato alla validazione e alle prove operative. Coordina le attività nel rispetto degli standard di riservatezza e delle procedure di supervisione dedicata. Riferisce direttamente alla Direzione Centrale.",
    competenze: ["Direzione di programmi riservati", "Validazione operativa", "Gestione della riservatezza", "Coordinamento interfunzionale", "Supervisione di processo"],
    voce: "Sobrio ed essenziale, dice il necessario e nulla di più.",
    background: "Dirigente con esperienza nella gestione di programmi a supervisione dedicata."
  },
  {
    id: "chiara-sartori", nome: "Dr.ssa Chiara Sartori",
    ruolo: "Responsabile validazione e sicurezza · N.16",
    dip: "conformita", branch: "varani", stato: "attivo",
    reportsTo: "andrea-ferrari", facilityId: "N16", ordine: 311,
    bio: "Responsabile della validazione e della sicurezza presso N.16. Definisce i criteri di conformità e i controlli previsti dalle procedure del Programma Sigma. Cura l'integrità dei registri e il rispetto degli accessi controllati.",
    competenze: ["Validazione e conformità", "Gestione della sicurezza", "Controllo degli accessi", "Integrità dei registri", "Analisi del rischio"],
    voce: "Rigorosa e procedurale, non concede eccezioni non documentate.",
    background: "Specialista di sicurezza e conformità con esperienza in ambienti ad accesso limitato."
  },

  // --- LOG · Paesi Bassi (Rotterdam) — logistica e quarantena CITES ---
  {
    id: "joost-van-dijk", nome: "Dr. Joost van Dijk",
    ruolo: "Responsabile logistica e catena di custodia · LOG",
    dip: "conformita", branch: "core", stato: "attivo",
    reportsTo: "stern", facilityId: "LOG", ordine: 312,
    bio: "Dirige l'hub logistico di Rotterdam, responsabile della catena di custodia e del coordinamento dei trasferimenti nella rete. Presidia la conformità documentale e il rispetto degli standard CITES lungo l'intera filiera. Coordina l'interfaccia tra dogane, vettori e strutture di destinazione.",
    competenze: ["Logistica internazionale", "Catena di custodia", "Conformità CITES", "Gestione dei trasferimenti", "Rapporti doganali"],
    voce: "Preciso e organizzato, ragiona per flussi e punti di controllo.",
    background: "Responsabile di logistica con esperienza nella movimentazione regolamentata di fauna."
  },
  {
    id: "marieke-de-vries", nome: "Dr.ssa Marieke de Vries",
    ruolo: "Veterinaria di quarantena · LOG",
    dip: "allevamento", branch: "core", stato: "attivo",
    reportsTo: "joost-van-dijk", facilityId: "LOG", ordine: 313,
    bio: "Veterinaria di quarantena presso l'hub di Rotterdam, responsabile dei controlli sanitari in ingresso e in uscita. Definisce i protocolli di isolamento e verifica l'idoneità degli esemplari ai trasferimenti. Documenta gli esiti clinici a supporto della tracciabilità.",
    competenze: ["Medicina della quarantena", "Protocolli di isolamento", "Biosicurezza sanitaria", "Idoneità al trasporto", "Documentazione veterinaria"],
    voce: "Attenta e prudente, subordina il via libera alla verifica clinica.",
    background: "Veterinaria specializzata in quarantena e biosicurezza degli animali esotici."
  },
  {
    id: "bram-hendriks", nome: "Bram Hendriks",
    ruolo: "Tecnico documentazione CITES · LOG",
    dip: "conformita", branch: "core", stato: "attivo",
    reportsTo: "joost-van-dijk", facilityId: "LOG", ordine: 314,
    bio: "Tecnico della documentazione CITES presso l'hub di Rotterdam, gestisce permessi, certificati e registri di trasferimento. Verifica la completezza e la coerenza della documentazione a corredo di ogni movimentazione. Mantiene aggiornato l'archivio di tracciabilità.",
    competenze: ["Documentazione CITES", "Gestione dei permessi", "Archiviazione e registri", "Controllo di coerenza documentale", "Procedure amministrative"],
    voce: "Meticoloso e ordinato, segnala ogni scostamento dalla procedura.",
    background: "Tecnico amministrativo esperto di normativa sul commercio di specie protette."
  },

  // --- REGAMER · USA (Boston) — affari regolatori e alleanze (Americhe) ---
  {
    id: "sarah-whitman", nome: "Dr.ssa Sarah Whitman",
    ruolo: "Direttrice affari regolatori · REGAMER",
    dip: "conformita", branch: "core", stato: "attivo",
    reportsTo: "stern", facilityId: "REGAMER", ordine: 315,
    bio: "Dirige gli affari regolatori per le Americhe dalla sede di Boston. Coordina i rapporti con le autorità competenti e la strategia di conformità nei mercati regionali. Supervisiona i dossier autorizzativi e il presidio degli standard applicabili.",
    competenze: ["Affari regolatori", "Strategia di conformità", "Dossier autorizzativi", "Rapporti con le autorità", "Normativa biotecnologica"],
    voce: "Chiara e argomentata, struttura le posizioni su base normativa.",
    background: "Esperta di affari regolatori nel settore delle biotecnologie in Nord America."
  },
  {
    id: "david-kaplan", nome: "David Kaplan",
    ruolo: "Responsabile proprietà intellettuale e legale · REGAMER",
    dip: "conformita", branch: "core", stato: "attivo",
    reportsTo: "sarah-whitman", facilityId: "REGAMER", ordine: 316,
    bio: "Responsabile della proprietà intellettuale e degli aspetti legali per le Americhe. Gestisce il portafoglio brevettuale e la contrattualistica con partner e istituzioni. Presidia la tutela degli asset e la conformità legale delle attività.",
    competenze: ["Proprietà intellettuale", "Diritto brevettuale", "Contrattualistica", "Due diligence legale", "Gestione del rischio legale"],
    voce: "Preciso e cauto, pesa le parole in chiave contrattuale.",
    background: "Giurista specializzato in proprietà intellettuale e diritto delle scienze della vita."
  },
  {
    id: "rachel-bennett", nome: "Rachel Bennett",
    ruolo: "Responsabile partnership e relazioni istituzionali · REGAMER",
    dip: "direzione", branch: "core", stato: "attivo",
    reportsTo: "sarah-whitman", facilityId: "REGAMER", ordine: 317,
    bio: "Responsabile delle partnership e delle relazioni istituzionali per le Americhe. Sviluppa alleanze con enti di ricerca, industria e istituzioni pubbliche. Cura il coordinamento degli accordi e la rappresentanza dell'azienda nella regione.",
    competenze: ["Sviluppo di partnership", "Relazioni istituzionali", "Negoziazione di accordi", "Comunicazione strategica", "Gestione degli stakeholder"],
    voce: "Cordiale e orientata al risultato, costruisce consenso attorno agli obiettivi.",
    background: "Professionista delle relazioni istituzionali con esperienza in alleanze scientifiche e industriali."
  },

  // --- REGAPAC · Singapore — coordinamento regionale APAC ---
  {
    id: "wei-lin-tan", nome: "Dr. Wei Lin Tan",
    ruolo: "Direttore regionale APAC · REGAPAC",
    dip: "direzione", branch: "core", stato: "attivo",
    reportsTo: "stern", facilityId: "REGAPAC", ordine: 318,
    bio: "Dirige il coordinamento regionale per l'area Asia-Pacifico dalla sede di Singapore. Sovrintende alle attività della rete nell'area e ai rapporti con partner e istituzioni locali. Allinea le priorità regionali agli indirizzi della Direzione Centrale.",
    competenze: ["Coordinamento regionale", "Gestione di programmi multi-sito", "Relazioni istituzionali", "Pianificazione strategica", "Rapporti con partner APAC"],
    voce: "Equilibrato e diplomatico, media tra esigenze locali e indirizzo centrale.",
    background: "Dirigente con esperienza nel coordinamento di operazioni scientifiche nell'area Asia-Pacifico."
  },
  {
    id: "priya-nair", nome: "Priya Nair",
    ruolo: "Responsabile compliance e rapporti istituzionali · REGAPAC",
    dip: "conformita", branch: "core", stato: "attivo",
    reportsTo: "wei-lin-tan", facilityId: "REGAPAC", ordine: 319,
    bio: "Responsabile della compliance e dei rapporti istituzionali per l'area APAC. Presidia il rispetto delle normative regionali e la gestione delle autorizzazioni. Cura l'interfaccia con le autorità competenti dei diversi Paesi dell'area.",
    competenze: ["Compliance regionale", "Normativa APAC", "Gestione delle autorizzazioni", "Rapporti con le autorità", "Analisi di conformità"],
    voce: "Precisa e formale, riconduce ogni pratica al riferimento normativo.",
    background: "Specialista di compliance con esperienza nella regolamentazione dei mercati asiatici."
  },

  // --- BIOPROD · Irlanda (Cork) — impianto pilota di bioproduzione (scale-up biomateriali/composti) ---
  {
    id: "aoife-byrne", nome: "Dr.ssa Aoife Byrne",
    ruolo: "Direttrice dell'impianto · BIOPROD",
    dip: "genetica", branch: "new", stato: "designato",
    reportsTo: "stern", facilityId: "BIOPROD", ordine: 320,
    bio: "Guida la progettazione e l'avvio dell'impianto pilota di bioproduzione di Cork, dedicato allo scale-up di biomateriali e composti. Coordina la definizione dei processi produttivi e il passaggio dalla scala di laboratorio a quella pilota. Ha esperienza nella conduzione di impianti biotecnologici.",
    competenze: ["Direzione di impianti biotecnologici", "Scale-up di processo", "Bioproduzione", "Pianificazione della produzione", "Gestione dei team tecnici"],
    voce: "Concreta e pianificatrice, ragiona per rese, tempi e vincoli di processo.",
    background: "Biotecnologa con esperienza nella conduzione di impianti pilota di bioproduzione."
  },
  {
    id: "liam-osullivan", nome: "Dr. Liam O'Sullivan",
    ruolo: "Ingegnere di processo e scale-up · BIOPROD",
    dip: "genetica", branch: "new", stato: "designato",
    reportsTo: "aoife-byrne", facilityId: "BIOPROD", ordine: 321,
    bio: "Ingegnere di processo dell'impianto pilota di Cork, responsabile dello scale-up dei bioprocessi. Progetta e ottimizza le fasi di fermentazione e recupero per il passaggio alla scala pilota. Definisce i parametri operativi e ne cura la validazione.",
    competenze: ["Ingegneria di bioprocesso", "Scale-up e trasferimento tecnologico", "Fermentazione", "Ottimizzazione dei processi", "Validazione dei parametri"],
    voce: "Analitico e metodico, ragiona per bilanci di massa e parametri critici.",
    background: "Ingegnere chimico specializzato in bioprocessi e trasferimento tecnologico."
  },
  {
    id: "niamh-doyle", nome: "Dr.ssa Niamh Doyle",
    ruolo: "Chimica dei biomateriali · BIOPROD",
    dip: "genetica", branch: "new", stato: "designato",
    reportsTo: "aoife-byrne", facilityId: "BIOPROD", ordine: 322,
    bio: "Responsabile della caratterizzazione chimica dei biomateriali presso l'impianto pilota di Cork. Definisce i metodi di analisi e i criteri di qualità dei composti prodotti. Coordina il raccordo tra sviluppo di prodotto e processo produttivo.",
    competenze: ["Chimica dei biomateriali", "Caratterizzazione analitica", "Metodi di controllo qualità", "Formulazione", "Analisi strumentale"],
    voce: "Rigorosa e puntuale, non valida un materiale senza dati analitici completi.",
    background: "Chimica dei materiali con esperienza nello sviluppo di biomateriali applicati."
  },
  {
    id: "cian-murphy", nome: "Dr. Cian Murphy",
    ruolo: "Responsabile qualità e conformità · BIOPROD",
    dip: "conformita", branch: "new", stato: "designato",
    reportsTo: "aoife-byrne", facilityId: "BIOPROD", ordine: 323,
    bio: "Responsabile della qualità e della conformità dell'impianto pilota di Cork. Definisce il sistema di gestione qualità e presidia il rispetto delle buone pratiche di produzione. Cura la documentazione dei processi e gli audit interni.",
    competenze: ["Sistemi di gestione qualità", "Buone pratiche di produzione", "Audit interni", "Documentazione di processo", "Gestione delle non conformità"],
    voce: "Rigoroso e sistematico, verifica la conformità prima di ogni rilascio.",
    background: "Specialista di qualità e conformità nel settore della bioproduzione."
  },

  // --- ARCH · Norvegia (Longyearbyen, Svalbard) — archivio ridondante e data recovery della biobanca ---
  {
    id: "erik-sorensen", nome: "Dr. Erik Sørensen",
    ruolo: "Responsabile dell'archivio ridondante · ARCH",
    dip: "dati", branch: "core", stato: "attivo",
    reportsTo: "stern", facilityId: "ARCH", ordine: 324,
    bio: "Dirige l'archivio ridondante delle Svalbard, dedicato alla conservazione di sicurezza e al data recovery della biobanca. Definisce le politiche di ridondanza e i protocolli di ripristino dei dati. Presidia l'integrità e la disponibilità nel lungo periodo degli archivi.",
    competenze: ["Gestione di archivi ridondanti", "Data recovery", "Politiche di conservazione", "Integrità dei dati", "Continuità operativa"],
    voce: "Metodico e previdente, ragiona per scenari di guasto e recupero.",
    background: "Specialista di gestione dati con esperienza in archivi di sicurezza a lungo termine."
  },
  {
    id: "ingrid-halvorsen", nome: "Ingrid Halvorsen",
    ruolo: "Tecnica crioconservazione e infrastruttura dati · ARCH",
    dip: "dati", branch: "core", stato: "attivo",
    reportsTo: "erik-sorensen", facilityId: "ARCH", ordine: 325,
    bio: "Tecnica dell'archivio delle Svalbard, cura la crioconservazione dei campioni e la gestione dell'infrastruttura dati. Monitora i parametri di conservazione e la manutenzione dei sistemi di archiviazione. Registra e verifica le operazioni di backup e ripristino.",
    competenze: ["Crioconservazione", "Infrastruttura di storage", "Backup e ripristino", "Monitoraggio dei parametri", "Manutenzione dei sistemi"],
    voce: "Precisa e affidabile, tiene sotto controllo ogni parametro di conservazione.",
    background: "Tecnica di laboratorio con esperienza in crioconservazione e sistemi di archiviazione dati."
  },

  // --- FIELD · Brasile (Manaus) — stazione di campo in Amazzonia (linee selvatiche) ---
  {
    id: "paulo-ribeiro", nome: "Dr. Paulo Ribeiro",
    ruolo: "Responsabile della stazione di campo · FIELD",
    dip: "allevamento", branch: "new", stato: "attivo",
    reportsTo: "stern", facilityId: "FIELD", ordine: 326,
    bio: "Dirige la stazione di campo di Manaus, dedicata alla raccolta e allo studio di linee selvatiche in Amazzonia. Coordina le campagne di campo, i permessi di raccolta e i rapporti con gli enti locali. Presidia la tracciabilità dei campioni secondo gli standard CITES.",
    competenze: ["Gestione di stazioni di campo", "Campagne di raccolta", "Permessi e tracciabilità", "Ecologia dei rettili", "Rapporti con enti locali"],
    voce: "Pragmatico e attento, adatta i piani alle condizioni del campo.",
    background: "Biologo di campo con lunga esperienza in Amazzonia e nella gestione di stazioni di ricerca."
  },
  {
    id: "beatriz-alves", nome: "Dr.ssa Beatriz Alves",
    ruolo: "Biologa di campo e tecnica · FIELD",
    dip: "allevamento", branch: "new", stato: "attivo",
    reportsTo: "paulo-ribeiro", facilityId: "FIELD", ordine: 327,
    bio: "Biologa di campo della stazione di Manaus, si occupa della raccolta, del monitoraggio e della prima caratterizzazione delle linee selvatiche. Cura la stabulazione temporanea dei campioni e la registrazione dei dati di campo. Supporta la logistica delle campagne e la conservazione dei materiali.",
    competenze: ["Rilievi di campo", "Cattura e stabulazione temporanea", "Raccolta e conservazione dei campioni", "Registrazione dei dati", "Identificazione delle specie"],
    voce: "Attenta e sistematica, annota ogni osservazione con cura sul campo.",
    background: "Biologa con esperienza in rilievi erpetologici e lavoro di campo in ambiente tropicale."
  }
];
