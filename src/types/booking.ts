export type BookingStep = 1 | 2 | 3 | 4;

export interface BookingState {
  step: BookingStep;
  checkIn: string;
  checkOut: string;
  roomSlug: string; // Changed from RoomSlug to string to avoid circular dependency or import
  guests: number;
  roomsCount: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  notes: string;
}
