import it from './locales/it';
import en from './locales/en';
import type { Locale } from '../types/content';

export type Dictionary = Omit<typeof it, 'skillTranslate'> & { skillTranslate: Record<string, string> };
export const translations: Record<Locale, Dictionary> = { it, en };
