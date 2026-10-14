import { useEffect, useRef } from 'react';
import { media } from '../../content/media';
import { person } from '../../content/person';
import { usePreferences } from '../../context/PreferencesContext';
import { useBodyLock } from '../../hooks/useBodyLock';
import type { DialogContent } from '../../types/content';
import { Icon } from '../ui/Icon';
import { Screenshot } from '../ui/Screenshot';
import { Tags } from '../ui/Tags';

export default function DetailDialog({ content, onClose, notify }: { content: DialogContent; onClose: () => void; notify: (message: string) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { copy, localize, resetPreferences } = usePreferences();
  useBodyLock(true);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    return () => { dialog?.close(); previous?.focus({ preventScroll: true }); };
  }, []);
  return <dialog id="detail-dialog" ref={ref} aria-labelledby="dialog-title" className={content.kind === 'image' ? 'image-dialog' : ''} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === ref.current) onClose(); }}>
    <div className="dialog-content">
      <button className="icon-button dialog-close" type="button" onClick={onClose} aria-label={copy.close}><Icon name="close" /></button>
      {content.kind === 'image' && <><h2 id="dialog-title">{localize(media[content.key].label)}</h2><figure className="expanded-capture"><Screenshot mediaKey={content.key} expanded /><figcaption>{localize(media[content.key].alt)}</figcaption></figure></>}
      {content.kind === 'project' && <><p className="eyebrow">{copy.detailTitle} / {content.project.number}</p><h2 id="dialog-title">{localize(content.project.title)}</h2><Screenshot mediaKey={content.project.imageKey} /><p>{localize(content.project.summary)}</p><ul>{localize(content.project.details).map(item => <li key={item}>{item}</li>)}</ul><h3>{copy.builtWith}</h3><Tags items={content.project.stack} /><div className="dialog-actions"><a className="btn btn-secondary" href={content.project.url} target="_blank" rel="noopener noreferrer">{copy.visitSite}<Icon name="arrow" small /></a><a className="btn btn-primary" href={`mailto:${person.email}?subject=${encodeURIComponent(localize(content.project.title))}`}>{copy.detailCTA}<Icon name="arrow" small /></a></div></>}
      {content.kind === 'privacy' && <><p className="eyebrow">{copy.privacy}</p><h2 id="dialog-title">{copy.privacyTitle}</h2><p>{copy.privacyText}</p><button className="btn btn-secondary" onClick={() => { resetPreferences(); notify(copy.resetDone); }}>{copy.resetPrefs}<Icon name="right" small /></button></>}
    </div>
  </dialog>;
}
