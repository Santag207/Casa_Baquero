export const SITE = {
  name: 'Finca Hotel Casa Baquero',
  tagline: 'Hotel familiar con piscina en Villavicencio',
  location: 'Antigua vía a Restrepo, 150mts. adelante de Pozo Azul. Vereda Vanguardia., Villavicencio, Meta.',
  locationShort: 'Antigua vía a Restrepo, 150 m adelante de Pozo Azul — Vereda Vanguardia',
  phones: {
    landline: '(608) 678 3807',
    whatsapp: '+57 310 818 8183',
    whatsappDigits: '573108188183',
  },
  email: 'reservascasabaquero@gmail.com',
  mapCoords: { lat: 4.17831, lng: -73.61937 },
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.211999983351!2d-73.62162848532314!3d4.178685596962008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e2da7e7a8808d%3A0x80b436edd2b61adf!2sFinca%20Hotel%20Casa%20Baquero!5e0!3m2!1sen!2sco!4v1642770355344!5m2!1sen!2sco',
  checkIn: '3:00 p.m.',
  checkOut: '1:00 p.m.',
  kuulaTour:
    'https://kuula.co/share/collection/7lpl9?fs=1&vr=0&logo=0&info=0&thumbs=1',
  legacyTour: 'https://webmastersac.com/Tour360fincahotelbaquero/index.html',
  social: {
    instagram: 'https://www.instagram.com/hotel_casabaquero/',
    facebook: 'https://www.facebook.com/fincahotelcasabaquero/',
    tripadvisor:
      'https://www.tripadvisor.es/Hotel_Review-g676523-d8629306-Reviews-Finca_Hotel_Casa_Baquero-Villavicencio_Meta_Department.html',
    freevellers: 'http://www.freevellers.com/villavicencio/finca-hotel-casa-baquero/',
  },
  hashtags: ['#FincaCasaBaquero', '#AlLlanoYoVoy', '#VacacionesEnVillavo'],
  policies: [
    { label: 'Política de Privacidad', href: 'https://plataforma.hotmark.co/privacy-policy/?hotel=50726' },
    { label: 'Protección a menores', href: 'https://plataforma.hotmark.co/child-protection-policy/?hotel=50726' },
    { label: 'Sostenibilidad', href: 'https://plataforma.hotmark.co/sustainability-policy/?hotel=50726' },
  ],
  ivaRate: 0.19,
  extraGuestLowSeason: 20000,
} as const;

export const HERO_SLIDES = [
  '/media/29214/hotel-villavicencio-finca-casa-baquero-7c.jpg',
  '/media/29215/hotel-villavicencio-finca-casa-baquero-7d.jpg',
  '/media/29447/a-hotel-villavicencio-casa-baquero-1d.jpg',
  '/media/29444/a-hotel-villavicencio-casa-baquero-1a.jpg',
];

export const HOME_BLOCKS = [
  {
    title: 'Disfruta el clima del',
    subtitle: 'Piedemonte Llanero',
    text: 'Deja que la montaña te cubra de brisa, tranquilidad y frescura mientras disfrutas del sol y la piscina.',
    cta: { label: 'Ver Habitaciones', to: '/habitaciones' },
    image: '/media/28774/image-hotel-casa-baquero.png',
  },
  {
    title: 'Mucho por descubrir en',
    subtitle: 'el Llano Colombiano',
    text: 'Déjate cautivar por los paisajes y atardeceres más sorprendentes, así como aves y especies exóticas.',
    cta: { label: 'Ven al Llano', to: '/el-llano' },
    image: '/media/46438/hotel-villavicencio-finca-casa-baquero-aeropuerto-restrepo-meta-piscina.jpg',
  },
];

export const FACILITIES_TEXT = [
  'Finca Hotel Casa Baquero está ubicado a 10 minutos de Villavicencio por la antigua vía a Restrepo, cerca al Aeropuerto y al Bioparque Los Ocarros.',
  'Nueve amplias y cómodas habitaciones con TV, wi-fi y baño privado con vista a la piscina y los jardines.',
  'Piscina, zonas verdes, zona BBQ y variedad de juegos: billar, ping-pong, mini-tejo y volley.',
  'Te esperamos en el llano Colombiano.',
];
