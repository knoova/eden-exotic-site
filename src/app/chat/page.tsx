export const dynamic = "force-dynamic";
import { getPeople, getFacilities } from "@/lib/content";
import { ChatClient } from "./ChatClient";
import { getLocale } from "@/i18n/getLocale";
import { makeT } from "@/i18n/ui";

export const metadata = { title: "Parla coi personaggi" };

export default async function ChatPage() {
  const t = makeT(getLocale());
  const [people, facilities] = await Promise.all([getPeople(), getFacilities()]);
  // esclude gli esemplari in memoria dall'elenco degli interlocutori
  const interlocutori = people.filter((p) => p.stato !== "in memoria");

  const ui = {
    scegli: t("chat.pl.scegli"),
    warn: t("chat.warn"),
    emptyActivePre: t("chat.emptyActivePre"),
    emptyActivePost: t("chat.emptyActivePost"),
    scrivendo: t("chat.scrivendo"),
    scriviA: t("chat.scriviA"),
    invia: t("chat.invia"),
    emptyIdle: t("chat.emptyIdle"),
    errore: t("chat.errore"),
    erroreRete: t("chat.erroreRete")
  };

  return (
    <section className="section section--tight">
      <div className="wrap">
        <div className="section-head" style={{ maxWidth: 820 }}>
          <span className="eyebrow">{t("chat.hero.eyebrow")}</span>
          <h1>{t("chat.hero.title")}</h1>
          <p className="lead">{t("chat.hero.intro")}</p>
        </div>
        <ChatClient people={interlocutori} facilities={facilities} ui={ui} />
      </div>
    </section>
  );
}
