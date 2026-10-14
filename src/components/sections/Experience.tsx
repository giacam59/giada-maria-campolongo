import { experiences } from '../../content/experiences';
import { usePreferences } from '../../context/PreferencesContext';
import { useTimeline } from '../../hooks/useTimeline';
import { Card } from '../ui/Card';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { Tags } from '../ui/Tags';

export function Experience() {
  const { copy, localize, lang } = usePreferences();
  const timeline = useTimeline();
  return <section id="esperienza" className="section experience-section shell" tabIndex={-1} aria-labelledby="experience-title">
    <Reveal><SectionHeading id="experience-title" label={copy.expLabel} title={copy.expTitle} intro={copy.expIntro} /></Reveal>
    <div className="timeline" ref={timeline}>
      <div className="timeline-rail" aria-hidden="true"><div className="timeline-fill" /></div>
      {experiences.map((experience, index) => <div className={`timeline-item ${index % 2 ? 'timeline-right' : 'timeline-left'}`} key={experience.id}>
        <div className="timeline-node" aria-hidden="true" />
        <Reveal><article className="experience-card"><Card>
          <div className="experience-head"><span className="experience-date">{localize(experience.date)}</span>{experience.current && <span className="current-pill"><i className="status-dot" aria-hidden="true" />{copy.current}</span>}</div>
          <h3>{localize(experience.title)}</h3>
          <p className="experience-company">{lang === 'en' && experience.id === 'elections' ? 'European elections' : experience.company} <span>· {localize(experience.place)}</span></p>
          <p className="experience-description">{localize(experience.description)}</p>
          <Tags items={experience.tags} />
          {experience.id === 'algeco' && <a href="#case-study" className="text-link">{copy.caseLink}<Icon name="arrow" small /></a>}
        </Card></article></Reveal>
      </div>)}
    </div>
  </section>;
}
