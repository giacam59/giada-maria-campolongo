import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { CaseStudyGallery } from '../components/sections/CaseStudyGallery';
import { PreferencesProvider } from '../context/PreferencesContext';
import { subscribeToScrollActivity } from '../lib/scrollActivity';

describe('Portfolio interactions', () => {
  it('keeps the animated mobile menu inaccessible when closed and restores focus and scrolling', async () => {
    const user = userEvent.setup();
    render(<App />);
    const button = screen.getByRole('button', { name: 'Apri menu' });
    const nav = document.getElementById('mobile-nav')!;
    expect(nav.hasAttribute('inert')).toBe(true);
    expect(screen.queryByRole('navigation', { name: 'Apri menu' })).toBeNull();
    await user.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(nav.hasAttribute('inert')).toBe(false);
    expect(document.activeElement).toBe(within(nav).getByRole('link', { name: '01 Profilo' }));
    expect(document.body.style.overflow).toBe('hidden');
    await user.keyboard('{Escape}');
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(nav.hasAttribute('inert')).toBe(true);
    expect(document.activeElement).toBe(button);
    expect(document.body.style.overflow).toBe('');
    await user.click(button);
    await user.click(within(nav).getByRole('link', { name: '02 Competenze' }));
    expect(document.activeElement).toBe(document.getElementById('competenze'));
    expect(nav.getAttribute('aria-hidden')).toBe('true');
    expect(document.body.style.overflow).toBe('');
    await user.click(button);
    await user.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(nav.querySelector('a')?.getAttribute('tabindex')).toBe('-1');
  });

  it('keeps the unified profile and changes language without replacing the root', async () => {
    const user = userEvent.setup();
    render(<App />);
    const main = screen.getByRole('main');
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Campolongo');
    expect(screen.queryByRole('button', { name: /^Tech$|^Ufficio$/ })).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Switch to English' }));
    expect(screen.getByRole('heading', { name: 'Websites I have built' })).toBeTruthy();
    expect(screen.getByRole('main')).toBe(main);
    expect(localStorage.getItem('gm-lang')).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    await user.click(screen.getByRole('button', { name: 'Switch theme' }));
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('gm-theme')).toBe('dark');
  });

  it('opens the actual full-resolution screenshot and closes with Escape', async () => {
    const user = userEvent.setup();
    render(<App />);
    const trigger = screen.getByRole('button', { name: 'Ingrandisci la schermata — Gestionale Algeco Power' });
    expect(within(trigger).getByRole('img').getAttribute('src')).toContain('preview.webp');
    await user.click(trigger);
    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByRole('img').getAttribute('src')).toContain('algeco-gestionale.webp');
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent(dialog, new Event('cancel', { bubbles: false, cancelable: true }));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).toBe('');
  });

  it('navigates all four slides and enlarges the redacted images', async () => {
    const scrollTo = vi.fn();
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', { configurable: true, value: scrollTo });
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Schermata successiva' }));
    const trigger = screen.getByRole('button', { name: 'Ingrandisci la schermata — Pianificazione degli interventi' });
    expect(within(trigger).getByRole('img').getAttribute('src')).toContain('censurato-preview.webp');
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'instant' }));
    await user.click(trigger);
    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByRole('img').getAttribute('src')).toContain('algeco-interventi-censurato.webp');
    await user.click(within(dialog).getByRole('button', { name: 'Chiudi' }));
    expect(document.activeElement).toBe(trigger);
    fireEvent.keyDown(trigger, { key: 'ArrowLeft' });
    expect(screen.getByRole('button', { name: 'Ingrandisci la schermata — Gestionale Algeco Power' })).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Schermata precedente' }));
    await user.click(screen.getByRole('button', { name: 'Schermata precedente' }));
    const records = screen.getByRole('button', { name: 'Ingrandisci la schermata — Gestione dei contatti e degli appuntamenti' });
    expect(within(records).getByRole('img').getAttribute('src')).toContain('algeco-contatti-censurato-preview.webp');
    await user.click(records);
    const recordsDialog = await screen.findByRole('dialog');
    expect(within(recordsDialog).getByRole('img').getAttribute('src')).toContain('algeco-contatti-censurato.webp');
    expect(within(recordsDialog).getByRole('img').getAttribute('alt')).toContain('POD');
    await user.click(within(recordsDialog).getByRole('button', { name: 'Chiudi' }));
    await user.click(screen.getByRole('button', { name: 'Schermata successiva' }));
    const calendar = screen.getByRole('button', { name: 'Ingrandisci la schermata — Calendario delle attività' });
    expect(within(calendar).getByRole('img').getAttribute('src')).toContain('algeco-calendario-censurato-preview.webp');
    await user.click(calendar);
    const calendarDialog = await screen.findByRole('dialog');
    expect(within(calendarDialog).getByRole('img').getAttribute('src')).toContain('algeco-calendario-censurato.webp');
    expect(within(calendarDialog).getByRole('img').getAttribute('alt')).toContain('ENELTEL');
    await user.click(within(calendarDialog).getByRole('button', { name: 'Chiudi' }));
    await user.click(screen.getByRole('button', { name: 'Schermata successiva' }));
    expect(screen.getByRole('button', { name: 'Ingrandisci la schermata — Gestionale Algeco Power' })).toBeTruthy();
  });

  it('provides working project links and downloadable CVs', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getAllByRole('link', { name: 'Apri il sito' }).map(link => link.getAttribute('href'))).toEqual([
      'https://giada-maria-campolongo.netlify.app/', 'https://micromihai.com/en', 'https://algecopower.netlify.app/',
    ]);
    await user.click(screen.getAllByRole('button', { name: 'Come l’ho realizzato' })[0]);
    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByRole('heading', { name: 'Portfolio Personale' })).toBeTruthy();
    await user.click(within(dialog).getByRole('button', { name: 'Chiudi' }));
    for (const [name, path] of [['CV Sviluppo', '/cv/Giada-Maria-Campolongo-CV-Sviluppo.pdf'], ['CV Ufficio', '/cv/Giada-Maria-Campolongo-CV-Ufficio.pdf']]) {
      const link = screen.getByRole('link', { name });
      expect(link.getAttribute('href')).toBe(path);
      expect(link.hasAttribute('download')).toBe(true);
    }
    expect(screen.getByRole('link', { name: 'GitHub · giacam59' }).getAttribute('href')).toBe('https://github.com/giacam59');
    expect(screen.queryByText('Download CV: PDF da collegare.')).toBeNull();
  });

  it('keeps the selected gallery caption stable while smooth-scrolling', async () => {
    vi.spyOn(window, 'matchMedia').mockImplementation(query => ({
      matches: false, media: query, onchange: null,
      addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
    }));
    const scrollTo = vi.fn();
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', { configurable: true, value: scrollTo });
    const user = userEvent.setup();
    render(<PreferencesProvider><CaseStudyGallery onImage={vi.fn()} /></PreferencesProvider>);
    const viewport = document.querySelector('.gallery-viewport') as HTMLDivElement;
    Object.defineProperty(viewport, 'clientWidth', { configurable: true, value: 600 });
    await user.click(screen.getByRole('button', { name: 'Schermata successiva' }));
    expect(screen.getByText('Pianificazione e dettaglio degli interventi tecnici sul territorio.')).toBeTruthy();
    Object.defineProperty(viewport, 'scrollLeft', { configurable: true, value: 40 });
    fireEvent.scroll(viewport);
    await act(async () => { await new Promise(resolve => requestAnimationFrame(resolve)); });
    expect(screen.getByText('Pianificazione e dettaglio degli interventi tecnici sul territorio.')).toBeTruthy();
    expect(screen.queryByText('Panoramica delle zone e degli appuntamenti sulla mappa.')).toBeNull();
    Object.defineProperty(viewport, 'scrollLeft', { configurable: true, value: 600 });
    fireEvent.scroll(viewport);
    await act(async () => { await new Promise(resolve => requestAnimationFrame(resolve)); });
    Object.defineProperty(viewport, 'scrollLeft', { configurable: true, value: 1200 });
    fireEvent.scroll(viewport);
    await act(async () => { await new Promise(resolve => requestAnimationFrame(resolve)); });
    expect(screen.getByText('Gestione delle schede contatti e degli appuntamenti.')).toBeTruthy();
  });
});

describe('Scroll scheduling', () => {
  it('only notifies activity boundaries and cleans up the passive listener', () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const unsubscribe = subscribeToScrollActivity(callback);
    act(() => { for (let i = 0; i < 50; i++) window.dispatchEvent(new Event('scroll')); });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenLastCalledWith(true);
    act(() => vi.advanceTimersByTime(170));
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith(false);
    unsubscribe();
    window.dispatchEvent(new Event('scroll'));
    expect(callback).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });
});
