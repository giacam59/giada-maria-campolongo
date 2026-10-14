import { act, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AmbientBackground } from '../components/effects/AmbientBackground';
import { SmoothScroll } from '../components/effects/SmoothScroll';
import { PreferencesProvider } from '../context/PreferencesContext';

const engine = vi.hoisted(() => ({ stop: vi.fn(), start: vi.fn(), destroy: vi.fn(), scrollTo: vi.fn(), isStopped: false }));
vi.mock('lenis', () => ({ default: vi.fn(function () { return engine; }) }));
function motion(reduced = false) {
  vi.spyOn(window, 'matchMedia').mockImplementation(query => ({
    matches: reduced && query.includes('prefers-reduced-motion'), media: query, onchange: null,
    addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
}
function frames() {
  let id = 0;
  const pending = new Map<number, FrameRequestCallback>();
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => { pending.set(++id, callback); return id; });
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(key => { pending.delete(key); });
  return (time: number) => act(() => { const batch = [...pending.values()]; pending.clear(); batch.forEach(callback => callback(time)); });
}
afterEach(() => { document.body.style.overflow = ''; vi.restoreAllMocks(); });

describe('Motion integration', () => {
  it('moves particles outside the hero and during scrolling, but pauses when hidden', () => {
    motion(); const frame = frames();
    const arc = vi.fn();
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({ clearRect: vi.fn(), beginPath: vi.fn(), arc, fill: vi.fn(), moveTo: vi.fn(), lineTo: vi.fn(), stroke: vi.fn(), setTransform: vi.fn() } as unknown as CanvasRenderingContext2D);
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    const page = render(<PreferencesProvider><AmbientBackground /></PreferencesProvider>);
    const first = arc.mock.calls[0].slice(0, 2);
    arc.mockClear();
    fireEvent.scroll(window);
    frame(100); frame(150);
    expect(arc).toHaveBeenCalled();
    expect(arc.mock.calls[0].slice(0, 2)).not.toEqual(first);
    arc.mockClear();
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
    fireEvent(document, new Event('visibilitychange'));
    frame(250);
    expect(arc).not.toHaveBeenCalled();
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    fireEvent(document, new Event('visibilitychange'));
    frame(300); frame(350);
    expect(arc).toHaveBeenCalled();
    page.unmount(); arc.mockClear(); frame(450);
    expect(arc).not.toHaveBeenCalled();
  });

  it('stops inertia for overlays and resumes anchor navigation after the menu closes', async () => {
    motion(); const frame = frames();
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    const page = render(<PreferencesProvider><SmoothScroll /><a href="#motion-target">Target</a><section id="motion-target" tabIndex={-1} /></PreferencesProvider>);
    engine.stop.mockClear(); engine.start.mockClear(); engine.scrollTo.mockClear();
    await act(async () => { document.body.style.overflow = 'hidden'; });
    expect(engine.stop).toHaveBeenCalled();
    fireEvent.click(page.getByText('Target'));
    await act(async () => { document.body.style.overflow = ''; });
    frame(100);
    expect(engine.start).toHaveBeenCalled();
    expect(engine.scrollTo).toHaveBeenCalledWith(document.getElementById('motion-target'), expect.objectContaining({ duration: 1.2 }));
    page.unmount();
    expect(engine.destroy).toHaveBeenCalled();
  });
});
