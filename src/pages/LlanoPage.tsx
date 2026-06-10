import { useLanguage } from '../context/LanguageContext';
import { ContentPage } from './ContentPage';

export function LlanoPage() {
  const { t } = useLanguage();
  const gallery = [
    '/media/29243/finca-hotel-casa-baquero-villavicencio-b2.jpg',
    '/media/29244/finca-hotel-casa-baquero-villavicencio-b3.jpg',
    '/media/29245/finca-hotel-casa-baquero-cascadas-villavicencio-b1.jpg',
    '/media/29246/finca-hotel-casa-baquero-villavicencio-b4.jpg',
    '/media/29247/finca-hotel-casa-baquero-villavicencio-b5.jpg',
    '/media/29251/cultura-llanera-finca-hotel-casa-baquero-villavicencio.jpg',
  ].map((src, i) => ({ src, alt: `Llano colombiano ${i + 1}` }));

  return (
    <ContentPage
      config={{
        eyebrow: t.llano.eyebrow,
        title: t.llano.title,
        subtitle: t.llano.subtitle,
        heroImage: '/media/29245/finca-hotel-casa-baquero-cascadas-villavicencio-b1.jpg',
        cta: { label: t.llano.cta, to: '/contacto' },
        sections: [
          {
            heading: t.llano.sectionTitle,
            paragraphs: t.llano.paragraphs,
          },
        ],
        gallery,
      }}
    />
  );
}
