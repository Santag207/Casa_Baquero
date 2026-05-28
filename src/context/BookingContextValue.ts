import { createContext } from 'react';
import type { Room, RoomSlug } from '../data/rooms';

export type BookingStep = 1 | 2 | 3 | 4;

export interface BookingState {
  step: BookingStep;
  checkIn: string;
  checkOut: string;
  roomSlug: RoomSlug | '';
  guests: number;
  roomsCount: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  notes: string;
}

export interface BookingContextValue {
  state: BookingState;
  room: Room | undefined;
  setStep: (s: BookingStep) => void;
  update: (patch: Partial<BookingState>) => void;
  reset: () => void;
}

export const initial: BookingState = {
  step: 1,
  checkIn: '',
  checkOut: '',
  roomSlug: '',
  guests: 2,
  roomsCount: 1,
  guestName: '',
  guestEmail: '',
  guestPhone: '',
  notes: '',
};

export const BookingContext = createContext<BookingContextValue | null>(null);
