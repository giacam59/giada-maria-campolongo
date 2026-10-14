import { useEffect, useState } from 'react';

export const navigationSections = ['profilo', 'competenze', 'esperienza', 'case-study', 'progetti', 'contatti'];

export function useActiveSection() {
  const [active, setActive] = useState('profilo');
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id);
      }
    }, { rootMargin: '-15% 0px -70% 0px' });
    navigationSections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}
