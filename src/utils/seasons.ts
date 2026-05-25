export type Season = 'baja' | 'media' | 'alta';

export const SEASON_LABELS: Record<Season, string> = {
  baja: 'Temporada baja',
  media: 'Temporada media',
  alta: 'Temporada alta',
};

export const SEASON_MULTIPLIER: Record<Season, number> = {
  baja: 1,
  media: 1.2,
  alta: 1.35,
};

/** Semana Santa aproximada (actualizar años según calendario litúrgico) */
const EASTER_RANGES: [string, string][] = [
  ['2025-04-13', '2025-04-20'],
  ['2026-03-29', '2026-04-05'],
  ['2027-03-21', '2027-03-28'],
];

/** Puentes y festivos fijos Colombia (referencia; el calendario Google puede refinar) */
const FIXED_HOLIDAYS = [
  '01-01', '01-06', '03-19', '05-01', '06-29', '07-20', '08-07', '08-15',
  '10-12', '11-02', '11-16', '12-08', '12-25',
];

function isEasterWeek(date: Date): boolean {
  const iso = date.toISOString().slice(0, 10);
  return EASTER_RANGES.some(([a, b]) => iso >= a && iso <= b);
}

function isFixedHoliday(date: Date): boolean {
  const md = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  return FIXED_HOLIDAYS.includes(md);
}

/** Temporada alta: dic-ene, jun-jul, Semana Santa y festivos mayores */
export function getSeasonForDate(date: Date): Season {
  const month = date.getMonth() + 1;

  if (month === 12 || month === 1 || month === 6 || month === 7) return 'alta';
  if (isEasterWeek(date) || isFixedHoliday(date)) return 'alta';

  // Puentes comunes (ej. mitad de año)
  if (month === 11 && date.getDate() >= 10 && date.getDate() <= 17) return 'media';

  // Feb-may y ago-nov (excepto picos) → baja; transición → media fines de semana largos
  if (month === 2 || month === 3 || month === 4 || month === 5) return 'baja';
  if (month === 8 || month === 9 || month === 10) return 'baja';

  return 'media';
}

export function seasonFromEventTitle(title: string): Season | null {
  const t = title.toLowerCase();
  if (t.includes('alta')) return 'alta';
  if (t.includes('media')) return 'media';
  if (t.includes('baja')) return 'baja';
  if (t.includes('ocupad') || t.includes('reserv')) return null;
  return null;
}

export function dominantSeasonForRange(checkIn: Date, checkOut: Date): Season {
  const seasons: Season[] = [];
  const cur = new Date(checkIn);
  while (cur < checkOut) {
    seasons.push(getSeasonForDate(cur));
    cur.setDate(cur.getDate() + 1);
  }
  if (seasons.includes('alta')) return 'alta';
  if (seasons.includes('media')) return 'media';
  return 'baja';
}
