"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { LangSwitcher } from "./LangSwitcher";
import type { Locale } from "@/i18n/config";

type Dict = Record<string, string>;

export function Header({ locale, dict }: { locale: Locale; dict: Dict }) {
  const path = usePathname();
  const t = (k: string) => dict[k] ?? k;
  const NAV = [
    { href: "/", label: t("nav.home") },
    { href: "/missione", label: t("nav.missione") },
    { href: "/rete", label: t("nav.rete") },
    { href: "/organigramma", label: t("nav.organigramma") },
    { href: "/risultati", label: t("nav.risultati") },
    { href: "/esperimenti", label: t("nav.esperimenti") },
    { href: "/chat", label: t("nav.chat") }
  ];
  const isActive = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));
  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link className="brand" href="/">
          <Logo />
          <span>
            Eden Exotic
            <small>{t("brand.tagline")}</small>
          </span>
        </Link>
        <nav className="nav-links">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={isActive(n.href) ? "active" : ""}>
              {n.label}
            </Link>
          ))}
          <Link className="nav-admin" href="/admin">
            {t("nav.admin")}
          </Link>
          <LangSwitcher locale={locale} />
        </nav>
      </div>
    </header>
  );
}
