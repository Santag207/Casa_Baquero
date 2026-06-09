import type { ExtraSelection } from '../data/extras';

export type BookingStep = 1 | 2 | 3 | 4 | 5;

export interface BookingState {
  step: BookingStep;
  checkIn: string;
  checkOut: string;
  roomSlug: string;
  guests: number;
  roomsCount: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  notes: string;
  extras: ExtraSelection[];
}
