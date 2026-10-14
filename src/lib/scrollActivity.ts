type Listener = (active: boolean) => void;
const listeners = new Set<Listener>();
let scrolling = false;
let timeout: ReturnType<typeof setTimeout> | undefined;

function emit(active: boolean) {
  if (scrolling === active) return;
  scrolling = active;
  document.documentElement.dataset.scrolling = String(active);
  listeners.forEach(listener => listener(active));
}

// No DOM measurements, React state updates or per-frame work on scroll.
function onScroll() {
  emit(true);
  clearTimeout(timeout);
  timeout = setTimeout(() => emit(false), 160);
}

export function isScrolling() { return scrolling; }

export function subscribeToScrollActivity(listener: Listener) {
  if (listeners.size === 0) window.addEventListener('scroll', onScroll, { passive: true });
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeout);
      emit(false);
    }
  };
}
