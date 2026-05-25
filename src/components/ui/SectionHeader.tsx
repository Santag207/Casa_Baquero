interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  note?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ eyebrow, title, subtitle, note, align = 'left' }: SectionHeaderProps) {
  return (
    <header className={`section-header ${align === 'center' ? 'section-header--center' : ''}`}>
      {eyebrow && <span className="section-header__eyebrow">{eyebrow}</span>}
      <h2 className="section-header__title">{title}</h2>
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
      {note && <span className="section-header__note">{note}</span>}
    </header>
  );
}
