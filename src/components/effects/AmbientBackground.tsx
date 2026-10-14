import { useEffect, useRef } from 'react';
import { usePreferences } from '../../context/PreferencesContext';
import { isScrolling, subscribeToScrollActivity } from '../../lib/scrollActivity';

export function AmbientBackground() {
  const background = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const { reducedMotion, ready, theme } = usePreferences();
  useEffect(() => {
    const sync = () => {
      if (background.current) background.current.dataset.paused = String(!ready || reducedMotion || document.hidden);
    };
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => document.removeEventListener('visibilitychange', sync);
  }, [ready, reducedMotion]);
  useEffect(() => {
    const element = canvas.current;
    if (!ready || !element) return;
    const context = element.getContext('2d');
    if (!context) return;
    let frame = 0, previous = 0, width = 0, height = 0;
    let scrolling = isScrolling();
    let particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const mobile = matchMedia('(hover: none), (max-width: 720px)');
    const primary = theme === 'dark' ? 'rgba(216,121,152,.55)' : 'rgba(139,30,63,.42)';
    const secondary = theme === 'dark' ? 'rgba(171,154,255,.45)' : 'rgba(107,78,255,.32)';
    function draw(seconds: number) {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      particles.forEach((p, index) => {
        // Velocity is in pixels/second, so throttling never slows the drift.
        p.x += p.vx * seconds; p.y += p.vy * seconds;
        if (p.x < 0 || p.x > width) { p.vx *= -1; p.x = Math.max(0, Math.min(width, p.x)); }
        if (p.y < 0 || p.y > height) { p.vy *= -1; p.y = Math.max(0, Math.min(height, p.y)); }
        context.beginPath(); context.fillStyle = index % 4 ? primary : secondary;
        context.arc(p.x, p.y, p.r, 0, Math.PI * 2); context.fill();
        // A bounded neighbour sample keeps connection work linear.
        for (let offset = 1; offset <= 3; offset++) {
          const next = particles[(index + offset) % particles.length];
          const distance = Math.hypot(p.x - next.x, p.y - next.y);
          if (distance < 140) {
            context.beginPath();
            context.strokeStyle = `rgba(${theme === 'dark' ? '216,121,152' : '139,30,63'},${(1 - distance / 140) * .22})`;
            context.moveTo(p.x, p.y); context.lineTo(next.x, next.y); context.stroke();
          }
        }
      });
    }
    function tick(time: number) {
      const interval = 1000 / (mobile.matches ? (scrolling ? 20 : 24) : 30);
      if (!previous) previous = time;
      const elapsed = time - previous;
      if (elapsed >= interval) { previous = time; draw(Math.min(elapsed, 80) / 1000); }
      frame = requestAnimationFrame(tick);
    }
    function reconcile() {
      cancelAnimationFrame(frame); frame = 0; previous = 0;
      if (!reducedMotion && !document.hidden) frame = requestAnimationFrame(tick);
    }
    function resize() {
      if (!element || !context) return;
      const nextWidth = innerWidth, nextHeight = innerHeight;
      if (nextWidth === width && nextHeight === height && particles.length === (mobile.matches ? 45 : 90)) return;
      const oldWidth = width, oldHeight = height;
      width = nextWidth; height = nextHeight;
      const dpr = Math.min(devicePixelRatio || 1, 1.25);
      element.width = width * dpr; element.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = mobile.matches ? 45 : 90;
      if (particles.length === count && oldWidth && oldHeight) {
        particles.forEach(p => { p.x *= width / oldWidth; p.y *= height / oldHeight; });
      } else {
        particles = Array.from({ length: count }, () => {
          const angle = Math.random() * Math.PI * 2;
          const speed = 12 + Math.random() * 10;
          return { x: Math.random() * width, y: Math.random() * height, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, r: 1.2 + Math.random() * 1.3 };
        });
      }
      draw(0); reconcile();
    }
    const unsubscribe = subscribeToScrollActivity(active => { scrolling = active; });
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', reconcile);
    mobile.addEventListener('change', resize);
    resize();
    return () => {
      cancelAnimationFrame(frame); unsubscribe();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', reconcile);
      mobile.removeEventListener('change', resize);
    };
  }, [reducedMotion, ready, theme]);
  return <div ref={background} className="ambient-background" data-paused="true" aria-hidden="true"><div className="ambient-gradients"><i className="ambient-orb ambient-orb-bordeaux" /><i className="ambient-orb ambient-orb-beige" /><i className="ambient-orb ambient-orb-violet" /></div><canvas ref={canvas} id="particle-canvas" /></div>;
}
