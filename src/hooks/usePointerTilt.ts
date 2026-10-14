import { useEffect, useRef } from 'react';
import { usePreferences } from '../context/PreferencesContext';
import { isScrolling, subscribeToScrollActivity } from '../lib/scrollActivity';

/** Measure once on enter; only write transforms while the pointer moves. */
export function usePointerTilt(maxRotation = 3) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion, ready } = usePreferences();

  useEffect(() => {
    const element = ref.current;
    if (!ready || reducedMotion || !element || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let frame = 0;
    let rect: DOMRect | null = null;
    let x = 0, y = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      rect = null;
      element.style.removeProperty('--rx');
      element.style.removeProperty('--ry');
      element.classList.remove('is-tracking');
    };
    const enter = () => { if (!isScrolling()) rect = element.getBoundingClientRect(); };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || isScrolling()) return;
      if (!rect) rect = element.getBoundingClientRect();
      x = Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5));
      y = Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5));
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        element.classList.add('is-tracking');
        element.style.setProperty('--rx', `${-y * maxRotation * 2}deg`);
        element.style.setProperty('--ry', `${x * maxRotation * 2}deg`);
      });
    };
    const unsubscribe = subscribeToScrollActivity(active => { if (active) reset(); });
    element.addEventListener('pointerenter', enter);
    element.addEventListener('pointermove', move, { passive: true });
    element.addEventListener('pointerleave', reset);
    window.addEventListener('resize', reset, { passive: true });
    return () => {
      reset();
      unsubscribe();
      element.removeEventListener('pointerenter', enter);
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', reset);
      window.removeEventListener('resize', reset);
    };
  }, [maxRotation, reducedMotion, ready]);
  return ref;
}
