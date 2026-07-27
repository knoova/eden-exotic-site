"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Logo } from "../components/Logo";
import { PANELS, type Panel, type Field, type Refs, type Opt } from "./schema";

/* ---------- helpers ------------------------------------------------------- */
function resolveOptions(f: Field, refs: Refs): Opt[] {
  return typeof f.options === "function" ? f.options(refs) : f.options || [];
}
function initForm(fields: Field[], item: any): Record<string, any> {
  const o: Record<string, any> = {};
  for (const f of fields) {
    const v = item?.[f.name];
    if (f.type === "lines") o[f.name] = Array.isArray(v) ? v.join("\n") : "";
    else if (f.type === "json") o[f.name] = JSON.stringify(v ?? [], null, 2);
    else if (f.type === "bool") o[f.name] = !!v;
    else if (f.type === "bool3") o[f.name] = v === true ? "true" : v === false ? "false" : "null";
    else o[f.name] = v == null ? "" : v;
  }
  return o;
}
function buildPayload(fields: Field[], form: Record<string, any>): any {
  const o: Record<string, any> = {};
  for (const f of fields) {
    const v = form[f.name];
    if (f.type === "lines") o[f.name] = String(v || "").split("\n").map((s) => s.trim()).filter(Boolean);
    else if (f.type === "json") o[f.name] = JSON.parse(v || "[]");
    else o[f.name] = v;
  }
  return o;
}

/* ---------- Field control ------------------------------------------------- */
function FieldCtl({ f, refs, value, onChange }: { f: Field; refs: Refs; value: any; onChange: (v: any) => void }) {
  const id = "f_" + f.name;
  const label = (
    <label htmlFor={id}>
      {f.label}
      {f.help ? <span className="help"> · {f.help}</span> : null}
    </label>
  );
  let ctl: React.ReactNode;
  if (f.type === "textarea" || f.type === "lines" || f.type === "json")
    ctl = <textarea id={id} rows={f.rows || 3} value={value} onChange={(e) => onChange(e.target.value)} />;
  else if (f.type === "number")
    ctl = <input id={id} type="number" step="any" value={value} onChange={(e) => onChange(e.target.value)} />;
  else if (f.type === "bool")
    ctl = (
      <label style={{ display: "flex", gap: ".5rem", alignItems: "center", fontWeight: 400 }}>
        <input type="checkbox" style={{ width: "auto" }} checked={!!value} onChange={(e) => onChange(e.target.checked)} /> sì
      </label>
    );
  else if (f.type === "select" || f.type === "bool3") {
    const opts = f.type === "bool3"
      ? [{ value: "true", label: "Cosciente" }, { value: "false", label: "Rettiliano" }, { value: "null", label: "Ignoto / in emersione" }]
      : resolveOptions(f, refs);
    ctl = (
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {opts.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    );
  } else ctl = <input id={id} type="text" value={value} onChange={(e) => onChange(e.target.value)} />;

  return (
    <div className={"field" + (f.full ? " full" : "")}>
      {label}
      {ctl}
    </div>
  );
}

/* ---------- main ---------------------------------------------------------- */
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [current, setCurrent] = useState("company");
  const [refs, setRefs] = useState<Refs>({ facilities: [], departments: [], protocols: [], people: [] });
  const [toast, setToast] = useState<{ msg: string; err?: boolean } | null>(null);

  const showToast = useCallback((msg: string, err = false) => {
    setToast({ msg, err });
    setTimeout(() => setToast(null), 2400);
  }, []);

  const loadRefs = useCallback(async () => {
    const [facilities, departments, protocols, people] = await Promise.all(
      ["facilities", "departments", "protocols", "people"].map((m) => fetch(`/api/admin/${m}`).then((r) => r.json()).catch(() => []))
    );
    setRefs({ facilities, departments, protocols, people });
  }, []);

  useEffect(() => {
    fetch("/api/admin/session").then((r) => r.json()).then((d) => setAuthed(!!d.authed));
  }, []);
  useEffect(() => {
    if (authed) loadRefs();
  }, [authed, loadRefs]);

  if (authed === null) return <div className="login-wrap"><p className="muted">Caricamento…</p></div>;
  if (!authed) return <Login onOk={() => setAuthed(true)} />;

  const panel = PANELS.find((p) => p.key === current)!;
  const groups: Record<string, Panel[]> = {};
  for (const p of PANELS) (groups[p.group] ||= []).push(p);

  return (
    <>
      <div className="admin-top">
        <Link className="brand" href="/">
          <Logo stroke="#c7a862" />
          <span>Eden Exotic<small>Gestione contenuti</small></span>
        </Link>
        <div style={{ display: "flex", gap: ".7rem", alignItems: "center" }}>
          <span className="admin-badge">Sessione attiva</span>
          <Link className="btn btn-ghost btn-sm" href="/">Vedi sito ↗</Link>
          <button className="btn btn-ghost btn-sm" onClick={async () => { await fetch("/api/admin/logout", { method: "POST" }); setAuthed(false); }}>Esci</button>
        </div>
      </div>

      <div className="admin-layout">
        <aside className="admin-side">
          {Object.entries(groups).map(([g, ps]) => (
            <div key={g}>
              <div className="side-group">{g}</div>
              {ps.map((p) => (
                <button key={p.key} className={"side-link" + (p.key === current ? " active" : "")} onClick={() => setCurrent(p.key)}>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          ))}
        </aside>

        <main className="admin-main">
          {panel.kind === "object" && <ObjectPanel panel={panel} refs={refs} onSaved={showToast} />}
          {panel.kind === "list" && <ListPanel panel={panel} refs={refs} onSaved={(m, e) => { showToast(m, e); loadRefs(); }} />}
          {panel.kind === "system" && <SystemPanel onMsg={showToast} onReseed={loadRefs} />}
        </main>
      </div>

      {toast && <div className={"toast show" + (toast.err ? " err" : "")}>{toast.msg}</div>}
    </>
  );
}

/* ---------- login --------------------------------------------------------- */
function Login({ onOk }: { onOk: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
    if (res.ok) onOk();
    else setErr("Passphrase non corretta.");
  }
  return (
    <div className="login-wrap">
      <div className="login-card">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}><Logo size={48} /></div>
        <h1>Area riservata</h1>
        <p>Eden Exotic · gestione contenuti del sito ufficiale.</p>
        <form onSubmit={submit}>
          <input type="password" placeholder="Passphrase" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus />
          <div className="login-err">{err}</div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} type="submit">Entra</button>
        </form>
        <p className="muted" style={{ marginTop: "1.2rem", fontSize: ".8rem" }}>
          Cancello lato-server. <Link href="/" style={{ color: "var(--forest-2)" }}>← Torna al sito</Link>
        </p>
      </div>
    </div>
  );
}

/* ---------- object panel (singleton via settings) ------------------------- */
function ObjectPanel({ panel, refs, onSaved }: { panel: Panel; refs: Refs; onSaved: (m: string, e?: boolean) => void }) {
  const [form, setForm] = useState<Record<string, any> | null>(null);
  const load = useCallback(() => {
    fetch(`/api/admin/settings/${panel.settingKey}`).then((r) => r.json()).then((v) => setForm(initForm(panel.fields!, v || {})));
  }, [panel]);
  useEffect(() => { setForm(null); load(); }, [load]);

  if (!form) return <p className="muted">Caricamento…</p>;
  async function save(e: React.FormEvent) {
    e.preventDefault();
    let payload;
    try { payload = buildPayload(panel.fields!, form!); } catch { return onSaved("JSON non valido in un campo.", true); }
    const res = await fetch(`/api/admin/settings/${panel.settingKey}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    onSaved(res.ok ? "Salvato." : "Errore nel salvataggio.", !res.ok);
  }
  return (
    <>
      <div className="panel-head"><div><h2>{panel.label}</h2><p>Modifica i campi e premi Salva. Aggiorna il sito immediatamente.</p></div></div>
      <form className="card-form" onSubmit={save}>
        <div className="form-grid">
          {panel.fields!.map((f) => (
            <FieldCtl key={f.name} f={f} refs={refs} value={form[f.name]} onChange={(v) => setForm({ ...form, [f.name]: v })} />
          ))}
        </div>
        <div className="form-actions">
          <button className="btn btn-primary btn-sm" type="submit">Salva</button>
          <button className="btn btn-line btn-sm" type="button" onClick={load}>Annulla modifiche</button>
        </div>
      </form>
    </>
  );
}

/* ---------- list panel (CRUD via generic API) ----------------------------- */
function ListPanel({ panel, refs, onSaved }: { panel: Panel; refs: Refs; onSaved: (m: string, e?: boolean) => void }) {
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<{ item: any; isNew: boolean } | null>(null);

  const load = useCallback(() => {
    fetch(`/api/admin/${panel.model}`).then((r) => r.json()).then((d) => setRows(Array.isArray(d) ? d : []));
  }, [panel]);
  useEffect(() => { load(); }, [load]);

  async function del(item: any) {
    if (!confirm(`Eliminare «${panel.title!(item)}»?`)) return;
    const id = item.id ?? item.codice ?? item.gen;
    const res = await fetch(`/api/admin/${panel.model}/${encodeURIComponent(id)}`, { method: "DELETE" });
    onSaved(res.ok ? "Voce eliminata." : "Errore.", !res.ok);
    load();
  }

  return (
    <>
      <div className="panel-head">
        <div><h2>{panel.label}</h2><p>{rows.length} voci.</p></div>
        <button className="btn btn-primary btn-sm" onClick={() => setEditing({ item: {}, isNew: true })}>+ Nuova voce</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Voce</th>
            {panel.cols!.map((c) => <th key={c.k}>{c.h}</th>)}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((it) => (
            <tr key={it.id ?? it.codice ?? it.gen ?? Math.random()}>
              <td className="t-title">{panel.title!(it)}</td>
              {panel.cols!.map((c) => <td key={c.k}>{fmt(it[c.k])}</td>)}
              <td>
                <div className="row-actions">
                  <button className="icon-btn" onClick={() => setEditing({ item: it, isNew: false })}>Modifica</button>
                  <button className="icon-btn danger" onClick={() => del(it)}>Elimina</button>
                </div>
              </td>
            </tr>
          ))}
          {rows.length === 0 && <tr><td colSpan={panel.cols!.length + 2} className="muted">Nessuna voce.</td></tr>}
        </tbody>
      </table>

      {editing && (
        <EditModal
          panel={panel}
          refs={refs}
          item={editing.item}
          isNew={editing.isNew}
          onClose={() => setEditing(null)}
          onSaved={(m, e) => { onSaved(m, e); setEditing(null); load(); }}
        />
      )}
    </>
  );
}

function fmt(v: any) {
  if (v === true) return "Cosciente";
  if (v === false) return "Rettiliano";
  if (v == null || v === "" || v === "—") return "—";
  if (Array.isArray(v)) return v.join(", ");
  return String(v);
}

function EditModal({ panel, refs, item, isNew, onClose, onSaved }: { panel: Panel; refs: Refs; item: any; isNew: boolean; onClose: () => void; onSaved: (m: string, e?: boolean) => void }) {
  const [form, setForm] = useState<Record<string, any>>(() => initForm(panel.fields!, item));
  async function save(e: React.FormEvent) {
    e.preventDefault();
    let payload;
    try { payload = buildPayload(panel.fields!, form); } catch { return onSaved("JSON non valido.", true); }
    const id = item.id ?? item.codice ?? item.gen;
    const url = isNew ? `/api/admin/${panel.model}` : `/api/admin/${panel.model}/${encodeURIComponent(id)}`;
    const res = await fetch(url, { method: isNew ? "POST" : "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) onSaved(isNew ? "Voce aggiunta." : "Voce salvata.");
    else { const d = await res.json().catch(() => ({})); onSaved("Errore: " + (d.error || res.status), true); }
  }
  return (
    <div className="modal-back" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-head">
          <h3>{isNew ? "Nuova voce · " : "Modifica · "}{panel.label}</h3>
          <button className="icon-btn" onClick={onClose}>Chiudi ✕</button>
        </div>
        <form className="modal-body" onSubmit={save}>
          <div className="form-grid">
            {panel.fields!.map((f) => (
              <FieldCtl key={f.name} f={f} refs={refs} value={form[f.name]} onChange={(v) => setForm({ ...form, [f.name]: v })} />
            ))}
          </div>
          <div className="form-actions">
            <button className="btn btn-primary btn-sm" type="submit">{isNew ? "Aggiungi" : "Salva"}</button>
            <button className="btn btn-line btn-sm" type="button" onClick={onClose}>Annulla</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- system panel -------------------------------------------------- */
function SystemPanel({ onMsg, onReseed }: { onMsg: (m: string, e?: boolean) => void; onReseed: () => void }) {
  const [status, setStatus] = useState<{ db: boolean; vector: boolean; ai: boolean } | null>(null);
  const [busy, setBusy] = useState("");
  const load = useCallback(() => { fetch("/api/admin/system").then((r) => r.json()).then(setStatus).catch(() => setStatus(null)); }, []);
  useEffect(() => { load(); }, [load]);

  async function act(action: "seed" | "reindex", label: string) {
    setBusy(action);
    try {
      const res = await fetch("/api/admin/system", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action }) });
      const d = await res.json();
      onMsg(res.ok ? d.message : "Errore: " + (d.error || res.status), !res.ok);
      if (res.ok && action === "seed") onReseed();
    } catch (e: any) {
      onMsg("Errore: " + (e?.message || e), true);
    } finally { setBusy(""); load(); }
  }
  const pill = (ok: boolean) => (ok ? <span className="state-pill seed">● Connesso</span> : <span className="state-pill custom">● Non raggiungibile</span>);

  return (
    <>
      <div className="panel-head"><div><h2>Sistema</h2><p>Stato dei servizi, sincronizzazione dal canon e indice dell&apos;AI.</p></div></div>

      <div className="set-block">
        <h3>Stato dei servizi</h3>
        <p>Database relazionale, database vettoriale e AI locale.</p>
        {status ? (
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <div>Database (Postgres) {pill(status.db)}</div>
            <div>Vettoriale (Qdrant) {pill(status.vector)}</div>
            <div>AI (Ollama) {pill(status.ai)}</div>
          </div>
        ) : <p className="muted">Impossibile leggere lo stato.</p>}
      </div>

      <div className="set-block">
        <h3>Sincronizza dal canon</h3>
        <p>Ripopola il database con i contenuti originali del canon (le tue modifiche ai record verranno sovrascritte dove coincidono).</p>
        <button className="btn btn-dark btn-sm" disabled={busy === "seed"} onClick={() => act("seed", "Sincronizza")}>
          {busy === "seed" ? "Sincronizzo…" : "Sincronizza database dal canon"}
        </button>
      </div>

      <div className="set-block">
        <h3>Indice dell&apos;AI (RAG)</h3>
        <p>Ricostruisce gli embedding su Qdrant a partire dalla base di conoscenza. Richiede Ollama attivo con il modello di embedding.</p>
        <button className="btn btn-dark btn-sm" disabled={busy === "reindex"} onClick={() => act("reindex", "Reindicizza")}>
          {busy === "reindex" ? "Indicizzo…" : "Ricostruisci indice RAG"}
        </button>
      </div>
    </>
  );
}
