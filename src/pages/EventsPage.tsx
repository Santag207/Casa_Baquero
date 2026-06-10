import { useLanguage } from '../context/LanguageContext';
import { ContentPage } from './ContentPage';

export function EventsPage() {
  const { t } = useLanguage();
  const gallery = [
    '/media/29228/finca-hotel-casa-baquero-villavicencio-eventos-9.jpg',
    '/media/29226/finca-hotel-casa-baquero-villavicencio-eventos-7.jpg',
    '/media/2248/celebracion-finca-hotel-casa-baquero-villavicencio.jpg',
  ].map((src, i) => ({ src, alt: `Eventos Casa Baquero ${i + 1}` }));

  return (
    <ContentPage
      config={{
        eyebrow: t.events.eyebrow,
        title: t.events.title,
        subtitle: t.events.subtitle,
        heroImage: '/media/29228/finca-hotel-casa-baquero-villavicencio-eventos-9.jpg',
        cta: { label: t.events.cta, to: '/contacto' },
        sections: [
          {
            paragraphs: t.events.paragraphs,
          },
        ],
        gallery,
      }}
    />
  );
}
