import type { Locale } from '../types/content';

export interface Preferences {
  lang: Locale;
  theme: 'light' | 'dark';
  motion: 'full' | 'reduce';
}

export const defaultPreferences: Preferences = { lang: 'it', theme: 'light', motion: 'full' };

export function readPreferences(): Preferences {
  try {
    return {
      lang: localStorage.getItem('gm-lang') === 'en' ? 'en' : 'it',
      theme: localStorage.getItem('gm-theme') === 'dark' ? 'dark' : 'light',
      motion: localStorage.getItem('gm-motion') === 'reduce' ? 'reduce' : 'full',
    };
  } catch {
    return defaultPreferences;
  }
}

export function savePreference<K extends keyof Preferences>(key: K, value: Preferences[K]) {
  try { localStorage.setItem(`gm-${key}`, value); } catch { /* Preferences also work in memory. */ }
}

export function clearPreferences() {
  try {
    for (const key of Object.keys(defaultPreferences)) localStorage.removeItem(`gm-${key}`);
  } catch { /* Storage may be unavailable in a private browser session. */ }
}
