// Livello contenuti: legge dal DB quando disponibile, altrimenti dal canon.
// Rende le pagine robuste anche prima del seed / se il DB è irraggiungibile.
import { prisma } from "./db";
import * as C from "./canon";

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export async function getFacilities(): Promise<C.Facility[]> {
  return safe(async () => {
    const r = await prisma.facility.findMany({ orderBy: [{ ordine: "asc" }, { numero: "asc" }] });
    return r.length ? (r as unknown as C.Facility[]) : C.facilities;
  }, C.facilities);
}

export async function getPeople(): Promise<C.Person[]> {
  return safe(async () => {
    const r = await prisma.person.findMany({ orderBy: { ordine: "asc" } });
    return r.length ? (r as unknown as C.Person[]) : C.people;
  }, C.people);
}

export async function getSpecimens(): Promise<C.Specimen[]> {
  return safe(async () => {
    const r = await prisma.specimen.findMany({ orderBy: { ordine: "asc" } });
    return r.length ? (r as unknown as C.Specimen[]) : C.specimens;
  }, C.specimens);
}

export async function getProtocols(): Promise<C.Protocol[]> {
  return safe(async () => {
    const r = await prisma.protocol.findMany({ orderBy: { codice: "asc" } });
    return r.length ? r : C.protocols;
  }, C.protocols);
}

export async function getGenerations(): Promise<C.Generation[]> {
  return safe(async () => {
    const r = await prisma.generation.findMany({ orderBy: { gen: "asc" } });
    return r.length ? r : C.generations;
  }, C.generations);
}

export async function getDepartments(): Promise<C.Department[]> {
  return safe(async () => {
    const r = await prisma.department.findMany({ orderBy: { ordine: "asc" } });
    return r.length ? r : C.departments;
  }, C.departments);
}

export async function getKpis(): Promise<C.Kpi[]> {
  return safe(async () => {
    const r = await prisma.kpi.findMany({ orderBy: { ordine: "asc" } });
    return r.length ? r : C.kpis;
  }, C.kpis);
}

export async function getMilestones(): Promise<C.Milestone[]> {
  return safe(async () => {
    const r = await prisma.milestone.findMany({ orderBy: { ordine: "asc" } });
    return r.length ? r : C.milestones;
  }, C.milestones);
}

export async function getGlossary(): Promise<C.GlossaryTerm[]> {
  return safe(async () => {
    const r = await prisma.glossaryTerm.findMany({ orderBy: { ordine: "asc" } });
    return r.length ? r : C.glossary;
  }, C.glossary);
}

export async function getExperiments(): Promise<C.Experiment[]> {
  return safe(async () => {
    const r = await prisma.experiment.findMany({ orderBy: { ordine: "asc" } });
    return r.length ? (r as unknown as C.Experiment[]) : C.experiments;
  }, C.experiments);
}

export async function getExperiment(id: string): Promise<C.Experiment | null> {
  return safe(async () => {
    const r = await prisma.experiment.findUnique({ where: { id } });
    return (r as unknown as C.Experiment) ?? C.experiments.find((e) => e.id === id) ?? null;
  }, C.experiments.find((e) => e.id === id) ?? null);
}

async function getSetting<T>(key: string, fallback: T): Promise<T> {
  return safe(async () => {
    const r = await prisma.setting.findUnique({ where: { key } });
    return r ? (r.value as T) : fallback;
  }, fallback);
}

export const getCompany = () => getSetting("company", C.company);
export const getMission = () => getSetting("mission", C.mission);
export const getSigma = () => getSetting("programmaSigma", C.programmaSigma);
export const getConformita = () => getSetting("conformita", C.conformita);

export type CompanyT = typeof C.company;
export type MissionT = typeof C.mission;
