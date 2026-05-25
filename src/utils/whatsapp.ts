import { formatCOP, type PriceBreakdown } from './pricing';
import { SITE } from '../data/site';
import type { Room } from '../data/rooms';

export interface ReservationPayload {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomsCount: number;
  room: Room;
  price: PriceBreakdown;
  notes?: string;
}

export function buildWhatsAppMessage(data: ReservationPayload): string {
  const { guestName, guestEmail, guestPhone, checkIn, checkOut, guests, roomsCount, room, price, notes } =
    data;

  const lines = [
    '💚 *Reserva — Finca Hotel Casa Baquero* 🦜',
    '',
    '👤 *Huésped*',
    `Nombre: ${guestName}`,
    `Correo: ${guestEmail}`,
    `Teléfono: ${guestPhone}`,
    '',
    '📅 *Estadía*',
    `Entrada: ${checkIn}`,
    `Salida: ${checkOut}`,
    `Noches: ${price.nights}`,
    `Huéspedes: ${guests}`,
    `Habitaciones: ${roomsCount}`,
    '',
    '🛏️ *Alojamiento*',
    room.name,
    price.seasonLabel,
    '',
    '💰 *Resumen (estimado)*',
    `Tarifa/noche (${price.seasonLabel}): ${formatCOP(price.adjustedPerNight)} + IVA`,
    `Subtotal: ${formatCOP(price.subtotal)}`,
    `IVA (19%): ${formatCOP(price.iva)}`,
    `*Total estimado: ${formatCOP(price.total)}*`,
    '',
    '📍 Villavicencio, Meta — Piedemonte llanero',
  ];

  if (notes?.trim()) {
    lines.push('', '📝 *Notas*', notes.trim());
  }

  lines.push('', 'Gracias por elegirnos. Confirmaremos disponibilidad a la brevedad. 🌿');

  return lines.join('\n');
}

export function openWhatsAppReservation(message: string): void {
  const url = `https://api.whatsapp.com/send?phone=${SITE.phones.whatsappDigits}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
