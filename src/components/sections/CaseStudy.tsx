import { usePreferences } from '../../context/PreferencesContext';
import type { MediaKey } from '../../types/content';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { Tags } from '../ui/Tags';
import { CaseStudyGallery } from './CaseStudyGallery';
import { ArchitectureDiagram } from './ArchitectureDiagram';

const stack = ['Python', 'Flask', 'Google Sheets', 'pdfplumber', 'Jinja2', 'Leaflet', 'DBSCAN', 'OSRM', 'Docker', 'VPS Ubuntu', 'Cloudflare Tunnel'];

export function CaseStudy({ onImage }: { onImage: (key: MediaKey) => void }) {
  const { copy } = usePreferences();
  return <section id="case-study" className="case-section" tabIndex={-1} aria-labelledby="case-title"><div className="shell">
    <Reveal><div className="section-heading"><div><p className="eyebrow">{copy.caseLabel}</p><h2 id="case-title">{copy.caseTitle}</h2></div><p className="case-kicker"><span aria-hidden="true" />ALGECO POWER</p></div></Reveal>
    <div className="case-grid">
      <div className="case-copy">
        <div className="case-introduction"><h3 className="case-subtitle">{copy.caseIntro}</h3><p className="case-description">{copy.caseDescription}</p></div>
        <div className="case-story">
          {[[copy.problem, copy.problemBody], [copy.solution, copy.solutionBody]].map(([title, body], index) => <div className="case-story-block" key={title}><span className="case-story-number">0{index + 1}</span><div><h4>{title}</h4><p>{body}</p></div></div>)}
        </div>
        <div className="case-stack"><h4>{copy.stack}</h4><Tags items={stack} /></div>
        <ArchitectureDiagram />
      </div>
      <div className="case-visual">
        <CaseStudyGallery onImage={onImage} />
        <div className="case-outcomes"><h4>{copy.impact}</h4><ul>{copy.impactPoints.map(point => <li key={point}><Icon name="check" small /><span>{point}</span></li>)}</ul></div>
      </div>
    </div>
  </div></section>;
}
