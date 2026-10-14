import { useEffect, useRef } from 'react';

export function useTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const items = Array.from(element.querySelectorAll<HTMLElement>('.timeline-item'));
    const seen = new Set<number>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const item = entry.target as HTMLElement;
        item.classList.add('is-active');
        seen.add(items.indexOf(item));
        observer.unobserve(item);
      }
      // A fallback for browsers without CSS scroll timelines; only writes
      // when an item becomes visible. No layout reads in a scroll handler.
      const progress = seen.size ? (Math.max(...seen) + 1) / items.length : 0;
      element.style.setProperty('--timeline-progress', String(progress));
    }, { rootMargin: '0px 0px -18% 0px', threshold: 0.05 });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return ref;
}
