import { projects } from '../../content/projects';
import { usePreferences } from '../../context/PreferencesContext';
import type { MediaKey, Project } from '../../types/content';
import { Card } from '../ui/Card';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { Tags } from '../ui/Tags';
import { ProjectPreview } from './ProjectPreview';

export function Projects({ onImage, onProject }: { onImage: (key: MediaKey) => void; onProject: (project: Project) => void }) {
  const { copy, localize } = usePreferences();
  return <section id="progetti" className="section shell" tabIndex={-1} aria-labelledby="projects-title">
    <Reveal><SectionHeading id="projects-title" label={copy.projectsLabel} title={copy.projectsTitle} intro={copy.projectsIntro} /></Reveal>
    <div className="project-list">{projects.map(project => <Reveal key={project.id}>
      <article className="project-row"><Card>
        <div className="project-copy">
          <span className="project-number">{project.number} / {String(projects.length).padStart(2, '0')}</span>
          <span className="project-category">{localize(project.category)}</span><h3>{localize(project.title)}</h3><p>{localize(project.summary)}</p>
          <Tags items={project.stack} />
          <div className="project-links"><a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer">{copy.visitSite}<Icon name="arrow" small /></a><button className="text-link" type="button" onClick={() => onProject(project)} aria-haspopup="dialog">{copy.projectDetails}<Icon name="right" small /></button></div>
        </div>
        <ProjectPreview project={project} onImage={onImage} />
      </Card></article>
    </Reveal>)}</div>
    <div className="section-connector" aria-hidden="true" />
  </section>;
}
