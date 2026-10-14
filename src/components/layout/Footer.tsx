import { person } from '../../content/person';
import { usePreferences } from '../../context/PreferencesContext';
import { Icon } from '../ui/Icon';

export function Footer({ onPrivacy }: { onPrivacy: () => void }) {
  const { copy, reducedMotion, setPreference } = usePreferences();
  return <footer id="site-footer"><div className="footer-inner shell">
    <div className="footer-brand"><a href="#profilo" className="wordmark-gm" aria-label={copy.top}>GM<span>.</span></a><p>© {new Date().getFullYear()} {person.name}<br />{copy.footerLine}</p></div>
    <div className="footer-controls">
      <button type="button" onClick={onPrivacy} aria-haspopup="dialog">{copy.privacy}</button>
      <button type="button" onClick={() => setPreference('motion', reducedMotion ? 'full' : 'reduce')} aria-pressed={reducedMotion}><Icon name={reducedMotion ? 'play' : 'pause'} />{reducedMotion ? copy.motionOff : copy.motionOn}</button>
      <a href="#profilo">{copy.top}<Icon name="up" /></a>
    </div>
  </div></footer>;
}
