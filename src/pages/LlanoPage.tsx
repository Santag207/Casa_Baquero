import { ContentPage } from './ContentPage';

const gallery = [
  '/media/29243/finca-hotel-casa-baquero-villavicencio-b2.jpg',
  '/media/29244/finca-hotel-casa-baquero-villavicencio-b3.jpg',
  '/media/29245/finca-hotel-casa-baquero-cascadas-villavicencio-b1.jpg',
  '/media/29246/finca-hotel-casa-baquero-villavicencio-b4.jpg',
  '/media/29247/finca-hotel-casa-baquero-villavicencio-b5.jpg',
  '/media/29251/cultura-llanera-finca-hotel-casa-baquero-villavicencio.jpg',
].map((src, i) => ({ src, alt: `Llano colombiano ${i + 1}` }));

export function LlanoPage() {
  return (
    <ContentPage
      config={{
        eyebrow: 'Destino',
        title: 'Ven al Llano',
        subtitle: 'Un paraíso por descubrir',
        heroImage: '/media/29245/finca-hotel-casa-baquero-cascadas-villavicencio-b1.jpg',
        cta: { label: 'Contactar', to: '/contacto' },
        sections: [
          {
            heading: 'La puerta al llano',
            paragraphs: [
              'Aquí no encontrarás ni mar ni olas, pero se dice que el sol se esconde entre hermosas tierras llenas de biodiversidad e historia.',
              'Villavicencio es un lugar mágico lleno de cultura, arte, comercio y ganadería.',
              'Cuenta con lugares para realizar deportes extremos, conectar con la naturaleza y divertirse.',
              'Enamórate del llano.',
            ],
          },
        ],
        gallery,
      }}
    />
  );
}
