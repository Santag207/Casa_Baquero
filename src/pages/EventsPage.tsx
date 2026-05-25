import { ContentPage } from './ContentPage';

const gallery = [
  '/media/29228/finca-hotel-casa-baquero-villavicencio-eventos-9.jpg',
  '/media/29226/finca-hotel-casa-baquero-villavicencio-eventos-7.jpg',
  '/media/2248/celebracion-finca-hotel-casa-baquero-villavicencio.jpg',
].map((src, i) => ({ src, alt: `Eventos Casa Baquero ${i + 1}` }));

export function EventsPage() {
  return (
    <ContentPage
      config={{
        eyebrow: 'Experiencias',
        title: 'Celebraciones y Eventos',
        subtitle: 'Fiestas familiares y encuentros empresariales',
        heroImage: '/media/29228/finca-hotel-casa-baquero-villavicencio-eventos-9.jpg',
        cta: { label: 'Contactar', to: '/contacto' },
        sections: [
          {
            paragraphs: [
              'En Finca Hotel Casa Baquero puedes celebrar todo tipo de eventos sociales, fiestas familiares y encuentros empresariales.',
              'Zonas verdes, piscina, zona BBQ y juegos para que tu celebración sea memorable en el piedemonte llanero.',
            ],
          },
        ],
        gallery,
      }}
    />
  );
}
