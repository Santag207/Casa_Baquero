import { Link } from 'react-router-dom';
import { PhotoGallery } from '../components/gallery/PhotoGallery';
import { SectionHeader } from '../components/ui/SectionHeader';
import { media } from '../data/media';

export interface ContentPageConfig {
  eyebrow?: string;
  title: string;
  subtitle: string;
  heroImage: string;
  sections: { heading?: string; paragraphs: string[] }[];
  gallery: { src: string; alt: string }[];
  cta?: { label: string; to: string };
}

export function ContentPage({ config }: { config: ContentPageConfig }) {
  return (
    <article className="content-page">
      <header
        className="page-hero"
        style={{ backgroundImage: `url(${media(config.heroImage, 1600)})` }}
      >
        <div className="container">
          {config.eyebrow && (
            <span className="section-header__eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {config.eyebrow}
            </span>
          )}
          <h1>{config.title}</h1>
          <p>{config.subtitle}</p>
          {config.cta && (
            <Link to={config.cta.to} className="btn btn--outline-light" style={{ marginTop: '0.5rem' }}>
              {config.cta.label}
            </Link>
          )}
        </div>
      </header>
      <section className="section-pad">
        <div className="container container--narrow content-page__body">
          {config.sections.map((s) => (
            <div key={s.heading ?? s.paragraphs[0].slice(0, 20)} className="content-page__block">
              {s.heading && <h2>{s.heading}</h2>}
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
      {config.gallery.length > 0 && (
        <section className="section-pad--tight" style={{ background: 'var(--color-bg, #f7f7f7)' }}>
          <div className="container">
            <SectionHeader eyebrow="Galería" title="Imágenes" align="center" />
            <PhotoGallery photos={config.gallery} columns={3} />
          </div>
        </section>
      )}
    </article>
  );
}
