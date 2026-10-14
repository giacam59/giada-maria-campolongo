import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { usePreferences } from '../../context/PreferencesContext';

/** Native document scrolling keeps sticky headers and reveal observers in sync.
 * Touch retains the browser's compositor-driven momentum, especially on iOS. */
export function SmoothScroll() {
  const { ready, reducedMotion } = usePreferences();
  useEffect(() => {
    if (!ready || reducedMotion) return;
    const scroll = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      wheelMultiplier: 0.75,
      lerp: 0.075,
      syncTouch: false,
      anchors: false,
      prevent: node => node.id === 'detail-dialog' || node.id === 'mobile-nav',
    });
    const sync = () => {
      if (document.hidden || document.body.style.overflow === 'hidden') scroll.stop();
      else scroll.start();
    };
    let anchorFrame = 0;
    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      const hash = link?.getAttribute('href');
      if (!hash || hash === '#' || link?.target || link?.hasAttribute('download')) return;
      let id: string;
      try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      cancelAnimationFrame(anchorFrame);
      // React closes the mobile menu and restores overflow before this frame.
      anchorFrame = requestAnimationFrame(() => {
        sync();
        if (scroll.isStopped) return;
        if (location.hash !== hash) history.pushState(null, '', hash);
        scroll.scrollTo(target, { duration: 1.2, onComplete: () => target.focus({ preventScroll: true }) });
      });
    };
    window.addEventListener('click', navigate);
    // Match the existing reference-counted body lock, including open menus.
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      cancelAnimationFrame(anchorFrame);
      observer.disconnect();
      window.removeEventListener('click', navigate);
      document.removeEventListener('visibilitychange', sync);
      scroll.destroy();
    };
  }, [ready, reducedMotion]);
  return null;
}
