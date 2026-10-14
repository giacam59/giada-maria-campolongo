import { cv, person } from '../../content/person';
import { usePreferences } from '../../context/PreferencesContext';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';

export function Contact({ notify }: { notify: (message: string) => void }) {
  const { copy } = usePreferences();
  async function copyEmail() {
    try { await navigator.clipboard.writeText(person.email); notify(copy.copied); }
    catch { notify(copy.copyFailed); }
  }
  return <section id="contatti" className="contact-section" tabIndex={-1} aria-labelledby="contact-title"><div className="shell">
    <div className="contact-grid">
      <div><Reveal><p className="eyebrow">{copy.contactLabel}</p><h2 id="contact-title">{copy.contactTitle}</h2></Reveal><p className="contact-intro">{copy.contactIntro}</p>
        <div className="contact-actions">{(['dev', 'office'] as const).map(kind => <a key={kind} className={`btn ${kind === 'dev' ? 'btn-primary' : 'btn-secondary'}`} href={cv[kind]} download={cv[kind] !== '#' || undefined} aria-describedby={cv[kind] === '#' ? 'cv-note' : undefined} onClick={event => { if (cv[kind] === '#') { event.preventDefault(); notify(copy.cvUnavailable); } }}><Icon name="download" small />{kind === 'dev' ? copy.cvDev : copy.cvOffice}</a>)}</div>
        {Object.values(cv).includes('#') && <p className="cv-note" id="cv-note">{copy.cvNote}</p>}
      </div>
      <div className="contact-details">
        <div className="contact-item"><div><p className="contact-label">{copy.emailLabel}</p><a href={`mailto:${person.email}`}>{person.email}</a></div><button type="button" className="icon-button" onClick={copyEmail} aria-label={copy.copy}><Icon name="copy" /></button></div>
        <div className="contact-item"><div><p className="contact-label">{copy.phoneLabel}</p><a href={`tel:${person.phoneURI}`}>{person.phone}</a></div><a className="icon-button" href={`tel:${person.phoneURI}`} aria-label={copy.phoneLabel}><Icon name="phone" /></a></div>
        <div className="contact-secondary"><div><p className="contact-label">{copy.locationLabel}</p><p>{copy.location}<br /><span className="muted">{copy.availability}</span></p></div><div><p className="contact-label">{copy.birthLabel}</p><p><time dateTime="2005-08-24">{person.birth}</time></p></div></div>
        <div className="contact-socials"><a href={`https://www.linkedin.com/in/${person.linkedin}/`} target="_blank" rel="noopener noreferrer" className="text-link">LinkedIn · {person.linkedin}<Icon name="arrow" small /></a></div>
        <a href="#progetti" className="text-link contact-portfolio muted">{person.portfolio}<Icon name="arrow" small /></a>
      </div>
    </div><span className="contact-ornament" aria-hidden="true">gm.</span>
  </div></section>;
}
