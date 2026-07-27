// Generazione del PDF "paper" di un esperimento (pdf-lib, senza dipendenze esterne).
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import type { Experiment, Facility } from "./canon";

const A4 = { w: 595.28, h: 841.89 };
const M = 56; // margine
const FOREST = rgb(0.12, 0.24, 0.17);
const BRASS = rgb(0.66, 0.53, 0.25);
const INK = rgb(0.07, 0.13, 0.1);
const MUTED = rgb(0.36, 0.42, 0.38);
const LINE = rgb(0.8, 0.78, 0.72);

export async function experimentPdf(exp: Experiment, facility?: Facility | null): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(`${exp.codice} — ${exp.titolo}`);
  doc.setAuthor((exp.autori || []).join(", ") || "Eden Exotic");
  doc.setSubject("Rapporto di ricerca Eden Exotic (opera di finzione)");

  const font = await doc.embedFont(StandardFonts.TimesRoman);
  const bold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const ital = await doc.embedFont(StandardFonts.TimesRomanItalic);
  const sans = await doc.embedFont(StandardFonts.Helvetica);
  const mono = await doc.embedFont(StandardFonts.Courier);

  let page = doc.addPage([A4.w, A4.h]);
  let y = A4.h - M;
  const maxW = A4.w - M * 2;

  function newPage() {
    page = doc.addPage([A4.w, A4.h]);
    y = A4.h - M;
  }
  function ensure(space: number) {
    if (y - space < M) newPage();
  }
  function wrap(text: string, f: PDFFont, size: number): string[] {
    const out: string[] = [];
    for (const raw of String(text || "").split("\n")) {
      const words = raw.split(/\s+/);
      let line = "";
      for (const w of words) {
        const test = line ? line + " " + w : w;
        if (f.widthOfTextAtSize(test, size) > maxW && line) {
          out.push(line);
          line = w;
        } else line = test;
      }
      out.push(line);
    }
    return out;
  }
  function para(text: string, opts: { f?: PDFFont; size?: number; color?: any; gap?: number; lead?: number } = {}) {
    const f = opts.f || font;
    const size = opts.size || 10.5;
    const lead = opts.lead || size * 1.42;
    for (const line of wrap(text, f, size)) {
      ensure(lead);
      page.drawText(line, { x: M, y: y - size, size, font: f, color: opts.color || INK });
      y -= lead;
    }
    y -= opts.gap ?? 6;
  }
  function heading(text: string) {
    ensure(26);
    y -= 6;
    page.drawText(text.toUpperCase(), { x: M, y: y - 9, size: 9, font: sans, color: BRASS });
    y -= 16;
    page.drawLine({ start: { x: M, y }, end: { x: A4.w - M, y }, thickness: 0.6, color: LINE });
    y -= 10;
  }

  // --- Testata --------------------------------------------------------------
  page.drawText("EDEN EXOTIC", { x: M, y: y - 10, size: 11, font: sans, color: FOREST });
  const right = "Rapporto di ricerca · documento in-world";
  page.drawText(right, { x: A4.w - M - sans.widthOfTextAtSize(right, 8), y: y - 9, size: 8, font: sans, color: MUTED });
  y -= 16;
  page.drawLine({ start: { x: M, y }, end: { x: A4.w - M, y }, thickness: 1, color: FOREST });
  y -= 24;

  // meta
  const meta = `${exp.codice}   ·   Struttura ${exp.facilityId ?? "—"}${facility ? " (" + facility.paese + ")" : ""}   ·   ${exp.anno ?? ""}   ·   ${exp.stato}${exp.protocollo ? "   ·   Protocollo " + exp.protocollo : ""}`;
  page.drawText(meta, { x: M, y: y - 8, size: 8.5, font: mono, color: MUTED });
  y -= 22;

  // titolo
  for (const line of wrap(exp.titolo, bold, 18)) {
    ensure(24);
    page.drawText(line, { x: M, y: y - 18, size: 18, font: bold, color: INK });
    y -= 23;
  }
  y -= 4;

  // autori
  if (exp.autori && exp.autori.length) {
    para(exp.autori.join(",  "), { f: ital, size: 11, color: FOREST, gap: 2 });
    para(facility ? `${facility.nome} — ${facility.citta}, ${facility.paese}` : "Eden Exotic", { f: sans, size: 8.5, color: MUTED, gap: 10 });
  }

  // --- Abstract -------------------------------------------------------------
  heading("Abstract");
  const abs =
    exp.abstract && exp.abstract.trim()
      ? exp.abstract
      : `${exp.obiettivo} ${exp.metodo ? "Metodo: " + exp.metodo + "." : ""} ${exp.risultato ? "Risultati: " + exp.risultato : ""}`;
  para(abs, { size: 10.5, gap: 10 });

  // --- Sezioni --------------------------------------------------------------
  heading("Obiettivo");
  para(exp.obiettivo, { gap: 8 });
  if (exp.metodo) {
    heading("Metodo");
    para(exp.metodo, { gap: 8 });
  }
  if (exp.risultato) {
    heading("Risultati e conclusioni");
    para(exp.risultato, { gap: 8 });
  }

  // --- Bibliografia ---------------------------------------------------------
  heading("Bibliografia");
  const refs = exp.bibliografia || [];
  if (refs.length === 0) {
    para("Bibliografia in fase di verifica.", { f: ital, size: 10, color: MUTED });
  } else {
    refs.forEach((r, i) => {
      const line = `[${i + 1}] ${r.autori} (${r.anno}). ${r.titolo}. ${r.fonte}.${r.url ? " " + r.url : ""}`;
      // indento la seconda riga in poi manualmente wrappando
      const lines = wrap(line, font, 9.5);
      lines.forEach((ln, k) => {
        ensure(13);
        page.drawText(ln, { x: M + (k === 0 ? 0 : 14), y: y - 9.5, size: 9.5, font, color: k === 0 ? INK : MUTED });
        y -= 13;
      });
      y -= 3;
    });
  }

  // --- Footer su tutte le pagine -------------------------------------------
  const foot =
    "Opera di finzione. Autori e risultati sono immaginari; la bibliografia elenca opere reali a solo scopo di contesto scientifico. © Eden Exotic — universo 47B.";
  const pages = doc.getPages();
  pages.forEach((p, idx) => {
    p.drawLine({ start: { x: M, y: M - 14 }, end: { x: A4.w - M, y: M - 14 }, thickness: 0.5, color: LINE });
    for (const ln of splitFoot(foot, sans, 7, A4.w - M * 2)) {
      // una riga sola in genere
      p.drawText(ln, { x: M, y: M - 24, size: 7, font: sans, color: MUTED });
    }
    const num = `${idx + 1} / ${pages.length}`;
    p.drawText(num, { x: A4.w - M - sans.widthOfTextAtSize(num, 7), y: M - 24, size: 7, font: sans, color: MUTED });
  });

  return doc.save();
}

function splitFoot(text: string, f: PDFFont, size: number, maxW: number): string[] {
  const words = text.split(" ");
  const out: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (f.widthOfTextAtSize(test, size) > maxW && line) {
      out.push(line);
      line = w;
    } else line = test;
  }
  if (line) out.push(line);
  return out.slice(0, 1); // una riga
}
