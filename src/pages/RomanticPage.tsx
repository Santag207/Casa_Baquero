import { ContentPage } from './ContentPage';

const gallery = [
  '/media/29226/finca-hotel-casa-baquero-villavicencio-eventos-7.jpg',
  '/media/29081/finca-hotel-casa-baquero-villavicencio-a1.jpg',
  '/media/2266/noche-romantica-finca-hotel-casa-baquero-villavicencio.jpg',
  '/media/2273/tranquilidad-finca-hotel-casa-baquero-villavicencio.jpg',
  '/media/2264/love-finca-hotel-casa-baquero-villavicencio.jpg',
  '/media/2248/celebracion-finca-hotel-casa-baquero-villavicencio.jpg',
].map((src, i) => ({ src, alt: `Plan romántico Casa Baquero ${i + 1}` }));

export function RomanticPage() {
  return (
    <ContentPage
      config={{
        eyebrow: 'Experiencias',
        title: 'Planes Románticos',
        subtitle: 'Una noche inolvidable',
        heroImage: '/media/2266/noche-romantica-finca-hotel-casa-baquero-villavicencio.jpg',
        cta: { label: 'Contactar', to: '/contacto' },
        sections: [
          {
            heading: 'Sorprende a tu pareja',
            paragraphs: [
              'Disfruta en Finca Hotel Casa Baquero una velada inolvidable con tu pareja.',
              'Habitación doble decorada con pétalos de rosa, botella de vino y desayuno especial.',
              'Contáctanos si tienes ideas diferentes y con gusto las hacemos realidad.',
            ],
          },
        ],
        gallery,
      }}
    />
  );
}
