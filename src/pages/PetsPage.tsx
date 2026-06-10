import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ContentPage } from './ContentPage';
import { media } from '../data/media';

export function PetsPage() {
  const { t } = useLanguage();
  return (
    <>
      <ContentPage
        config={{
          title: t.pets.title,
          subtitle: t.pets.subtitle,
          heroImage: '/media/28781/image-banner-2-hotel-casa-baquero.png',
          cta: { label: t.pets.cta, to: '/contacto' },
          sections: [
            {
              heading: t.pets.sectionTitle,
              paragraphs: t.pets.sectionText,
            },
            {
              heading: t.pets.policyTitle,
              paragraphs: t.pets.policyText,
            },
          ],
          gallery: [
            { src: '/media/46438/hotel-villavicencio-finca-casa-baquero-aeropuerto-restrepo-meta-piscina.jpg', alt: t.pets.imageAlt },
          ],
        }}
      />
      <section className="full-bleed" style={{ background: '#faf6f0', padding: '2rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge badge--pet">🐾 {t.pets.badge}</span>
          <p style={{ marginTop: '1rem' }}>
            <Link to="/reservar" className="btn btn--primary">
              {t.pets.bookBtn}
            </Link>
          </p>
          <img
            src={media('/media/28781/image-banner-2-hotel-casa-baquero.png', 200)}
            alt=""
            style={{ margin: '2rem auto', maxWidth: 180 }}
          />
        </div>
      </section>
    </>
  );
}
