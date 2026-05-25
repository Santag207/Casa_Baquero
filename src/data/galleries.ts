export interface GalleryGroup {
  id: string;
  title: string;
  subtitle: string;
  images: { src: string; alt: string }[];
}

const hotelImages = [
  '/media/29466/a-hotel-villavicencio-casa-baquero-9bb.jpg',
  '/media/23214/finca-hotel-casa-baquero-villavicencio-piscina-2.jpeg',
  '/media/29464/a-hotel-villavicencio-casa-baquero-7bb.jpg',
  '/media/29461/a-hotel-villavicencio-casa-baquero-4bb.jpg',
  '/media/11591/hotel-casa-baquero-villavicencio-01.jpg',
  '/media/29069/finca-hotel-casa-baquero-villavicencio-b1.jpg',
  '/media/29074/finca-hotel-casa-baquero-villavicencio-b6.jpg',
  '/media/29073/finca-hotel-casa-baquero-villavicencio-b5.jpg',
  '/media/29077/finca-hotel-casa-baquero-villavicencio-b9.jpg',
  '/media/29473/a-hotel-villavicencio-casa-baquero-18bb.jpg',
  '/media/29471/a-hotel-villavicencio-casa-baquero-15bb.jpg',
  '/media/29469/a-hotel-villavicencio-casa-baquero-12bb.jpg',
  '/media/29470/a-hotel-villavicencio-casa-baquero-13bb.jpg',
  '/media/29468/a-hotel-villavicencio-casa-baquero-11bb.jpg',
];

const llanoImages = [
  '/media/29243/finca-hotel-casa-baquero-villavicencio-b2.jpg',
  '/media/29244/finca-hotel-casa-baquero-villavicencio-b3.jpg',
  '/media/29245/finca-hotel-casa-baquero-cascadas-villavicencio-b1.jpg',
  '/media/29246/finca-hotel-casa-baquero-villavicencio-b4.jpg',
  '/media/29247/finca-hotel-casa-baquero-villavicencio-b5.jpg',
  '/media/29248/finca-hotel-casa-baquero-villavicencio-b6.jpg',
  '/media/29249/finca-hotel-casa-baquero-villavicencio-b7.jpg',
  '/media/29251/cultura-llanera-finca-hotel-casa-baquero-villavicencio.jpg',
];

const familyImages = [
  '/media/29226/finca-hotel-casa-baquero-villavicencio-eventos-7.jpg',
  '/media/2248/celebracion-finca-hotel-casa-baquero-villavicencio.jpg',
  '/media/2264/love-finca-hotel-casa-baquero-villavicencio.jpg',
  '/media/2273/tranquilidad-finca-hotel-casa-baquero-villavicencio.jpg',
  '/media/2266/noche-romantica-finca-hotel-casa-baquero-villavicencio.jpg',
];

function mapImages(paths: string[], prefix: string) {
  return paths.map((src, i) => ({
    src,
    alt: `${prefix} — imagen ${i + 1} | Casa Baquero Villavicencio`,
  }));
}

export const GALLERY_GROUPS: GalleryGroup[] = [
  {
    id: 'casa',
    title: 'La finca y zonas comunes',
    subtitle: 'Piscina, jardines, BBQ y áreas de descanso',
    images: mapImages(hotelImages, 'Instalaciones Casa Baquero'),
  },
  {
    id: 'llano',
    title: 'Paisaje llanero',
    subtitle: 'Cascadas, atardeceres y naturaleza del Meta',
    images: mapImages(llanoImages, 'Llano colombiano'),
  },
  {
    id: 'familia',
    title: 'Experiencias en familia',
    subtitle: 'Celebraciones, parejas y momentos especiales',
    images: mapImages(familyImages, 'Experiencias huéspedes'),
  },
];

export const HOME_GALLERY = mapImages(hotelImages.slice(0, 8), 'Galería principal');
