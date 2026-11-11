import { useId } from 'react';
import { usePreferences } from '../../context/PreferencesContext';

export function ArchitectureDiagram() {
  const { copy } = usePreferences();
  const marker = useId();
  return <div className="architecture">
    <h4>{copy.architecture}</h4>
    <svg className="architecture-svg" viewBox="0 0 430 128" role="img" aria-label={copy.architectureAlt}>
      <defs><marker id={marker} markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto-start-reverse"><path d="M0 0 5 2.5 0 5" className="diagram-arrow" /></marker></defs>
      <rect x="1" y="39" width="78" height="46" rx="6" /><text x="40" y="59" textAnchor="middle">Flask</text><text x="40" y="74" textAnchor="middle" className="diagram-caption">Python · DB</text>
      <rect x="115" y="1" width="131" height="33" rx="6" /><text x="180" y="22" textAnchor="middle">Google Sheets</text>
      <rect x="115" y="47" width="131" height="33" rx="6" /><text x="180" y="67" textAnchor="middle">Leaflet / OSRM</text>
      <rect x="115" y="93" width="131" height="33" rx="6" /><text x="180" y="114" textAnchor="middle">WhatsApp</text>
      {['M82 62H97V18H112', 'M82 63H112', 'M82 64H97V109H112'].map(d => <path key={d} d={d} markerStart={`url(#${marker})`} markerEnd={`url(#${marker})`} />)}
      <text x="273" y="44" className="diagram-caption">VPS Ubuntu</text><text x="273" y="64" className="diagram-caption">Docker · DBSCAN</text><text x="273" y="84" className="diagram-caption">Cloudflare Tunnel</text>
    </svg>
  </div>;
}
