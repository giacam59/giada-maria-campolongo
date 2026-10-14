import { education } from '../../content/education';
import { usePreferences } from '../../context/PreferencesContext';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function Education() {
  const { copy, localize } = usePreferences();
  return <section id="formazione" className="section education-section shell" tabIndex={-1} aria-labelledby="education-title">
    <Reveal><SectionHeading id="education-title" label={copy.educationLabel} title={copy.educationTitle} intro={copy.educationIntro} /></Reveal>
    <div className="education-grid"><div>{education.map(item => <article className="education-item" key={item.date}>
      <span className="education-date">{item.date}</span><div><h3>{localize(item.title)}</h3><p>{item.school}</p>{item.grade && <span className="grade">{copy.educationGrade} · {item.grade}</span>}</div>
    </article>)}</div>
      <div className="languages-panel"><h3>{copy.languages}</h3>
        <div className="language-row"><span>{copy.italian}</span><span className="language-level"><i className="language-track" aria-hidden="true" />{copy.native}</span></div>
        <div className="language-row"><span>{copy.english}</span><span className="language-level"><i className="language-track language-b2" aria-hidden="true" />B2</span></div>
      </div>
    </div>
  </section>;
}
