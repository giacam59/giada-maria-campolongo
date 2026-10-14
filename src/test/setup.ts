import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

Object.defineProperty(window, 'matchMedia', { writable: true, value: vi.fn((query: string) => ({ matches: query.includes('prefers-reduced-motion'), media: query, addEventListener: vi.fn(), removeEventListener: vi.fn() })) });
class Observer {
  observe = vi.fn(); unobserve = vi.fn(); disconnect = vi.fn();
}
vi.stubGlobal('IntersectionObserver', Observer);
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', { value: () => null });
Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { value: function (this: HTMLDialogElement) { this.setAttribute('open', ''); } });
Object.defineProperty(HTMLDialogElement.prototype, 'close', { value: function (this: HTMLDialogElement) { this.removeAttribute('open'); } });
beforeEach(() => { localStorage.clear(); sessionStorage.clear(); });
afterEach(() => cleanup());
