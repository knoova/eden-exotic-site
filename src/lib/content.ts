// Livello contenuti: legge dal DB quando disponibile, altrimenti dal canon.
// Rende le pagine robuste anche prima del seed / se il DB è irraggiungibile.
import { prisma } from "./db";
import * as C from "./canon";
import { getLocale } from "@/i18n/getLocale";
import * as L from "@/i18n/localize";

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export async function getFacilities(): Promise<C.Facility[]> {
  const base = await safe(async () => {
    const r = await prisma.facility.findMany({ orderBy: [{ ordine: "asc" }, { numero: "asc" }] });
    return r.length ? (r as unknown as C.Facility[]) : C.facilities;
  }, C.facilities);
  return L.locFacilities(base, getLocale());
}

export async function getPeople(): Promise<C.Person[]> {
  const base = await safe(async () => {
    const r = await prisma.person.findMany({ orderBy: { ordine: "asc" } });
    return r.length ? (r as unknown as C.Person[]) : C.people;
  }, C.people);
  return L.locPeople(base, getLocale());
}

export async function getSpecimens(): Promise<C.Specimen[]> {
  const base = await safe(async () => {
    const r = await prisma.specimen.findMany({ orderBy: { ordine: "asc" } });
    return r.length ? (r as unknown as C.Specimen[]) : C.specimens;
  }, C.specimens);
  return L.locSpecimens(base, getLocale());
}

export async function getProtocols(): Promise<C.Protocol[]> {
  const base = await safe(async () => {
    const r = await prisma.protocol.findMany({ orderBy: { codice: "asc" } });
    return r.length ? r : C.protocols;
  }, C.protocols);
  return L.locProtocols(base, getLocale());
}

export async function getGenerations(): Promise<C.Generation[]> {
  const base = await safe(async () => {
    const r = await prisma.generation.findMany({ orderBy: { gen: "asc" } });
    return r.length ? r : C.generations;
  }, C.generations);
  return L.locGenerations(base, getLocale());
}

export async function getDepartments(): Promise<C.Department[]> {
  const base = await safe(async () => {
    const r = await prisma.department.findMany({ orderBy: { ordine: "asc" } });
    return r.length ? r : C.departments;
  }, C.departments);
  return L.locDepartments(base, getLocale());
}

export async function getKpis(): Promise<C.Kpi[]> {
  const base = await safe(async () => {
    const r = await prisma.kpi.findMany({ orderBy: { ordine: "asc" } });
    return r.length ? r : C.kpis;
  }, C.kpis);
  return L.locKpis(base, getLocale());
}

export async function getMilestones(): Promise<C.Milestone[]> {
  const base = await safe(async () => {
    const r = await prisma.milestone.findMany({ orderBy: { ordine: "asc" } });
    return r.length ? r : C.milestones;
  }, C.milestones);
  return L.locMilestones(base, getLocale());
}

export async function getGlossary(): Promise<C.GlossaryTerm[]> {
  const base = await safe(async () => {
    const r = await prisma.glossaryTerm.findMany({ orderBy: { ordine: "asc" } });
    return r.length ? r : C.glossary;
  }, C.glossary);
  return L.locGlossary(base, getLocale());
}

export async function getExperiments(): Promise<C.Experiment[]> {
  const base = await safe(async () => {
    const r = await prisma.experiment.findMany({ orderBy: { ordine: "asc" } });
    return r.length ? (r as unknown as C.Experiment[]) : C.experiments;
  }, C.experiments);
  return L.locExperiments(base, getLocale());
}

export async function getExperiment(id: string): Promise<C.Experiment | null> {
  const base = await safe(async () => {
    const r = await prisma.experiment.findUnique({ where: { id } });
    return (r as unknown as C.Experiment) ?? C.experiments.find((e) => e.id === id) ?? null;
  }, C.experiments.find((e) => e.id === id) ?? null);
  return L.locExperiment(base, getLocale());
}

async function getSetting<T>(key: string, fallback: T): Promise<T> {
  return safe(async () => {
    const r = await prisma.setting.findUnique({ where: { key } });
    return r ? (r.value as T) : fallback;
  }, fallback);
}

export const getCompany = async () => L.locCompany(await getSetting("company", C.company), getLocale());
export const getMission = async () => L.locMission(await getSetting("mission", C.mission), getLocale());
export const getSigma = async () => L.locSigma(await getSetting("programmaSigma", C.programmaSigma), getLocale());
export const getConformita = async () => L.locConformita(await getSetting("conformita", C.conformita), getLocale());

export type CompanyT = typeof C.company;
export type MissionT = typeof C.mission;
