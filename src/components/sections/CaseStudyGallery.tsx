import { useEffect, useRef, useState } from 'react';
import { media } from '../../content/media';
import { usePreferences } from '../../context/PreferencesContext';
import type { MediaKey } from '../../types/content';
import { Icon } from '../ui/Icon';
import { Screenshot } from '../ui/Screenshot';
import { WindowDots } from '../ui/WindowDots';

const slides: MediaKey[] = ['algeco', 'algecoDetail', 'algecoRecords', 'algecoCalendar'];

/** Native scroll snap handles swipes without global listeners or autoplay. */
export function CaseStudyGallery({ onImage }: { onImage: (key: MediaKey) => void }) {
  const { copy, localize, reducedMotion } = usePreferences();
  const [active, setActive] = useState(0);
  const viewport = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  function select(index: number) {
    const next = (index + slides.length) % slides.length;
    setActive(next);
    viewport.current?.scrollTo({ left: next * viewport.current.clientWidth, behavior: reducedMotion ? 'instant' : 'smooth' });
  }
  function trackScroll() {
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const element = viewport.current;
      if (element && element.clientWidth) setActive(Math.max(0, Math.min(slides.length - 1, Math.round(element.scrollLeft / element.clientWidth))));
    });
  }
  return <figure className="case-figure case-gallery" aria-label={copy.galleryLabel} aria-roledescription={copy.galleryRole} onKeyDown={event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); select(active + (event.key === 'ArrowRight' ? 1 : -1)); }
  }}>
    <div className="gallery-frame">
      <div className="capture-bar"><WindowDots /><span>{copy.realScreen}</span><span aria-hidden="true">{active + 1} / {slides.length}</span></div>
      <div className="gallery-viewport" ref={viewport} onScroll={trackScroll} data-lenis-prevent="true">
        {slides.map((key, index) => <div className="gallery-slide" key={key} role="group" aria-roledescription={copy.slideRole} aria-label={`${index + 1} / ${slides.length}`} aria-hidden={active !== index}>
          <button className="case-image-trigger" type="button" tabIndex={active === index ? 0 : -1} onClick={() => onImage(key)} aria-label={`${copy.imageOpen} — ${localize(media[key].label)}`} aria-haspopup="dialog">
            <Screenshot mediaKey={key} />
            <span className="gallery-enlarge" aria-hidden="true"><Icon name="arrow" small /></span>
          </button>
        </div>)}
      </div>
    </div>
    <div className="gallery-controls">
      <button type="button" className="icon-button gallery-previous" onClick={() => select(active - 1)} aria-label={copy.previousImage}><Icon name="right" small /></button>
      <div className="gallery-dots" role="group" aria-label={copy.selectImage}>{slides.map((key, index) => <button type="button" key={key} className="gallery-dot" aria-label={`${copy.showImage} ${index + 1} — ${localize(media[key].label)}`} aria-pressed={active === index} onClick={() => select(index)}><span /></button>)}</div>
      <button type="button" className="icon-button" onClick={() => select(active + 1)} aria-label={copy.nextImage}><Icon name="right" small /></button>
    </div>
    <figcaption><span className="gallery-caption" aria-live="polite" aria-atomic="true">{[copy.galleryOverview, copy.galleryDetail, copy.galleryRecords, copy.galleryCalendar][active]}</span><span className="gallery-hint">{copy.galleryHint}</span></figcaption>
  </figure>;
}
