export type RoomSlug =
  | 'doble-estandar'
  | 'doble-premium'
  | 'doble-deluxe'
  | 'triple'
  | 'cuadruple'
  | 'familiar'
  | 'cabana-6';

export interface Room {
  slug: RoomSlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  summary: string;
  basePrice: number;
  maxGuests: number;
  includesBreakfast?: boolean;
  extraGuestNote?: string;
  amenities: string[];
  images: string[];
  heroImage: string;
}

export const ROOMS: Room[] = [
  {
    slug: 'doble-estandar',
    name: 'Habitación Doble Estándar',
    shortName: 'Doble Estándar',
    tagline: 'Comodidad, calidad y economía',
    summary: 'Cómoda habitación con una cama doble, baño privado, ventilador y vista a los jardines.',
    description:
      'La Doble Estándar es una de las habitaciones más solicitadas en Finca Hotel Casa Baquero. Ofrece comodidad, buen descanso y la mejor tarifa a viajeros solitarios y parejas. Consta de una cama doble, baño privado y hermosa vista a los jardines y la piscina. Ven con tu pareja y explora opciones para planes románticos.',
    basePrice: 120000,
    maxGuests: 2,
    amenities: ['Amenities de baño', 'Baño privado', 'TV', 'Ventilador', 'Wi-Fi', 'Vista jardines y piscina'],
    heroImage: '/media/7507/finca-hotel-casa-baquero-villavicencio-room-standard-1.jpg',
    images: [
      '/media/7507/finca-hotel-casa-baquero-villavicencio-room-standard-1.jpg',
      '/media/14937/finca-hotel-casa-baquero-habitación-doble-standard-2.jpg',
      '/media/14936/finca-hotel-casa-baquero-habitación-doble-standard-1.jpg',
    ],
  },
  {
    slug: 'doble-premium',
    name: 'Habitación Doble Premium',
    shortName: 'Doble Premium',
    tagline: 'Espacio y vista a la piscina',
    summary: 'Amplitud y comodidad en una habitación con cama queen, baño privado y vista a la piscina.',
    description:
      'Ideal para parejas que buscan mayor comodidad. Cuenta con cama queen, baño privado, TV satelital y hermosa vista exterior. Ubicación frente a las zonas verdes y la piscina. ¿Vienes en plan romántico? Escríbenos.',
    basePrice: 140000,
    maxGuests: 2,
    amenities: ['Amenities de baño', 'Baño privado', 'TV satelital', 'Ventilador', 'Wi-Fi', 'Vista piscina'],
    heroImage: '/media/14938/finca-hotel-casa-baquero-habitación-doble-premiun-galeria-1.jpg',
    images: [
      '/media/14938/finca-hotel-casa-baquero-habitación-doble-premiun-galeria-1.jpg',
      '/media/29082/finca-hotel-casa-baquero-villavicencio-b13.jpg',
    ],
  },
  {
    slug: 'doble-deluxe',
    name: 'Habitación Doble Deluxe',
    shortName: 'Doble Deluxe',
    tagline: 'Desayuno de cortesía incluido',
    summary: 'Habitación para dos personas en cama queen y baño privado. Incluye desayuno de cortesía.',
    description:
      'Una de las más solicitadas en la finca. Cama queen, baño privado y vista a jardines y piscina. Incluye desayuno de cortesía para empezar el día con energía llanera.',
    basePrice: 160000,
    maxGuests: 2,
    includesBreakfast: true,
    amenities: ['Desayuno cortesía', 'Baño privado', 'TV', 'Wi-Fi', 'Vista jardines y piscina'],
    heroImage: '/media/29082/finca-hotel-casa-baquero-villavicencio-b13.jpg',
    images: ['/media/29082/finca-hotel-casa-baquero-villavicencio-b13.jpg', '/media/29081/finca-hotel-casa-baquero-villavicencio-a1.jpg'],
  },
  {
    slug: 'triple',
    name: 'Habitación Triple',
    shortName: 'Triple',
    tagline: 'Ideal para tres viajeros',
    summary: 'Para 3 personas con 1 cama doble y 1 cama sencilla, baño privado y ventilador. Incluye desayuno de cortesía.',
    description:
      'Espacio pensado para familias pequeñas o grupos de amigos. Una cama doble, una sencilla, baño privado, ventilador y desayuno de cortesía.',
    basePrice: 210000,
    maxGuests: 3,
    includesBreakfast: true,
    amenities: ['Desayuno cortesía', 'Baño privado', 'TV', 'Ventilador', 'Wi-Fi'],
    heroImage: '/media/29087/finca-hotel-casa-baquero-villavicencio-b16.jpg',
    images: ['/media/29087/finca-hotel-casa-baquero-villavicencio-b16.jpg'],
  },
  {
    slug: 'cuadruple',
    name: 'Habitación Cuádruple',
    shortName: 'Cuádruple',
    tagline: 'Cuatro personas con desayuno',
    summary: 'Habitación con 1 cama doble y 2 semidobles y baño. Incluye desayuno de cortesía.',
    description:
      'Perfecta para familias. Incluye desayuno de cortesía. Tarifa base por 4 personas; persona adicional desde $20.000 + IVA en temporada baja.',
    basePrice: 260000,
    maxGuests: 4,
    includesBreakfast: true,
    extraGuestNote: 'Costo por 4 personas. Persona adicional: desde $20.000 + IVA (temporada baja).',
    amenities: ['Desayuno cortesía', 'Baño privado', 'TV', 'Ventilador', 'Wi-Fi'],
    heroImage: '/media/29092/finca-hotel-casa-baquero-villavicencio-b20.jpg',
    images: ['/media/29092/finca-hotel-casa-baquero-villavicencio-b20.jpg'],
  },
  {
    slug: 'familiar',
    name: 'Habitación Familiar',
    shortName: 'Familiar',
    tagline: 'Hasta 5 personas',
    summary: '5 personas en 1 cama doble y 3 camas sencillas y baño privado. Incluye desayuno de cortesía.',
    description:
      'La opción más amplia dentro de la casa principal. Ideal para familias que buscan compartir el mismo espacio con todas las comodidades de la finca.',
    basePrice: 320000,
    maxGuests: 5,
    includesBreakfast: true,
    amenities: ['Desayuno cortesía', 'Baño privado', 'TV', 'Ventilador', 'Wi-Fi'],
    heroImage: '/media/29101/finca-hotel-casa-baquero-villavicencio-b26.jpg',
    images: ['/media/29101/finca-hotel-casa-baquero-villavicencio-b26.jpg'],
  },
  {
    slug: 'cabana-6',
    name: 'Cabaña 6 Personas',
    shortName: 'Cabaña 6 pax',
    tagline: 'Cabaña independiente',
    summary: 'Cabaña independiente de dos habitaciones, cada una con cama king, cama sencilla y baño.',
    description:
      'La Cabaña Familiar para 6 personas es ideal para escapadas en familia y con amigos. Dos amplias habitaciones, cada una con cama king y cama sencilla, TV satelital, ventilador y baño. Tarifa base por 4 personas; adicional desde $20.000 + IVA.',
    basePrice: 320000,
    maxGuests: 6,
    extraGuestNote: 'Costo por 4 personas. Persona adicional: desde $20.000 + IVA (temporada baja).',
    amenities: ['Smart TV', 'Ventilador', 'Baño por habitación', 'Wi-Fi', 'Cabaña independiente'],
    heroImage: '/media/46433/finca-hotel-aeropuerto-villavicencio.jpg',
    images: ['/media/46433/finca-hotel-aeropuerto-villavicencio.jpg'],
  },
];

export function getRoom(slug: string): Room | undefined {
  return ROOMS.find((r) => r.slug === slug);
}
