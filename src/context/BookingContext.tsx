import { useMemo, useState, type ReactNode } from 'react';
import { getRoom } from '../data/rooms';
import type { BookingState } from '../types/booking';
import type { RoomSlug } from '../data/rooms';
import { BookingContext, type BookingContextValue } from './BookingContextValue';

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
  extras: [],
};

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
