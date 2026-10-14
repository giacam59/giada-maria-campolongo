import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Loader } from '../components/effects/Loader';
import { PreferencesProvider } from '../context/PreferencesContext';

function enableMotion() {
  vi.spyOn(window, 'matchMedia').mockImplementation(query => ({
    matches: false, media: query, onchange: null,
    addEventListener: vi.fn(), removeEventListener: vi.fn(),
    addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
}

afterEach(() => vi.useRealTimers());

describe('Decorative intro', () => {
  it('dismisses without storage and never locks page scrolling', () => {
    vi.useFakeTimers(); enableMotion();
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage unavailable'); });
    render(<PreferencesProvider><Loader /></PreferencesProvider>);
    expect(document.getElementById('intro-overlay')).not.toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
    expect(document.body.style.overflow).toBe('');
    act(() => vi.advanceTimersByTime(1400));
    expect(document.getElementById('intro-overlay')).toBeNull();
  });

  it('can be dismissed with Escape and is not replayed in the same session', () => {
    enableMotion();
    const first = render(<PreferencesProvider><Loader /></PreferencesProvider>);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(document.getElementById('intro-overlay')).toBeNull();
    first.unmount();
    render(<PreferencesProvider><Loader /></PreferencesProvider>);
    expect(document.getElementById('intro-overlay')).toBeNull();
  });

  it('respects reduced motion', () => {
    render(<PreferencesProvider><Loader /></PreferencesProvider>);
    expect(document.getElementById('intro-overlay')).toBeNull();
  });
});
