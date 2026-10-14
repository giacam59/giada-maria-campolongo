import { usePreferences } from '../../context/PreferencesContext';

export function Tags({ items }: { items: string[] }) {
  const { copy } = usePreferences();
  if (!items.length) return null;
  return <div className="tag-list">{items.map(item => <span className="tag" key={item}>{copy.skillTranslate[item] ?? item}</span>)}</div>;
}
