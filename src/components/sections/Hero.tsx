import { usePreferences } from '../../context/PreferencesContext';
import { usePointerTilt } from '../../hooks/usePointerTilt';
import { Icon, type IconName } from '../ui/Icon';
import { WindowDots } from '../ui/WindowDots';

const badges = [{ label: 'Python', symbol: 'Py' }, { label: 'React', symbol: '⚛' }, { label: 'Excel', symbol: 'X' }, { label: 'CRM', symbol: '↗' }];
const stripIcons: IconName[] = ['code', 'layout', 'route', 'layers'];

export function Hero() {
  const { copy } = usePreferences();
  const stage = usePointerTilt(8);
  return <section id="profilo" className="hero shell" tabIndex={-1} aria-labelledby="hero-title">
    <div className="hero-grid">
      <div className="hero-copy">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 id="hero-title">Giada Maria<br /><em>Campolongo</em></h1>
        <p className="hero-role">{copy.role}</p>
        <p className="hero-description">{copy.profile}</p>
        <div className="hero-actions"><a className="btn btn-primary" href="#progetti">{copy.viewWork}<Icon name="arrow" small /></a><a className="text-link" href="#contatti">{copy.talk}<Icon name="right" small /></a></div>
        <div className="hero-meta"><Icon name="pin" small /><span>{copy.location}</span><span className="meta-divider" aria-hidden="true" /><span>{copy.availability}</span></div>
      </div>
      <div className="hero-stage" ref={stage}>
        <div className="hero-scene">
          <div className="hero-mesh" /><div className="orbit" /><div className="orbit orbit-two" />
          <div className="profile-card">
            <div className="profile-card-top"><WindowDots /><span>GIADA MARIA CAMPOLONGO</span></div>
            <div className="profile-card-main">
              <div className="monogram-emblem"><strong>gm.</strong><span>{copy.cardTag}</span></div>
              <div className="profile-overview">{copy.profileRows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
            </div>
            <div className="profile-card-bottom"><Icon name="pin" small />{copy.systemReady}</div>
          </div>
          {badges.map((badge, index) => <div key={badge.label} className={`float-badge badge-${index + 1}`}><span className="badge-icon">{badge.symbol}</span>{badge.label}</div>)}
        </div>
      </div>
    </div>
    <div className="hero-bottom"><a href="#competenze" className="scroll-link"><Icon name="down" />{copy.scroll}</a><span>PORTFOLIO / 2026</span></div>
    <div className="value-strip">{copy.strip.map((text, index) => <span key={text}><Icon name={stripIcons[index]} />{text}</span>)}</div>
  </section>;
}
