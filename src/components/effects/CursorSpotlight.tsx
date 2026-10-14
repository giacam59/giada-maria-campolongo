import { useEffect, useRef } from 'react';
import { usePreferences } from '../../context/PreferencesContext';

/** One transform update per pointer frame; no React renders or blur filters. */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const { ready, reducedMotion } = usePreferences();
  useEffect(() => {
    const element = ref.current;
    if (!ready || reducedMotion || !element) return;
    const pointer = matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0, x = 0, y = 0, interactive = false;
    function hide() {
      cancelAnimationFrame(frame); frame = 0;
      element!.dataset.visible = 'false';
    }
    function move(event: PointerEvent) {
      if (!pointer.matches || event.pointerType === 'touch') { hide(); return; }
      x = event.clientX; y = event.clientY;
      interactive = event.target instanceof Element && !!event.target.closest('a, button, input, textarea, select, [role="button"]');
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        element!.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        element!.dataset.visible = 'true';
        element!.dataset.interactive = String(interactive);
      });
    }
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) hide(); };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerout', leave, { passive: true });
    document.addEventListener('visibilitychange', hide);
    window.addEventListener('blur', hide);
    pointer.addEventListener('change', hide);
    return () => {
      hide();
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerout', leave);
      document.removeEventListener('visibilitychange', hide);
      window.removeEventListener('blur', hide);
      pointer.removeEventListener('change', hide);
    };
  }, [ready, reducedMotion]);
  return <div ref={ref} className="cursor-spotlight" data-visible="false" aria-hidden="true"><i className="cursor-halo" /><i className="cursor-ring" /></div>;
}
