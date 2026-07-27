import Link from "next/link";
import { Logo } from "./Logo";
import { getCompany, getFacilities } from "@/lib/content";

const NAV = [
  ["/missione", "Missione"],
  ["/rete", "Rete globale"],
  ["/organigramma", "Organigramma"],
  ["/risultati", "Risultati"],
  ["/esperimenti", "Esperimenti"],
  ["/chat", "Parla coi personaggi"]
];

export async function Footer() {
  const [company, facilities] = await Promise.all([getCompany(), getFacilities()]);
  const rete = facilities.filter((f) => f.numero > 0).slice(0, 8);
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand" style={{ color: "var(--bone)" }}>
              <Logo stroke="#c7a862" />
              <span>{company.nome}</span>
            </div>
            <p>{company.descrizione}</p>
          </div>
          <div>
            <h4>Sito</h4>
            {NAV.map(([h, l]) => (
              <Link key={h} href={h}>
                {l}
              </Link>
            ))}
            <Link href="/admin">Area Admin</Link>
          </div>
          <div>
            <h4>La rete</h4>
            {rete.map((f) => (
              <Link key={f.id} href="/rete">
                {f.id} · {f.paese}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {company.ragioneSociale} — Tutti i diritti riservati.
          </span>
          <span className="footer-note">Universo 47B · sito in-world · Next.js + Ollama</span>
        </div>
      </div>
    </footer>
  );
}
