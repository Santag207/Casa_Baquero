export type ExtraCategory = 'gastronomia' | 'decoracion' | 'servicios';

export interface ExtraItem {
  id: string;
  category: ExtraCategory;
  name: string;
  description: string;
  price: number;
  unit: 'unidad' | 'persona' | 'noche';
}

export interface ExtraSelection {
  itemId: string;
  quantity: number;
}

export const EXTRAS: ExtraItem[] = [
  // ── Gastronomía ──
  {
    id: 'desayuno-especial',
    category: 'gastronomia',
    name: 'Desayuno especial',
    description: 'Desayuno típico llanero con arepa, carne, huevos, queso, chocolate y jugo natural.',
    price: 25000,
    unit: 'persona',
  },
  {
    id: 'almuerzo-tipico',
    category: 'gastronomia',
    name: 'Almuerzo típico',
    description: 'Almuerzo tradicional de la región: mamona, pescado o bandeja llanera.',
    price: 35000,
    unit: 'persona',
  },
  {
    id: 'cena-especial',
    category: 'gastronomia',
    name: 'Cena especial',
    description: 'Cena gourmet con opciones a la carta y vino de la casa.',
    price: 45000,
    unit: 'persona',
  },
  {
    id: 'bbq-kit',
    category: 'gastronomia',
    name: 'Kit BBQ',
    description: 'Carne, chorizo, verduras, carbón y acompañamientos para tu parrilla.',
    price: 80000,
    unit: 'unidad',
  },
  {
    id: 'botella-vino',
    category: 'gastronomia',
    name: 'Botella de vino',
    description: 'Vino tinto o blanco seleccionado para acompañar tu velada.',
    price: 55000,
    unit: 'unidad',
  },
  // ── Decoración ──
  {
    id: 'deco-romantica',
    category: 'decoracion',
    name: 'Decoración romántica',
    description: 'Pétalos de rosa, velas, globos y detalles especiales para una velada inolvidable en pareja.',
    price: 120000,
    unit: 'unidad',
  },
  {
    id: 'deco-cumpleanos',
    category: 'decoracion',
    name: 'Decoración cumpleaños',
    description: 'Globos, confeti, pancarta y un pequeño pastel de bienvenida.',
    price: 80000,
    unit: 'unidad',
  },
  {
    id: 'deco-aniversario',
    category: 'decoracion',
    name: 'Decoración aniversario',
    description: 'Arreglo floral, cena con vino y detalles conmemorativos.',
    price: 100000,
    unit: 'unidad',
  },
  {
    id: 'deco-sorpresa',
    category: 'decoracion',
    name: 'Decoración sorpresa',
    description: 'Decoración personalizada para cualquier ocasión especial. ¡Cuéntanos tu plan!',
    price: 65000,
    unit: 'unidad',
  },
  // ── Servicios ──
  {
    id: 'late-checkout',
    category: 'servicios',
    name: 'Late checkout',
    description: 'Salida extendida hasta las 5:00 p.m. para que disfrutes más de tu último día.',
    price: 50000,
    unit: 'noche',
  },
  {
    id: 'early-checkin',
    category: 'servicios',
    name: 'Early check-in',
    description: 'Ingreso anticipado desde las 10:00 a.m. (sujeto a disponibilidad).',
    price: 40000,
    unit: 'unidad',
  },
  {
    id: 'parrilla-servicio',
    category: 'servicios',
    name: 'Servicio de parrilla',
    description: 'Nuestro personal prepara la parrilla para ti. Incluye acompañamientos.',
    price: 50000,
    unit: 'unidad',
  },
];

export const CATEGORY_LABELS: Record<ExtraCategory, string> = {
  gastronomia: 'Gastronomía',
  decoracion: 'Decoración',
  servicios: 'Servicios adicionales',
};

export const CATEGORY_ICONS: Record<ExtraCategory, string> = {
  gastronomia: '🍽️',
  decoracion: '🎨',
  servicios: '🔧',
};
