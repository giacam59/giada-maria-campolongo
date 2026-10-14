import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { person } from '../../content/person';
import { usePreferences } from '../../context/PreferencesContext';
import { navigationSections, useActiveSection } from '../../hooks/useActiveSection';
import { useBodyLock } from '../../hooks/useBodyLock';
import { Icon } from '../ui/Icon';

export function Header() {
  const { copy, lang, theme, setPreference } = usePreferences();
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useBodyLock(open);

  useEffect(() => {
    if (!open) return;
    const close = () => { setOpen(false); menuButton.current?.focus(); };
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key !== 'Tab') return;
      const focusable = header.current?.querySelectorAll<HTMLElement>('a[href], button');
      const visible = Array.from(focusable ?? []).filter(el => el.getClientRects().length > 0);
      const first = visible[0], last = visible.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const media = matchMedia('(min-width: 981px)');
    const resize = () => { if (media.matches) setOpen(false); };
    document.addEventListener('keydown', keyboard);
    media.addEventListener('change', resize);
    header.current?.querySelector<HTMLElement>('#mobile-nav a')?.focus();
    return () => { document.removeEventListener('keydown', keyboard); media.removeEventListener('change', resize); };
  }, [open]);

  function closeAndFocus(id: string) {
    setOpen(false);
    document.getElementById(id)?.focus({ preventScroll: true });
  }

  return (
    <header id="site-header" ref={header}>
      <div className="header-inner shell">
        <a className="wordmark" href="#profilo" aria-label={person.name} onClick={() => closeAndFocus('profilo')}>
          <span className="wordmark-gm">GM<span>.</span></span>
          <span className="wordmark-name">Giada Maria<br />Campolongo</span>
        </a>
        <nav className="desktop-nav" aria-label={copy.nav.join(', ')}>
          {navigationSections.map((id, index) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{copy.nav[index]}</a>)}
        </nav>
        <div className="header-controls">
          <button type="button" className="lang-toggle" aria-label={copy.language} onClick={() => setPreference('lang', lang === 'it' ? 'en' : 'it')}>{lang.toUpperCase()}<span aria-hidden="true">↗</span></button>
          <button type="button" className="icon-button theme-toggle" aria-label={copy.theme} aria-pressed={theme === 'dark'} onClick={() => setPreference('theme', theme === 'light' ? 'dark' : 'light')}><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button>
          <button ref={menuButton} type="button" className="icon-button menu-button" aria-label={open ? copy.close : copy.menu} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(value => !value)}>
            <span className="hamburger" aria-hidden="true"><span /><span /><span /></span>
          </button>
        </div>
      </div>
      <nav id="mobile-nav" className="mobile-nav" data-open={open} aria-hidden={!open} {...(!open ? { inert: '' } : {})} aria-label={copy.menu}>
        {navigationSections.map((id, index) => <a key={id} href={`#${id}`} tabIndex={open ? undefined : -1} style={{ '--menu-index': index } as CSSProperties} onClick={() => closeAndFocus(id)}><span>0{index + 1}</span>{copy.nav[index]}</a>)}
      </nav>
    </header>
  );
}
