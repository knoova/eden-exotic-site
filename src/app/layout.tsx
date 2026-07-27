import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { getLocale } from "@/i18n/getLocale";
import { getUI } from "@/i18n/ui";

export const metadata: Metadata = {
  title: { default: "Eden Exotic — Sito ufficiale", template: "%s — Eden Exotic" },
  description:
    "Eden Exotic — genetica di precisione e sistemi biologici adattivi. Missione, rete globale, organigramma, risultati ed esperimenti.",
  icons: {
    icon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cpath d='M20 2l16 9v18l-16 9L4 29V11z' fill='none' stroke='%231f5138' stroke-width='2'/%3E%3Cpath d='M20 9c5 4 5 10 0 22-5-12-5-18 0-22z' fill='%232f8f5b'/%3E%3C/svg%3E"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = getLocale();
  const dict = getUI(locale);
  return (
    <html lang={locale}>
      <body>
        <Header locale={locale} dict={dict} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
