import { usePreferences } from '../../context/PreferencesContext';
import type { MediaKey, Project } from '../../types/content';
import { Screenshot } from '../ui/Screenshot';
import { WindowDots } from '../ui/WindowDots';

export function ProjectPreview({ project, onImage }: { project: Project; onImage: (key: MediaKey) => void }) {
  const { copy, localize } = usePreferences();
  const host = new URL(project.url).host;
  return <div className={`project-art ${project.kind}`}>
    <span className="art-index">{project.number} / {host}</span>
    <button className="device-group" type="button" onClick={() => onImage(project.imageKey)} aria-label={`${copy.imageOpen} — ${localize(project.title)}`} aria-haspopup="dialog">
      <span className="laptop"><span className="device-toolbar"><WindowDots /><span>{host}</span><span aria-hidden="true">↗</span></span><span className="device-screen"><Screenshot mediaKey={project.imageKey} /></span></span>
      <span className="laptop-base" />
    </button>
    <span className="art-caption">{copy.projectPreview} · {copy.imageHint}</span>
  </div>;
}
