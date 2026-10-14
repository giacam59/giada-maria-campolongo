export type Locale = 'it' | 'en';
export type Localized<T = string> = Record<Locale, T>;
export type MediaKey = 'portfolio' | 'artist' | 'concept' | 'algeco' | 'algecoDetail' | 'algecoRecords' | 'algecoCalendar';

export interface Project {
  id: string;
  number: string;
  kind: string;
  title: Localized;
  category: Localized;
  summary: Localized;
  stack: string[];
  details: Localized<string[]>;
  imageKey: MediaKey;
  url: string;
}

export interface Experience {
  id: string;
  number: string;
  title: Localized;
  company: string;
  place: Localized;
  date: Localized;
  current: boolean;
  description: Localized;
  tags: string[];
}

export interface SkillGroup {
  number: string;
  icon: 'code' | 'layout' | 'terminal' | 'spark';
  title: Localized;
  items: string[];
}

export interface EducationItem {
  date: string;
  title: Localized;
  school: string;
  grade?: string;
}

export interface ScreenshotMedia {
  src: string;
  thumbnail?: string;
  width: number;
  height: number;
  label: Localized;
  alt: Localized;
}

export type DialogContent =
  | { kind: 'image'; key: MediaKey }
  | { kind: 'project'; project: Project }
  | { kind: 'privacy' };
