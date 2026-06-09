import type { Room } from '../data/rooms';
import type { ExtraSelection } from '../data/extras';
import { EXTRAS } from '../data/extras';
import { SITE } from '../data/site';
import { dominantSeasonForRange, SEASON_LABELS, SEASON_MULTIPLIER, type Season } from './seasons';

export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function nightsBetween(checkIn: Date, checkOut: Date): number {
  const ms = checkOut.getTime() - checkIn.getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export interface ExtraLine {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PriceBreakdown {
  nights: number;
  season: Season;
  seasonLabel: string;
  basePerNight: number;
  adjustedPerNight: number;
  subtotal: number;
  iva: number;
  total: number;
  multiplier: number;
  extras: ExtraLine[];
  extrasTotal: number;
  grandTotal: number;
}

export function calculateExtras(extras: ExtraSelection[], nights: number): { lines: ExtraLine[]; total: number } {
  const lines: ExtraLine[] = [];

  for (const sel of extras) {
    if (sel.quantity <= 0) continue;
    const item = EXTRAS.find((e) => e.id === sel.itemId);
    if (!item) continue;

    const qty = item.unit === 'noche' ? sel.quantity * nights : sel.quantity;
    const total = item.price * qty;
    lines.push({
      name: item.name,
      quantity: sel.quantity,
      unitPrice: item.price,
      total,
    });
  }

  return {
    lines,
    total: lines.reduce((sum, l) => sum + l.total, 0),
  };
}

export function calculateStay(
  room: Room,
  checkIn: Date,
  checkOut: Date,
  guests: number,
  roomsCount: number,
  extras: ExtraSelection[] = [],
): PriceBreakdown {
  const nights = nightsBetween(checkIn, checkOut) || 1;
  const season = dominantSeasonForRange(checkIn, checkOut);
  const multiplier = SEASON_MULTIPLIER[season];
  let basePerNight = room.basePrice * multiplier;

  const extraGuests = Math.max(0, guests - room.maxGuests);
  if (extraGuests > 0 && room.extraGuestNote) {
    basePerNight += extraGuests * SITE.extraGuestLowSeason * multiplier;
  }

  const adjustedPerNight = Math.round(basePerNight);
  const subtotal = adjustedPerNight * nights * roomsCount;
  const iva = Math.round(subtotal * SITE.ivaRate);
  const total = subtotal + iva;

  const { lines, total: extrasTotal } = calculateExtras(extras, nights);

  return {
    nights,
    season,
    seasonLabel: SEASON_LABELS[season],
    basePerNight: room.basePrice,
    adjustedPerNight,
    subtotal,
    iva,
    total,
    multiplier,
    extras: lines,
    extrasTotal,
    grandTotal: total + extrasTotal,
  };
}
