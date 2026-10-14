import { skills } from '../../content/skills';
import { usePreferences } from '../../context/PreferencesContext';
import { Card } from '../ui/Card';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { Tags } from '../ui/Tags';

export function Skills() {
  const { copy, localize } = usePreferences();
  return <section id="competenze" className="section shell section-rule" tabIndex={-1} aria-labelledby="skills-title">
    <Reveal><SectionHeading id="skills-title" label={copy.skillsLabel} title={copy.skillsTitle} intro={copy.skillsIntro} /></Reveal>
    <div className="skills-grid">{skills.map((skill, index) => <Reveal key={skill.number} delay={index * 0.08}>
      <article className="skill-card"><Card>
        <div className="skill-card-top"><span className="skill-icon"><Icon name={skill.icon} /></span><span className="skill-number">{skill.number}</span></div>
        <h3>{localize(skill.title)}</h3><Tags items={skill.items} />
      </Card></article>
    </Reveal>)}</div>
    <div className="section-connector" aria-hidden="true" />
  </section>;
}
