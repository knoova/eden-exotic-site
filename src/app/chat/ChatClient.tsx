"use client";
import { useRef, useState, useEffect } from "react";
import type { Person, Facility } from "@/lib/canon";

type Msg = { role: "user" | "assistant"; content: string; sources?: { titolo: string; categoria: string }[] };

type ChatUI = {
  scegli: string;
  warn: string;
  emptyActivePre: string;
  emptyActivePost: string;
  scrivendo: string;
  scriviA: string;
  invia: string;
  emptyIdle: string;
  errore: string;
  erroreRete: string;
};

export function ChatClient({
  people,
  facilities,
  ui
}: {
  people: Person[];
  facilities: Facility[];
  ui: ChatUI;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const convId = useRef<string>("c" + Math.random().toString(36).slice(2));

  const active = people.find((p) => p.id === activeId) || null;
  const facName = (id: string | null) => facilities.find((f) => f.id === id)?.nome || "";

  // raggruppa le persone per struttura, nell'ordine delle strutture
  const groups = facilities
    .slice()
    .sort((a, b) => (a.ordine ?? a.numero) - (b.ordine ?? b.numero))
    .map((f) => ({ f, list: people.filter((p) => p.facilityId === f.id) }))
    .filter((g) => g.list.length > 0);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, busy]);

  function selectPerson(id: string) {
    setActiveId(id);
    setMessages([]);
    convId.current = "c" + Math.random().toString(36).slice(2);
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !active || busy) return;
    const userMsg: Msg = { role: "user", content: input.trim() };
    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personId: active.id,
          message: userMsg.content,
          history,
          conversationId: convId.current
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || ui.errore);
      setMessages((m) => [...m, { role: "assistant", content: data.reply, sources: data.sources }]);
    } catch (err: any) {
      setMessages((m) => [...m, { role: "assistant", content: "⚠ " + (err.message || ui.erroreRete) }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="chat-shell">
      <aside className="persona-list">
        <div className="pl-head">{ui.scegli}</div>
        {groups.map((g) => (
          <div key={g.f.id}>
            <div className="pl-head" style={{ position: "static", background: "var(--paper-2)" }}>
              {g.f.id !== "HQ" && g.f.id !== "VILLA" ? `${g.f.id} · ` : ""}
              {g.f.paese}
            </div>
            {g.list.map((p) => (
              <button
                key={p.id}
                className={`persona${activeId === p.id ? " active" : ""}`}
                onClick={() => selectPerson(p.id)}
              >
                <div className="pn">{p.nome}</div>
                <div className="pr">{p.ruolo}</div>
              </button>
            ))}
          </div>
        ))}
      </aside>

      <section className="chat-panel">
        {active ? (
          <>
            <div className="chat-head">
              <div className="person-name">{active.nome}</div>
              <div className="person-role">
                {active.ruolo}
                {facName(active.facilityId) ? ` · ${facName(active.facilityId)}` : ""}
              </div>
            </div>
            <div className="chat-warn">{ui.warn}</div>
            <div className="chat-log" ref={logRef}>
              {messages.length === 0 && (
                <div className="chat-empty">
                  {ui.emptyActivePre} {active.nome.split(" ").slice(-1)[0]} {ui.emptyActivePost}
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`bubble ${m.role === "user" ? "user" : "bot"}`}>
                  {m.content}
                  {m.sources && m.sources.length > 0 && (
                    <span className="src">Fonti: {m.sources.map((s) => s.titolo).slice(0, 3).join(" · ")}</span>
                  )}
                </div>
              ))}
              {busy && <div className="typing">{active.nome.split(" ").slice(-1)[0]} {ui.scrivendo}</div>}
            </div>
            <form className="chat-form" onSubmit={send}>
              <input
                type="text"
                placeholder={`${ui.scriviA} ${active.nome.split(" ").slice(-1)[0]}…`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={busy}
              />
              <button className="btn btn-primary btn-sm" type="submit" disabled={busy || !input.trim()}>
                {ui.invia}
              </button>
            </form>
          </>
        ) : (
          <div className="chat-log">
            <div className="chat-empty">{ui.emptyIdle}</div>
          </div>
        )}
      </section>
    </div>
  );
}
