export const dynamic = "force-dynamic";
import { getPeople, getFacilities } from "@/lib/content";
import { ChatClient } from "./ChatClient";

export const metadata = { title: "Parla coi personaggi" };

export default async function ChatPage() {
  const [people, facilities] = await Promise.all([getPeople(), getFacilities()]);
  // esclude gli esemplari in memoria dall'elenco degli interlocutori
  const interlocutori = people.filter((p) => p.stato !== "in memoria");

  return (
    <section className="section section--tight">
      <div className="wrap">
        <div className="section-head" style={{ maxWidth: 820 }}>
          <span className="eyebrow">AI locale · Ollama</span>
          <h1>Parla con chi fa Eden Exotic</h1>
          <p className="lead">
            Un&apos;intelligenza in esecuzione locale dà voce alle persone del programma. Le risposte
            attingono ai fatti del canon tramite ricerca semantica (RAG). Scegli un interlocutore e comincia.
          </p>
        </div>
        <ChatClient people={interlocutori} facilities={facilities} />
      </div>
    </section>
  );
}
