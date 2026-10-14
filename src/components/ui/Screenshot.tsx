import { media } from '../../content/media';
import { usePreferences } from '../../context/PreferencesContext';
import type { MediaKey } from '../../types/content';

export function Screenshot({ mediaKey, expanded = false }: { mediaKey: MediaKey; expanded?: boolean }) {
  const { localize } = usePreferences();
  const image = media[mediaKey];
  return <img className="real-screenshot" src={expanded ? image.src : (image.thumbnail ?? image.src)}
    width={image.width} height={image.height} alt={localize(image.alt)}
    loading={expanded ? 'eager' : 'lazy'} decoding="async" />;
}
