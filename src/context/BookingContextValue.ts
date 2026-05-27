import { createContext } from 'react';
import type { Room } from '../data/rooms';
import type { BookingState, BookingStep } from '../types/booking';

export interface BookingContextValue {
  state: BookingState;
  room: Room | undefined;
  setStep: (s: BookingStep) => void;
  update: (patch: Partial<BookingState>) => void;
  reset: () => void;
}

export const BookingContext = createContext<BookingContextValue | null>(null);
