import { BriefcaseBusiness, Code2, Palette } from "lucide-react";

export type ResumeLanguage = "IT" | "EN";

export type ResumeProfile = {
  title: string;
  focus: string;
  language: ResumeLanguage;
  file: string;
  icon: typeof Code2;
  highlights: string[];
};

export const resumes: ResumeProfile[] = [
  {
    title: "Full-Stack Developer",
    focus: "React, TypeScript, backend leggero e progetti completi",
    language: "IT",
    file: "Giada Maria Campolongo — Full-Stack Developer (IT).pdf",
    icon: Code2,
    highlights: ["React e TypeScript", "Progetti end-to-end", "Sviluppo web"],
  },
  {
    title: "Full-Stack Developer",
    focus: "React, TypeScript, lightweight backend and complete web projects",
    language: "EN",
    file: "Giada Maria Campolongo — Full-Stack Developer (EN).pdf",
    icon: Code2,
    highlights: ["React and TypeScript", "End-to-end projects", "Web development"],
  },
  {
    title: "Frontend Developer & Web Designer",
    focus: "UI responsive, interfacce curate e prototipi web",
    language: "IT",
    file: "Giada Maria Campolongo — Frontend Developer & Web Designer (IT).pdf",
    icon: Palette,
    highlights: ["UI responsive", "Web design", "Design system"],
  },
  {
    title: "Frontend Developer & Web Designer",
    focus: "Responsive UI, polished interfaces and web prototypes",
    language: "EN",
    file: "Giada Maria Campolongo — Frontend Developer & Web Designer (EN).pdf",
    icon: Palette,
    highlights: ["Responsive UI", "Web design", "Design systems"],
  },
  {
    title: "Impiegata d'ufficio",
    focus: "Back office, documentazione, Excel e supporto operativo",
    language: "IT",
    file: "Giada Maria Campolongo — Impiegata d'ufficio (IT).pdf",
    icon: BriefcaseBusiness,
    highlights: ["Back office", "Excel e CRM", "Documentazione"],
  },
  {
    title: "Office Administrator",
    focus: "Back office, documentation, Excel and operational support",
    language: "EN",
    file: "Giada Maria Campolongo — Office Administrator (EN).pdf",
    icon: BriefcaseBusiness,
    highlights: ["Back office", "Excel and CRM", "Documentation"],
  },
];

export const getResumeUrl = (file: string) => `/${encodeURIComponent(file)}`;
