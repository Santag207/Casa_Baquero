import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Room } from '../data/rooms';
import { getRoom } from '../data/rooms';
import type { BookingState, BookingStep } from '../types/booking';
import type { RoomSlug } from '../data/rooms';

const INITIAL_STATE: BookingState = {
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

interface BookingContextValue {
  state: BookingState;
  room: Room | undefined;
  setStep: (s: BookingStep) => void;
  update: (patch: Partial<BookingState>) => void;
  reset: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(INITIAL_STATE);

  const value = useMemo<BookingContextValue>(
    () => ({
      state,
      room: state.roomSlug ? getRoom(state.roomSlug as RoomSlug) : undefined,
      setStep: (step) => setState((s) => ({ ...s, step })),
      update: (patch) => setState((s) => ({ ...s, ...patch })),
      reset: () => setState(INITIAL_STATE),
    }),
    [state],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

/**
 * useBooking hook
 */
export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking debe usarse dentro de BookingProvider');
  return ctx;
}
