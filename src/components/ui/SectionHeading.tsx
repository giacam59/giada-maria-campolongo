export function SectionHeading({ label, title, intro, id }: { label: string; title: string; intro?: string; id?: string }) {
  return (
    <div className="section-heading">
      <div><p className="eyebrow">{label}</p><h2 id={id}>{title}</h2></div>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  );
}
