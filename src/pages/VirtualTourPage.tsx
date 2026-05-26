import { SITE } from '../data/site';
import { media } from '../data/media';
import './VirtualTourPage.scss';

export function VirtualTourPage() {
  return (
    <div className="virtual-tour">
      <header
        className="page-hero"
        style={{ backgroundImage: `url(${media('/media/29466/a-hotel-villavicencio-casa-baquero-9bb.jpg', 1600)})`, minHeight: '40vh' }}
      >
        <div className="container">
          <span className="section-header__eyebrow" style={{ color: 'rgba(255,255,255,0.85)' }}>Experiencia</span>
          <h1>Recorrido virtual 360°</h1>
          <p>Explora nuestras instalaciones, habitaciones y zonas comunes desde la comodidad de tu hogar.</p>
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
        <h2>Personalizar el tour</h2>
        <p>
          El recorrido se incrusta desde <strong>Kuula</strong>. Para cambiar panoramas o hotspots, edita la
          colección en tu panel de Kuula y actualiza la URL en <code>src/data/site.ts</code> (
          <code>kuulaTour</code>).
        </p>
        <p>
          URL actual:{' '}
          <a href={SITE.kuulaTour} target="_blank" rel="noreferrer">
            {SITE.kuulaTour}
          </a>
        </p>
        <p>
          Tour anterior (legacy):{' '}
          <a href={SITE.legacyTour} target="_blank" rel="noreferrer">
            webmastersac.com
          </a>
        </p>
      </section>
    </div>
  );
}
