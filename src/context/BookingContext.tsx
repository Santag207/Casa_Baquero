import { useMemo, useState, type ReactNode } from 'react';
import { getRoom } from '../data/rooms';
import { BookingContext, initial } from './BookingContextValue';
import type { BookingContextValue, BookingState } from './BookingContextValue';

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

