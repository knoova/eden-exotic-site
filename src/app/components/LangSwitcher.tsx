"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LOCALES, LOCALE_COOKIE, type Locale } from "@/i18n/config";

export function LangSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  function set(l: string) {
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
    start(() => router.refresh());
  }
  return (
    <select
      className="lang-switch"
      value={locale}
      onChange={(e) => set(e.target.value)}
      aria-label="Lingua / Language"
      disabled={pending}
    >
      {LOCALES.map((l) => (
        <option key={l.code} value={l.code}>
          {l.code.toUpperCase()} · {l.label}
        </option>
      ))}
    </select>
  );
}
