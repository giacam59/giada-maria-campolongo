import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { translations } from '../content/translations';
import { clearPreferences, defaultPreferences, readPreferences, savePreference, type Preferences } from '../lib/preferences';
import { useMediaQuery } from '../hooks/useMediaQuery';
import type { Localized } from '../types/content';

function usePreferencesState() {
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [ready, setReady] = useState(false);
  const systemReduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const reducedMotion = systemReduced || preferences.motion === 'reduce';

  useEffect(() => {
    setPreferences(readPreferences());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.lang = preferences.lang;
    root.dataset.theme = preferences.theme;
    root.dataset.reducedMotion = String(reducedMotion);
    const copy = translations[preferences.lang];
    document.title = `Giada Maria Campolongo — ${copy.eyebrow}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', `Giada Maria Campolongo — ${copy.role}. ${copy.location}.`);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', preferences.theme === 'dark' ? '#0A0A0B' : '#FFFBF7');
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', preferences.lang === 'it' ? 'it_IT' : 'en_GB');
  }, [preferences, ready, reducedMotion]);

  return useMemo(() => ({
    ...preferences,
    ready,
    reducedMotion,
    copy: translations[preferences.lang],
    localize: <T,>(value: Localized<T>): T => value[preferences.lang],
    setPreference: <K extends keyof Preferences,>(key: K, value: Preferences[K]) => {
      savePreference(key, value);
      setPreferences(previous => ({ ...previous, [key]: value }));
    },
    resetPreferences: () => { clearPreferences(); setPreferences(defaultPreferences); },
  }), [preferences, ready, reducedMotion]);
}

type PreferencesContextValue = ReturnType<typeof usePreferencesState>;
const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  return <PreferencesContext.Provider value={usePreferencesState()}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error('usePreferences must be used inside PreferencesProvider');
  return context;
}
