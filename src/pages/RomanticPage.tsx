import { useLanguage } from '../context/LanguageContext';
import { ContentPage } from './ContentPage';

export function RomanticPage() {
  const { t } = useLanguage();
  const gallery = [
    '/media/29226/finca-hotel-casa-baquero-villavicencio-eventos-7.jpg',
    '/media/29081/finca-hotel-casa-baquero-villavicencio-a1.jpg',
    '/media/2266/noche-romantica-finca-hotel-casa-baquero-villavicencio.jpg',
    '/media/2273/tranquilidad-finca-hotel-casa-baquero-villavicencio.jpg',
    '/media/2264/love-finca-hotel-casa-baquero-villavicencio.jpg',
    '/media/2248/celebracion-finca-hotel-casa-baquero-villavicencio.jpg',
  ].map((src, i) => ({ src, alt: `Plan romántico Casa Baquero ${i + 1}` }));

  return (
    <ContentPage
      config={{
        eyebrow: t.romantic.eyebrow,
        title: t.romantic.title,
        subtitle: t.romantic.subtitle,
        heroImage: '/media/2266/noche-romantica-finca-hotel-casa-baquero-villavicencio.jpg',
        cta: { label: t.romantic.cta, to: '/contacto' },
        sections: [
          {
            heading: t.romantic.sectionTitle,
            paragraphs: t.romantic.paragraphs,
          },
        ],
        gallery,
      }}
    />
  );
}
