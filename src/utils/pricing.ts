import type { Room } from '../data/rooms';
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
}

export function calculateStay(
  room: Room,
  checkIn: Date,
  checkOut: Date,
  guests: number,
  roomsCount: number,
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
  };
}
