import Link from "next/link";
import { Logo } from "./Logo";
import { getCompany, getFacilities } from "@/lib/content";
import { getLocale } from "@/i18n/getLocale";
import { makeT } from "@/i18n/ui";

// Il libro che dà origine all'universo narrativo di Eden Exotic (47B), nei tre
// formati disponibili su Amazon. I link puntano alle schede prodotto per mercato.
const BOOK_LINKS: [string, string][] = [
  ["footer.bookEbook", "https://kdp.amazon.com/amazon-dp-action/it/dualbookshelf.marketplacelink/B0H7TFWRS3"],
  ["footer.bookPaper", "https://kdp.amazon.com/amazon-dp-action/it/dualbookshelf.marketplacelink/B0H7X54YNX"],
  ["footer.bookHard", "https://kdp.amazon.com/amazon-dp-action/it/dualbookshelf.marketplacelink/B0H7TFSMWJ"]
];

export async function Footer() {
  const t = makeT(getLocale());
  const [company, facilities] = await Promise.all([getCompany(), getFacilities()]);
  const rete = facilities.filter((f) => f.numero > 0).slice(0, 8);
  const NAV: [string, string][] = [
    ["/missione", t("nav.missione")],
    ["/rete", t("nav.rete")],
    ["/organigramma", t("nav.organigramma")],
    ["/risultati", t("nav.risultati")],
    ["/esperimenti", t("nav.esperimenti")],
    ["/chat", t("nav.chat")]
  ];
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
            <h4>{t("footer.site")}</h4>
            {NAV.map(([h, l]) => (
              <Link key={h} href={h}>
                {l}
              </Link>
            ))}
            <Link href="/admin">{t("footer.admin")}</Link>
          </div>
          <div>
            <h4>{t("footer.network")}</h4>
            {rete.map((f) => (
              <Link key={f.id} href="/rete">
                {f.id} · {f.paese}
              </Link>
            ))}
          </div>
          <div>
            <h4>{t("footer.book")}</h4>
            <p className="footer-book-title">{t("footer.bookTitle")}</p>
            {BOOK_LINKS.map(([label, href]) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                {t(label)}
              </a>
            ))}
          </div>
        </div>
        <p className="footer-disclaimer">{t("footer.disclaimer")}</p>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {company.ragioneSociale} — {t("footer.rights")}
          </span>
          <span className="footer-note">{t("footer.note")}</span>
        </div>
      </div>
    </footer>
  );
}
