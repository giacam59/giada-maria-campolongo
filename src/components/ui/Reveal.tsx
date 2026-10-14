import { m } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { usePreferences } from '../../context/PreferencesContext';

/** Content is visible in SSR and without the animation chunk. Entrance blur
 *  is local to short text blocks, never the wrapper, screenshots or a section. */
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pending, setPending] = useState(false);
  const { reducedMotion, ready } = usePreferences();
  useEffect(() => {
    const element = ref.current;
    if (!element || !ready || reducedMotion || !('IntersectionObserver' in window)) return;
    if (element.getBoundingClientRect().top < innerHeight) return;
    const animations: Animation[] = [];
    const compact = matchMedia('(max-width: 720px), (pointer: coarse)').matches;
    setPending(true);
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        // Native, one-shot animation: no scroll listener, layout polling or
        // permanent filter/will-change layer. At most three small text areas.
        const targets = element.querySelectorAll<HTMLElement>('h2, h3, .section-intro, .project-copy > p');
        Array.from(targets).slice(0, 3).forEach(target => {
          if (typeof target.animate !== 'function') return;
          const animation = target.animate(
            [{ filter: 'blur(4px)' }, { filter: 'blur(0px)' }],
            { duration: compact ? 460 : 400, delay: delay * 1000, easing: 'ease-out', fill: 'backwards' },
          );
          animation.addEventListener('finish', () => animation.cancel(), { once: true });
          animations.push(animation);
        });
        setPending(false);
        observer.disconnect();
      }
    }, { rootMargin: '0px 0px -24px 0px', threshold: 0.08 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      setPending(false);
    };
  }, [ready, reducedMotion, delay]);
  return <m.div ref={ref} className={`reveal ${className}`} initial={false}
    animate={{ opacity: pending && !reducedMotion ? 0 : 1, y: pending && !reducedMotion ? 20 : 0 }}
    transition={{ duration: reducedMotion ? 0 : 0.5, delay: pending ? 0 : delay, ease: [0.2, 0.65, 0.3, 1] }}>{children}</m.div>;
}
