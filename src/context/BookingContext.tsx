import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Room, RoomSlug } from '../data/rooms';
import { getRoom } from '../data/rooms';

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

const initial: BookingState = {
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
  const [state, setState] = useState<BookingState>(initial);

  const value = useMemo<BookingContextValue>(
    () => ({
      state,
      room: state.roomSlug ? getRoom(state.roomSlug) : undefined,
      setStep: (step) => setState((s) => ({ ...s, step })),
      update: (patch) => setState((s) => ({ ...s, ...patch })),
      reset: () => setState(initial),
    }),
    [state],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking debe usarse dentro de BookingProvider');
  return ctx;
}
