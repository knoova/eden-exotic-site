"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/missione", label: "Missione" },
  { href: "/rete", label: "Rete globale" },
  { href: "/organigramma", label: "Organigramma" },
  { href: "/risultati", label: "Risultati" },
  { href: "/esperimenti", label: "Esperimenti" },
  { href: "/chat", label: "Parla coi personaggi" }
];

export function Header() {
  const path = usePathname();
  const isActive = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));
  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link className="brand" href="/">
          <Logo />
          <span>
            Eden Exotic
            <small>Biotecnologie</small>
          </span>
        </Link>
        <nav className="nav-links">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={isActive(n.href) ? "active" : ""}>
              {n.label}
            </Link>
          ))}
          <Link className="nav-admin" href="/admin">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
