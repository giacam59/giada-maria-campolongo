import { useEffect, useState } from 'react';
import { usePreferences } from '../../context/PreferencesContext';

/** Decorative intro only: never gates rendering, asset loading or scrolling.
 * CSS dismisses it independently of the React timer; Escape can skip it. */
export function Loader() {
  const [visible, setVisible] = useState(false);
  const { ready, reducedMotion } = usePreferences();
  useEffect(() => {
    if (!ready || reducedMotion) { setVisible(false); return; }
    try {
      if (sessionStorage.getItem('gm-intro-v2')) { setVisible(false); return; }
      sessionStorage.setItem('gm-intro-v2', 'seen');
    } catch { /* Storage is optional; dismissal never depends on it. */ }
    setVisible(true);
    const dismiss = () => setVisible(false);
    const keyboard = (event: KeyboardEvent) => { if (event.key === 'Escape') dismiss(); };
    const timer = setTimeout(dismiss, 1400);
    window.addEventListener('pageshow', dismiss);
    document.addEventListener('visibilitychange', dismiss);
    document.addEventListener('keydown', keyboard);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('pageshow', dismiss);
      document.removeEventListener('visibilitychange', dismiss);
      document.removeEventListener('keydown', keyboard);
    };
  }, [ready, reducedMotion]);
  if (!visible) return null;
  return <div id="intro-overlay" aria-hidden="true" onAnimationEnd={event => { if (event.target === event.currentTarget) setVisible(false); }}>
    <div className="intro-mark" aria-hidden="true">GM<span>.</span></div>
    <div className="intro-line" aria-hidden="true" />
  </div>;
}
