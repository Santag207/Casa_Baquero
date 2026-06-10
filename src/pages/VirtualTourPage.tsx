import { useLanguage } from '../context/LanguageContext';
import { SITE } from '../data/site';
import { media } from '../data/media';
import './VirtualTourPage.scss';

export function VirtualTourPage() {
  const { t } = useLanguage();
  return (
    <div className="virtual-tour">
      <header
        className="page-hero"
        style={{ backgroundImage: `url(${media('/media/29466/a-hotel-villavicencio-casa-baquero-9bb.jpg', 1600)})`, minHeight: '40vh' }}
      >
        <div className="container">
          <span className="section-header__eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.virtualTour.eyebrow}</span>
          <h1>{t.virtualTour.title}</h1>
          <p>{t.virtualTour.desc}</p>
        </div>
      </header>

      <section className="virtual-tour__frame">
        <iframe
          title="Tour Kuula Casa Baquero"
          src={SITE.kuulaTour}
          allow="xr-spatial-tracking; gyroscope; accelerometer"
          allowFullScreen
        />
      </section>

      <section className="section-pad container virtual-tour__help">
        <h2>{t.virtualTour.customizeTitle}</h2>
        {t.virtualTour.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>
    </div>
  );
}
